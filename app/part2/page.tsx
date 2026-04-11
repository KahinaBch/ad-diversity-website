import WorldMap from "@/components/WorldMap";
import Link from "next/link";

export default function Part2() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#BE185D" }}>
          Part II
        </div>
        <h1 className="text-4xl font-extrabold text-gray-100 mb-4">
          Initiatives Integrating Diversity
        </h1>
        <p className="text-gray-400 text-base max-w-2xl">
          A global overview of available datasets, open-science initiatives, harmonisation pipelines,
          and reproducibility efforts in Alzheimer&apos;s disease research.
        </p>
        <div className="section-divider mt-6" />
      </div>

      {/* World Map Section */}
      <section id="world-map" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #BE185D, #7C3AED)" }}>
            🌍
          </div>
          <h2 className="text-2xl font-bold text-gray-100">
            Global Distribution of AD Datasets
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-6 ml-11">
          Bubble size is proportional to the number of documented datasets per region.
          Click any bubble or region card to explore available datasets.
        </p>
        <WorldMap />
      </section>

      <div className="section-divider mb-16" />

      {/* Sub-section navigation cards */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-200 mb-6">Explore This Section</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              href: "/part2/datasets",
              icon: "🗃️",
              title: "Dataset Catalogue",
              desc: "Filterable, sortable table of all known AD datasets with metadata, access levels, data types, and DOIs.",
              color: "#7C3AED",
            },
            {
              href: "/part2/openscience",
              icon: "🔓",
              title: "Open Science Initiatives",
              desc: "Shared atlases, harmonisation pipelines, large-scale collaborations, and reproducibility efforts.",
              color: "#BE185D",
            },
          ].map((card) => (
            <Link key={card.href} href={card.href} className="group">
              <div className="glass-card rounded-xl p-6 hover:-translate-y-1 transition-all duration-200 border"
                style={{ borderColor: card.color + "30" }}>
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-base font-bold text-gray-100 mb-2 group-hover:text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{card.desc}</p>
                <span className="text-xs font-medium" style={{ color: card.color }}>
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <Link href="/part1" className="text-sm text-gray-400 hover:text-violet-300 transition-colors">
          ← Part I: Need for Diversity
        </Link>
        <Link href="/original-research" className="btn-glow text-sm">
          Original Research →
        </Link>
      </div>
    </div>
  );
}
