import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-purple-900/30" style={{ background: "var(--bg-card)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center text-white font-bold text-xs">
                AD
              </div>
              <span className="font-semibold text-violet-200 text-sm">GBM6330E Final Project</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">
              Inclusion of diversity in the prevention and diagnosis of neurodegenerative diseases — the example of Alzheimer&apos;s disease.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Built by{" "}
              <a href="https://www.linkedin.com/in/kahina-baouche" target="_blank" rel="noopener noreferrer"
                className="text-violet-400 font-medium hover:text-violet-300 transition-colors">Kahina Baouche</a>{" "}
              in the context of{" "}
              <a
                href="https://gbm6330.edublogs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 underline hover:text-violet-300"
              >
                GBM6330E: Emerging Biomedical Technologies
              </a>
              {" "}of Dr. Nikola Stikov at Polytechnique Montréal.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Part I — Need for Diversity", href: "/part1" },
                { label: "Part II — Initiatives", href: "/part2" },
                { label: "Dataset Catalogue", href: "/part2/datasets" },
                { label: "Open Science", href: "/part2/openscience" },
                { label: "Original Research", href: "/original-research" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-gray-400 hover:text-violet-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Repositories */}
          <div>
            <h4 className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-3">Repositories</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Main Website", href: "https://github.com/KahinaBch/ad-diversity-website" },
                { label: "Dataset Catalogue", href: "https://github.com/KahinaBch/ad-dataset-catalogue" },
                { label: "Atlases & Harmonisation", href: "https://github.com/KahinaBch/ad-atlases-harmonisation" },
                { label: "Reproducibility Audit", href: "https://github.com/KahinaBch/ad-reproducibility-audit" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2025 KahinaBch — GBM6330E. Open-source under MIT License.</p>
          <p>Built with Next.js · Deployed on GitHub Pages · Data from public scientific sources.</p>
        </div>
      </div>
    </footer>
  );
}
