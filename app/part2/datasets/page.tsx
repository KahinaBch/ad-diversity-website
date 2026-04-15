import DatasetTable from "@/components/DatasetTable";
import DatasetTimeline from "@/components/DatasetTimeline";

export default function DatasetsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7C3AED" }}>
          Part II — Datasets
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 mb-3">
          AD Dataset Catalogue
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
          A comprehensive, community-maintained catalogue of datasets available for Alzheimer&apos;s disease research.
          Covers neuroimaging, genetics, proteomics, exposomics and beyond.
          Contributions welcome via{" "}
          <a
            href="https://github.com/KahinaBch/ad-dataset-catalogue"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 underline"
          >
            GitHub Pull Request
          </a>.
        </p>
        <div className="section-divider mt-6" />
      </div>

      {/* Historical Timeline */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-bold text-gray-200">Historical Chronology of AD Datasets</h2>
          <span className="text-xs px-2 py-0.5 rounded-full text-violet-300 border"
            style={{ borderColor: "rgba(167,139,250,0.3)", background: "rgba(107,33,168,0.15)" }}>
            1958 – 2021
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Click any entry to expand. The timeline reflects the first publication / establishment date of each dataset.
        </p>
        <DatasetTimeline />
      </section>

      <div className="section-divider mb-14" />

      {/* Dataset Table — Neuroimaging & Genetics */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-200 mb-1">
              Neuroimaging, Genetics & Multi-modal Datasets
            </h2>
            <p className="text-sm text-gray-500">
              Filter, sort, and search across all documented datasets. Click a row to expand details and notes.
            </p>
          </div>
          <a
            href="https://github.com/KahinaBch/ad-dataset-catalogue"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 border shrink-0"
            style={{ borderColor: "rgba(167,139,250,0.3)", background: "rgba(107,33,168,0.1)" }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Contribute
          </a>
        </div>
        <DatasetTable />
      </section>

      <div className="section-divider mb-14" />

      {/* Proteomics & Emerging Modalities */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-200 mb-4">
          Proteomics, Exposomics & Emerging Modalities
        </h2>

        <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(30,58,138,0.3)" }}>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Beyond neuroimaging and genetics, a new wave of datasets now incorporates proteomics (CSF and plasma, e.g. ROSMAP, Knight ADRC), transcriptomics (brain tissue RNA-seq via AMP-AD), epigenomics (DNA methylation), and exposomics (environmental exposure indices, notably UK Biobank). The integration of these modalities into a single analytical framework is increasingly necessary to capture the full biological complexity of AD and to identify population-specific mechanisms that single-modality studies miss.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🧪", label: "Proteomics", example: "ROSMAP, Knight ADRC, EMIF-AD" },
              { icon: "🌿", label: "Exposomics", example: "UK Biobank" },
              { icon: "🧬", label: "Transcriptomics", example: "ROSMAP, AMP-AD" },
              { icon: "🔬", label: "Epigenomics", example: "ROSMAP, ADNI" },
            ].map((m) => (
              <div key={m.label} className="rounded-lg p-3 text-center border"
                style={{ background: "rgba(30,58,138,0.1)", borderColor: "rgba(59,130,246,0.2)" }}>
                <div className="text-xl mb-1">{m.icon}</div>
                <div className="text-xs font-semibold text-blue-300 mb-1">{m.label}</div>
                <div className="text-xs text-gray-500">{m.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
