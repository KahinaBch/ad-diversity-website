#!/usr/bin/env node
// Copies the dataset catalogue (KahinaBch/ad-dataset-catalogue) into
// public/data/datasets.json, which the website reads at runtime.
//
//   npm run sync:catalogue            # download from GitHub (main branch)
//   npm run sync:catalogue -- --local # copy from ../ad-dataset-catalogue
//
// Entries missing core fields make the script fail, so broken data never
// replaces the committed copy. If GitHub cannot be reached, the committed
// copy is kept and the script exits successfully.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, "public/data/datasets.json");
const REMOTE =
  "https://raw.githubusercontent.com/KahinaBch/ad-dataset-catalogue/main/data/neuroimaging_genetics.json";
const LOCAL = path.join(ROOT, "../ad-dataset-catalogue/data/neuroimaging_genetics.json");

async function load() {
  if (process.argv.includes("--local")) {
    console.log(`Reading ${LOCAL}`);
    return JSON.parse(await readFile(LOCAL, "utf8"));
  }
  console.log(`Downloading ${REMOTE}`);
  const res = await fetch(REMOTE);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function validate(data) {
  if (!Array.isArray(data)) return ["top level is not an array"];
  const errors = [];
  const ids = new Set();
  data.forEach((d, i) => {
    const where = `entry ${i} (${d?.id ?? "no id"})`;
    for (const k of ["id", "name", "full_name", "access", "n_note", "url"])
      if (typeof d[k] !== "string" || !d[k]) errors.push(`${where}: "${k}" must be a non-empty string`);
    for (const k of ["year", "n_subjects"])
      if (typeof d[k] !== "number") errors.push(`${where}: "${k}" must be a number`);
    for (const k of ["data_types", "origin"])
      if (!Array.isArray(d[k])) errors.push(`${where}: "${k}" must be a list`);
    if (ids.has(d.id)) errors.push(`${where}: duplicate id`);
    ids.add(d.id);
  });
  return errors;
}

let data;
try {
  data = await load();
} catch (err) {
  console.warn(`⚠ Could not load the catalogue (${err.message}); keeping the existing ${path.relative(ROOT, OUT)}.`);
  process.exit(0);
}

const errors = validate(data);
if (errors.length) {
  console.error(`✗ Catalogue failed validation (${errors.length} problem(s)); datasets.json was not updated:`);
  errors.slice(0, 30).forEach((e) => console.error("  - " + e));
  process.exit(1);
}

await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
console.log(`✓ Wrote ${data.length} datasets to ${path.relative(ROOT, OUT)}`);
