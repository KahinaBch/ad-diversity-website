"use client";

// Figures are served directly from the ad-reproducibility-audit GitHub repo
// so no file copy is needed — just push the plots to that repo.
const PLOTS_BASE =
  "https://raw.githubusercontent.com/KahinaBch/ad-reproducibility-audit/main/plots/2025";

// ── 2025 headline results from the pipeline run ──────────────────────────────
const results2025 = {
  pdfs: 913,
  openScienceMatch: { n: 810, pct: 88.7 },
  repoLinks: { n: 86, pct: 9.4, github: 80 },
  sexKeywords: { n: 233, pct: 25.5, mainFocus: 37, consideration: 196 },
  datasetMentions: { n: 482, pct: 52.8 },
  countryExtracted: { n: 905, pct: 99.1 },
  codeSharing: { n: 809, pct: 88.6 },
  dataSharing: { n: 27, pct: 3.0 },
  eitherSharing: { n: 810, pct: 88.7 },
  topDatasets: [
    { name: "ADNI", n: 175 },
    { name: "NACC", n: 136 },
    { name: "UK Biobank", n: 92 },
    { name: "MAPT", n: 72 },
    { name: "A4 Study", n: 41 },
  ],
  platforms: [
    { name: "GitHub", n: 80 },
    { name: "OSF", n: 4 },
    { name: "Zenodo", n: 2 },
  ],
};

// ── Sub-repos ────────────────────────────────────────────────────────────────
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
      "31 documented datasets spanning neuroimaging, genetics, proteomics, transcriptomics",
      "Metadata: access level, participant origin, data types, year, DOIs, official URLs",
      "Filterable by data type, access level, and geographic origin on the website",
      "Contribution via Pull Request — designed for collaborative, iterative extension",
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
      "Harmonisation pipelines for multi-site batch effect correction",
      "Structured CSV data files with metadata and links",
    ],
    status: "skeleton",
    link: "https://github.com/KahinaBch/ad-atlases-harmonisation",
  },
  {
    number: "03",
    title: "Reproducibility Audit",
    subtitle: "Investigating open-science practices in Alzheimer's & Dementia (2025 run complete)",
    repo: "ad-reproducibility-audit",
    color: "#1E3A8A",
    description: "An original reproducibility study of papers published in Alzheimer's & Dementia (Wiley), adapted from the MRM pipeline (Boudreau et al.). 913 full-text PDFs were manually downloaded and screened through an automated pipeline for open-science indicators and, uniquely, sex-specific keyword detection and dataset mention tracking.",
    takeaway: "Reproducibility is the foundation of cumulative science. If methods and data underlying a published finding are not accessible, other researchers cannot build on them — particularly for underrepresented populations where data are already scarce. This audit provides the first systematic baseline for open-science practices in the flagship AD journal.",
    status: "active",
    link: "https://github.com/KahinaBch/ad-reproducibility-audit",
  },
];

// ── Pipeline steps ───────────────────────────────────────────────────────────
const pipelineSteps = [
  { step: "1", title: "PDF collection (manual)", desc: "Full-text PDFs of Alzheimer's & Dementia articles were manually downloaded for the target year (2025). Automated bulk download is not possible due to copyright restrictions. 913 PDFs were collected and organised into month folders matching the publication acceptance date.", color: "#7C3AED", note: "Manual download is required for copyright compliance. This limits full automation but is the only legally sound approach when working with a paywalled journal." },
  { step: "2", title: "PDF sorting + workbook", desc: "Parse each PDF to extract acceptance date; sort into month folders. Build Excel workbook with one row per paper. 2025: 913 PDFs organised, one workbook row per article.", color: "#7C3AED" },
  { step: "3", title: "Open-science keyword scan", desc: "Scan each PDF for platform names (github, osf, zenodo, dryad, figshare), sharing statements (code available, data available, openly available), and tool indicators (jupyter, notebook, open source). Extracts repository links where present.", color: "#BE185D", note: "Hypothesis: if sharing practices are improving in the AD literature, we expect increasing rates over time — and GitHub to be the dominant platform. 2025: 88.7% keyword match, but only 9.4% with an actual repository link." },
  { step: "4", title: "Sex-specific keyword scan (NOVEL)", desc: "Scan full text for: sex-stratified, sex differences, gender-specific, sex-disaggregated, sex-based analysis, female-specific, APOE sex interaction, menopause, hormonal influence, stratified by sex. Classifies papers as 'sex-aware main focus' (keyword in title) or 'sex-aware consideration' (keyword in body only).", color: "#0E7490", note: "Hypothesis: the proportion of AD papers explicitly accounting for sex as a biological variable is low — in tension with the ~65% female disease burden and the NIH 'sex as a biological variable' mandate. This step quantifies that gap for the first time in a systematic, reproducible way." },
  { step: "4b", title: "Dataset mention scan", desc: "Scan PDF text for names of datasets from the AD Dataset Catalogue. Identifies which datasets are most frequently cited in published AD research — and, by extension, which populations are most studied.", color: "#0E7490", note: "Hypothesis: dataset usage will be dominated by a small number of North American/European cohorts (ADNI, NACC, UK Biobank), reflecting the geographic concentration of AD research and the limited visibility of datasets from underrepresented regions." },
  { step: "5", title: "Manual curation", desc: "Human validation of every keyword match: is this a genuine sharing statement or a false positive? Does the linked repository actually contain the code/data described? Validates False Positive?, Shared code?, Shared data? columns in the workbook.", color: "#BE185D", note: "Critical step: automated detection has a non-trivial false-positive rate. 'Available upon request' (not open) must be distinguished from 'code at github.com/...' (genuinely open)." },
  { step: "5b", title: "Author metadata + gender inference", desc: "Add first/last author names and inferred gender (via name-based APIs). Optional/exploratory. Enables analysis of gender representation in AD authorship — a dimension of research diversity distinct from sex-disaggregated analysis.", color: "#7C3AED" },
  { step: "6", title: "Country extraction", desc: "Extract first-author affiliation country from PDF text (pdfminer + pycountry). Maps the geographic origin of published AD research. 2025: 99.1% of papers successfully attributed to a country.", color: "#1E3A8A" },
  { step: "7", title: "Statistical analysis", desc: "Compute sharing rates, hosting platform breakdown, sex-keyword prevalence, country distributions, dataset citation frequencies. Scan logs augment workbook data to prevent undercounting.", color: "#1E3A8A" },
  { step: "8", title: "Publication-ready figures", desc: "Generate all output figures (percentage/proportion based; one plot per file). Results stored in plots/{year}/. Colour palette matches this website.", color: "#1E3A8A" },
];

// ── Figure specs — each illustrates one hypothesis ───────────────────────────
const figures = [
  {
    file: "fig3_country_distribution.png",
    title: "Geographic Origin of First Authors",
    hypothesis: "If AD research mirrors the global distribution of dementia burden, first-author affiliations should reflect a global spread. Instead, we expect to find that a small number of high-income countries dominate the publication record — creating a geographic mismatch between where dementia is worst and where it is studied.",
    finding: "The country distribution of first authors in Alzheimer's & Dementia (2025) reveals a strong concentration in North America and Europe, with minimal representation from Latin America, Africa, and South/Southeast Asia — despite these regions carrying a rapidly growing share of the global dementia burden.",
    relevance: "Geographic diversity in authorship is not merely symbolic. Researchers from affected regions bring context-specific expertise, community trust, and research questions that external teams miss. This figure provides a baseline for tracking progress toward geographic equity in AD research.",
    color: "#1E3A8A",
  },
  {
    file: "fig6_sex_aware_level_distribution.png",
    title: "Sex-Aware Level Distribution",
    hypothesis: "Despite women comprising ~65% of people with Alzheimer's disease, the proportion of papers that explicitly incorporate sex as a primary analytical variable (rather than a demographic covariate) is expected to be low. Papers will cluster in the 'sex-aware consideration' category — mentioning sex without stratifying analyses — with very few achieving 'sex-aware main focus' status.",
    finding: `Out of 913 papers scanned: ${results2025.sexKeywords.mainFocus} (${((results2025.sexKeywords.mainFocus/results2025.pdfs)*100).toFixed(1)}%) were classified as 'sex-aware main focus'; ${results2025.sexKeywords.consideration} (${((results2025.sexKeywords.consideration/results2025.pdfs)*100).toFixed(1)}%) as 'sex-aware consideration'; the remainder had no sex-specific keywords detected.`,
    relevance: "This distribution quantifies the gap between the biological reality — that sex profoundly shapes AD risk, onset, and progression — and the state of the published literature. It provides a concrete baseline against which future progress can be measured.",
    color: "#BE185D",
  },
  {
    file: "fig10_first_author_gender_distribution.png",
    title: "First-Author Gender Distribution",
    hypothesis: "Gender diversity in research leadership is a dimension of inclusion distinct from sex-disaggregated analysis. The proportion of women in first-author positions in the AD literature may not reflect the female-majority disease burden, and could be lower than the overall proportion of women in neuroscience.",
    finding: "Distribution of inferred first-author gender in Alzheimer's & Dementia 2025 papers, derived from name-based gender inference (Step 5b). Note: gender inference from names is an approximation and treats gender as binary — results should be interpreted as estimates.",
    relevance: "Researcher gender influences research priorities: studies have shown that women researchers are more likely to include sex-stratified analyses. Tracking first-author gender over time provides a measurable indicator of progress toward inclusive leadership in AD science.",
    color: "#BE185D",
  },
  {
    file: "fig11_last_author_gender_distribution.png",
    title: "Last-Author (Senior) Gender Distribution",
    hypothesis: "Last authorship in biomedical publications typically corresponds to senior/principal investigator position. If leadership in AD research is gender-imbalanced at the senior level, this represents a structural barrier to diversifying research agendas — even if first-authorship is more balanced.",
    finding: "Distribution of inferred last-author gender in Alzheimer's & Dementia 2025 papers. The last-author position reflects established research leadership. Comparing first- vs. last-author gender distributions reveals whether gender imbalances are more pronounced at the leadership level.",
    relevance: "Senior researchers set research agendas, secure funding, and make decisions about what populations to study and which analyses to perform. Gender diversity at this level is a structural predictor of whether sex-disaggregated and diversity-focused research will be prioritised.",
    color: "#7C3AED",
  },
  {
    file: "fig12_dataset_proportions_all_papers.png",
    title: "Dataset Mentions as % of All Papers",
    hypothesis: "If AD research cohort diversity were improving, we would expect to see an increasingly broad distribution of dataset citations — including datasets from underrepresented regions. Instead, we expect to find that a small number of well-funded North American and European cohorts (ADNI, NACC, UK Biobank) dominate the literature, while datasets from Latin America, Africa, and Asia remain marginal.",
    finding: `${results2025.datasetMentions.n} of 913 papers (${results2025.datasetMentions.pct}%) mentioned at least one known dataset. The most frequently cited: ADNI (${results2025.topDatasets[0].n} papers, ${((results2025.topDatasets[0].n/results2025.pdfs)*100).toFixed(1)}%); NACC (${results2025.topDatasets[1].n}, ${((results2025.topDatasets[1].n/results2025.pdfs)*100).toFixed(1)}%); UK Biobank (${results2025.topDatasets[2].n}, ${((results2025.topDatasets[2].n/results2025.pdfs)*100).toFixed(1)}%).`,
    relevance: "Dataset usage directly reflects which populations are studied. A concentration of citations in a small number of North American/European cohorts means that the findings published in the field's flagship journal are overwhelmingly based on data from a narrow slice of the world's diverse population — limiting both generalisability and equity.",
    color: "#0E7490",
  },
];

const limitations = [
  { title: "Single journal", desc: "Results describe Alzheimer's & Dementia only and cannot be generalised to the broader AD literature, other dementia journals, or preprints." },
  { title: "Keyword sensitivity", desc: "Papers sharing code without expected terminology will be missed (false negatives). Papers mentioning sharing without doing it will be flagged (false positives) — addressed by manual curation (Step 5)." },
  { title: "Sex keywords are proxies", desc: "Detecting 'sex differences' does not confirm a rigorous sex-stratified analysis. It flags intent, not quality. A paper may mention sex as a demographic variable without stratifying results." },
  { title: "PDF access", desc: "PDFs must be downloaded manually due to copyright. This limits automation and reproducibility for researchers without institutional access." },
  { title: "Country attribution", desc: "Country is assigned to the first author's affiliation. A US-based researcher studying an African cohort is attributed to the USA, not the population studied." },
  { title: "Gender inference", desc: "First/last author gender is inferred from names — an imperfect proxy that treats gender as binary and fails for gender-neutral or culturally unfamiliar names." },
];

function FigureBlock({ fig }: { fig: typeof figures[0] }) {
  const imgPath = `${PLOTS_BASE}/${fig.file}`;
  return (
    <div className="glass-card rounded-2xl overflow-hidden border" style={{ borderColor: fig.color + "30" }}>
      <div className="px-6 py-4" style={{ background: fig.color + "10", borderBottom: `1px solid ${fig.color}20` }}>
        <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: fig.color }}>
          Research Figure
        </div>
        <h3 className="text-base font-bold text-gray-100">{fig.title}</h3>
      </div>
      <div className="p-6">
        {/* Hypothesis */}
        <div className="mb-4 p-3 rounded-lg text-xs leading-relaxed"
          style={{ background: fig.color + "08", borderLeft: `3px solid ${fig.color}50` }}>
          <span className="font-semibold" style={{ color: fig.color }}>Hypothesis: </span>
          <span className="text-gray-300">{fig.hypothesis}</span>
        </div>

        {/* Figure image — served from ad-reproducibility-audit/plots/2025/ on GitHub */}
        <div className="mb-4 rounded-xl overflow-hidden border" style={{ borderColor: fig.color + "20" }}>
          <img
            src={imgPath}
            alt={fig.title}
            className="w-full"
            style={{ display: "block", background: "#0a0618" }}
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              const p = t.parentElement;
              if (p && !p.querySelector(".placeholder")) {
                const d = document.createElement("div");
                d.className = "placeholder";
                d.style.cssText = "padding:40px;text-align:center;color:#6b7280;font-size:12px;";
                d.innerHTML = `<div style='font-size:24px;margin-bottom:8px'>📊</div>
                  <div>Figure not yet available</div>
                  <div style='margin-top:4px;font-size:10px;color:#4b5563'>${fig.file}</div>
                  <div style='margin-top:8px;color:#374151;font-size:10px'>
                    Push to: ad-reproducibility-audit/plots/2025/${fig.file}
                  </div>`;
                p.appendChild(d);
              }
            }}
          />
        </div>

        {/* Finding */}
        <div className="mb-3 text-xs text-gray-300 leading-relaxed">
          <span className="font-semibold text-gray-100">Finding: </span>{fig.finding}
        </div>

        {/* So what */}
        <div className="text-xs text-gray-400 leading-relaxed italic border-t pt-3" style={{ borderColor: fig.color + "20" }}>
          <span className="font-semibold not-italic" style={{ color: fig.color }}>Why this matters: </span>
          {fig.relevance}
        </div>
      </div>
    </div>
  );
}

export default function OriginalResearch() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#0E7490" }}>
          Original Research
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 mb-3">
          Reproducible Science
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
          Three independent sub-repositories, each constituting an original research contribution. Sub-repo 03 includes a complete 2025 pipeline run with results.
        </p>
        <div className="mt-5 rounded-xl p-4 border-l-4" style={{ borderLeftColor: "#0E7490", background: "rgba(14,116,144,0.08)" }}>
          <p className="text-sm font-semibold text-teal-200">
            Why does this matter? Open science is not an administrative box to tick — it is the mechanism by which diverse, global AD research becomes cumulative. Code and data that are not shared cannot be verified, replicated, or adapted. This project provides a concrete, quantitative baseline for open-science practice in the field&apos;s flagship journal.
          </p>
        </div>
        <div className="section-divider mt-6" />
      </div>

      {/* ── Sub-repo cards ─────────────────────────────────────────────── */}
      <div className="space-y-8 mb-16">
        {repos.map((repo) => (
          <div key={repo.number} className="glass-card rounded-2xl overflow-hidden border"
            style={{ borderColor: repo.color + "30" }}>
            <div className="px-6 py-4 flex items-start justify-between gap-4"
              style={{ background: `${repo.color}12`, borderBottom: `1px solid ${repo.color}20` }}>
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
              <a href={repo.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 border transition-all hover:opacity-80"
                style={{ borderColor: repo.color + "50", color: repo.color, background: repo.color + "10" }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
            <div className="px-6 py-5">
              <div className="mb-4 p-3 rounded-lg text-xs text-gray-300 leading-relaxed italic"
                style={{ background: repo.color + "08", borderLeft: `3px solid ${repo.color}40` }}>
                <span className="font-semibold not-italic" style={{ color: repo.color }}>Why this matters: </span>
                {repo.takeaway}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{repo.description}</p>
              {repo.features && (
                <ul className="space-y-1.5">
                  {repo.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                      <span style={{ color: repo.color }} className="mt-0.5 shrink-0">▸</span>{f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── 2025 headline results ──────────────────────────────────────── */}
      <div className="section-divider mb-10" />

      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-200 mb-2">2025 Pipeline Run — Headline Results</h2>
        <p className="text-sm text-gray-500 mb-6">
          <em>Alzheimer&apos;s & Dementia</em> (Wiley, ISSN: 1552-5260) · 913 papers manually downloaded and screened
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "PDFs analysed", value: "913", sub: "manually downloaded", color: "#7C3AED" },
            { label: "Code sharing", value: "88.6%", sub: "keyword match", color: "#BE185D", note: "but only 9.4% with a real repo link" },
            { label: "Data sharing", value: "3.0%", sub: "27 / 913 papers", color: "#BE185D" },
            { label: "Sex-specific keywords", value: "25.5%", sub: "233 papers", color: "#0E7490" },
            { label: "Sex-aware main focus", value: "4.1%", sub: "37 papers (keyword in title)", color: "#0E7490" },
            { label: "Dataset mentions", value: "52.8%", sub: "482 papers cite ≥1 dataset", color: "#1E3A8A" },
            { label: "Repo links extracted", value: "9.4%", sub: "86 papers (80 GitHub)", color: "#7C3AED" },
            { label: "Country extracted", value: "99.1%", sub: "905 / 913 papers", color: "#1E3A8A" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-4 border text-center" style={{ borderColor: s.color + "25" }}>
              <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-400 font-medium">{s.label}</div>
              <div className="text-xs text-gray-600 mt-0.5">{s.sub}</div>
              {s.note && <div className="text-xs mt-1 italic" style={{ color: s.color + "cc" }}>{s.note}</div>}
            </div>
          ))}
        </div>

        {/* Platform breakdown */}
        <div className="glass-card rounded-xl p-5 border mb-4" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
          <p className="text-xs font-semibold text-violet-300 mb-3">Repository hosting platforms (from extracted links)</p>
          <div className="flex gap-6">
            {results2025.platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "#7C3AED" }} />
                <span className="text-sm font-bold text-violet-200">{p.name}</span>
                <span className="text-xs text-gray-400">{p.n} papers</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top datasets */}
        <div className="glass-card rounded-xl p-5 border" style={{ borderColor: "rgba(30,58,138,0.2)" }}>
          <p className="text-xs font-semibold text-blue-300 mb-3">Most frequently cited datasets (Step 4b)</p>
          <div className="space-y-2">
            {results2025.topDatasets.map((d, i) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="text-xs text-gray-600 w-4 text-right">{i + 1}.</div>
                <div className="text-xs font-semibold text-gray-300 w-24">{d.name}</div>
                <div className="flex-1 bg-gray-900 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${(d.n / results2025.topDatasets[0].n) * 100}%`, background: "#1E3A8A" }} />
                </div>
                <div className="text-xs text-gray-400 w-20 text-right">{d.n} papers ({((d.n/results2025.pdfs)*100).toFixed(1)}%)</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pipeline deep-dive ─────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-200 mb-2">Inside the Pipeline</h2>
        <p className="text-sm text-gray-500 mb-4">Adapted from Boudreau et al. (MRM) · doi:10.1002/mrm.29310</p>

        <div className="glass-card rounded-xl p-5 border mb-6" style={{ borderColor: "rgba(30,58,138,0.3)" }}>
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">What do we mean by &quot;reproducibility&quot;?</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-gray-100">Computational reproducibility</strong>: the ability of an independent researcher to re-run the analyses underlying a published paper and obtain the same results. This requires shared code, shared data (or a public equivalent), and documentation. We use the presence of open-science indicators in the published paper — links to GitHub repositories, data availability statements, deposits on OSF/Zenodo/Dryad — as a proxy for this.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {pipelineSteps.map((s) => (
            <div key={s.step} className="glass-card rounded-xl p-4 border flex gap-4" style={{ borderColor: s.color + "25" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: s.color }}>
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
      </section>

      {/* ── Figures ────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-200 mb-2">Results: Five Dimensions of Diversity in AD Research</h2>
        <p className="text-sm text-gray-500 mb-2">
          Each figure addresses a distinct dimension of diversity — geographic, sex/gender, authorship, and dataset coverage.
        </p>
        <p className="text-xs text-gray-600 mb-8 italic">
          Note: figures below are generated by the pipeline from 913 papers published in <em>Alzheimer&apos;s & Dementia</em> (2025).
          They are served directly from the{" "}
          <a href="https://github.com/KahinaBch/ad-reproducibility-audit" target="_blank" rel="noopener noreferrer"
            className="text-violet-400 underline">ad-reproducibility-audit</a>{" "}
          repository (<code className="font-mono text-violet-300">plots/2025/</code>).
          If a figure does not appear, push the corresponding PNG to that repository and it will load automatically.
        </p>

        <div className="space-y-8">
          {figures.map((fig) => (
            <FigureBlock key={fig.file} fig={fig} />
          ))}
        </div>
      </section>

      {/* ── Limitations ─────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">⚠</span>
            <h3 className="text-base font-bold text-gray-200">DISCLAIMER — Scope and limitations</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            This analysis is intentionally narrow but <strong className="text-gray-200">reproducible, transparent, and extendable</strong> — the pipeline can be applied to any journal, any year, and any keyword set.
          </p>
          <div className="space-y-3">
            {limitations.map((l) => (
              <div key={l.title} className="flex gap-3 text-xs">
                <div className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: "#EF4444" }} />
                <div><span className="font-semibold text-red-300">{l.title}: </span><span className="text-gray-400">{l.desc}</span></div>
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
