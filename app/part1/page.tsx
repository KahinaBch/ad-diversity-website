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
            At the population level, an estimated 55 million people worldwide live with dementia, a figure projected to exceed 150 million by 2050. More than 95% of cases are sporadic late-onset disease, where age is the primary risk factor. The strongest common genetic risk factor is the <em>APOE</em> ε4 allele, which increases AD risk 3-fold in heterozygous and 8–12-fold in homozygous carriers — but crucially, its effect size varies substantially across ancestral populations, a finding that already signals the importance of diversity in genetic research.
          </p>
        </div>

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

        <div className="rounded-xl p-4 mb-6 border-l-4" style={{ borderLeftColor: "#BE185D", background: "rgba(190,24,93,0.08)" }}>
          <p className="text-sm font-semibold text-pink-200">
            Key message: Nearly half of all dementia cases worldwide could be prevented — but only if we study the right risk factors in the right populations. Current evidence is systematically biased toward high-income, European-descent groups, leaving most of the world&apos;s at-risk population poorly understood.
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed mb-6">
          <p>
            Alzheimer&apos;s disease is not one disease. Its clinical presentation, neuropathological severity, genetic architecture, and rate of progression vary enormously across individuals and populations. This heterogeneity matters practically: a prevention or treatment strategy calibrated to one population may be entirely ineffective in another if the underlying biological drivers differ.
          </p>
          <p>
            The Lancet Commissions on Dementia Prevention, Intervention and Care have provided the most rigorous estimates of this preventable burden. The 2020 report identified 12 modifiable risk factors, cumulatively accounting for approximately 40% of global dementia cases (Livingston et al., <em>The Lancet</em>, 2020; doi:10.1016/S0140-6736(20)30367-6). The 2024 update added untreated vision loss and elevated LDL cholesterol, revising the preventable fraction upward to approximately 45% (Livingston et al., <em>The Lancet</em>, 2024; doi:10.1016/S0140-6736(24)01296-0).
          </p>
          <p>
            These figures are both encouraging and sobering. The evidence base for these estimates derives predominantly from high-income, European-descent populations. A broader analysis — incorporating risk factors more prevalent in low- and middle-income countries, and accounting for sex-related disparities — could push the preventable fraction to approximately 65%. It also reveals a striking asymmetry: despite dementia disproportionately affecting women, 57% of the 14 identified risk factors from the 2024 Commission are more prevalent in men.
          </p>
        </div>

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

        <div className="rounded-xl p-4 mb-6 border-l-4" style={{ borderLeftColor: "#1E3A8A", background: "rgba(30,58,138,0.1)" }}>
          <p className="text-sm font-semibold text-blue-200">
            Key message: &quot;Diversity&quot; in AD research means three interconnected things — who is studied (ethnic and geographic diversity), how biology differs by sex, and whether the research infrastructure enables the global collaboration needed to study these differences at scale. All three are currently insufficient. The issue is not that prior research is wrong — it is that findings from homogeneous cohorts have restricted applicability to most of the world.
          </p>
        </div>

        {/* Definition callout */}
        <div className="glass-card rounded-xl p-5 border mb-6" style={{ borderColor: "rgba(167,139,250,0.25)" }}>
          <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-2">What do we mean by &quot;diversity&quot;?</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            In this context, diversity encompasses three distinct but interrelated dimensions: <strong className="text-violet-200">ethnic and geographic diversity</strong> — studying people from different ancestral backgrounds and world regions, where genetic risk variants, environmental exposures, and healthcare access differ substantially; <strong className="text-violet-200">sex and gender</strong> — treating biological sex as a primary variable shaping AD risk and progression, not a demographic covariate to adjust away; and <strong className="text-violet-200">data and methodological diversity</strong> — ensuring that research infrastructure, data standards, and open-science practices enable equitable global collaboration. Diversity should be valued as a driver of discovery, not as a confounder to control for.
          </p>
        </div>

        {/* Figure 1 — real image */}
        <div className="glass-card rounded-xl p-5 border mb-6" style={{ borderColor: "rgba(124,58,237,0.25)" }}>
          <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">
            Figure 1 — Vilor-Tejedor et al. (2026)
          </div>
          <div className="text-sm font-semibold text-gray-200 mb-3">
            Global Mismatch Between Dementia Burden and Research Representation
          </div>
          <img
            src="/ad-diversity-website/images/vilor2026_figure1.png"
            alt="Figure 1: (A) Projected regional contributions to global dementia burden by 2050 versus current research representation. (B) Country-level representation scores across major dementia cohorts."
            className="w-full rounded-lg"
            style={{ maxWidth: "720px", display: "block", margin: "0 auto" }}
          />
          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed italic">
            <strong className="not-italic text-gray-400">(A)</strong> Bars: projected share of global dementia burden by 2050 (%) per region.
            Line: current research representation (%). Sub-Saharan Africa and South Asia face the steepest burden growth
            yet account for only 1–2% of research.{" "}
            <strong className="not-italic text-gray-400">(B)</strong> Country-level representation scores — the United States (30) and UK (25)
            dominate; Nigeria scores 1.{" "}
            Adapted from: Vilor-Tejedor et al. (2026). <em>Alzheimer&apos;s & Dementia</em>, 22(1), e71069.
            doi:10.1002/alz.71069. CC BY-NC-ND 4.0.
          </p>
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
                Despite dementia&apos;s growing global burden — 57 million cases in 2021, with more than 60% in low- and middle-income countries (LMICs), and projections reaching 139–153 million by 2050 — research has historically focused on Western, educated, industrialized, rich, and democratic (WEIRD) cohorts. The scientific cost of this homogeneity is concrete: a 2024 meta-analysis found that most dementia studies do not even report participants&apos; ethnicity or race.
              </p>
              <p>
                The major genome-wide association studies (GWAS) identifying key AD risk loci — in genes such as <em>BIN1</em>, <em>CLU</em>, <em>CR1</em>, and <em>PICALM</em> — were performed almost exclusively through European consortia (IGAP, EADB, ADGC). Allele frequencies, linkage disequilibrium patterns, and gene-environment interactions differ substantially across ancestral groups: risk variants discovered in European populations may not exist at meaningful frequency in African, Asian, or Latin American populations — and vice versa. Work on the local ancestry of the <em>APOE</em> locus reveals ancestry-specific nuances in ε4 risk that are entirely missed in homogeneous datasets.
              </p>
              <p>
                Broadening scope unlocks new science. Work led by the Latin America and the Caribbean Consortium on Dementia (ReDLat) identified unique variants associated with AD and frontotemporal dementia in admixed Latin American populations — findings simply undetectable in European cohorts. The first open multimodal neuroimaging dataset of neurodegeneration from Latin America (BrainLat: 780 participants, 5 countries) underscores how thin the evidence base remains for these populations (Prado et al., <em>Scientific Data</em>, 2023; doi:10.1038/s41597-023-02806-8).
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
                Women bear a disproportionate burden of Alzheimer&apos;s disease — approximately two-thirds of all people living with AD worldwide. Longevity alone does not explain this. There is mounting evidence for sex-specific biological mechanisms: oestrogen withdrawal at menopause appears to accelerate amyloid accumulation; women carrying one <em>APOE4</em> allele face greater AD risk than men with the same genotype; immune responses to neuroinflammation differ between sexes; and tau propagation shows sex-specific patterns.
              </p>
              <p>
                Despite this, most AD studies treat sex as a demographic covariate to adjust away, not a biological variable to study. The UK Biobank Whole-Genome Sequencing study — sequencing 490,640 participants — explicitly noted that no sex-stratified analyses were performed (UK Biobank WGS Consortium, <em>Nature</em>, 2025; doi:10.1038/s41586-025-09272-9). This is symptomatic of a field-wide gap. The result: sex-specific mechanisms remain poorly characterised, sex-tailored treatments do not exist, and prevention strategies are not optimised for the majority of those most at risk.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-lg flex items-center gap-4" style={{ background: "rgba(190,24,93,0.1)" }}>
              <div className="text-center shrink-0">
                <div className="text-2xl font-extrabold" style={{ color: "#BE185D" }}>~2:1</div>
                <div className="text-xs text-gray-400">Female-to-male AD ratio</div>
              </div>
              <div className="text-xs text-gray-400 leading-relaxed">
                Despite women comprising ~65% of AD patients, 57% of the 2024 Lancet Commission&apos;s modifiable risk factors are more prevalent in men — revealing how incomplete current evidence-based prevention models are for women.
              </div>
            </div>
          </div>

          {/* Figure 2 — real image */}
          <div className="glass-card rounded-xl p-5 border" style={{ borderColor: "rgba(14,116,144,0.25)" }}>
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
              Figure 2 — Vilor-Tejedor et al. (2026)
            </div>
            <div className="text-sm font-semibold text-gray-200 mb-3">
              Dimensions of Diversity in Global Dementia Research
            </div>
            <img
              src="/ad-diversity-website/images/vilor2026_figure2.png"
              alt="Figure 2: Global impact of dementia and historical underrepresentation. Venn diagram showing participants, researchers, and methods converging to enable better science. Gates Fellowship world map."
              className="w-full rounded-lg"
              style={{ maxWidth: "720px", display: "block", margin: "0 auto" }}
            />
            <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed italic">
              <strong className="not-italic text-gray-400">Left:</strong> Scale of the global dementia burden (57M cases; 61% in LMICs) and historical focus on non-diverse populations.{" "}
              <strong className="not-italic text-gray-400">Top right:</strong> Venn diagram — diversity across participants (ethnic/racial/sex/socioeconomic), researchers (institutional diversity, career support, geographic inclusion), and methods (open science, AI/ML, multimodal integration, community-based research) converges to enable better science.{" "}
              <strong className="not-italic text-gray-400">Bottom:</strong> Geographic reach of the William H. Gates Sr. Fellowship — a model for equitable, international capacity building.{" "}
              Adapted from: Vilor-Tejedor et al. (2026). <em>Alzheimer&apos;s & Dementia</em>, 22(1), e71069.
              doi:10.1002/alz.71069. CC BY-NC-ND 4.0.
            </p>
          </div>

          {/* Data infrastructure */}
          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(107,33,168,0.3)" }}>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#c4b5fd" }}>
              Data Infrastructure, Open Science &amp; Researcher Diversity — Why it matters
            </h3>
            <p className="text-xs text-gray-500 mb-3 italic">
              Even when diverse data exist, they are often impossible to combine — and the researchers who could interpret them most meaningfully are often excluded from the system.
            </p>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Studying diverse populations at the scale required demands large, harmonised, multi-site datasets built on open-science infrastructure. The FAIR principles — Findable, Accessible, Interoperable, Reusable (Wilkinson et al., <em>Scientific Data</em>, 2016; doi:10.1038/sdata.2016.18) — provide the conceptual foundation. Governance frameworks like the Five Safes (Boylan et al., <em>Lancet Digital Health</em>, 2024; doi:10.1016/S2589-7500(24)00028-1) and trusted research environments enable cross-national collaboration without compromising participant privacy. Open platforms such as ADDI&apos;s ADWorkbench provide free computational infrastructure to researchers in LMICs who would otherwise be structurally excluded from global science.
              </p>
              <p>
                Crucially, the diversity argument extends beyond study participants to the researchers themselves. Scientists from underrepresented communities are better positioned to build trust with local populations, design culturally relevant studies, and identify research questions that external teams simply do not ask. Without intentional investment in researcher diversity — through fellowships, mentorship, and equitable authorship — the cycle of underrepresentation in both leadership and scientific output will continue. Patient and Public Involvement and Engagement (PPIE) provides an additional mechanism for ensuring research priorities reflect the communities most affected (Blackburn et al., <em>Research Involvement and Engagement</em>, 2018; doi:10.1186/s40900-018-0100-8).
              </p>
              <p>
                Reproducibility is the third pillar. A finding is only as useful as its ability to be verified and built upon. Yet the proportion of papers in the AD literature that share code or data remains low — and, until now, unmeasured in a systematic way. If methods are not transparent, the field cannot efficiently build on them, particularly for underrepresented populations where data are already scarce.
              </p>
            </div>

            {/* Key priorities */}
            <div className="mt-4 p-4 rounded-lg" style={{ background: "rgba(107,33,168,0.1)", border: "1px solid rgba(107,33,168,0.2)" }}>
              <p className="text-xs font-semibold text-violet-300 mb-2">Five priorities — Vilor-Tejedor et al. (Alzheimer&apos;s & Dementia, 2026; doi:10.1002/alz.71069)</p>
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
