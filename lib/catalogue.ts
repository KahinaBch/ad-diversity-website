// Shared types and helpers for the dataset catalogue
// (public/data/datasets.json, synced from KahinaBch/ad-dataset-catalogue).

export interface Dataset {
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
  // Curated fields (may be absent on entries not yet curated)
  access_level?: string;
  data_request_link?: string | null;
  datasheet_link?: string | null;
  access_requirements?: string | null;
  access_difficulty?: string;
  design?: string;
  data_level?: string[];
  life_stage?: string[];
  age_range_at_entry?: string | null;
  mean_age_baseline?: number | null;
  ethnic_diversity?: string;
  ethnic_diversity_note?: string | null;
  percent_women?: number | null;
  percent_women_source?: string | null;
  womens_health?: string | null;
  curation_status?: string;
  curated_on?: string;
  curated_by?: string;
}

// ─── Access level ─────────────────────────────────────────────────────────────
export type AccessLevel = "open" | "easy" | "extensive";

export const ACCESS_LEVELS: AccessLevel[] = ["open", "easy", "extensive"];

export const ACCESS_LABEL: Record<AccessLevel, string> = {
  open: "Open",
  easy: "Application (Easy)",
  extensive: "Application (Extensive)",
};

export const ACCESS_COLOR: Record<AccessLevel, string> = {
  open: "#22c55e",
  easy: "#eab308",
  extensive: "#ef4444",
};

/** Curated `access_level` when present, otherwise derived from the legacy `access` field. */
export function accessLevel(d: Pick<Dataset, "access" | "access_level">): AccessLevel {
  const lvl = (d.access_level ?? "").toLowerCase();
  if (lvl === "open") return "open";
  if (lvl.includes("easy")) return "easy";
  if (lvl.includes("extensive") || lvl.includes("difficult")) return "extensive";
  return d.access === "open" ? "open" : d.access === "partial" ? "easy" : "extensive";
}

// ─── Ethnic diversity ─────────────────────────────────────────────────────────
export type DiversityLevel = "high" | "medium" | "low" | "unknown";

export const DIVERSITY_LEVELS: DiversityLevel[] = ["high", "medium", "low", "unknown"];

export const DIVERSITY_COLOR: Record<DiversityLevel, string> = {
  high: "#22c55e",
  medium: "#eab308",
  low: "#ef4444",
  unknown: "#6b7280",
};

export function diversityLevel(d: Pick<Dataset, "ethnic_diversity">): DiversityLevel {
  const t = (d.ethnic_diversity ?? "").toLowerCase().trim();
  if (t.startsWith("very high") || t.startsWith("high")) return "high";
  if (t.startsWith("medium") || t.startsWith("moderate")) return "medium";
  if (t.startsWith("low")) return "low";
  return "unknown";
}

// ─── World regions (world map) ────────────────────────────────────────────────
export interface RegionDef {
  id: string;
  name: string;
  centroid: [number, number]; // [lon, lat] of the bubble
  color: string;
  countries: string[];        // values as written in the catalogue's `origin`
}

export const REGIONS: RegionDef[] = [
  {
    id: "north-america", name: "North America", centroid: [-95, 48], color: "#7C3AED",
    countries: ["USA", "Canada"],
  },
  {
    id: "europe", name: "Europe", centroid: [10, 52], color: "#BE185D",
    countries: [
      "UK", "Ireland", "France", "Germany", "Netherlands", "Belgium", "Luxembourg", "Switzerland",
      "Austria", "Spain", "Portugal", "Italy", "Greece", "Malta", "Cyprus", "Sweden", "Norway",
      "Finland", "Denmark", "Iceland", "Estonia", "Latvia", "Lithuania", "Poland", "Czech Republic",
      "Czechia", "Slovakia", "Hungary", "Slovenia", "Croatia", "Serbia", "Romania", "Bulgaria",
      "Ukraine", "Russia",
    ],
  },
  {
    id: "asia-pacific", name: "Asia-Pacific", centroid: [130, 25], color: "#1E3A8A",
    countries: [
      "Australia", "New Zealand", "Japan", "South Korea", "China", "Taiwan", "Hong Kong",
      "Singapore", "Vietnam", "Thailand", "Malaysia", "Indonesia", "Philippines",
    ],
  },
  {
    id: "latin-america", name: "Latin America", centroid: [-65, -15], color: "#0E7490",
    countries: [
      "Mexico", "Guatemala", "Costa Rica", "Panama", "Cuba", "Dominican Republic", "Puerto Rico",
      "Colombia", "Venezuela", "Ecuador", "Peru", "Bolivia", "Brazil", "Chile", "Argentina",
      "Uruguay", "Paraguay",
    ],
  },
  {
    id: "africa", name: "Africa", centroid: [20, 5], color: "#065F46",
    countries: [
      "Ghana", "Nigeria", "Uganda", "Tanzania", "Kenya", "Ethiopia", "Rwanda", "Cameroon",
      "Senegal", "South Africa", "Egypt", "Morocco", "Tunisia", "Zambia", "Zimbabwe", "Malawi",
      "Botswana", "Mozambique",
    ],
  },
  {
    id: "middle-east-south-asia", name: "Middle East & South Asia", centroid: [68, 22], color: "#92400E",
    countries: [
      "India", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Iran", "Iraq", "Israel", "Lebanon",
      "Jordan", "Turkey", "Saudi Arabia", "United Arab Emirates", "UAE", "Qatar",
    ],
  },
];

const REGION_BY_COUNTRY = new Map(
  REGIONS.flatMap((r) => r.countries.map((c) => [c.toLowerCase(), r] as const)),
);

export interface RegionSummary extends RegionDef {
  datasets: Dataset[];
}

/**
 * Groups datasets by world region using their `origin` countries.
 * A multi-country dataset is counted once in every region it recruits from.
 * Countries missing from REGIONS are returned in `unmapped`.
 */
export function groupByRegion(datasets: Dataset[]): { regions: RegionSummary[]; unmapped: string[] } {
  const byRegion = new Map<string, Set<Dataset>>();
  const unmapped = new Set<string>();
  for (const d of datasets) {
    for (const country of d.origin) {
      const region = REGION_BY_COUNTRY.get(country.trim().toLowerCase());
      if (!region) { unmapped.add(country); continue; }
      if (!byRegion.has(region.id)) byRegion.set(region.id, new Set());
      byRegion.get(region.id)!.add(d);
    }
  }
  const regions = REGIONS
    .map((r) => ({ ...r, datasets: [...(byRegion.get(r.id) ?? [])].sort((a, b) => a.name.localeCompare(b.name)) }))
    .filter((r) => r.datasets.length > 0);
  return { regions, unmapped: [...unmapped].sort() };
}

// ─── Misc ─────────────────────────────────────────────────────────────────────
export function participantLabel(d: Pick<Dataset, "n_note" | "n_subjects">): string {
  return d.n_note || d.n_subjects.toLocaleString("en-US");
}

/** True for a usable http(s) link. */
export function isLink(v: string | null | undefined): v is string {
  return !!v && /^https?:\/\//i.test(v.trim());
}
