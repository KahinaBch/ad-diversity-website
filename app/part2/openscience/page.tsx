import Link from "next/link";

const initiatives = [
  {
    category: "Open Data Platforms & Principles",
    color: "#7C3AED",
    items: [
      {
        name: "FAIR Data Principles",
        full: "Findable, Accessible, Interoperable, Reusable",
        desc: "The foundational framework for scientific data stewardship. The FAIR principles specify that research data should be findable via unique persistent identifiers, accessible via standardised open protocols, interoperable using shared vocabularies, and reusable with clear licences and provenance. First formally published by Wilkinson et al. (Scientific Data, 2016; doi:10.1038/sdata.2016.18), they are now a requirement of major funding agencies.",
        url: "https://www.go-fair.org/fair-principles/",
        doi: "10.1038/sdata.2016.18",
      },
      {
        name: "ADDI",
        full: "Alzheimer's Disease Data Initiative",
        desc: "A global platform coordinating access to and sharing of AD data across institutions. Facilitates data cataloguing, federated queries, and access governance across multiple international cohorts.",
        url: "https://www.alzheimersdata.org/",
        doi: "",
      },
      {
        name: "GAAIN",
        full: "Global Alzheimer's Association Interactive Network",
        desc: "A meta-search engine enabling federated queries across multiple AD datasets without centralising data — an early implementation of federated analysis for AD.",
        url: "http://www.gaain.org/",
        doi: "",
      },
      {
        name: "Synapse (Sage Bionetworks)",
        full: "Open platform for collaborative biomedical data science",
        desc: "Hosts key open AD datasets including ANMerge, AMP-AD, ROSMAP derived data, and the BrainLat Latin American neuroimaging dataset. Central repository for the AMP-AD Knowledge Portal.",
        url: "https://www.synapse.org/",
        doi: "",
      },
    ],
  },
  {
    category: "Data Governance & Safe Access",
    color: "#BE185D",
    items: [
      {
        name: "Five Safes Framework",
        full: "Safe People, Safe Projects, Safe Settings, Safe Data, Safe Outputs",
        desc: "Developed by the UK's Office for National Statistics and adopted by Health Data Research UK, the Five Safes provides a structured governance model for designing safe and efficient data access. Applied in major initiatives such as ICODA (Boylan et al., Lancet Digital Health, 2024; doi:10.1016/S2589-7500(24)00028-1) and the UK Biobank.",
        url: "https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/",
        doi: "10.1016/S2589-7500(24)00028-1",
      },
      {
        name: "GA4GH",
        full: "Global Alliance for Genomics and Health",
        desc: "Develops international frameworks and standards for ethical genomic data sharing, including the Data Use Ontology (DUO), machine-readable consent guidance, and Data Access Committee standards. Their work enables automated compliance with diverse national regulations (Bernier et al., Big Data & Society, 2023; doi:10.1177/20539517231163174).",
        url: "https://www.ga4gh.org/",
        doi: "10.1177/20539517231163174",
      },
      {
        name: "Trusted Research Environments (TREs)",
        full: "Secure environments for sensitive data analysis",
        desc: "TREs provide approved researchers with secure environments for accessing sensitive datasets without data leaving its custodian. Increasingly adopted for cross-national AD collaboration. Federated analysis platforms (e.g., DataSHIELD) extend this model by deploying analytical models across sites while returning only aggregated results.",
        url: "https://www.hdruk.ac.uk/",
        doi: "",
      },
    ],
  },
  {
    category: "Large-Scale Genetic Consortia",
    color: "#1E3A8A",
    items: [
      {
        name: "IGAP",
        full: "International Genomics of Alzheimer's Project",
        desc: "Meta-GWAS consortium that identified many foundational AD risk loci. Primarily European-descent populations — its results require replication and calibration in diverse ancestral groups.",
        url: "https://www.niagads.org/igap",
        doi: "",
      },
      {
        name: "EADB",
        full: "European Alzheimer DNA Biobank",
        desc: "European GWAS consortium identifying novel loci and validating APOE interactions. Coordinating harmonised genotyping and phenotyping across European sites.",
        url: "https://eadb.eu/",
        doi: "",
      },
      {
        name: "UK Biobank WGS",
        full: "UK Biobank Whole-Genome Sequencing Consortium",
        desc: "Whole-genome sequencing of 490,640 UK Biobank participants (2025), identifying ~1.5 billion variants. An 18.8-fold increase in variant discovery compared to imputed array data. Cross-ancestry meta-analysis identified signals in African and South Asian ancestry groups not detectable in European analyses. Data available via the UKB Research Analysis Platform (UK Biobank WGS Consortium, Nature, 2025; doi:10.1038/s41586-025-09272-9).",
        url: "https://www.ukbiobank.ac.uk/",
        doi: "10.1038/s41586-025-09272-9",
      },
    ],
  },
  {
    category: "Open Science & Reproducibility",
    color: "#0E7490",
    items: [
      {
        name: "ADDI",
        full: "Alzheimer's Disease Data Initiative",
        desc: "Global open-science platform coordinating access to AD data across institutions, ethnicities, and world regions. ADDI's ADWorkbench provides secure, cloud-based computational infrastructure to researchers worldwide — particularly in LMICs — at no cost, directly addressing the infrastructure gap that prevents researchers in low-resource settings from participating in global science (Vilor-Tejedor et al., Alzheimer's & Dementia, 2026; doi:10.1002/alz.71069).",
        url: "https://www.alzheimersdata.org/",
        doi: "",
      },
      {
        name: "Gates Sr. Fellowship",
        full: "William H. Gates Sr. Fellowship (ADDI)",
        desc: "Established in 2023 to support early-career researchers worldwide advancing innovative approaches to ADRD. Recruits from diverse countries, institutions, and disciplinary backgrounds. Provides financial support, mentorship, and infrastructure enabling independent, globally inclusive research. A model for how intentional investment in researcher diversity can break the cycle of underrepresentation (Vilor-Tejedor et al., 2026).",
        url: "https://www.alzheimersdata.org/",
        doi: "10.1002/alz.71069",
      },
      {
        name: "WW-ADNI",
        full: "World-Wide Alzheimer's Disease Neuroimaging Initiative",
        desc: "Global consortium fostering scientific collaboration across diverse regions: North America, Argentina, Australia, Canada, China, Japan, Korea, Mexico, Taiwan. Enables cross-cultural, cross-ancestry analyses on a scale impossible in single-country studies.",
        url: "https://adni.loni.usc.edu/",
        doi: "",
      },
      {
        name: "HCAP",
        full: "Harmonized Cognitive Assessment Protocol",
        desc: "Developed to generate internationally comparable cognitive measures across diverse cultural and linguistic contexts. By harmonizing assessment protocols across countries, the HCAP Network builds robust global data resources for cross-national analyses of cognitive aging and dementia risk — addressing the assessment standardisation problem highlighted by Vilor-Tejedor et al. (2026).",
        url: "https://hcap.isr.umich.edu/",
        doi: "",
      },
      {
        name: "AMP-AD",
        full: "Accelerating Medicines Partnership — Alzheimer's Disease",
        desc: "NIH-industry consortium with strong open-science mandate. All data and code deposited in Synapse. Enables multi-omics AD research (proteomics, transcriptomics, epigenomics) via the AD Knowledge Portal.",
        url: "https://adknowledgeportal.synapse.org/",
        doi: "",
      },
      {
        name: "PPIE in AD Research",
        full: "Patient and Public Involvement and Engagement",
        desc: "Evidence consistently shows that involving patients and the public in research design improves quality, relevance, and uptake. PPIE is critical to ensuring diverse communities can participate meaningfully in studies that affect them. Vilor-Tejedor et al. (2026) highlight community-based approaches as central to building trust, improving recruitment, addressing stigma, and shifting power dynamics in global dementia research (Blackburn et al., Research Involvement and Engagement, 2018; doi:10.1186/s40900-018-0100-8).",
        url: "https://www.nihr.ac.uk/documents/public-involvement-in-research/31771",
        doi: "10.1186/s40900-018-0100-8",
      },
      {
        name: "BrainLat",
        full: "Latin American Brain Health Institute Dataset",
        desc: "First open multimodal neuroimaging dataset of neurodegenerative diseases from Latin America: 780 participants (AD, bvFTD, PD, MS, healthy controls) across 5 countries. Organised in BIDS format, following FAIR principles, and hosted on Synapse. Highlights the critical gap in underrepresented-population neuroimaging data (Prado et al., Scientific Data, 2023; doi:10.1038/s41597-023-02806-8).",
        url: "https://doi.org/10.7303/syn51549340",
        doi: "10.1038/s41597-023-02806-8",
      },
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
          Open Science, Governance & Harmonisation
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
          An evidence-based overview of the frameworks, platforms, and consortia enabling open, diverse, 
          and reproducible Alzheimer&apos;s disease research — from the FAIR principles to federated analysis,
          data governance, and patient involvement.
        </p>
        <div className="section-divider mt-6" />
      </div>

      {/* Framing paragraph */}
      <div className="glass-card rounded-xl p-6 mb-10 border" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          Sharing data across studies is essential to ensure that results are comparable and reproducible. Differences in data acquisition, processing pipelines, and cohort composition introduce substantial variability if not addressed through standardised preprocessing, quality control, and statistical harmonisation. The development of common data models, shared ontologies, and open analytical workflows are central to large-scale AD research — as is ensuring that the communities most affected by dementia are partners, not merely subjects, in the research enterprise.
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">
          As Vilor-Tejedor et al. (2026) argue, diversity is not only an ethical goal but a scientific need — and this requires action at every level: diverse study participants, diverse research teams, culturally adapted tools, equitable data infrastructure, and community engagement embedded from research design to dissemination. Initiatives described below represent concrete progress toward this vision. (<em>Alzheimer&apos;s & Dementia</em>, 2026; doi:10.1002/alz.71069)
        </p>
      </div>

      {/* Initiatives */}
      <div className="space-y-10">
        {initiatives.map((cat) => (
          <section key={cat.category}>
            <div className="flex items-center gap-3 mb-5">
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
                    <a href={item.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-gray-600 hover:text-violet-400 shrink-0 ml-2">↗</a>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  {item.doi && (
                    <p className="text-xs text-gray-600 mt-2 font-mono">doi:{item.doi}</p>
                  )}
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
            of papers published in <em>Alzheimer&apos;s & Dementia</em> (Wiley), adapting the methodology
            established by Boudreau et al. for <em>Magnetic Resonance in Medicine</em>. The pipeline detects
            code and data sharing, geographic origin of first authors, and — uniquely for this study — 
            performs sex-specific keyword analysis to quantify the proportion of papers performing 
            sex-stratified analyses.
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
