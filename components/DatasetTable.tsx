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
  data_level?: string[];
  womens_health?: string;
  access_difficulty?: string;
  life_stage?: string[];
  ethnic_diversity?: string;
  design?: string;
}

const ALL_TYPES = [
  "MRI", "PET", "CSF", "Blood", "Genetics", "Proteomics",
  "Cognitive", "Clinical", "Neuropathology", "Exposomics",
  "Epigenomics", "Transcriptomics", "Metabolomics", "Lifestyle", "EEG",
];

const ALL_DESIGNS   = ["longitudinal", "cross-sectional", "both"];
const ALL_STAGES    = ["childhood", "early adulthood", "midlife", "late life"];
const ALL_LEVELS    = ["raw", "preprocessed", "processed"];
const ALL_DIFFICULTY = ["easy", "moderate", "hard"];

const OPTIONAL_COLUMNS = [
  { key: "design",            label: "Study Design" },
  { key: "data_level",        label: "Data Level" },
  { key: "life_stage",        label: "Life Stage" },
  { key: "access_difficulty", label: "Access Difficulty" },
  { key: "ethnic_diversity",  label: "Ethnic Diversity" },
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

// Derive diversity level from free-text field
function diversityLevel(text: string): "very high" | "high" | "moderate" | "low" | "unknown" {
  const t = text.toLowerCase();
  if (t.startsWith("very high")) return "very high";
  if (t.startsWith("high"))      return "high";
  if (t.startsWith("moderate"))  return "moderate";
  if (t === "unknown")           return "unknown";
  return "low";
}

const DIVERSITY_STYLE: Record<string, PillStyle> = {
  "very high": { bg: "rgba(34,197,94,0.15)",  color: "#22c55e", border: "rgba(34,197,94,0.3)"  },
  high:        { bg: "rgba(132,204,22,0.12)", color: "#84cc16", border: "rgba(132,204,22,0.3)" },
  moderate:    { bg: "rgba(234,179,8,0.12)",  color: "#ca8a04", border: "rgba(234,179,8,0.3)"  },
  low:         { bg: "rgba(239,68,68,0.1)",   color: "#ef4444", border: "rgba(239,68,68,0.25)" },
  unknown:     { bg: "transparent",           color: "var(--text-dim)", border: "transparent"   },
};

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

export default function DatasetTable() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [search, setSearch]     = useState("");
  const [accessFilter, setAccessFilter] = useState("all");
  const [typeFilter, setTypeFilter]     = useState<Set<string>>(new Set());
  const [designFilter, setDesignFilter]     = useState<Set<string>>(new Set());
  const [stageFilter, setStageFilter]       = useState<Set<string>>(new Set());
  const [levelFilter, setLevelFilter]       = useState<Set<string>>(new Set());
  const [diffFilter, setDiffFilter]         = useState<Set<string>>(new Set());
  const [sortKey, setSortKey]   = useState<"year" | "name" | "n_subjects">("year");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [visibleCols, setVisibleCols] = useState<Set<OptionalColKey>>(new Set());
  const [showColMenu, setShowColMenu] = useState(false);

  const BASE = "/ad-diversity-website";

  useEffect(() => {
    fetch(`${BASE}/data/datasets.json`).then((r) => r.json()).then(setDatasets);
  }, [BASE]);

  function toggle<T>(set: Set<T>, val: T): Set<T> {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    return next;
  }

  const filtered = useMemo(() => {
    let d = [...datasets];
    if (search)
      d = d.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase()) ||
        x.full_name.toLowerCase().includes(search.toLowerCase()) ||
        x.origin.join(" ").toLowerCase().includes(search.toLowerCase())
      );
    if (accessFilter !== "all") d = d.filter((x) => x.access === accessFilter);
    if (typeFilter.size > 0)   d = d.filter((x) => [...typeFilter].every((t) => x.data_types.includes(t)));
    if (designFilter.size > 0) d = d.filter((x) => x.design && designFilter.has(x.design));
    if (stageFilter.size > 0)  d = d.filter((x) => x.life_stage && [...stageFilter].some((s) => x.life_stage!.includes(s)));
    if (levelFilter.size > 0)  d = d.filter((x) => x.data_level && [...levelFilter].every((l) => x.data_level!.includes(l)));
    if (diffFilter.size > 0)   d = d.filter((x) => x.access_difficulty && diffFilter.has(x.access_difficulty));
    d.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string")
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return d;
  }, [datasets, search, accessFilter, typeFilter, designFilter, stageFilter, levelFilter, diffFilter, sortKey, sortDir]);

  const toggleCol = (k: OptionalColKey) =>
    setVisibleCols((prev) => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; });

  const toggleSort = (key: typeof sortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ k }: { k: typeof sortKey }) =>
    sortKey === k
      ? <span className="ml-1 text-violet-400">{sortDir === "asc" ? "↑" : "↓"}</span>
      : <span className="ml-1 text-gray-600">↕</span>;

  const AccessBadge = ({ a }: { a: string }) => {
    const cls = a === "open" ? "badge-open" : a === "partial" ? "badge-partial" : "badge-restricted";
    const label = a === "open" ? "Open" : a === "partial" ? "Application" : "Restricted";
    return <span className={`badge ${cls}`}>{label}</span>;
  };

  const Pill = ({ label, style }: { label: string; style: PillStyle }) => (
    <span className="px-1.5 py-0.5 rounded text-xs whitespace-nowrap capitalize"
      style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
      {label}
    </span>
  );

  const hasActiveFilters = designFilter.size + stageFilter.size + levelFilter.size + diffFilter.size > 0;

  if (!datasets.length)
    return <div className="text-center py-16 text-violet-400 animate-pulse">Loading dataset catalogue…</div>;

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Datasets", value: datasets.length },
          { label: "Shown",          value: filtered.length },
          { label: "Open Access",    value: datasets.filter((d) => d.access === "open").length },
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
        <select value={accessFilter} onChange={(e) => setAccessFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm text-gray-200 border"
          style={{ background: "var(--bg-card)", borderColor: "rgba(167,139,250,0.2)" }}>
          <option value="all">All access</option>
          <option value="open">Open</option>
          <option value="partial">Application-based</option>
          <option value="restricted">Restricted</option>
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
      {(visibleCols.has("design") || visibleCols.has("life_stage") || visibleCols.has("data_level") || visibleCols.has("access_difficulty")) && (
        <div className="flex flex-col gap-2 mb-4 p-3 rounded-xl border"
          style={{ borderColor: "rgba(167,139,250,0.1)", background: "rgba(107,33,168,0.05)" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Column filters</span>
            {hasActiveFilters && (
              <button onClick={() => { setDesignFilter(new Set()); setStageFilter(new Set()); setLevelFilter(new Set()); setDiffFilter(new Set()); }}
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
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th><button onClick={() => toggleSort("name")} className="flex items-center">Dataset <SortIcon k="name" /></button></th>
              <th><button onClick={() => toggleSort("year")} className="flex items-center">Year <SortIcon k="year" /></button></th>
              <th>Data Types</th>
              <th>Access</th>
              <th><button onClick={() => toggleSort("n_subjects")} className="flex items-center">N <SortIcon k="n_subjects" /></button></th>
              <th>Origin</th>
              {visibleCols.has("design")            && <th>Study Design</th>}
              {visibleCols.has("data_level")        && <th>Data Level</th>}
              {visibleCols.has("life_stage")        && <th>Life Stage</th>}
              {visibleCols.has("access_difficulty") && <th>Access Difficulty</th>}
              {visibleCols.has("ethnic_diversity")  && <th>Ethnic Diversity</th>}
              {visibleCols.has("womens_health")     && <th>Women's Health</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => {
              const divLevel = diversityLevel(d.ethnic_diversity ?? "unknown");
              return (
                <>
                  <tr key={d.id} onClick={() => setExpanded(expanded === d.id ? null : d.id)} className="cursor-pointer">
                    <td>
                      <div className="font-semibold text-violet-300">{d.name}</div>
                      <div className="text-gray-500 text-xs mt-0.5 max-w-xs truncate">{d.full_name}</div>
                    </td>
                    <td className="text-gray-300">{d.year}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {d.data_types.slice(0, 4).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-xs"
                            style={{ background: "rgba(107,33,168,0.25)", color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.15)" }}>
                            {t}
                          </span>
                        ))}
                        {d.data_types.length > 4 && <span className="text-xs text-gray-500">+{d.data_types.length - 4}</span>}
                      </div>
                    </td>
                    <td><AccessBadge a={d.access} /></td>
                    <td className="text-gray-300 whitespace-nowrap">{d.n_note}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {d.origin.map((o) => <span key={o} className="text-xs text-gray-400">{o}</span>)}
                      </div>
                    </td>

                    {visibleCols.has("design") && (
                      <td>
                        {d.design && d.design !== "unknown"
                          ? <Pill label={d.design} style={DESIGN_STYLE[d.design] ?? DESIGN_STYLE.unknown} />
                          : <span className="text-xs text-gray-600">—</span>}
                      </td>
                    )}
                    {visibleCols.has("data_level") && (
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {(d.data_level ?? ["unknown"]).map((l) =>
                            l === "unknown"
                              ? <span key={l} className="text-xs text-gray-600">—</span>
                              : <Pill key={l} label={l} style={LEVEL_STYLE} />
                          )}
                        </div>
                      </td>
                    )}
                    {visibleCols.has("life_stage") && (
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {(d.life_stage ?? ["unknown"]).map((s) =>
                            s === "unknown"
                              ? <span key={s} className="text-xs text-gray-600">—</span>
                              : <Pill key={s} label={s} style={STAGE_STYLE} />
                          )}
                        </div>
                      </td>
                    )}
                    {visibleCols.has("access_difficulty") && (
                      <td>
                        {d.access_difficulty
                          ? <Pill label={d.access_difficulty} style={DIFFICULTY_STYLE[d.access_difficulty] ?? DIFFICULTY_STYLE.unknown} />
                          : <span className="text-xs text-gray-600">—</span>}
                      </td>
                    )}
                    {visibleCols.has("ethnic_diversity") && (
                      <td>
                        <div className="flex flex-col gap-1">
                          <Pill label={divLevel} style={DIVERSITY_STYLE[divLevel]} />
                          {d.ethnic_diversity && d.ethnic_diversity !== "unknown" && (
                            <span className="text-xs text-gray-500 max-w-[180px] leading-tight">{d.ethnic_diversity}</span>
                          )}
                        </div>
                      </td>
                    )}
                    {visibleCols.has("womens_health") && (
                      <td className="text-xs text-gray-400 max-w-xs">
                        {d.womens_health && d.womens_health !== "unknown"
                          ? d.womens_health
                          : <span className="text-gray-600">—</span>}
                      </td>
                    )}
                  </tr>

                  {expanded === d.id && (
                    <tr key={`${d.id}-exp`}>
                      <td colSpan={6 + visibleCols.size} className="px-4 py-3 text-xs text-gray-400 italic"
                        style={{ background: "rgba(107,33,168,0.08)" }}>
                        <span className="font-medium text-violet-300 not-italic">Notes: </span>
                        {d.notes}{" "}
                        <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-violet-400 underline ml-1">
                          Official site ↗
                        </a>
                        {d.doi && <span className="ml-2 text-gray-600 font-mono text-xs">doi:{d.doi}</span>}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">No datasets match your filters.</div>
      )}

      <p className="text-xs text-gray-600 mt-3">
        Click any row to expand details.{" "}
        <a href="https://github.com/KahinaBch/ad-dataset-catalogue" target="_blank" rel="noopener noreferrer"
          className="text-violet-500 underline">
          Contribute a missing dataset via GitHub PR
        </a>.
      </p>
    </div>
  );
}
