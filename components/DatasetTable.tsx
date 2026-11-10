"use client";
import { Fragment, useEffect, useState, useMemo, type ReactNode } from "react";
import {
  type Dataset, type AccessLevel, type DiversityLevel,
  ACCESS_LEVELS, ACCESS_LABEL, DIVERSITY_LEVELS,
  accessLevel, diversityLevel, participantLabel, isLink,
} from "@/lib/catalogue";

const ALL_TYPES = [
  "MRI", "PET", "CSF", "Blood", "Genetics", "Proteomics",
  "Cognitive", "Clinical", "Neuropathology", "Exposomics",
  "Epigenomics", "Transcriptomics", "Metabolomics", "Lifestyle", "EEG", "Sleep",
];

const ALL_DESIGNS   = ["longitudinal", "cross-sectional", "both"];
const ALL_STAGES    = ["childhood", "early adulthood", "midlife", "late life"];
const ALL_LEVELS    = ["raw", "preprocessed", "processed"];
const ALL_DIFFICULTY = ["easy", "moderate", "hard"];
const DIVERSITY_OPTIONS = DIVERSITY_LEVELS.filter((l) => l !== "unknown");

const OPTIONAL_COLUMNS = [
  { key: "design",            label: "Study Design" },
  { key: "data_level",        label: "Data Level" },
  { key: "life_stage",        label: "Life Stage" },
  { key: "age",               label: "Age at Entry" },
  { key: "access_difficulty", label: "Access Difficulty" },
  { key: "ethnic_diversity",  label: "Ethnic Diversity" },
  { key: "percent_women",     label: "% Women" },
  { key: "womens_health",     label: "Women's Health" },
] as const;

type OptionalColKey = typeof OPTIONAL_COLUMNS[number]["key"];

type PillStyle = { bg: string; color: string; border: string };

const DIFFICULTY_STYLE: Record<string, PillStyle> = {
  easy:    { bg: "rgba(34,197,94,0.1)",  color: "#22c55e", border: "rgba(34,197,94,0.25)" },
  moderate:{ bg: "rgba(234,179,8,0.1)",  color: "#ca8a04", border: "rgba(234,179,8,0.25)" },
  hard:    { bg: "rgba(239,68,68,0.1)",  color: "#ef4444", border: "rgba(239,68,68,0.25)" },
  unknown: { bg: "transparent",          color: "var(--text-dim)", border: "transparent" },
};

const DESIGN_STYLE: Record<string, PillStyle> = {
  longitudinal:      { bg: "rgba(124,58,237,0.12)", color: "#a78bfa", border: "rgba(124,58,237,0.25)" },
  "cross-sectional": { bg: "rgba(30,58,138,0.15)",  color: "#93c5fd", border: "rgba(30,58,138,0.3)"  },
  both:              { bg: "rgba(190,24,93,0.1)",   color: "#f9a8d4", border: "rgba(190,24,93,0.25)" },
  unknown:           { bg: "transparent",            color: "var(--text-dim)", border: "transparent"  },
};

const LEVEL_STYLE: PillStyle = { bg: "rgba(30,58,138,0.15)", color: "#93c5fd", border: "rgba(30,58,138,0.3)" };
const STAGE_STYLE: PillStyle = { bg: "rgba(190,24,93,0.1)",  color: "#f9a8d4", border: "rgba(190,24,93,0.2)" };

const DIVERSITY_STYLE: Record<DiversityLevel, PillStyle> = {
  high:    { bg: "rgba(34,197,94,0.15)", color: "#22c55e", border: "rgba(34,197,94,0.3)"  },
  medium:  { bg: "rgba(234,179,8,0.12)", color: "#ca8a04", border: "rgba(234,179,8,0.3)"  },
  low:     { bg: "rgba(239,68,68,0.1)",  color: "#ef4444", border: "rgba(239,68,68,0.25)" },
  unknown: { bg: "transparent",          color: "var(--text-dim)", border: "transparent"   },
};

const ACCESS_BADGE: Record<AccessLevel, string> = {
  open: "badge-open", easy: "badge-partial", extensive: "badge-restricted",
};

const isKnown = (v: string | null | undefined): v is string =>
  !!v && v.trim() !== "" && v.trim().toLowerCase() !== "unknown";

/** Renders text with any http(s) URLs turned into links. */
function Linkify({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s\])]+)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^https?:\/\//.test(p)
          ? <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="text-violet-400 underline break-all">link ↗</a>
          : <Fragment key={i}>{p}</Fragment>
      )}
    </>
  );
}

function ChipFilter({
  label, options, active, onToggle, styleMap,
}: {
  label: string;
  options: string[];
  active: Set<string>;
  onToggle: (v: string) => void;
  styleMap?: Record<string, PillStyle>;
}) {
  const defaultActive: PillStyle  = { bg: "rgba(107,33,168,0.3)", color: "#c4b5fd", border: "rgba(167,139,250,0.6)" };
  const defaultInactive: PillStyle = { bg: "transparent", color: "var(--text-dim)", border: "rgba(167,139,250,0.15)" };
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-gray-500 mr-1">{label}:</span>
      {options.map((o) => {
        const isActive = active.has(o);
        const s = isActive ? (styleMap?.[o] ?? defaultActive) : defaultInactive;
        return (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className="px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all capitalize"
            style={{ background: s.bg, color: s.color, borderColor: s.border }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function DetailLink({ href, children, primary }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border not-italic transition-colors hover:border-violet-400"
      style={primary
        ? { background: "rgba(124,58,237,0.25)", color: "#c4b5fd", borderColor: "rgba(167,139,250,0.5)" }
        : { background: "transparent", color: "#a78bfa", borderColor: "rgba(167,139,250,0.25)" }}>
      {children}
    </a>
  );
}

interface DatasetTableProps {
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  onDataLoad?: (datasets: Dataset[]) => void;
}

export default function DatasetTable({ selectedIds, onSelectionChange, onDataLoad }: DatasetTableProps = {}) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [search, setSearch]     = useState("");
  const [accessFilter, setAccessFilter] = useState<"all" | AccessLevel>("all");
  const [typeFilter, setTypeFilter]     = useState<Set<string>>(new Set());
  const [designFilter, setDesignFilter]     = useState<Set<string>>(new Set());
  const [stageFilter, setStageFilter]       = useState<Set<string>>(new Set());
  const [levelFilter, setLevelFilter]       = useState<Set<string>>(new Set());
  const [diffFilter, setDiffFilter]         = useState<Set<string>>(new Set());
  const [divFilter, setDivFilter]           = useState<Set<string>>(new Set());
  const [sortKey, setSortKey]   = useState<"year" | "name" | "n_subjects">("year");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [visibleCols, setVisibleCols] = useState<Set<OptionalColKey>>(new Set());
  const [showColMenu, setShowColMenu] = useState(false);

  const BASE = "/ad-diversity-website";

  useEffect(() => {
    fetch(`${BASE}/data/datasets.json`)
      .then((r) => r.json())
      .then((data: Dataset[]) => {
        setDatasets(data);
        onDataLoad?.(data);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BASE]);

  function toggle<T>(set: Set<T>, val: T): Set<T> {
    const next = new Set(set);
    if (next.has(val)) next.delete(val); else next.add(val);
    return next;
  }

  const filtered = useMemo(() => {
    let d = [...datasets];
    if (search) {
      const q = search.toLowerCase();
      d = d.filter((x) =>
        x.name.toLowerCase().includes(q) ||
        x.full_name.toLowerCase().includes(q) ||
        x.origin.join(" ").toLowerCase().includes(q)
      );
    }
    if (accessFilter !== "all") d = d.filter((x) => accessLevel(x) === accessFilter);
    if (typeFilter.size > 0)   d = d.filter((x) => [...typeFilter].every((t) => x.data_types.includes(t)));
    if (designFilter.size > 0) d = d.filter((x) => x.design && designFilter.has(x.design));
    if (stageFilter.size > 0)  d = d.filter((x) => x.life_stage && [...stageFilter].some((s) => x.life_stage!.includes(s)));
    if (levelFilter.size > 0)  d = d.filter((x) => x.data_level && [...levelFilter].every((l) => x.data_level!.includes(l)));
    if (diffFilter.size > 0)   d = d.filter((x) => x.access_difficulty && diffFilter.has(x.access_difficulty));
    if (divFilter.size > 0)    d = d.filter((x) => divFilter.has(diversityLevel(x)));
    d.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string")
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      // Missing numbers always sort last
      if (typeof av !== "number") return 1;
      if (typeof bv !== "number") return -1;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return d;
  }, [datasets, search, accessFilter, typeFilter, designFilter, stageFilter, levelFilter, diffFilter, divFilter, sortKey, sortDir]);

  const toggleCol = (k: OptionalColKey) =>
    setVisibleCols((prev) => toggle(prev, k));

  const toggleSort = (key: typeof sortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ k }: { k: typeof sortKey }) =>
    sortKey === k
      ? <span className="ml-1 text-violet-400">{sortDir === "asc" ? "↑" : "↓"}</span>
      : <span className="ml-1 text-gray-600">↕</span>;

  const AccessBadge = ({ d }: { d: Dataset }) => {
    const lvl = accessLevel(d);
    return <span className={`badge ${ACCESS_BADGE[lvl]} whitespace-nowrap`}>{ACCESS_LABEL[lvl]}</span>;
  };

  const Pill = ({ label, style }: { label: string; style: PillStyle }) => (
    <span className="px-1.5 py-0.5 rounded text-xs whitespace-nowrap capitalize"
      style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
      {label}
    </span>
  );

  const Dash = () => <span className="text-xs text-gray-600">—</span>;

  const hasActiveFilters = designFilter.size + stageFilter.size + levelFilter.size + diffFilter.size + divFilter.size > 0;
  const showColumnFilters = ["design", "life_stage", "data_level", "access_difficulty", "ethnic_diversity"]
    .some((k) => visibleCols.has(k as OptionalColKey));

  if (!datasets.length)
    return <div className="text-center py-16 text-violet-400 animate-pulse">Loading dataset catalogue…</div>;

  const colCount = 6 + visibleCols.size + (selectedIds !== undefined ? 1 : 0);

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Datasets",     value: datasets.length },
          { label: "Shown",              value: filtered.length },
          { label: "Open Access",        value: datasets.filter((d) => accessLevel(d) === "open").length },
          { label: "With Request Link",  value: datasets.filter((d) => isLink(d.data_request_link)).length },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-violet-300">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + access + columns */}
      <div className="flex flex-wrap gap-3 mb-3">
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search datasets, countries…"
          className="flex-1 min-w-48 px-3 py-2 rounded-lg text-sm text-gray-200 placeholder-gray-600 border"
          style={{ background: "var(--bg-card)", borderColor: "rgba(167,139,250,0.2)" }}
        />
        <select value={accessFilter} onChange={(e) => setAccessFilter(e.target.value as "all" | AccessLevel)}
          className="px-3 py-2 rounded-lg text-sm text-gray-200 border"
          style={{ background: "var(--bg-card)", borderColor: "rgba(167,139,250,0.2)" }}>
          <option value="all">All access</option>
          {ACCESS_LEVELS.map((l) => <option key={l} value={l}>{ACCESS_LABEL[l]}</option>)}
        </select>

        {/* Column picker */}
        <div className="relative">
          <button onClick={() => setShowColMenu((v) => !v)}
            className="px-3 py-2 rounded-lg text-sm border flex items-center gap-2 transition-all"
            style={{
              background: "var(--bg-card)",
              borderColor: visibleCols.size > 0 ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.2)",
              color: visibleCols.size > 0 ? "#c4b5fd" : "var(--text-dim)",
            }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Columns {visibleCols.size > 0 && (
              <span className="text-xs bg-violet-700 text-white rounded-full w-4 h-4 flex items-center justify-center">{visibleCols.size}</span>
            )}
          </button>
          {showColMenu && (
            <div className="absolute right-0 top-full mt-1 z-20 glass-card rounded-xl py-2 w-52 shadow-xl"
              style={{ boxShadow: "0 8px 32px rgba(107,33,168,0.2)" }}>
              <p className="px-4 py-1 text-xs text-gray-500 uppercase tracking-wider">Optional columns</p>
              {OPTIONAL_COLUMNS.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-purple-900/20 transition-colors">
                  <input type="checkbox" checked={visibleCols.has(key)} onChange={() => toggleCol(key)} className="accent-violet-500" />
                  <span className="text-sm text-gray-300">{label}</span>
                </label>
              ))}
              {visibleCols.size > 0 && (
                <button onClick={() => setVisibleCols(new Set())}
                  className="w-full text-left px-4 py-2 text-xs text-pink-400 hover:text-pink-300 transition-colors">
                  Clear all columns
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Data type chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {typeFilter.size > 0 && (
          <button onClick={() => setTypeFilter(new Set())}
            className="px-2.5 py-1 rounded-full text-xs font-medium border transition-all"
            style={{ borderColor: "rgba(190,24,93,0.4)", color: "#f9a8d4", background: "rgba(190,24,93,0.12)" }}>
            Clear ✕
          </button>
        )}
        {ALL_TYPES.map((t) => {
          const active = typeFilter.has(t);
          return (
            <button key={t} onClick={() => setTypeFilter((p) => toggle(p, t))}
              className="px-2.5 py-1 rounded-full text-xs font-medium border transition-all"
              style={{
                borderColor: active ? "rgba(167,139,250,0.6)" : "rgba(167,139,250,0.15)",
                color: active ? "#c4b5fd" : "var(--text-dim)",
                background: active ? "rgba(107,33,168,0.3)" : "transparent",
              }}>
              {t}
            </button>
          );
        })}
      </div>

      {/* Dynamic column filters */}
      {showColumnFilters && (
        <div className="flex flex-col gap-2 mb-4 p-3 rounded-xl border"
          style={{ borderColor: "rgba(167,139,250,0.1)", background: "rgba(107,33,168,0.05)" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Column filters</span>
            {hasActiveFilters && (
              <button onClick={() => { setDesignFilter(new Set()); setStageFilter(new Set()); setLevelFilter(new Set()); setDiffFilter(new Set()); setDivFilter(new Set()); }}
                className="text-xs text-pink-400 hover:text-pink-300 transition-colors">
                Clear all ✕
              </button>
            )}
          </div>
          {visibleCols.has("design") && (
            <ChipFilter label="Study Design" options={ALL_DESIGNS} active={designFilter}
              onToggle={(v) => setDesignFilter((p) => toggle(p, v))} styleMap={DESIGN_STYLE} />
          )}
          {visibleCols.has("life_stage") && (
            <ChipFilter label="Life Stage" options={ALL_STAGES} active={stageFilter}
              onToggle={(v) => setStageFilter((p) => toggle(p, v))} />
          )}
          {visibleCols.has("data_level") && (
            <ChipFilter label="Data Level" options={ALL_LEVELS} active={levelFilter}
              onToggle={(v) => setLevelFilter((p) => toggle(p, v))} />
          )}
          {visibleCols.has("access_difficulty") && (
            <ChipFilter label="Access Difficulty" options={ALL_DIFFICULTY} active={diffFilter}
              onToggle={(v) => setDiffFilter((p) => toggle(p, v))} styleMap={DIFFICULTY_STYLE} />
          )}
          {visibleCols.has("ethnic_diversity") && (
            <ChipFilter label="Ethnic Diversity" options={DIVERSITY_OPTIONS} active={divFilter}
              onToggle={(v) => setDivFilter((p) => toggle(p, v))} styleMap={DIVERSITY_STYLE} />
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <table className="data-table">
          <thead>
            <tr>
              {selectedIds !== undefined && (
                <th className="w-8">
                  <input type="checkbox"
                    className="accent-violet-500"
                    checked={filtered.length > 0 && filtered.every((d) => selectedIds.has(d.id))}
                    onChange={(e) => {
                      const next = new Set(selectedIds);
                      filtered.forEach((d) => e.target.checked ? next.add(d.id) : next.delete(d.id));
                      onSelectionChange?.(next);
                    }}
                  />
                </th>
              )}
              <th><button onClick={() => toggleSort("name")} className="flex items-center">Dataset <SortIcon k="name" /></button></th>
              <th><button onClick={() => toggleSort("year")} className="flex items-center">Year <SortIcon k="year" /></button></th>
              <th>Data Types</th>
              <th>Access</th>
              <th><button onClick={() => toggleSort("n_subjects")} className="flex items-center">N <SortIcon k="n_subjects" /></button></th>
              <th>Origin</th>
              {visibleCols.has("design")            && <th>Study Design</th>}
              {visibleCols.has("data_level")        && <th>Data Level</th>}
              {visibleCols.has("life_stage")        && <th>Life Stage</th>}
              {visibleCols.has("age")               && <th>Age at Entry</th>}
              {visibleCols.has("access_difficulty") && <th>Access Difficulty</th>}
              {visibleCols.has("ethnic_diversity")  && <th>Ethnic Diversity</th>}
              {visibleCols.has("percent_women")     && <th>% Women</th>}
              {visibleCols.has("womens_health")     && <th>Women&apos;s Health</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => {
              const divLevel = diversityLevel(d);
              const verified = d.curation_status?.toLowerCase() === "verified";
              return (
                <Fragment key={d.id}>
                  <tr onClick={() => setExpanded(expanded === d.id ? null : d.id)} className="cursor-pointer">
                    {selectedIds !== undefined && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="accent-violet-500"
                          checked={selectedIds.has(d.id)}
                          onChange={(e) => {
                            const next = new Set(selectedIds);
                            if (e.target.checked) next.add(d.id); else next.delete(d.id);
                            onSelectionChange?.(next);
                          }}
                        />
                      </td>
                    )}
                    <td>
                      <div className="font-semibold text-violet-300 flex items-center gap-1.5">
                        {d.name}
                        {verified && (
                          <span title={`Verified${d.curated_on ? ` on ${d.curated_on}` : ""}`} className="text-xs" style={{ color: "#22c55e" }}>✓</span>
                        )}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5 max-w-xs truncate">{d.full_name}</div>
                    </td>
                    <td className="text-gray-300">{d.year ?? "—"}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {d.data_types.slice(0, 4).map((t) => (
                          <span key={t} className="type-pill px-1.5 py-0.5 rounded text-xs"
                            style={{ background: "rgba(107,33,168,0.25)", color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.15)" }}>
                            {t}
                          </span>
                        ))}
                        {d.data_types.length > 4 && <span className="text-xs text-gray-500">+{d.data_types.length - 4}</span>}
                      </div>
                    </td>
                    <td><AccessBadge d={d} /></td>
                    <td className="text-gray-300 whitespace-nowrap" title={d.n_note || undefined}>
                      {d.n_subjects.toLocaleString("en-US")}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {d.origin.map((o) => <span key={o} className="text-xs text-gray-400">{o}</span>)}
                      </div>
                    </td>

                    {visibleCols.has("design") && (
                      <td>
                        {isKnown(d.design)
                          ? <Pill label={d.design} style={DESIGN_STYLE[d.design] ?? DESIGN_STYLE.unknown} />
                          : <Dash />}
                      </td>
                    )}
                    {visibleCols.has("data_level") && (
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {(d.data_level ?? []).filter(isKnown).length
                            ? d.data_level!.filter(isKnown).map((l) => <Pill key={l} label={l} style={LEVEL_STYLE} />)
                            : <Dash />}
                        </div>
                      </td>
                    )}
                    {visibleCols.has("life_stage") && (
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {(d.life_stage ?? []).filter(isKnown).length
                            ? d.life_stage!.filter(isKnown).map((s) => <Pill key={s} label={s} style={STAGE_STYLE} />)
                            : <Dash />}
                        </div>
                      </td>
                    )}
                    {visibleCols.has("age") && (
                      <td className="text-xs text-gray-300 whitespace-nowrap">
                        {isKnown(d.age_range_at_entry) || d.mean_age_baseline != null ? (
                          <div className="flex flex-col">
                            {isKnown(d.age_range_at_entry) && <span>{d.age_range_at_entry}</span>}
                            {d.mean_age_baseline != null && <span className="text-gray-500">mean {d.mean_age_baseline}</span>}
                          </div>
                        ) : <Dash />}
                      </td>
                    )}
                    {visibleCols.has("access_difficulty") && (
                      <td>
                        {isKnown(d.access_difficulty)
                          ? <Pill label={d.access_difficulty} style={DIFFICULTY_STYLE[d.access_difficulty] ?? DIFFICULTY_STYLE.unknown} />
                          : <Dash />}
                      </td>
                    )}
                    {visibleCols.has("ethnic_diversity") && (
                      <td>
                        <div className="flex flex-col gap-1 items-start">
                          {divLevel !== "unknown" ? <Pill label={divLevel} style={DIVERSITY_STYLE[divLevel]} /> : <Dash />}
                          {isKnown(d.ethnic_diversity_note) && (
                            <span className="text-xs text-gray-500 max-w-[200px] leading-tight">{d.ethnic_diversity_note}</span>
                          )}
                        </div>
                      </td>
                    )}
                    {visibleCols.has("percent_women") && (
                      <td className="text-xs text-gray-300 whitespace-nowrap">
                        {d.percent_women != null ? `${d.percent_women}%` : <Dash />}
                      </td>
                    )}
                    {visibleCols.has("womens_health") && (
                      <td className="text-xs text-gray-400 max-w-xs">
                        {isKnown(d.womens_health) ? d.womens_health : <Dash />}
                      </td>
                    )}
                  </tr>

                  {expanded === d.id && (
                    <tr>
                      <td colSpan={colCount} className="px-4 py-4 text-xs text-gray-400"
                        style={{ background: "rgba(107,33,168,0.08)" }}>
                        <div className="space-y-3 max-w-4xl">
                          {d.notes && (
                            <p><span className="font-medium text-violet-300">Notes: </span>{d.notes}</p>
                          )}

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-violet-300">Access:</span>
                            <AccessBadge d={d} />
                            {isLink(d.data_request_link) && <DetailLink href={d.data_request_link} primary>Request data ↗</DetailLink>}
                            {isLink(d.datasheet_link) && <DetailLink href={d.datasheet_link}>Datasheet / codebook ↗</DetailLink>}
                            <DetailLink href={d.url}>Official site ↗</DetailLink>
                            {d.doi && <DetailLink href={`https://doi.org/${d.doi}`}>doi:{d.doi} ↗</DetailLink>}
                          </div>
                          {isKnown(d.access_requirements) && (
                            <p className="leading-relaxed"><span className="font-medium text-violet-300">How to access: </span>{d.access_requirements}</p>
                          )}

                          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                              <p>
                                <span className="font-medium text-violet-300">Participants: </span>{participantLabel(d)}
                              </p>
                              {d.percent_women != null && (
                                <p>
                                  <span className="font-medium text-violet-300">Women: </span>{d.percent_women}%
                                  {isKnown(d.percent_women_source) && (
                                    <span className="text-gray-500"> ({<Linkify text={d.percent_women_source} />})</span>
                                  )}
                                </p>
                              )}
                              {(isKnown(d.age_range_at_entry) || d.mean_age_baseline != null) && (
                                <p>
                                  <span className="font-medium text-violet-300">Age at entry: </span>
                                  {[isKnown(d.age_range_at_entry) ? d.age_range_at_entry : null,
                                    d.mean_age_baseline != null ? `mean ${d.mean_age_baseline}` : null]
                                    .filter(Boolean).join(" · ")}
                                </p>
                              )}
                              {isKnown(d.ethnic_diversity_note) && (
                                <p>
                                  <span className="font-medium text-violet-300">Ethnic diversity: </span>
                                  {divLevel !== "unknown" && <span className="capitalize">{divLevel}. </span>}
                                  {d.ethnic_diversity_note}
                                </p>
                              )}
                          </div>
                          {isKnown(d.womens_health) && (
                            <p><span className="font-medium text-violet-300">Women&apos;s health data: </span>{d.womens_health}</p>
                          )}

                          <p className="text-gray-600">
                            {verified
                              ? `✓ Entry verified${d.curated_by ? ` by ${d.curated_by}` : ""}${d.curated_on ? ` on ${d.curated_on}` : ""}.`
                              : "This entry has not been curated yet."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">No datasets match your filters.</div>
      )}

      <p className="text-xs text-gray-600 mt-3">
        Click any row for access details, request links and notes. ✓ = verified entry.{" "}
        <a href="https://github.com/KahinaBch/ad-dataset-catalogue" target="_blank" rel="noopener noreferrer"
          className="text-violet-500 underline">
          Contribute a missing dataset via GitHub PR
        </a>.
      </p>
    </div>
  );
}
