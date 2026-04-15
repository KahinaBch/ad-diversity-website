"use client";

// Figures served directly from the ad-reproducibility-audit GitHub repo
const PLOTS_BASE =
  "https://raw.githubusercontent.com/KahinaBch/ad-reproducibility-audit/main/plots/2025";

const results2025 = {
  pdfs: 913,
  openScienceMatch: { n: 810, pct: 88.7 },
  repoLinks: { n: 86, pct: 9.4, github: 80 },
  sexKeywords: { n: 233, pct: 25.5, mainFocus: 37, consideration: 196 },
  datasetMentions: { n: 482, pct: 52.8 },
  countryExtracted: { n: 905, pct: 99.1 },
  codeSharing: { n: 809, pct: 88.6 },
  dataSharing: { n: 27, pct: 3.0 },
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

// ── Pipeline steps ────────────────────────────────────────────────────────────
const pipelineSteps = [
  {
    step: "1", color: "#7C3AED",
    title: "PDF collection (manual)",
    desc: "Full-text PDFs of Alzheimer's & Dementia articles were manually downloaded for 2025. Automated bulk download is not possible due to copyright restrictions. 913 PDFs were collected and organised into month folders by acceptance date.",
    note: "Manual download is required for copyright compliance — the only legally sound approach when working with a paywalled journal.",
  },
  {
    step: "2", color: "#7C3AED",
    title: "PDF sorting + workbook",
    desc: "Each PDF is parsed to extract acceptance date; papers are sorted into month folders and compiled into an Excel workbook with one row per article. 2025: 913 rows.",
  },
  {
    step: "3", color: "#BE185D",
    title: "Open-science keyword scan",
    desc: "Each PDF is scanned for platform names (github, osf, zenodo, dryad, figshare), sharing statements (code available, data available, openly available), and tool indicators (jupyter, notebook, open source). Repository links are extracted where present.",
    note: "Hypothesis — Pillar 3: if sharing practices are improving, rates should increase over time and GitHub should dominate. 2025: 88.7% keyword match — but only 9.4% contain an actual repository link.",
  },
  {
    step: "4", color: "#0E7490",
    title: "Sex-specific keyword scan (NOVEL)",
    desc: "Full text is scanned for: sex-stratified, sex differences, gender-specific, sex-disaggregated, sex-based analysis, female-specific, APOE sex interaction, menopause, hormonal influence, stratified by sex. Papers classified as 'sex-aware main focus' (keyword in title) or 'sex-aware consideration' (keyword in body only).",
    note: "Hypothesis — Pillar 2: the proportion of AD papers explicitly treating sex as a biological variable is low, in tension with the ~65% female disease burden and the NIH mandate. This step quantifies that gap systematically for the first time.",
  },
  {
    step: "4b", color: "#0E7490",
    title: "Dataset mention scan",
    desc: "PDF text is scanned for names from the AD Dataset Catalogue, identifying which datasets — and therefore which populations — are most cited in published AD research.",
    note: "Hypothesis — Pillar 1: a small number of North American/European cohorts (ADNI, NACC, UK Biobank) will dominate dataset citations, reflecting the geographic concentration of AD research.",
  },
  {
    step: "5", color: "#BE185D",
    title: "Manual curation",
    desc: "Human validation of every keyword match: is this a genuine sharing statement or a false positive? Does the linked repository actually contain the code/data described? Validates False Positive?, Shared code?, Shared data? columns.",
    note: "Critical: automated detection cannot distinguish 'available upon request' (not open) from 'code at github.com/...' (genuinely open).",
  },
  {
    step: "5b", color: "#7C3AED",
    title: "Author metadata + gender inference",
    desc: "First/last author names are retrieved via DOI and gender is inferred from names. Enables analysis of gender representation in AD research leadership — a structural dimension of Pillar 2 (sex/gender diversity) distinct from sex-disaggregated analysis.",
  },
  {
    step: "6", color: "#1E3A8A",
    title: "Country extraction",
    desc: "First-author affiliation country is extracted from PDF text (pdfminer + pycountry). Maps the geographic origin of published AD research. 2025: 99.1% of papers successfully attributed.",
  },
  {
    step: "7", color: "#1E3A8A",
    title: "Statistical analysis",
    desc: "Sharing rates, platform breakdown, sex-keyword prevalence, country distributions, and dataset citation frequencies are computed. Scan logs augment workbook data to prevent undercounting from blank fields.",
  },
  {
    step: "8", color: "#1E3A8A",
    title: "Publication-ready figures",
    desc: "All output figures generated (percentage/proportion based; one plot per file). Stored in plots/{year}/ and served directly from this repository.",
  },
];

// ── Three pillars with their figures ─────────────────────────────────────────
const pillars = [
  {
    number: "I",
    color: "#1E3A8A",
    accent: "#93C5FD",
    title: "Who is studied?",
    subtitle: "Geographic & Ethnic Diversity",
    framing: "If AD research reflected the global distribution of dementia burden, first-author affiliations and dataset citations would mirror the populations where dementia is growing fastest. Instead, we expect — and find — a sharp mismatch: a small number of high-income, Western countries dominate both the authorship record and the datasets cited, while Sub-Saharan Africa, South Asia, and Latin America contribute minimally despite bearing the greatest projected burden.",
    figures: [
      {
        file: "fig3_country_distribution.png",
        title: "Geographic Origin of First Authors",
        finding: `905 of 913 papers (99.1%) were successfully attributed to a first-author country. The distribution reveals a strong concentration in North America and Europe, with minimal representation from Latin America, Africa, and South/Southeast Asia.`,
        relevance: "Geographic diversity in authorship is not merely symbolic. Researchers from affected regions bring context-specific expertise, community trust, and research questions that external teams miss. This figure provides the first systematic baseline for tracking geographic equity in the flagship AD journal.",
      },
      {
        file: "fig12_dataset_proportions_all_papers.png",
        title: "Dataset Citations: Which Populations Are Actually Studied?",
        finding: `${results2025.datasetMentions.n} of 913 papers (${results2025.datasetMentions.pct}%) cited at least one known dataset. The most frequently cited: ADNI (${results2025.topDatasets[0].n} papers, ${((results2025.topDatasets[0].n/results2025.pdfs)*100).toFixed(1)}%); NACC (${results2025.topDatasets[1].n}, ${((results2025.topDatasets[1].n/results2025.pdfs)*100).toFixed(1)}%); UK Biobank (${results2025.topDatasets[2].n}, ${((results2025.topDatasets[2].n/results2025.pdfs)*100).toFixed(1)}%). Bars are colour-coded by dataset geographic origin.`,
        relevance: "Dataset citations directly reveal which populations are studied. Concentration in a handful of North American/European cohorts means the findings published in the field's flagship journal overwhelmingly reflect a narrow slice of the world's at-risk population — limiting both scientific generalisability and public health equity.",
      },
    ],
  },
  {
    number: "II",
    color: "#BE185D",
    accent: "#F9A8D4",
    title: "How does biology differ by sex?",
    subtitle: "Sex & Gender Diversity",
    framing: "Women comprise ~65% of people living with Alzheimer's disease. Despite mounting evidence for sex-specific biological mechanisms — in APOE4 interactions, hormonal influences, immune responses, and tau propagation — most AD papers do not explicitly treat sex as a primary analytical variable. We also examine whether this biological gap is mirrored by a structural one: is gender under-represented in AD research leadership, and does that affect what questions get asked?",
    figures: [
      {
        file: "fig6_sex_aware_level_distribution.png",
        title: "Sex-Aware Level Distribution",
        finding: `Out of 913 papers: ${results2025.sexKeywords.mainFocus} (${((results2025.sexKeywords.mainFocus/results2025.pdfs)*100).toFixed(1)}%) classified as 'sex-aware main focus' (keyword in title); ${results2025.sexKeywords.consideration} (${((results2025.sexKeywords.consideration/results2025.pdfs)*100).toFixed(1)}%) as 'sex-aware consideration' (keyword in body only); the remainder had no sex-specific keywords detected.`,
        relevance: "The distribution quantifies the gap between the biological reality — sex profoundly shapes AD risk and progression — and the state of the literature. Only 4.1% of papers make sex a primary focus. This baseline can track future progress following the NIH sex-as-a-biological-variable mandate.",
      },
      {
        file: "fig10_first_author_gender_distribution.png",
        title: "First-Author Gender Distribution",
        finding: "Distribution of inferred first-author gender in 913 Alzheimer's & Dementia papers (2025), derived from name-based gender inference. Note: gender inference from names is an approximation and should be interpreted as an estimate.",
        relevance: "Women researchers are more likely to include sex-stratified analyses. Tracking first-author gender provides a structural indicator of whether the pipeline feeding into AD research leadership reflects — or perpetuates — the field's diversity gap.",
      },
      {
        file: "fig11_last_author_gender_distribution.png",
        title: "Last-Author (Senior) Gender Distribution",
        finding: "Distribution of inferred last-author gender, reflecting established research leadership (principal investigator positions). Comparing first- vs. last-author distributions reveals whether gender imbalances are more pronounced at the senior level.",
        relevance: "Senior researchers set agendas, secure funding, and decide what populations to study. Gender diversity at this level is a structural predictor of whether sex-disaggregated and diversity-focused research will be prioritised — the structural complement to the biological gap measured in fig6.",
      },
    ],
  },
  {
    number: "III",
    color: "#7C3AED",
    accent: "#c4b5fd",
    title: "Is the research infrastructure open enough?",
    subtitle: "Data Infrastructure & Reproducibility",
    framing: "Open science is not an administrative formality — it is the mechanism by which findings can be verified, built upon, and adapted to new populations. For underrepresented groups where data are already scarce, the closure of the scientific record is especially costly: it prevents the field from accumulating and sharing the limited evidence that does exist. We measure the current state of open-science practice in the flagship AD journal as a concrete, reproducible baseline.",
    keyStats: true,
    figures: [],
  },
];

const limitations = [
  { title: "Single journal", desc: "Results describe Alzheimer's & Dementia only and cannot be generalised to the broader AD literature, other dementia journals, or preprints." },
  { title: "Keyword sensitivity", desc: "Papers sharing code without expected terminology will be missed (false negatives). Papers mentioning sharing without doing it will be flagged (false positives) — addressed by manual curation." },
  { title: "Sex keywords are proxies", desc: "Detecting 'sex differences' flags intent, not quality. A paper may mention sex as a demographic variable without stratifying results." },
  { title: "PDF access", desc: "PDFs must be downloaded manually due to copyright. This limits automation for researchers without institutional access." },
  { title: "Country attribution", desc: "Country is assigned to the first author's affiliation. A US-based researcher studying an African cohort is attributed to the USA — not the population studied." },
  { title: "Gender inference", desc: "First/last author gender is inferred from names — an imperfect proxy that treats gender as binary and may fail for gender-neutral or culturally unfamiliar names." },
];

function FigureBlock({ fig, color }: { fig: (typeof pillars[0]["figures"])[0]; color: string }) {
  const imgPath = `${PLOTS_BASE}/${fig.file}`;
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: color + "25", background: "rgba(10,8,24,0.5)" }}>
      <div className="px-5 pt-4 pb-2">
        <div className="text-xs font-semibold text-gray-300 mb-2">{fig.title}</div>
      </div>
      <div className="px-4">
        <img
          src={imgPath}
          alt={fig.title}
          className="w-full rounded-lg"
          style={{ display: "block", background: "#0a0618" }}
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = "none";
            const p = t.parentElement;
            if (p && !p.querySelector(".fig-placeholder")) {
              const d = document.createElement("div");
              d.className = "fig-placeholder";
              d.style.cssText = "padding:32px;text-align:center;color:#6b7280;font-size:11px;border:1px dashed rgba(100,100,150,0.2);border-radius:8px;";
              d.innerHTML = `<div style='font-size:20px;margin-bottom:6px'>📊</div><div>Figure not yet available</div><div style='margin-top:4px;color:#4b5563'>${fig.file}</div><div style='margin-top:6px;color:#374151'>Push to: ad-reproducibility-audit/plots/2025/${fig.file}</div>`;
              p.appendChild(d);
            }
          }}
        />
      </div>
      <div className="px-5 py-4 space-y-2">
        <p className="text-xs text-gray-300 leading-relaxed">
          <span className="font-semibold text-gray-100">Finding: </span>{fig.finding}
        </p>
        <p className="text-xs text-gray-500 leading-relaxed italic border-t pt-2" style={{ borderColor: color + "20" }}>
          <span className="font-semibold not-italic" style={{ color }}>Why this matters: </span>
          {fig.relevance}
        </p>
      </div>
    </div>
  );
}

export default function OriginalResearch() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#0E7490" }}>
          Original Research
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 mb-3">
          Measuring Diversity in AD Research
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
          An empirical investigation structured around the three dimensions of diversity identified in Part I — applied to <em>Alzheimer&apos;s & Dementia</em> (2025), the field&apos;s flagship journal.
        </p>

        <div className="mt-5 rounded-xl p-5 border" style={{ borderColor: "rgba(14,116,144,0.3)", background: "rgba(14,116,144,0.06)" }}>
          <p className="text-xs font-semibold text-teal-300 uppercase tracking-wider mb-2">Organising principle</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            The same framework that defines the problem in Part I — three interconnected dimensions of diversity — organises this investigation. <strong className="text-gray-100">Pillar I</strong> (geographic and ethnic diversity) asks: who is studied, and where does published AD research come from? <strong className="text-gray-100">Pillar II</strong> (sex and gender) asks: does the literature treat sex as a biological variable, and does gender under-representation in authorship structure what questions get asked? <strong className="text-gray-100">Pillar III</strong> (data infrastructure and reproducibility) asks: is the research infrastructure open enough to allow findings to be verified, built upon, and adapted — especially for populations where data are already scarce?
          </p>
        </div>
        <div className="section-divider mt-6" />
      </div>

      {/* ── Three sub-repos ──────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-gray-200 mb-4">Three Sub-Repositories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { n: "01", title: "Dataset Catalogue", desc: "31 AD datasets documented — the reference used for dataset mention scanning in Sub-repo 03.", color: "#7C3AED", repo: "ad-dataset-catalogue", link: "https://github.com/KahinaBch/ad-dataset-catalogue" },
            { n: "02", title: "Atlases & Harmonisation", desc: "Neuroimaging atlases and harmonisation pipelines enabling multi-site pooling across diverse populations.", color: "#BE185D", repo: "ad-atlases-harmonisation", link: "https://github.com/KahinaBch/ad-atlases-harmonisation", pending: true },
            { n: "03", title: "Reproducibility Audit", desc: "913 papers screened across all three pillars. Complete 2025 pipeline run with results and figures.", color: "#1E3A8A", repo: "ad-reproducibility-audit", link: "https://github.com/KahinaBch/ad-reproducibility-audit" },
          ].map((r) => (
            <div key={r.n} className="glass-card rounded-xl p-5 border" style={{ borderColor: r.color + "30" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold opacity-60" style={{ color: r.color }}>Sub-repo {r.n}</span>
                {r.pending && <span className="badge badge-partial text-xs">In progress</span>}
                {!r.pending && <span className="badge badge-open text-xs">Active</span>}
              </div>
              <div className="font-bold text-gray-100 text-sm mb-2">{r.title}</div>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">{r.desc}</p>
              <a href={r.link} target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono" style={{ color: r.color }}>
                github.com/KahinaBch/{r.repo} ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pipeline ─────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-gray-200 mb-2">The Pipeline (Sub-repo 03)</h2>
        <p className="text-sm text-gray-500 mb-1"><em>Alzheimer&apos;s & Dementia</em> · 913 papers · 2025 · Adapted from Boudreau et al. (MRM)</p>

        <div className="glass-card rounded-xl p-5 border mb-5 mt-4" style={{ borderColor: "rgba(30,58,138,0.3)" }}>
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Reproducibility defined</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-gray-100">Computational reproducibility</strong>: the ability of an independent researcher to re-run the analyses underlying a published paper and obtain the same results — requiring shared code, shared data, and documentation. We use the presence of open-science indicators in published papers (GitHub links, data availability statements, OSF/Zenodo deposits) as a proxy measure. Each pipeline step is labelled with the pillar it addresses.
          </p>
        </div>

        <div className="space-y-2">
          {pipelineSteps.map((s) => (
            <div key={s.step} className="glass-card rounded-xl p-4 border flex gap-4" style={{ borderColor: s.color + "25" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: s.color }}>{s.step}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-200 mb-1">{s.title}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                {s.note && (
                  <p className="text-xs mt-1.5 italic leading-relaxed" style={{ color: s.color }}>
                    ⚠ {s.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Results by pillar ────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-gray-200 mb-2">Results: Three Pillars of Diversity</h2>
        <p className="text-sm text-gray-500 mb-8">
          Figures served from{" "}
          <a href="https://github.com/KahinaBch/ad-reproducibility-audit" target="_blank" rel="noopener noreferrer"
            className="text-violet-400 underline">ad-reproducibility-audit/plots/2025/</a>.
          If a figure does not appear, push the PNG to that repository.
        </p>

        <div className="space-y-14">
          {pillars.map((pillar) => (
            <div key={pillar.number}>
              {/* Pillar header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white shrink-0 text-base"
                  style={{ background: pillar.color }}>
                  {pillar.number}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: pillar.accent }}>
                    {pillar.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100">{pillar.title}</h3>
                </div>
              </div>

              {/* Framing */}
              <div className="rounded-xl p-4 mb-5 text-sm text-gray-300 leading-relaxed border-l-4"
                style={{ borderLeftColor: pillar.color, background: pillar.color + "08" }}>
                {pillar.framing}
              </div>

              {/* Pillar III — key stats (no external figures) */}
              {pillar.keyStats && (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Keyword match", value: "88.7%", sub: "810 / 913 papers", note: "open-science terms found", color: "#7C3AED" },
                      { label: "Actual repo link", value: "9.4%", sub: "86 / 913 papers", note: "genuine open code/data", color: "#BE185D" },
                      { label: "Data sharing", value: "3.0%", sub: "27 / 913 papers", note: "data openly deposited", color: "#BE185D" },
                      { label: "GitHub", value: "80", sub: "links extracted", note: "dominant platform", color: "#7C3AED" },
                      { label: "OSF", value: "4", sub: "links extracted", note: "", color: "#1E3A8A" },
                      { label: "Zenodo", value: "2", sub: "links extracted", note: "", color: "#1E3A8A" },
                    ].map((s) => (
                      <div key={s.label} className="glass-card rounded-xl p-4 border text-center" style={{ borderColor: s.color + "25" }}>
                        <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-xs font-medium text-gray-300">{s.label}</div>
                        <div className="text-xs text-gray-600">{s.sub}</div>
                        {s.note && <div className="text-xs mt-1 italic" style={{ color: s.color + "cc" }}>{s.note}</div>}
                      </div>
                    ))}
                  </div>
                  <div className="glass-card rounded-xl p-5 border" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      <strong className="text-gray-200">Key finding:</strong> The gap between 88.7% keyword match and 9.4% genuine repository links is the core result of Pillar III. It reveals that the majority of open-science language in the AD literature is not backed by accessible repositories — distinguishing between the rhetoric of open science and its practice. The 3.0% data sharing rate further underscores that even where code is shared, data sharing remains the exception rather than the rule.
                    </p>
                  </div>
                </div>
              )}

              {/* Figures */}
              {pillar.figures.length > 0 && (
                <div className="space-y-5">
                  {pillar.figures.map((fig) => (
                    <FigureBlock key={fig.file} fig={fig} color={pillar.color} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Limitations ──────────────────────────────────────────────────── */}
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
