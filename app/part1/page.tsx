export default function Part1() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7C3AED" }}>
          Part I
        </div>
        <h1 className="text-4xl font-extrabold text-gray-100 mb-4">
          The Need for Diversity<br />
          <span className="text-2xl font-light text-gray-400">
            in Alzheimer&apos;s Disease Research
          </span>
        </h1>
        <div className="section-divider" />
      </div>

      {/* Section 1.1 */}
      <section id="defining-ad" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-100">Defining Alzheimer&apos;s Disease</h2>
        </div>

        <div className="glass-card rounded-xl p-6 mb-5 border" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔬</span>
            <span className="text-sm font-semibold text-violet-300">Pathophysiology & Mechanisms</span>
          </div>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              <span className="font-semibold text-gray-100">Content to be populated</span> — This section will cover
              the general definition of Alzheimer&apos;s disease, its neuropathological hallmarks (amyloid-β plaques,
              neurofibrillary tau tangles, neuroinflammation, synaptic loss), current epidemiological burden, 
              and the main research strategies in the field.
            </p>
            <p className="text-gray-500 text-xs italic">
              Primary sources: Jack et al., Nat Rev Neurosci (2019); Alzheimer&apos;s Association Annual Report 2024;
              WHO Global Status Report on the Public Health Response to Dementia (2021).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: "🧠", label: "Amyloid cascade", desc: "Aβ42 oligomers trigger downstream neurodegeneration" },
            { icon: "🔗", label: "Tau pathology", desc: "Hyperphosphorylated tau forms neurofibrillary tangles" },
            { icon: "🔥", label: "Neuroinflammation", desc: "Microglial activation as both protective and harmful" },
          ].map((c) => (
            <div key={c.label} className="glass-card rounded-lg p-4 text-center border" style={{ borderColor: "rgba(167,139,250,0.1)" }}>
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-xs font-semibold text-violet-300 mb-1">{c.label}</div>
              <div className="text-xs text-gray-500">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 1.2 */}
      <section id="heterogeneous" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-100">A Highly Heterogeneous Disease</h2>
        </div>

        {/* Lancet Commission callout */}
        <div className="glass-card rounded-xl p-6 mb-5 border-l-4" style={{ borderLeftColor: "#BE185D", borderColor: "rgba(190,24,93,0.15)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#BE185D" }}>
            Key Reference — Lancet Commission
          </div>
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
            <span className="font-semibold text-gray-100">Content to be populated</span> — This section will 
            discuss the Lancet Commission reports (2017, 2020, 2024) on dementia prevention, 
            the evolution from 12 (2020) to 14 (2024) modifiable risk factors, and the evidence that 
            ~45% of dementia cases could be prevented or delayed. It will emphasise the need for 
            epidemiological research at wider scale to unlock genetic and environmental drivers.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg p-3 text-center" style={{ background: "rgba(190,24,93,0.1)" }}>
              <div className="text-2xl font-extrabold mb-1" style={{ color: "#BE185D" }}>14</div>
              <div className="text-xs text-gray-400">Modifiable risk factors (2024)</div>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ background: "rgba(190,24,93,0.1)" }}>
              <div className="text-2xl font-extrabold mb-1" style={{ color: "#BE185D" }}>~45%</div>
              <div className="text-xs text-gray-400">Dementia cases potentially preventable</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Livingston et al., <em>The Lancet</em> 2024; doi:10.1016/S0140-6736(24)01296-0 · 
            Livingston et al., <em>The Lancet</em> 2020; doi:10.1016/S0140-6736(20)30367-6
          </p>
        </div>
      </section>

      {/* Section 1.3 */}
      <section id="diversity-scope" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-100">Defining the Diversity that Impacts AD</h2>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(30,58,138,0.3)" }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: "#93C5FD" }}>
              Geographic & Ethnic Diversity
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-300">Content to be populated</span> — This subsection 
              will discuss the limitation of current research to predominantly European-descent cohorts,
              the consequence for generalisability of genetic risk variants (e.g., APOE ε4 frequency variation
              across populations), and the need for globally representative cohorts.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(190,24,93,0.3)" }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: "#F9A8D4" }}>
              Sex & Gender in AD Research
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-300">Content to be populated</span> — This subsection 
              will describe the sex disparity in AD (2:1 female:male prevalence), the biological mechanisms 
              (hormonal, genetic, inflammatory) that may explain it, and the first sex-specific AD study 
              investigating women&apos;s health specifically. Reference to be confirmed: [sex-specific study citation].
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <div />
        <a href="/part2" className="btn-glow text-sm">
          Part II: Initiatives →
        </a>
      </div>
    </div>
  );
}
