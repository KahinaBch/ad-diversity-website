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

// ─── Misc ─────────────────────────────────────────────────────────────────────
export function participantLabel(d: Pick<Dataset, "n_note" | "n_subjects">): string {
  return d.n_note || d.n_subjects.toLocaleString("en-US");
}

/** True for a usable http(s) link. */
export function isLink(v: string | null | undefined): v is string {
  return !!v && /^https?:\/\//i.test(v.trim());
}
