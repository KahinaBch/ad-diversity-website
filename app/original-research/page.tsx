const repos = [
  {
    number: "01",
    title: "AD Dataset Open Catalogue",
    subtitle: "Open documentation of all available AD datasets",
    repo: "ad-dataset-catalogue",
    color: "#7C3AED",
    icon: "🗃️",
    description: "A community-maintained, open-access catalogue of all publicly documented datasets available for Alzheimer's disease research. Structured as a GitHub repository with CSV/JSON data files, schema documentation, and contribution guidelines.",
    features: [
      "Neuroimaging & genetics datasets (ADNI, OASIS, UK Biobank, AIBL…)",
      "Proteomics, transcriptomics, exposomics datasets",
      "Filterable by data type, access level, geographic origin",
      "Contribution via Pull Request — designed for collaborative extension",
      "Versioned with full Git history for transparency",
    ],
    status: "active",
    link: "https://github.com/KahinaBch/ad-dataset-catalogue",
  },
  {
    number: "02",
    title: "Atlases & Harmonisation Catalogue",
    subtitle: "Open documentation of shared atlases and harmonisation pipelines",
    repo: "ad-atlases-harmonisation",
    color: "#BE185D",
    icon: "🗺️",
    description: "A structured catalogue of neuroimaging atlases used in AD research and harmonisation pipelines for multi-site data integration. Content is being populated with input from domain experts.",
    features: [
      "Neuroimaging atlases (MNI, AAL, Desikan-Killiany, and others — to be confirmed)",
      "Harmonisation pipelines (ComBat, NeuroHarmonize — details to be provided)",
      "Structured CSV data files with metadata and links",
      "Contribution-ready GitHub format",
    ],
    status: "skeleton",
    link: "https://github.com/KahinaBch/ad-atlases-harmonisation",
  },
  {
    number: "03",
    title: "Reproducibility Audit",
    subtitle: "Investigating open-science practices in Alzheimer's & Dementia journal",
    repo: "ad-reproducibility-audit",
    color: "#1E3A8A",
    icon: "⚗️",
    description: "An original reproducibility study of papers published in Alzheimer's & Dementia (Wiley), adapted from the MRM reproducibility pipeline (Boudreau et al.). Detects code/data sharing rates, geographic origin of first authors, and — uniquely — sex-specific keyword usage.",
    features: [
      "Crossref DOI retrieval for Alzheimer's & Dementia papers",
      "Keyword scanning for open-science indicators (GitHub, OSF, Zenodo…)",
      "First-author country extraction from PDF affiliations",
      "Sex-specific analysis keyword detection ('sex-stratified', 'sex differences'…)",
      "Statistical analysis + publication-ready figures",
      "DISCLAIMER: Results are specific to one journal and one time window",
    ],
    status: "active",
    link: "https://github.com/KahinaBch/ad-reproducibility-audit",
    disclaimer: true,
  },
];

export default function OriginalResearch() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#0E7490" }}>
          Original Research
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 mb-3">
          Reproducible Science
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
          Three independent, reproducible sub-repositories — each constituting an original research contribution
          in open-science, data documentation, and methodological transparency.
        </p>
        <div className="section-divider mt-6" />
      </div>

      {/* Repos */}
      <div className="space-y-8">
        {repos.map((repo) => (
          <div key={repo.number} className="glass-card rounded-2xl overflow-hidden border"
            style={{ borderColor: repo.color + "30" }}>
            {/* Card header */}
            <div className="px-6 py-4 flex items-start justify-between gap-4"
              style={{ background: `${repo.color}12`, borderBottom: `1px solid ${repo.color}20` }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl shrink-0 mt-1">{repo.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold opacity-60" style={{ color: repo.color }}>
                      Sub-repo {repo.number}
                    </span>
                    <span className={`badge ${repo.status === "active" ? "badge-open" : "badge-partial"}`}>
                      {repo.status === "active" ? "Active" : "In progress"}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-100">{repo.title}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{repo.subtitle}</p>
                </div>
              </div>
              <a
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 border transition-all hover:opacity-80"
                style={{ borderColor: repo.color + "50", color: repo.color, background: repo.color + "10" }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>

            {/* Card body */}
            <div className="px-6 py-5">
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{repo.description}</p>
              <ul className="space-y-2">
                {repo.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <span style={{ color: repo.color }} className="mt-0.5 shrink-0">▸</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Disclaimer for repo 03 */}
              {repo.disclaimer && (
                <div className="mt-5 p-4 rounded-lg border text-xs text-gray-400 leading-relaxed"
                  style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.2)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 font-bold">⚠ DISCLAIMER</span>
                  </div>
                  <p>
                    This analysis is specific to one journal (<em>Alzheimer&apos;s & Dementia</em>), one time window,
                    and chosen keywords. Results are therefore not generalisable to the broader AD literature.
                    However, the pipeline is fully reproducible and open-source — it can be extended to other
                    journals, years, or keyword sets. We encourage replication and adaptation by the community.
                  </p>
                  <p className="mt-2 text-gray-500">
                    Note: Unlike the MRM study it is adapted from, this analysis does not include author gender.
                    It uniquely adds sex-specific keyword detection as a proxy for sex-stratified analyses.
                  </p>
                </div>
              )}
            </div>

            {/* Footer with repo path */}
            <div className="px-6 py-3 text-xs text-gray-600 font-mono border-t"
              style={{ borderColor: repo.color + "15", background: "rgba(0,0,0,0.2)" }}>
              github.com/KahinaBch/{repo.repo}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <a href="/part2/openscience" className="text-sm text-gray-400 hover:text-violet-300 transition-colors">
          ← Open Science
        </a>
        <a href="/" className="btn-glow text-sm">
          Back to Home →
        </a>
      </div>
    </div>
  );
}
