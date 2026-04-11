"use client";
import { useEffect, useState, useMemo } from "react";

interface Dataset {
  id: string;
  name: string;
  full_name: string;
  year: number;
  data_types: string[];
  access: "open" | "partial" | "restricted";
  n_subjects: number;
  n_note: string;
  origin: string[];
  doi: string;
  url: string;
  notes: string;
}

const ALL_TYPES = [
  "MRI", "PET", "CSF", "Blood", "Genetics", "Proteomics",
  "Cognitive", "Clinical", "Neuropathology", "Exposomics",
  "Epigenomics", "Transcriptomics", "Lifestyle", "EEG",
];

export default function DatasetTable() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [search, setSearch] = useState("");
  const [accessFilter, setAccessFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<"year" | "name" | "n_subjects">("year");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState<string | null>(null);

  const BASE = process.env.NODE_ENV === "production" ? "/ad-diversity-website" : "";

  useEffect(() => {
    fetch(`${BASE}/data/datasets.json`)
      .then((r) => r.json())
      .then(setDatasets);
  }, [BASE]);

  const filtered = useMemo(() => {
    let d = [...datasets];
    if (search)
      d = d.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.full_name.toLowerCase().includes(search.toLowerCase()) ||
          x.origin.join(" ").toLowerCase().includes(search.toLowerCase())
      );
    if (accessFilter !== "all") d = d.filter((x) => x.access === accessFilter);
    if (typeFilter !== "all") d = d.filter((x) => x.data_types.includes(typeFilter));
    d.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string")
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return d;
  }, [datasets, search, accessFilter, typeFilter, sortKey, sortDir]);

  const toggleSort = (key: typeof sortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ k }: { k: typeof sortKey }) =>
    sortKey === k ? (
      <span className="ml-1 text-violet-400">{sortDir === "asc" ? "↑" : "↓"}</span>
    ) : (
      <span className="ml-1 text-gray-600">↕</span>
    );

  const AccessBadge = ({ a }: { a: string }) => {
    const cls = a === "open" ? "badge-open" : a === "partial" ? "badge-partial" : "badge-restricted";
    const label = a === "open" ? "Open" : a === "partial" ? "Application" : "Restricted";
    return <span className={`badge ${cls}`}>{label}</span>;
  };

  if (!datasets.length) {
    return (
      <div className="text-center py-16 text-violet-400 animate-pulse">
        Loading dataset catalogue…
      </div>
    );
  }

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Datasets", value: datasets.length },
          { label: "Shown", value: filtered.length },
          { label: "Open Access", value: datasets.filter((d) => d.access === "open").length },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-violet-300">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search datasets, countries…"
          className="flex-1 min-w-48 px-3 py-2 rounded-lg text-sm text-gray-200 placeholder-gray-600 border"
          style={{ background: "var(--bg-card)", borderColor: "rgba(167,139,250,0.2)" }}
        />
        <select
          value={accessFilter}
          onChange={(e) => setAccessFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm text-gray-200 border"
          style={{ background: "var(--bg-card)", borderColor: "rgba(167,139,250,0.2)" }}
        >
          <option value="all">All access</option>
          <option value="open">Open</option>
          <option value="partial">Application-based</option>
          <option value="restricted">Restricted</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm text-gray-200 border"
          style={{ background: "var(--bg-card)", borderColor: "rgba(167,139,250,0.2)" }}
        >
          <option value="all">All data types</option>
          {ALL_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <button onClick={() => toggleSort("name")} className="flex items-center">
                  Dataset <SortIcon k="name" />
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort("year")} className="flex items-center">
                  Year <SortIcon k="year" />
                </button>
              </th>
              <th>Data Types</th>
              <th>Access</th>
              <th>
                <button onClick={() => toggleSort("n_subjects")} className="flex items-center">
                  N <SortIcon k="n_subjects" />
                </button>
              </th>
              <th>Origin</th>
              <th>DOI</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <>
                <tr
                  key={d.id}
                  onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                  className="cursor-pointer"
                >
                  <td>
                    <div className="font-semibold text-violet-300">{d.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5 max-w-xs truncate">{d.full_name}</div>
                  </td>
                  <td className="text-gray-300">{d.year}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {d.data_types.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded text-xs"
                          style={{
                            background: "rgba(107,33,168,0.25)",
                            color: "#c4b5fd",
                            border: "1px solid rgba(167,139,250,0.15)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {d.data_types.length > 4 && (
                        <span className="text-xs text-gray-500">+{d.data_types.length - 4}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <AccessBadge a={d.access} />
                  </td>
                  <td className="text-gray-300 whitespace-nowrap">{d.n_note}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {d.origin.map((o) => (
                        <span key={o} className="text-xs text-gray-400">
                          {o}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <a
                      href={`https://doi.org/${d.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-violet-400 hover:text-violet-300 underline"
                    >
                      DOI ↗
                    </a>
                  </td>
                </tr>
                {expanded === d.id && (
                  <tr key={`${d.id}-expanded`}>
                    <td
                      colSpan={7}
                      className="px-4 py-3 text-xs text-gray-400 italic"
                      style={{ background: "rgba(107,33,168,0.08)" }}
                    >
                      <span className="font-medium text-violet-300 not-italic">Notes: </span>
                      {d.notes}{" "}
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 underline ml-1"
                      >
                        Official site ↗
                      </a>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No datasets match your filters.
        </div>
      )}

      <p className="text-xs text-gray-600 mt-3">
        Click any row to expand details.{" "}
        <a
          href="https://github.com/KahinaBch/ad-dataset-catalogue"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-500 underline"
        >
          Contribute a missing dataset via GitHub PR
        </a>.
      </p>
    </div>
  );
}
