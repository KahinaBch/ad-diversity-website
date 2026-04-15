export default function Part1() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7C3AED" }}>
          Part I — State of the Art
        </div>
        <h1 className="text-4xl font-extrabold text-gray-100 mb-2">
          The Need for Diversity
        </h1>
        <p className="text-xl font-light text-gray-400 mb-4">
          in Alzheimer&apos;s Disease Research
        </p>
        <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
          Background and motivation — defining the scope of this analysis
        </p>
        <div className="section-divider mt-6" />
      </div>

      {/* ── Section 1.1 ──────────────────────────────────────────────────── */}
      <section id="defining-ad" className="mb-16 scroll-mt-20">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>1</div>
          <h2 className="text-2xl font-bold text-gray-100">Defining Alzheimer&apos;s Disease</h2>
        </div>

        {/* KEY TAKEAWAY */}
        <div className="rounded-xl p-4 mb-6 border-l-4" style={{ borderLeftColor: "#7C3AED", background: "rgba(107,33,168,0.1)" }}>
          <p className="text-sm font-semibold text-violet-200">
            Key message: AD is both extremely common and deeply complex — and that complexity is the reason why studying it in a single, narrow population is not enough.
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            Alzheimer&apos;s disease (AD) is the most common cause of dementia, accounting for 60–70% of cases worldwide. It is a progressive neurodegenerative disorder defined by two core hallmarks visible post-mortem and, increasingly, in vivo: extracellular deposits of amyloid-β (Aβ) protein forming plaques, and intracellular tangles of hyperphosphorylated tau protein. These drive widespread synaptic loss, neuroinflammation, and cortical atrophy, producing the gradual, irreversible decline in memory, language, and reasoning that defines the clinical syndrome.
          </p>
          <p>
            The dominant theoretical framework — the amyloid cascade hypothesis — holds that Aβ42 oligomers are the initiating event, triggering downstream tau pathology and neurodegeneration. Yet this model is incomplete: neuroinflammation, vascular damage, metabolic dysfunction, and genetic risk all act independently and in concert. This is not merely an academic point. It explains why the first approved anti-amyloid therapies (lecanemab, donanemab) show only modest clinical benefit: they reduce amyloid but cannot reverse the neurodegeneration that has already accumulated, often years before symptoms appear.
          </p>
          <p>
            At the population level, an estimated 55 million people worldwide live with dementia, a figure projected to exceed 150 million by 2050. More than 95% of cases are sporadic late-onset disease, where age is the primary risk factor. Fewer than 5% are caused by rare autosomal dominant mutations in <em>APP</em>, <em>PSEN1</em>, or <em>PSEN2</em>. The strongest common genetic risk factor is the <em>APOE</em> ε4 allele, which increases AD risk 3-fold in heterozygous and 8–12-fold in homozygous carriers — but crucially, its effect size varies substantially across ancestral populations, a finding that already signals the importance of diversity in genetic research.
          </p>
        </div>

        {/* Mechanism cards — no emojis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {[
            { label: "Amyloid cascade", desc: "Aβ42 oligomers trigger downstream neurodegeneration — the central, though insufficient, therapeutic target." },
            { label: "Tau pathology", desc: "Hyperphosphorylated tau forms neurofibrillary tangles; propagation follows Braak staging and correlates with cognitive decline." },
            { label: "Neuroinflammation", desc: "Chronic microglial activation drives synaptic loss independently of amyloid burden and varies across genetic backgrounds." },
          ].map((c) => (
            <div key={c.label} className="glass-card rounded-lg p-4 border" style={{ borderColor: "rgba(167,139,250,0.12)" }}>
              <div className="text-xs font-semibold text-violet-300 mb-1">{c.label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 1.2 ──────────────────────────────────────────────────── */}
      <section id="heterogeneous" className="mb-16 scroll-mt-20">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>2</div>
          <h2 className="text-2xl font-bold text-gray-100">A Highly Heterogeneous Disease</h2>
        </div>

        {/* KEY TAKEAWAY */}
        <div className="rounded-xl p-4 mb-6 border-l-4" style={{ borderLeftColor: "#BE185D", background: "rgba(190,24,93,0.08)" }}>
          <p className="text-sm font-semibold text-pink-200">
            Key message: Nearly half of all dementia cases worldwide could be prevented — but only if we study the right risk factors in the right populations. Current evidence is systematically biased toward high-income, European-descent groups, leaving most of the world&apos;s at-risk population poorly understood.
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed mb-6">
          <p>
            Alzheimer&apos;s disease is not one disease. Its clinical presentation, neuropathological severity, genetic architecture, and rate of progression vary enormously across individuals and populations. This heterogeneity matters practically: a prevention or treatment strategy calibrated to one population may be entirely ineffective — or even harmful — in another, if the underlying biological drivers differ.
          </p>
          <p>
            The Lancet Commissions on Dementia Prevention, Intervention and Care have provided the most rigorous estimates of this preventable burden. The 2020 report identified 12 modifiable risk factors — including low education, hypertension, obesity, smoking, hearing loss, depression, physical inactivity, diabetes, excessive alcohol consumption, traumatic brain injury, air pollution, and social isolation — cumulatively accounting for approximately 40% of global dementia cases (Livingston et al., <em>The Lancet</em>, 2020; doi:10.1016/S0140-6736(20)30367-6). The 2024 update added two further risk factors — untreated vision loss and elevated LDL cholesterol — revising the preventable fraction upward to approximately 45% (Livingston et al., <em>The Lancet</em>, 2024; doi:10.1016/S0140-6736(24)01296-0).
          </p>
          <p>
            These figures are both encouraging and sobering. They suggest that almost half of all dementia cases could, in principle, be prevented through modifiable lifestyle and medical interventions. But the evidence base for these estimates is drawn predominantly from high-income, European-descent populations. A subsequent analysis showed that incorporating risk factors more prevalent in diverse global contexts — poverty, wealth shocks, income inequality, and HIV — could push the preventable fraction to approximately 65%, fundamentally reshaping global prevention priorities. It also revealed a striking sex imbalance: despite dementia disproportionately affecting women, 57% of the 14 identified risk factors from the 2024 Lancet Commission are more prevalent in men, indicating that current models do not adequately reflect the biology and social context of the majority of those most affected.
          </p>
        </div>

        {/* Lancet comparison cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { year: "2020", n: "12", pct: "~40%", doi: "10.1016/S0140-6736(20)30367-6", color: "#7C3AED" },
            { year: "2024", n: "14", pct: "~45%", doi: "10.1016/S0140-6736(24)01296-0", color: "#BE185D" },
          ].map((c) => (
            <div key={c.year} className="glass-card rounded-xl p-5 border-l-4"
              style={{ borderLeftColor: c.color, borderColor: c.color + "20" }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.color }}>
                Lancet Commission {c.year}
              </div>
              <div className="text-3xl font-extrabold mb-1" style={{ color: c.color }}>{c.n}</div>
              <div className="text-xs text-gray-400 mb-2">modifiable risk factors identified</div>
              <div className="text-2xl font-bold" style={{ color: c.color }}>{c.pct}</div>
              <div className="text-xs text-gray-400 mb-3">of dementia cases potentially preventable</div>
              <div className="text-xs text-gray-600 font-mono">doi:{c.doi}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-4 border mb-6" style={{ borderColor: "rgba(190,24,93,0.2)" }}>
          <p className="text-xs text-pink-300 font-semibold mb-1">New in 2024 — Two additional risk factors:</p>
          <div className="flex gap-6 text-sm text-gray-300">
            <span><span className="text-pink-400 mr-1">▸</span>Untreated vision loss</span>
            <span><span className="text-pink-400 mr-1">▸</span>Elevated LDL cholesterol</span>
          </div>
        </div>

        {/* Lancet 2024 figure */}
        <div className="glass-card rounded-xl p-5 border" style={{ borderColor: "rgba(190,24,93,0.2)" }}>
          <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-3">
            Figure — 14 Modifiable Risk Factors Across the Life Course (Lancet Commission 2024)
          </div>
          <div className="flex justify-center">
            <img
              src="/ad-diversity-website/images/lancet2024_risk_factors.png"
              alt="Lancet 2024 Commission: 14 modifiable risk factors for dementia across the life course, totalling 45% potentially modifiable"
              className="rounded-lg max-w-sm w-full"
              style={{ maxHeight: "520px", objectFit: "contain" }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-3 italic">
            Adapted from: Livingston et al. (2024). Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission. <em>The Lancet</em>, 404(10452), 572–628.
            Bubble size represents the percentage reduction in dementia cases if that risk factor is eliminated.
          </p>
        </div>
      </section>

      {/* ── Section 1.3 ──────────────────────────────────────────────────── */}
      <section id="diversity-scope" className="mb-16 scroll-mt-20">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>3</div>
          <h2 className="text-2xl font-bold text-gray-100">Defining the Diversity that Impacts AD</h2>
        </div>

        {/* KEY TAKEAWAY */}
        <div className="rounded-xl p-4 mb-6 border-l-4" style={{ borderLeftColor: "#1E3A8A", background: "rgba(30,58,138,0.1)" }}>
          <p className="text-sm font-semibold text-blue-200">
            Key message: &quot;Diversity&quot; in AD research means three interconnected things — who is studied (ethnic and geographic diversity), how biology differs by sex, and whether the research infrastructure enables the global collaboration needed to study these differences at scale. All three are currently insufficient. And critically: <em>the issue is not that prior research is wrong — it is that findings from homogeneous cohorts have restricted applicability to most of the world.</em>
          </p>
        </div>

        {/* Definition callout */}
        <div className="glass-card rounded-xl p-5 border mb-6" style={{ borderColor: "rgba(167,139,250,0.25)" }}>
          <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-2">What do we mean by &quot;diversity&quot;?</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            In this context, diversity encompasses three distinct but interrelated dimensions: <strong className="text-violet-200">ethnic and geographic diversity</strong> (studying people from different ancestral backgrounds and world regions, where genetic risk variants, environmental exposures, and healthcare access differ substantially); <strong className="text-violet-200">sex and gender</strong> (treating biological sex as a primary variable shaping AD risk and progression, not a demographic covariate to adjust away); and <strong className="text-violet-200">data and methodological diversity</strong> (ensuring that research infrastructure, data standards, and open-science practices enable equitable global collaboration). As Vilor-Tejedor et al. argue, diversity should be valued as a driver of discovery, not as a confounder to control for (<em>Alzheimer&apos;s & Dementia</em>, 2026; doi:10.1002/alz.71069).
          </p>
        </div>

        {/* Vilor-Tejedor Figure 1 placeholder */}
        <div className="glass-card rounded-xl p-5 border mb-6" style={{ borderColor: "rgba(124,58,237,0.25)" }}>
          <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">
            Figure — Global Mismatch Between Disease Burden and Research Representation
          </div>
          <div className="rounded-lg p-8 flex flex-col items-center justify-center text-center"
            style={{ background: "rgba(30,10,60,0.6)", border: "1px dashed rgba(167,139,250,0.2)", minHeight: "180px" }}>
            <div className="text-violet-500 text-3xl mb-3">📊</div>
            <p className="text-sm text-gray-400 mb-1">Figure 1 from Vilor-Tejedor et al. (2026)</p>
            <p className="text-xs text-gray-600 max-w-md leading-relaxed">
              (A) Projected regional contributions to global dementia burden by 2050 vs. current research representation — showing how Sub-Saharan Africa and South Asia face the sharpest increases yet remain critically underrepresented. (B) Country-level representation scores across major AD cohorts (ADNI, UK Biobank, EPAD, ReDLat, AIBL, J-ADNI, LASI-DAD).
            </p>
            <p className="text-xs text-gray-700 mt-2 italic">Adapted from: Vilor-Tejedor et al. (2026). Alzheimer&apos;s & Dementia, 22(1), e71069. doi:10.1002/alz.71069</p>
          </div>
        </div>

        <div className="space-y-6">

          {/* Geographic */}
          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(30,58,138,0.3)" }}>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#93C5FD" }}>
              Geographic &amp; Ethnic Diversity — Why it matters
            </h3>
            <p className="text-xs text-gray-500 mb-3 italic">
              The same disease, studied in the same kind of people, will produce answers that only work for those people.
            </p>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Despite dementia&apos;s wide-reaching global impact, research has historically focused on Western, educated, industrialized, rich, and democratic (WEIRD) cohorts. The consequences are concrete: in 2021, 57 million people worldwide lived with dementia, with more than 60% of cases in low- and middle-income countries (LMICs) — yet the scientific evidence base overwhelmingly derives from high-income, European-descent populations. By 2050, the number of cases is expected to reach 139–153 million, with the burden growing fastest in LMICs (Vilor-Tejedor et al., 2026; doi:10.1002/alz.71069).
              </p>
              <p>
                The scientific cost of this homogeneity is concrete. Work on the local ancestry of the <em>APOE</em> locus reveals ancestry-specific nuances in the effect of <em>APOE</em> ε4 that are entirely overlooked in predominantly European datasets. A 2024 meta-analysis underscored that a majority of dementia research studies do not even report participants&apos; ethnicity or race. Among those that do, inclusion of racial and ethnic minorities remained limited. Available data indicated a higher incidence of dementia among Hispanic and African American populations in the United States, and among African Caribbean populations in the United Kingdom — but small sample sizes constrained robust analysis.
              </p>
              <p>
                Broadening scope also unlocks entirely new science. Work led by the Latin America and the Caribbean Consortium on Dementia (ReDLat) identified unique variants associated with AD and frontotemporal dementia in admixed Latin American populations — findings that would simply not have been detectable in European cohorts. The first open multimodal neuroimaging dataset of neurodegenerative diseases from Latin America (BrainLat: 780 participants, 5 countries) highlights how under-resourced this research landscape remains (Prado et al., <em>Scientific Data</em>, 2023; doi:10.1038/s41597-023-02806-8).
              </p>
            </div>
          </div>

          {/* Sex */}
          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(190,24,93,0.3)" }}>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#F9A8D4" }}>
              Sex &amp; Gender — Why it matters
            </h3>
            <p className="text-xs text-gray-500 mb-3 italic">
              Two-thirds of people with AD are women — yet sex-stratified analyses remain the exception, not the norm.
            </p>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Women bear a disproportionate burden of Alzheimer&apos;s disease — approximately two-thirds of all people living with AD worldwide. Longevity alone does not explain this gap. There is mounting evidence for sex-specific biological mechanisms: oestrogen withdrawal at menopause appears to accelerate amyloid accumulation; women carrying one <em>APOE4</em> allele face greater AD risk than men with the same genotype; immune responses to neuroinflammation differ between sexes; and the trajectory of tau propagation shows sex-specific patterns.
              </p>
              <p>
                Despite this, most AD studies treat sex as a demographic covariate to adjust away rather than as a biological variable to study. The UK Biobank Whole-Genome Sequencing study — sequencing 490,640 participants — explicitly noted that no sex-stratified analyses were performed (UK Biobank WGS Consortium, <em>Nature</em>, 2025; doi:10.1038/s41586-025-09272-9). Vilor-Tejedor et al. (2026) include sex and gender diversity as one of the core dimensions that must be prioritised in datasets, alongside ethnicity, geography, and socioeconomic status.
              </p>
              <p>
                The reproducibility audit conducted in Sub-repo 3 quantifies the proportion of papers in <em>Alzheimer&apos;s & Dementia</em> that explicitly perform sex-stratified analyses — providing the first systematic baseline for this critical methodological transition.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-lg flex items-center gap-4" style={{ background: "rgba(190,24,93,0.1)" }}>
              <div className="text-center shrink-0">
                <div className="text-2xl font-extrabold" style={{ color: "#BE185D" }}>~2:1</div>
                <div className="text-xs text-gray-400">Female-to-male AD ratio</div>
              </div>
              <div className="text-xs text-gray-400 leading-relaxed">
                Despite women comprising ~65% of AD patients, 57% of the 2024 Lancet Commission&apos;s modifiable risk factors are more prevalent in men — a mismatch that reveals how incomplete current evidence-based prevention models are for women.
              </div>
            </div>
          </div>

          {/* Vilor-Tejedor Figure 2 placeholder */}
          <div className="glass-card rounded-xl p-5 border" style={{ borderColor: "rgba(14,116,144,0.25)" }}>
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              Figure — Dimensions of Diversity in Global Dementia Research
            </div>
            <div className="rounded-lg p-8 flex flex-col items-center justify-center text-center"
              style={{ background: "rgba(10,30,40,0.6)", border: "1px dashed rgba(14,116,144,0.2)", minHeight: "160px" }}>
              <div className="text-teal-500 text-3xl mb-3">🔬</div>
              <p className="text-sm text-gray-400 mb-1">Figure 2 from Vilor-Tejedor et al. (2026)</p>
              <p className="text-xs text-gray-600 max-w-md leading-relaxed">
                Venn diagram showing how diversity across participants (ethnic/racial diversity, sex/gender, socioeconomic status), researchers (institutional and career diversity, geographic inclusion), and methods (context-aware tools, AI/ML interpretability, multimodal integration, standardised datasets, open science) converge to enable better science. Bottom map: global distribution of William H. Gates Sr. Fellowship cohort.
              </p>
              <p className="text-xs text-gray-700 mt-2 italic">Adapted from: Vilor-Tejedor et al. (2026). Alzheimer&apos;s & Dementia, 22(1), e71069. doi:10.1002/alz.71069</p>
            </div>
          </div>

          {/* Data infrastructure */}
          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(107,33,168,0.3)" }}>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#c4b5fd" }}>
              Data Infrastructure, Open Science &amp; Researcher Diversity — Why it matters
            </h3>
            <p className="text-xs text-gray-500 mb-3 italic">
              Even when diverse data exist, they are often impossible to combine — and the researchers who could interpret them most meaningfully are often shut out of the system.
            </p>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Studying diverse populations at the scale required demands large, harmonised, multi-site datasets built on open-science infrastructure. Open-access data platforms — Dementias Platform UK (DPUK, 2014), the Global Alzheimer&apos;s Association Interactive Network (GAAIN, 2012), and the Alzheimer&apos;s Disease Data Initiative (ADDI, 2020) — are reshaping how global dementia research is conducted. ADDI&apos;s ADWorkbench provides secure, cloud-based computational resources to researchers worldwide, particularly in LMICs, at no cost — directly addressing the infrastructure gap that prevents researchers in low-resource settings from participating in global science (Vilor-Tejedor et al., 2026; doi:10.1002/alz.71069).
              </p>
              <p>
                The FAIR principles (Wilkinson et al., 2016) and governance frameworks like the Five Safes (Boylan et al., 2024) provide the conceptual tools. Trusted Research Environments and federated analysis platforms (e.g., DataSHIELD) provide the technical mechanisms to pool data across jurisdictions without compromising participant privacy.
              </p>
              <p>
                Crucially, Vilor-Tejedor et al. extend the diversity argument beyond study participants to the researchers themselves. Researchers from historically underrepresented communities are better positioned to build trust with local populations, design culturally relevant studies, and advocate for neglected research priorities. The William H. Gates Sr. Fellowship (ADDI, 2023) exemplifies this by supporting early-career researchers from underrepresented regions through financial support, mentorship, and infrastructure access. Without intentional investment in researcher diversity, the cycle of underrepresentation in both leadership and scientific output will continue.
              </p>
            </div>

            {/* Key highlights from Vilor-Tejedor */}
            <div className="mt-4 p-4 rounded-lg" style={{ background: "rgba(107,33,168,0.1)", border: "1px solid rgba(107,33,168,0.2)" }}>
              <p className="text-xs font-semibold text-violet-300 mb-2">Five priorities from Vilor-Tejedor et al. (2026)</p>
              <div className="space-y-1">
                {[
                  "Prioritize representation in datasets across ethnicity, geography, sex/gender, and socio-economic status",
                  "Support early-career researchers from underrepresented regions with long-term funding and mentorship",
                  "Standardize and adapt tools (cognitive, clinical, genomic) across cultural and linguistic contexts",
                  "Promote open science through equitable, federated data sharing platforms, and embed community engagement from research design to dissemination",
                  "Value diversity as a driver of discovery, not as a confounder",
                ].map((h) => (
                  <div key={h} className="flex gap-2 text-xs text-gray-400">
                    <span className="text-violet-500 shrink-0 mt-0.5">▸</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>3</div>
          <h2 className="text-2xl font-bold text-gray-100">Defining the Diversity that Impacts AD</h2>
        </div>

        {/* KEY TAKEAWAY */}
        <div className="rounded-xl p-4 mb-6 border-l-4" style={{ borderLeftColor: "#1E3A8A", background: "rgba(30,58,138,0.1)" }}>
          <p className="text-sm font-semibold text-blue-200">
            Key message: &quot;Diversity&quot; in AD research means three interconnected things — who is studied (ethnic and geographic diversity), how biology differs by sex, and whether the research infrastructure enables the global collaboration needed to study these differences at scale. All three are currently insufficient.
          </p>
        </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <div className="text-xs text-gray-600 self-center max-w-lg">
          References: Livingston et al. 2020, 2024 (The Lancet) · Vilor-Tejedor et al. 2026 (Alzheimer&apos;s & Dementia) ·
          Prado et al. 2023 (Scientific Data) · Wilkinson et al. 2016 (Scientific Data) · 
          Boylan et al. 2024 (Lancet Digital Health) · Blackburn et al. 2018 (Res Involv Engagem) · 
          UK Biobank WGS Consortium 2025 (Nature)
        </div>
        <a href="/ad-diversity-website/part2" className="btn-glow text-sm shrink-0 ml-4">
          Part II: Initiatives →
        </a>
      </div>
    </div>
  );
}
