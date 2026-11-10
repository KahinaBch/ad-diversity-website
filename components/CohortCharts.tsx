"use client";
import {
  type Dataset,
  ACCESS_LEVELS, ACCESS_LABEL, ACCESS_COLOR,
  DIVERSITY_LEVELS, DIVERSITY_COLOR,
  accessLevel, diversityLevel,
} from "@/lib/catalogue";

const DESIGN_COLOR: Record<string, string> = {
  "longitudinal": "#a78bfa", "cross-sectional": "#93c5fd",
  "both": "#f9a8d4", "unknown": "#6b7280",
};

const STAGE_COLOR: Record<string, string> = {
  "childhood": "#f9a8d4", "early adulthood": "#c4b5fd",
  "midlife": "#a78bfa", "late life": "#7c3aed",
};

// ─── SVG Donut Chart ───────────────────────────────────────────────────────────
function DonutChart({
  data, title, note,
}: {
  data: { label: string; value: number; color: string }[];
  title: string;
  note?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;

  const cx = 70, cy = 70, R = 56, r = 32;
  let angle = -Math.PI / 2;

  const slices = data.map((d) => {
    const start = angle;
    const sweep = (d.value / total) * 2 * Math.PI;
    angle += sweep;
    return { ...d, start, end: angle, sweep };
  });

  function arcPath(start: number, end: number, outer: number, inner: number) {
    if (end - start >= 2 * Math.PI - 0.001) {
      return [
        `M ${cx} ${cy - outer}`,
        `A ${outer} ${outer} 0 1 1 ${cx - 0.01} ${cy - outer} Z`,
      ].join(" ");
    }
    const cos = Math.cos, sin = Math.sin;
    const [x1, y1] = [cx + outer * cos(start), cy + outer * sin(start)];
    const [x2, y2] = [cx + outer * cos(end),   cy + outer * sin(end)];
    const [x3, y3] = [cx + inner * cos(end),   cy + inner * sin(end)];
    const [x4, y4] = [cx + inner * cos(start), cy + inner * sin(start)];
    const large = end - start > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${outer} ${outer} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${inner} ${inner} 0 ${large} 0 ${x4} ${y4} Z`;
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</p>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 140 140" width={120} height={120} className="shrink-0">
          {slices.map((s, i) => (
            <path key={i} d={arcPath(s.start, s.end, R, r)} fill={s.color} opacity={0.88}>
              <title>{s.label}: {s.value} ({Math.round((s.value / total) * 100)}%)</title>
            </path>
          ))}
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{total}</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8"  fill="var(--text-dim)">cohorts</text>
        </svg>
        <ul className="space-y-1.5 flex-1 min-w-0">
          {slices.filter(s => s.value > 0).map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                <span className="text-gray-300 truncate capitalize">{s.label}</span>
              </span>
              <span className="text-gray-500 shrink-0">{s.value} ({Math.round((s.value / total) * 100)}%)</span>
            </li>
          ))}
        </ul>
      </div>
      {note && <p className="text-xs text-gray-600 mt-2 italic">{note}</p>}
    </div>
  );
}

// ─── Horizontal Bar Chart ─────────────────────────────────────────────────────
function BarChart({
  data, title, note, unit = "",
}: {
  data: { label: string; value: number; color: string; sub?: string }[];
  title: string;
  note?: string;
  unit?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="glass-card rounded-xl p-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</p>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-gray-300 truncate max-w-[140px]">{d.label}</span>
              <span className="text-gray-500 shrink-0 ml-2">
                {d.value.toLocaleString()}{unit}
                {d.sub && <span className="text-gray-600 ml-1">({d.sub})</span>}
              </span>
            </div>
            <div className="h-1.5 rounded-full w-full" style={{ background: "rgba(167,139,250,0.1)" }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(d.value / max) * 100}%`, background: d.color }}
              />
            </div>
          </div>
        ))}
      </div>
      {note && <p className="text-xs text-gray-600 mt-3 italic">{note}</p>}
    </div>
  );
}

// ─── Main CohortCharts Component ──────────────────────────────────────────────
export default function CohortCharts({ datasets }: { datasets: Dataset[] }) {
  if (datasets.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm glass-card rounded-xl">
        Select cohorts in the table above to visualise their demographic and descriptive overview.
      </div>
    );
  }

  // ── Aggregate stats ──────────────────────────────────────────────────
  const totalParticipants = datasets.reduce((s, d) => s + (d.n_subjects ?? 0), 0);
  const countries = new Set(datasets.flatMap((d) => d.origin)).size;

  // Participants bar (top 12 sorted)
  const participantBars = [...datasets]
    .filter((d) => d.n_subjects > 0)
    .sort((a, b) => b.n_subjects - a.n_subjects)
    .slice(0, 12)
    .map((d) => ({ label: d.name, value: d.n_subjects, color: "#7c3aed" }));

  // % Women bar (only cohorts with known data)
  const womenBars = datasets
    .filter((d): d is Dataset & { percent_women: number } => typeof d.percent_women === "number")
    .map((d) => ({
      label: d.name,
      value: d.percent_women,
      color: d.percent_women >= 60 ? "#f9a8d4" : d.percent_women >= 50 ? "#c4b5fd" : "#93c5fd",
    }))
    .sort((a, b) => b.value - a.value);

  // Diversity donut
  const diversityData = DIVERSITY_LEVELS.map((lvl) => ({
    label: lvl,
    value: datasets.filter((d) => diversityLevel(d) === lvl).length,
    color: DIVERSITY_COLOR[lvl],
  }));

  // Design donut
  const designCounts: Record<string, number> = {};
  datasets.forEach((d) => { const k = d.design ?? "unknown"; designCounts[k] = (designCounts[k] ?? 0) + 1; });
  const designData = Object.entries(designCounts)
    .map(([label, value]) => ({ label, value, color: DESIGN_COLOR[label] ?? "#6b7280" }));

  // Access donut
  const accessData = ACCESS_LEVELS.map((lvl) => ({
    label: ACCESS_LABEL[lvl],
    value: datasets.filter((d) => accessLevel(d) === lvl).length,
    color: ACCESS_COLOR[lvl],
  }));

  // Life stage donut
  const stageCounts: Record<string, number> = {};
  datasets.forEach((d) => (d.life_stage ?? []).forEach((s) => {
    stageCounts[s] = (stageCounts[s] ?? 0) + 1;
  }));
  const stageData = Object.entries(stageCounts)
    .map(([label, value]) => ({ label, value, color: STAGE_COLOR[label] ?? "#6b7280" }));

  return (
    <div>
      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Selected cohorts", value: datasets.length },
          { label: "Total participants", value: totalParticipants > 0 ? totalParticipants.toLocaleString() : "—" },
          { label: "Countries covered", value: countries },
          { label: "With sex data", value: womenBars.length },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-lg p-3 text-center">
            <div className="text-xl font-extrabold text-violet-300">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <DonutChart title="Ethnic Diversity Level" data={diversityData}
          note="Curated rating (low / medium / high) from the catalogue" />
        <DonutChart title="Study Design" data={designData} />
        <DonutChart title="Data Access" data={accessData} />
        {stageData.length > 0 && (
          <DonutChart title="Life Stage Coverage" data={stageData}
            note="A cohort may cover multiple stages" />
        )}
        {participantBars.length > 0 && (
          <div className="md:col-span-2">
            <BarChart title="Participants per Cohort" data={participantBars}
              note="Showing up to 12 cohorts. All of Us and UK Biobank dominate by sample size." />
          </div>
        )}
      </div>

      {womenBars.length > 0 && (
        <BarChart
          title={`% Women — ${womenBars.length} of ${datasets.length} selected cohorts have published sex data`}
          data={womenBars}
          unit="%"
          note="Curated values from the catalogue; some refer to a study subset (e.g. the MRI sample), see each dataset's details in the table for the source. Pink = ≥60%, purple = 50–59%, blue = <50%."
        />
      )}

      {womenBars.length === 0 && (
        <div className="glass-card rounded-xl p-4 text-sm text-gray-500 text-center">
          No sex distribution data available for the selected cohorts.
        </div>
      )}
    </div>
  );
}
