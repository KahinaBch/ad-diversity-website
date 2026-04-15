const repos = [
  {
    number: "01",
    title: "AD Dataset Open Catalogue",
    subtitle: "Open documentation of all available AD datasets",
    repo: "ad-dataset-catalogue",
    color: "#7C3AED",
    description: "A community-maintained, open-access catalogue of all publicly documented datasets available for Alzheimer's disease research. Structured as a GitHub repository with CSV/JSON data files, schema documentation, and contribution guidelines.",
    takeaway: "AD research is fragmented across dozens of independently managed datasets. Without a common catalogue, researchers waste time finding and vetting sources — and consistently miss datasets from underrepresented regions.",
    features: [
      "31 documented datasets spanning neuroimaging, genetics, proteomics, transcriptomics, exposomics",
      "Metadata including access level, participant origin, data types, year, and DOIs",
      "Filterable by data type, access level, and geographic origin",
      "Contribution via Pull Request — designed for collaborative, iterative extension",
      "Versioned with full Git history for auditability and reproducibility",
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
    description: "A structured catalogue of neuroimaging atlases used in AD research and harmonisation pipelines for multi-site data integration. Even when diverse datasets exist, they cannot be usefully combined without shared reference systems and batch-effect correction methods.",
    takeaway: "Multi-site neuroimaging studies — essential for studying diverse populations — are undermined by site-specific acquisition differences. Without harmonisation, what looks like a biological signal may be a scanner artefact. This catalogue documents the tools that make pooled analyses valid.",
    features: [
      "Neuroimaging atlases (parcellation schemes, spatial references — content being populated)",
      "Harmonisation pipelines for multi-site batch effect correction (details to be provided)",
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
    description: "An original reproducibility study of papers published in Alzheimer's & Dementia (Wiley), adapted from the MRM reproducibility pipeline (Boudreau et al.). The pipeline automatically screens full-text PDFs for indicators of open-science practice — and, uniquely, for sex-specific analysis.",
    takeaway: "Reproducibility is the foundation of cumulative science. If the methods and data underlying a published finding are not accessible, other researchers cannot build on them, replicate them, or adapt them to diverse populations. This audit provides the first systematic baseline for open-science practices in the flagship AD journal.",
    status: "active",
    link: "https://github.com/KahinaBch/ad-reproducibility-audit",
    disclaimer: true,
  },
];

const pipelineSteps = [
  {
    step: "1",
    title: "DOI retrieval",
    desc: "Query the Crossref API for all journal articles published in Alzheimer's & Dementia for a target year, collecting DOIs and metadata.",
    color: "#7C3AED",
  },
  {
    step: "2",
    title: "PDF sorting",
    desc: "Parse each PDF to extract the acceptance date, then sort articles into month-by-month folders matching the original OSF workbook format.",
    color: "#7C3AED",
  },
  {
    step: "3",
    title: "Open-science keyword scan",
    desc: "Scan each PDF page-by-page (PyPDF2) for keywords indicating code or data sharing: 'github', 'zenodo', 'osf', 'dryad', 'openly available', 'code available', 'data available', etc.",
    color: "#BE185D",
    note: "Detection method: keyword presence in full text. A match flags the paper for manual review — it does not automatically confirm sharing.",
  },
  {
    step: "4",
    title: "Manual curation",
    desc: "Human validation of each keyword match: Is this a genuine sharing statement or a false positive? Does the linked repository actually contain the code/data described?",
    color: "#BE185D",
    note: "Essential step: automated keyword detection has a false-positive rate. Manual curation is required to distinguish 'code available upon request' (not open) from 'code at github.com/...' (genuinely open).",
  },
  {
    step: "5",
    title: "Sex-specific keyword scan (novel)",
    desc: "Scan full text for terms indicating sex-stratified analyses: 'sex-stratified', 'sex differences', 'gender-specific', 'sex as a biological variable', 'sex-disaggregated', 'female-specific', and related terms.",
    color: "#0E7490",
    note: "This step is not present in the original MRM pipeline. It detects papers that explicitly account for sex as a biological variable — a proxy measure for sex-inclusive science.",
  },
  {
    step: "6",
    title: "Country extraction",
    desc: "Extract first-author affiliation country from PDF text (pdfminer), using a curated alias dictionary and pycountry, to map the geographic origin of the research.",
    color: "#1E3A8A",
  },
  {
    step: "7",
    title: "Statistical analysis",
    desc: "Compute sharing rates (code, data, either), hosting platform breakdown (GitHub, OSF, Zenodo, Dryad…), sex-specific keyword prevalence, and country distributions. Chi-square tests assess statistical independence.",
    color: "#1E3A8A",
  },
  {
    step: "8",
    title: "Figures",
    desc: "Generate publication-ready figures: sharing rates by month, sex-keyword frequency, country distribution, and platform usage — using a purple/pink palette matching the site.",
    color: "#1E3A8A",
  },
];

const limitations = [
  {
    title: "Single journal",
    desc: "Results describe Alzheimer's & Dementia only and cannot be generalised to the broader AD literature, other dementia journals, or preprint servers.",
  },
  {
    title: "Keyword sensitivity",
    desc: "Papers that share code or data without using the expected terminology will be missed (false negatives). Papers that mention sharing without actually doing it will be flagged (false positives) — addressed by manual curation.",
  },
  {
    title: "Sex keywords are proxies",
    desc: "Detecting 'sex differences' in a paper does not confirm that a rigorous sex-stratified analysis was performed. It flags intent, not quality. A paper may mention sex as a demographic variable without stratifying results.",
  },
  {
    title: "PDF access",
    desc: "PDFs must be downloaded manually due to copyright. This limits automation and reproducibility for researchers without institutional access.",
  },
  {
    title: "Country attribution",
    desc: "Country is assigned to the first author's affiliation — not to where the research was conducted or the populations studied. A US-based researcher studying an African cohort would be attributed to the USA.",
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
          Three independent, reproducible sub-repositories — each constituting an original research contribution in open-science, data documentation, and methodological transparency.
        </p>

        {/* OVERALL TAKEAWAY */}
        <div className="mt-5 rounded-xl p-4 border-l-4" style={{ borderLeftColor: "#0E7490", background: "rgba(14,116,144,0.08)" }}>
          <p className="text-sm font-semibold text-teal-200">
            Why does this matter? Open science is not an administrative box to tick — it is the mechanism by which diverse, global AD research becomes cumulative. Code and data that are not shared cannot be verified, replicated, or adapted. This project provides a concrete, quantitative baseline for open-science practice in AD research, and a reproducible tool for tracking future progress.
          </p>
        </div>
        <div className="section-divider mt-6" />
      </div>

      {/* Repo cards */}
      <div className="space-y-8 mb-16">
        {repos.map((repo) => (
          <div key={repo.number} className="glass-card rounded-2xl overflow-hidden border"
            style={{ borderColor: repo.color + "30" }}>

            {/* Card header */}
            <div className="px-6 py-4 flex items-start justify-between gap-4"
              style={{ background: `${repo.color}12`, borderBottom: `1px solid ${repo.color}20` }}>
              <div className="flex items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold opacity-60" style={{ color: repo.color }}>Sub-repo {repo.number}</span>
                    <span className={`badge ${repo.status === "active" ? "badge-open" : "badge-partial"}`}>
                      {repo.status === "active" ? "Active" : "In progress"}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-100">{repo.title}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{repo.subtitle}</p>
                </div>
              </div>
              <a href={repo.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 border transition-all hover:opacity-80"
                style={{ borderColor: repo.color + "50", color: repo.color, background: repo.color + "10" }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>

            {/* Card body */}
            <div className="px-6 py-5">
              {/* So what */}
              <div className="mb-4 p-3 rounded-lg text-xs text-gray-300 leading-relaxed italic"
                style={{ background: repo.color + "08", borderLeft: `3px solid ${repo.color}40` }}>
                <span className="font-semibold not-italic" style={{ color: repo.color }}>Why this matters: </span>
                {repo.takeaway}
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-4">{repo.description}</p>

              {repo.features && (
                <ul className="space-y-2 mb-4">
                  {repo.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                      <span style={{ color: repo.color }} className="mt-0.5 shrink-0">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="px-6 py-3 text-xs text-gray-600 font-mono border-t"
              style={{ borderColor: repo.color + "15", background: "rgba(0,0,0,0.2)" }}>
              github.com/KahinaBch/{repo.repo}
            </div>
          </div>
        ))}
      </div>

      {/* ── Pipeline deep-dive ────────────────────────────────────────────── */}
      <div className="section-divider mb-12" />

      <section>
        <h2 className="text-xl font-bold text-gray-200 mb-2">
          Inside the Reproducibility Pipeline
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          Sub-repo 03 — <em>Alzheimer&apos;s & Dementia</em> (Wiley) · Adapted from Boudreau et al. (MRM)
        </p>

        {/* Definition of reproducibility */}
        <div className="glass-card rounded-xl p-5 border mb-8" style={{ borderColor: "rgba(30,58,138,0.3)" }}>
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">What do we mean by &quot;reproducibility&quot;?</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            In this study, <strong className="text-gray-100">reproducibility</strong> refers to computational reproducibility: the ability of an independent researcher to re-run the analyses underlying a published paper and obtain the same results. This requires that the authors share their code (the analytical scripts), their data (or a public equivalent), and sufficient documentation. We use the <strong className="text-gray-100">presence of open-science indicators in the published paper</strong> — links to GitHub repositories, data availability statements, or deposits on OSF/Zenodo/Dryad — as a proxy measure for this.
          </p>
        </div>

        {/* Pipeline steps */}
        <h3 className="text-base font-bold text-gray-300 mb-4">Pipeline steps</h3>
        <div className="space-y-3 mb-10">
          {pipelineSteps.map((s) => (
            <div key={s.step} className="glass-card rounded-xl p-4 border flex gap-4"
              style={{ borderColor: s.color + "25" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: s.color }}>
                {s.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-200 mb-1">{s.title}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                {s.note && (
                  <p className="text-xs mt-2 italic leading-relaxed" style={{ color: s.color }}>
                    ⚠ {s.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How code detection works — explainer */}
        <div className="glass-card rounded-xl p-6 border mb-8" style={{ borderColor: "rgba(14,116,144,0.3)" }}>
          <h3 className="text-base font-bold text-teal-300 mb-3">How code and data availability is detected</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            The pipeline uses <strong className="text-gray-100">page-by-page keyword scanning</strong> of the full PDF text (via PyPDF2). For each paper, it searches for a predefined vocabulary of open-science indicators. Scanning stops at the first match per keyword to reduce false positives from author-name mentions. The keywords span three categories:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {[
              { label: "Platform names", examples: "'github', 'gitlab', 'osf', 'zenodo', 'dryad', 'figshare'" },
              { label: "Sharing statements", examples: "'code available', 'data available', 'openly available', 'publicly available', 'shared', 'repository'" },
              { label: "Tool/format indicators", examples: "'jupyter', 'notebook', 'open source', 'released', 'supplementary code'" },
            ].map((c) => (
              <div key={c.label} className="rounded-lg p-3 text-xs" style={{ background: "rgba(14,116,144,0.1)", border: "1px solid rgba(14,116,144,0.2)" }}>
                <div className="font-semibold text-teal-300 mb-1">{c.label}</div>
                <div className="text-gray-400 italic">{c.examples}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            A keyword match flags the paper for manual curation (Step 4), which is the critical human validation step. Only after curation is a paper classified as &quot;shared code&quot; or &quot;shared data&quot;.
          </p>
        </div>

        {/* Limitations */}
        <div className="glass-card rounded-xl p-6 border mb-4" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-base">⚠</span>
            <h3 className="text-base font-bold text-gray-200">DISCLAIMER — Scope and limitations</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            This analysis is intentionally narrow in scope. Its strength is that it is <strong className="text-gray-200">reproducible, transparent, and extendable</strong> — the pipeline can be applied to any journal, any year, and any keyword set. But its results should be interpreted with the following limitations in mind:
          </p>
          <div className="space-y-3">
            {limitations.map((l) => (
              <div key={l.title} className="flex gap-3 text-xs">
                <div className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: "#EF4444" }} />
                <div>
                  <span className="font-semibold text-red-300">{l.title}: </span>
                  <span className="text-gray-400">{l.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <a href="/ad-diversity-website/part2/openscience" className="text-sm text-gray-400 hover:text-violet-300 transition-colors">
          ← Open Science
        </a>
        <a href="/ad-diversity-website/" className="btn-glow text-sm">
          Back to Home →
        </a>
      </div>
    </div>
  );
}
