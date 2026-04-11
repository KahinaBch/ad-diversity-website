import Link from "next/link";

const initiatives = [
  {
    category: "Open Data Platforms",
    color: "#7C3AED",
    items: [
      { name: "ADDI", full: "Alzheimer's Disease Data Initiative", desc: "Global platform for sharing and accessing AD data across institutions. Supports data cataloguing, access, and analysis.", url: "https://www.alzheimersdata.org/" },
      { name: "GAAIN", full: "Global Alzheimer's Association Interactive Network", desc: "Meta-search engine enabling federated queries across multiple AD datasets without centralising data.", url: "http://www.gaain.org/" },
      { name: "Synapse", full: "Sage Bionetworks Synapse", desc: "Platform hosting key open AD datasets including ANMerge, AMP-AD, and ROSMAP derived data.", url: "https://www.synapse.org/" },
      { name: "OpenNeuro", full: "OpenNeuro", desc: "BIDS-compliant open platform for neuroimaging data. Growing number of dementia-related datasets.", url: "https://openneuro.org/" },
    ],
  },
  {
    category: "Large-Scale Genetic Collaborations",
    color: "#BE185D",
    items: [
      { name: "IGAP", full: "International Genomics of Alzheimer's Project", desc: "Meta-GWAS consortium that identified many AD risk loci. Primarily European-descent populations.", url: "https://www.niagads.org/igap" },
      { name: "EADB", full: "European Alzheimer DNA Biobank", desc: "European GWAS consortium. Identified novel loci and validated APOE interactions.", url: "https://eadb.eu/" },
      { name: "ADGC", full: "Alzheimer's Disease Genetics Consortium", desc: "US-based GWAS network coordinating across ADNI, NACC, and multiple ADRCs.", url: "https://www.niagads.org/adgc" },
      { name: "CHARGE", full: "Cohorts for Heart and Aging Research in Genomic Epidemiology", desc: "Cardiovascular + dementia genetics consortium. Strong focus on gene-environment interactions.", url: "https://www.chargeconsortium.com/" },
    ],
  },
  {
    category: "Atlases & Harmonisation",
    color: "#1E3A8A",
    items: [
      { name: "Shared Atlases", full: "Neuroimaging Atlases", desc: "Content to be provided by author — will cover MNI, AAL, Desikan-Killiany, and disease-specific atlases.", url: "#" },
      { name: "ComBat / NeuroHarmonize", full: "Harmonisation Pipelines", desc: "Content to be provided by author — will cover ComBat, NeuroHarmonize, RAVEL, and related pipelines for multi-site batch effect correction.", url: "#" },
    ],
  },
  {
    category: "Reproducibility Initiatives",
    color: "#0E7490",
    items: [
      { name: "AMP-AD", full: "Accelerating Medicines Partnership — Alzheimer's Disease", desc: "NIH-industry consortium. All data and code deposited in Synapse. Strong open-science mandate.", url: "https://adknowledgeportal.synapse.org/" },
      { name: "AD Knowledge Portal", full: "Sage Bionetworks AD Knowledge Portal", desc: "Central repository for AMP-AD data, tools, and analyses. Reproducibility-first design.", url: "https://adknowledgeportal.synapse.org/" },
    ],
  },
];

export default function OpenSciencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#BE185D" }}>
          Part II — Open Science
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 mb-3">
          Open Science, Atlases & Harmonisation
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
          An overview of initiatives promoting open data, shared atlases, harmonisation pipelines,
          large-scale genetic collaborations, and reproducible science in the AD field.
        </p>
        <div className="section-divider mt-6" />
      </div>

      {/* Initiatives */}
      <div className="space-y-10">
        {initiatives.map((cat) => (
          <section key={cat.category}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-6 rounded" style={{ background: cat.color }} />
              <h2 className="text-lg font-bold text-gray-200">{cat.category}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.items.map((item) => (
                <div key={item.name} className="glass-card rounded-xl p-5 border hover:border-opacity-40 transition-all"
                  style={{ borderColor: cat.color + "25" }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-bold text-sm" style={{ color: cat.color }}>{item.name}</span>
                      <div className="text-xs text-gray-500 mt-0.5">{item.full}</div>
                    </div>
                    {item.url !== "#" && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-gray-600 hover:text-violet-400 shrink-0 ml-2">↗</a>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Reproducibility sub-section */}
      <div className="section-divider my-12" />

      <section>
        <h2 className="text-lg font-bold text-gray-200 mb-4">
          Reproducible Science: Investigating <em>Alzheimer&apos;s & Dementia</em>
        </h2>
        <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(14,116,144,0.3)" }}>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            As part of the original research component of this project, we conducted a reproducibility audit
            of papers published in{" "}
            <em className="text-gray-300">Alzheimer&apos;s & Dementia</em> (Wiley), following the methodology
            established by Boudreau et al. for <em>Magnetic Resonance in Medicine</em>. The pipeline detects
            code/data sharing, geographic origin of first authors, and — uniquely for this study — performs
            sex-specific keyword analysis.
          </p>
          <Link href="/original-research" className="btn-glow text-sm inline-block">
            View Original Research →
          </Link>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <Link href="/part2/datasets" className="text-sm text-gray-400 hover:text-violet-300 transition-colors">
          ← Dataset Catalogue
        </Link>
        <Link href="/original-research" className="btn-glow text-sm">
          Original Research →
        </Link>
      </div>
    </div>
  );
}
