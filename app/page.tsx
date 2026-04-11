import Link from "next/link";

const sections = [
  {
    part: "Part I",
    title: "The Need for Diversity",
    desc: "Defining Alzheimer's disease, its heterogeneity, and why diverse populations are essential for advancing research.",
    href: "/part1",
    color: "#7C3AED",
    icon: "🧬",
    items: ["Defining AD & core mechanisms", "A highly heterogeneous disease", "Diversity that impacts AD"],
  },
  {
    part: "Part II",
    title: "Initiatives Integrating Diversity",
    desc: "An interactive overview of global datasets, open-science efforts, harmonisation pipelines, and reproducibility initiatives.",
    href: "/part2",
    color: "#BE185D",
    icon: "🌍",
    items: ["Interactive world dataset map", "Neuroimaging & genetics catalogue", "Proteomics & exposomics", "Open science & harmonisation"],
  },
  {
    part: "Original Research",
    title: "Reproducible Science",
    desc: "Three independent reproducible research sub-repositories contributing original analyses.",
    href: "/original-research",
    color: "#1E3A8A",
    icon: "⚗️",
    items: ["Dataset open documentation", "Atlases & harmonisation catalogue", "Reproducibility audit of A&D journal"],
  },
];

const stats = [
  { value: "31+", label: "Documented datasets", color: "#7C3AED" },
  { value: "6", label: "World regions covered", color: "#BE185D" },
  { value: "20+", label: "Countries represented", color: "#1E3A8A" },
  { value: "3", label: "Open sub-repositories", color: "#0E7490" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "#7C3AED" }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: "#BE185D" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "#1E3A8A" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Course badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{ borderColor: "rgba(167,139,250,0.3)", background: "rgba(107,33,168,0.15)", color: "#c4b5fd" }}>
            GBM6330E — Final Project
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            <span className="gradient-text">Diversity</span>
            <br />
            <span className="text-gray-100">in Alzheimer&apos;s Disease</span>
            <br />
            <span className="text-gray-300 text-3xl sm:text-4xl font-light">Research</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-3 leading-relaxed">
            Inclusion of diversity in the prevention and diagnosis of neurodegenerative diseases —
            the example of Alzheimer&apos;s disease.
          </p>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mb-10">
            An interactive, reproducible, open-science platform linking datasets, atlases,
            harmonisation pipelines, and an original reproducibility audit.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/part1" className="btn-glow text-sm">
              Start Reading →
            </Link>
            <Link href="/part2/datasets" 
              className="px-5 py-2.5 rounded-lg text-sm font-medium border text-violet-300 hover:text-white hover:border-violet-500 transition-all"
              style={{ borderColor: "rgba(167,139,250,0.3)" }}>
              Explore Datasets
            </Link>
            <a
              href="https://github.com/KahinaBch/ad-diversity-website"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-medium border text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center gap-2"
              style={{ borderColor: "rgba(107,114,128,0.3)" }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-5 text-center">
              <div className="text-3xl font-extrabold mb-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Section cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-200 mb-2">Project Structure</h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            Three interconnected parts, each with dedicated sub-repositories.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {sections.map((s) => (
              <Link key={s.href} href={s.href} className="group">
                <div
                  className="glass-card rounded-2xl p-6 h-full hover:border-opacity-40 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: s.color + "30",
                    borderWidth: "1px",
                  }}
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: s.color }}
                  >
                    {s.part}
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-white transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                        <span style={{ color: s.color }} className="mt-0.5">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="mt-5 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: s.color }}
                  >
                    Explore section →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Rationale callout */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-8 text-center border" style={{ borderColor: "rgba(190,24,93,0.2)" }}>
          <div className="text-2xl mb-3">⚠️</div>
          <h3 className="text-lg font-bold text-gray-200 mb-3">Why diversity matters in AD research</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            The 2024 Lancet Commission identified{" "}
            <span style={{ color: "#BE185D" }} className="font-semibold">14 modifiable risk factors</span>{" "}
            accounting for ~45% of dementia cases worldwide — yet the majority of evidence comes
            from high-income, predominantly European-descent cohorts. Genetic, environmental, and
            sex-specific risk factors remain poorly characterised in underrepresented populations.
          </p>
          <p className="text-gray-500 text-xs">
            Livingston et al., <em>The Lancet</em> 2024 · doi:10.1016/S0140-6736(24)01296-0
          </p>
        </div>
      </section>
    </div>
  );
}
