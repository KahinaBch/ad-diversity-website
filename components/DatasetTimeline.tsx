"use client";
import { useState } from "react";

interface TimelineEntry {
  year: number;
  name: string;
  description: string;
  significance: string;
  modality: string;
  color: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    year: 1958,
    name: "BLSA",
    description: "Baltimore Longitudinal Study of Aging, the longest-running scientific study of human aging in the United States.",
    significance: "Established the template for longitudinal aging research before AD was fully characterised.",
    modality: "Clinical / Cognitive",
    color: "#1E3A8A",
  },
  {
    year: 1979,
    name: "Knight ADRC",
    description: "Washington University Alzheimer Disease Research Center established, one of the original NIA ADRCs.",
    significance: "Pioneered deep clinical phenotyping and later became a hub for post-mortem multi-omics.",
    modality: "Clinical / Neuropathology",
    color: "#1E3A8A",
  },
  {
    year: 1992,
    name: "WHICAP",
    description: "Washington Heights–Inwood Columbia Aging Project, a community-based study with exceptional ethnic diversity.",
    significance: "First major AD cohort specifically designed to include Caribbean Hispanic and African American populations.",
    modality: "Clinical / Cognitive",
    color: "#BE185D",
  },
  {
    year: 1994,
    name: "ROSMAP",
    description: "Religious Orders Study and Memory and Aging Project: two parallel longitudinal studies with post-mortem brain donation.",
    significance: "Unique clinical-to-neuropathology design enabling multi-omics integration (proteomics, epigenomics, transcriptomics).",
    modality: "Multi-omics / Neuropathology",
    color: "#7C3AED",
  },
  {
    year: 1999,
    name: "NACC",
    description: "National Alzheimer's Coordinating Center, harmonising data across 34 US ADRCs.",
    significance: "Largest harmonised clinical–neuropathological database for AD in the USA.",
    modality: "Clinical / Genetics",
    color: "#1E3A8A",
  },
  {
    year: 2001,
    name: "WRAP",
    description: "Wisconsin Registry for Alzheimer's Prevention, enriched for parental history of AD.",
    significance: "Prevention-focused paradigm shift: studying at-risk individuals decades before symptom onset.",
    modality: "MRI / Cognitive",
    color: "#7C3AED",
  },
  {
    year: 2004,
    name: "ADNI",
    description: "Alzheimer's Disease Neuroimaging Initiative: public-private partnership to validate biomarkers.",
    significance: "Became the de-facto reference standard for AD neuroimaging and biomarker research. Spawned ADNI-GO, 2, 3, 4.",
    modality: "MRI / PET / CSF / Genetics",
    color: "#7C3AED",
  },
  {
    year: 2005,
    name: "AddNeuroMed",
    description: "First pan-European multi-site AD neuroimaging study, spanning 6 countries.",
    significance: "Demonstrated feasibility of multi-site European harmonisation. Led to ANMerge (fully open, 2021).",
    modality: "MRI / Blood / CSF",
    color: "#BE185D",
  },
  {
    year: 2006,
    name: "AIBL",
    description: "Australian Imaging, Biomarker & Lifestyle study, major Asia-Pacific cohort.",
    significance: "Extended AD research to the Southern Hemisphere; strong amyloid PET and lifestyle data.",
    modality: "MRI / PET / Lifestyle",
    color: "#0E7490",
  },
  {
    year: 2006,
    name: "UK Biobank",
    description: "Half-million participant UK biobank with imaging, genetics, proteomics, and exposomics.",
    significance: "Population-scale resource enabling GWAS at unprecedented scale; first exposomics integration.",
    modality: "MRI / Genetics / Proteomics / Exposomics",
    color: "#BE185D",
  },
  {
    year: 2011,
    name: "PREVENT-AD",
    description: "Canadian pre-symptomatic AD study targeting cognitively normal adults with family history.",
    significance: "First Canadian prevention cohort; enabled sex-stratified pre-symptomatic analyses.",
    modality: "MRI / PET / CSF",
    color: "#7C3AED",
  },
  {
    year: 2014,
    name: "A4 Study",
    description: "Anti-Amyloid Treatment in Asymptomatic Alzheimer's, screened 6,700+ for amyloid positivity.",
    significance: "First large-scale international prevention trial. Includes Japan, a rare non-Western site.",
    modality: "PET / MRI / Blood",
    color: "#7C3AED",
  },
  {
    year: 2015,
    name: "EPAD",
    description: "European Prevention of Alzheimer's Dementia: adaptive-design pan-European trial platform.",
    significance: "Established European infrastructure for prevention trials with harmonised multi-modal data.",
    modality: "MRI / PET / CSF / EEG",
    color: "#BE185D",
  },
  {
    year: 2015,
    name: "DELCODE",
    description: "DZNE-Longitudinal Cognitive Impairment and Dementia Study across 10 German sites.",
    significance: "Focused on subjective cognitive decline as earliest AD signal.",
    modality: "MRI / CSF / EEG",
    color: "#BE185D",
  },
  {
    year: 2016,
    name: "EMIF-AD",
    description: "European Medical Information Framework, harmonising existing European cohort data.",
    significance: "Demonstrated data harmonisation approach without new data collection; strong proteomics.",
    modality: "MRI / PET / Proteomics",
    color: "#BE185D",
  },
  {
    year: 2017,
    name: "LASI-DAD",
    description: "Longitudinal Aging Study in India: Diagnostic Assessment of Dementia.",
    significance: "Largest population-based dementia study from a LMIC; critical for underrepresented populations.",
    modality: "Clinical / Cognitive / Genetics",
    color: "#065F46",
  },
  {
    year: 2019,
    name: "OASIS-3",
    description: "Open Access Series of Imaging Studies (longitudinal): fully open access.",
    significance: "Rare example of fully open multi-modal AD data; amyloid + tau PET freely available.",
    modality: "MRI / PET / CSF",
    color: "#7C3AED",
  },
  {
    year: 2019,
    name: "ReDLat",
    description: "Latin American Network for Early-Onset Dementia, 5 countries.",
    significance: "First coordinated Latin American dementia research network. Includes Indigenous-descent populations.",
    modality: "MRI / Blood / Genetics",
    color: "#0E7490",
  },
  {
    year: 2021,
    name: "ANMerge",
    description: "Fully open harmonised release of AddNeuroMed via Synapse.",
    significance: "Model for retrospective open-science release of existing cohort data.",
    modality: "MRI / Blood / Genetics",
    color: "#BE185D",
  },
];

const MODALITY_COLORS: Record<string, string> = {
  "MRI / PET / CSF / Genetics": "#7C3AED",
  "Multi-omics / Neuropathology": "#7C3AED",
  "MRI / Cognitive": "#7C3AED",
};

export default function DatasetTimeline() {
  const [selected, setSelected] = useState<TimelineEntry | null>(null);

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs">
        {[
          { color: "#7C3AED", label: "North America" },
          { color: "#BE185D", label: "Europe" },
          { color: "#0E7490", label: "Asia-Pacific / Latin America" },
          { color: "#065F46", label: "LMIC" },
          { color: "#1E3A8A", label: "Multi-national" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
            <span className="text-gray-400">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-3 top-0 bottom-0 w-0.5"
          style={{ background: "linear-gradient(180deg, #7C3AED, #BE185D, #1E3A8A)" }}
        />

        <div className="space-y-1">
          {TIMELINE.map((entry, i) => (
            <div key={`${entry.year}-${entry.name}`} className="relative">
              {/* Dot */}
              <div
                className="absolute -left-5 timeline-dot cursor-pointer hover:scale-125 transition-transform"
                style={{ background: entry.color, borderColor: entry.color, boxShadow: `0 0 8px ${entry.color}60`, top: "14px" }}
                onClick={() => setSelected(selected?.name === entry.name ? null : entry)}
              />

              {/* Card */}
              <div
                className="glass-card rounded-lg p-3 mb-2 cursor-pointer hover:border-opacity-40 transition-all"
                style={{
                  borderColor: selected?.name === entry.name ? entry.color : "rgba(167,139,250,0.12)",
                  borderWidth: "1px",
                }}
                onClick={() => setSelected(selected?.name === entry.name ? null : entry)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className="text-sm font-bold shrink-0"
                      style={{ color: entry.color }}
                    >
                      {entry.year}
                    </span>
                    <div className="min-w-0">
                      <span className="font-semibold text-sm text-gray-200">{entry.name}</span>
                      <span className="text-xs text-gray-500 ml-2 hidden sm:inline">
                        {entry.modality}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-600 text-sm shrink-0">
                    {selected?.name === entry.name ? "▲" : "▼"}
                  </span>
                </div>

                {selected?.name === entry.name && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(167,139,250,0.1)" }}>
                    <p className="text-xs text-gray-300 mb-2">{entry.description}</p>
                    <div
                      className="flex items-start gap-2 p-2 rounded-lg text-xs"
                      style={{ background: `${entry.color}15` }}
                    >
                      <span style={{ color: entry.color }} className="font-semibold shrink-0">Significance:</span>
                      <span className="text-gray-300">{entry.significance}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        Click any entry to expand. Colour indicates geographic origin.
      </p>
    </div>
  );
}
