export default function Part1() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
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
          Background and motivation — defining the scope of the analysis
        </p>
        <div className="section-divider mt-6" />
      </div>

      {/* Section 1.1 — Defining AD */}
      <section id="defining-ad" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-100">Defining Alzheimer&apos;s Disease</h2>
        </div>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            Alzheimer&apos;s disease (AD) is the most common cause of dementia, accounting for 60–70% of all dementia
            cases worldwide. It is a progressive neurodegenerative disorder characterised by the gradual decline of
            memory, language, and executive function, ultimately leading to complete dependence in activities of daily
            living. Neuropathologically, AD is defined by the accumulation of extracellular amyloid-β (Aβ) plaques and
            intracellular neurofibrillary tangles composed of hyperphosphorylated tau protein, accompanied by
            widespread synaptic loss, neuroinflammation, and cortical atrophy.
          </p>
          <p>
            The prevailing theoretical framework — the amyloid cascade hypothesis — posits that Aβ42 oligomers
            represent the initiating pathological event, triggering a downstream cascade of tau pathology, microglial
            activation, and neurodegeneration. However, it is now recognised that this model is insufficient to explain
            the full clinical and biological heterogeneity of the disease, and that neuroinflammation, vascular damage,
            synaptic dysfunction, and genetic architecture all play independent and intersecting roles. Current therapeutic
            strategies reflect this complexity: anti-amyloid immunotherapies (lecanemab, donanemab) have achieved
            modest clinical benefits in early-stage disease, underscoring both the validity of the amyloid target and the
            challenge of intervening at a stage where irreversible neurodegeneration has already begun.
          </p>
          <p>
            Epidemiologically, an estimated 55 million people worldwide live with dementia, a number projected to
            exceed 150 million by 2050 as populations age. The vast majority of AD cases (&gt;95%) are sporadic
            late-onset, with age as the primary risk factor, while fewer than 5% are caused by autosomal dominant
            mutations in <em>APP</em>, <em>PSEN1</em>, or <em>PSEN2</em>. The apolipoprotein E ε4 (<em>APOE4</em>) allele
            remains the strongest known genetic risk factor for late-onset AD, increasing risk 3-fold in heterozygous
            and 8–12-fold in homozygous carriers, though its effect size varies substantially across ancestral populations.
          </p>
        </div>

        {/* Mechanism cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {[
            { label: "Amyloid cascade", desc: "Aβ42 oligomers trigger downstream neurodegeneration — the central therapeutic target" },
            { label: "Tau pathology", desc: "Hyperphosphorylated tau forms neurofibrillary tangles; propagation follows Braak staging" },
            { label: "Neuroinflammation", desc: "Chronic microglial activation drives synaptic loss independently of amyloid burden" },
          ].map((c) => (
            <div key={c.label} className="glass-card rounded-lg p-4 border" style={{ borderColor: "rgba(167,139,250,0.12)" }}>
              <div className="text-xs font-semibold text-violet-300 mb-1">{c.label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 1.2 — Heterogeneous Disease */}
      <section id="heterogeneous" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-100">A Highly Heterogeneous Disease</h2>
        </div>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed mb-6">
          <p>
            One of the most consequential realisations of the past decade is that Alzheimer&apos;s disease is not a single,
            uniform entity. Clinical presentation, neuropathological burden, genetic architecture, and disease trajectory
            vary substantially across individuals and populations, reflecting a complex interplay of genetic susceptibility,
            environmental exposures, lifestyle factors, and biological sex. This heterogeneity has profound implications
            for prevention, diagnosis, and treatment — strategies developed in homogeneous European-descent cohorts
            may not generalise to the world&apos;s most diverse populations, where risk factor prevalence, environmental
            exposures, and genetic backgrounds differ dramatically.
          </p>
          <p>
            The landmark Lancet Commission reports have systematically quantified the preventable burden of dementia.
            The 2020 report identified 12 modifiable risk factors — including low education, hypertension, obesity,
            smoking, hearing loss, depression, physical inactivity, diabetes, excessive alcohol consumption, traumatic
            brain injury, air pollution, and social isolation — accounting for approximately 40% of global dementia cases
            (Livingston et al., <em>The Lancet</em>, 2020; doi:10.1016/S0140-6736(20)30367-6). The 2024 update expanded
            this list to 14 risk factors, adding untreated vision loss and elevated LDL cholesterol, and revised the
            preventable fraction upward to approximately 45% (Livingston et al., <em>The Lancet</em>, 2024;
            doi:10.1016/S0140-6736(24)01296-0).
          </p>
          <p>
            These estimates carry a critical caveat: the evidence base underpinning them is drawn predominantly from
            high-income, European-descent populations. A subsequent analysis demonstrated that by incorporating
            additional risk factors more prevalent in diverse global populations — including poverty, wealth shocks,
            income inequality, and HIV infection, and by accounting for sex- and gender-related disparities — the
            proportion of preventable dementia cases could rise to approximately 65%. Crucially, despite dementia
            disproportionately affecting women, 57% of the risk factors identified in the 2024 Lancet Commission
            report are more prevalent in men, highlighting the insufficiency of existing models to guide equitable
            prevention strategies for women and for populations in low- and middle-income countries (LMICs).
          </p>
        </div>

        {/* Lancet Commission cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-xl p-5 border-l-4" style={{ borderLeftColor: "#7C3AED", borderColor: "rgba(124,58,237,0.15)" }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#7C3AED" }}>
              Lancet Commission 2020
            </div>
            <div className="text-3xl font-extrabold mb-1" style={{ color: "#7C3AED" }}>12</div>
            <div className="text-xs text-gray-400 mb-2">modifiable risk factors</div>
            <div className="text-2xl font-bold" style={{ color: "#7C3AED" }}>~40%</div>
            <div className="text-xs text-gray-400">of dementia cases potentially preventable</div>
            <div className="text-xs text-gray-600 mt-3">doi:10.1016/S0140-6736(20)30367-6</div>
          </div>
          <div className="glass-card rounded-xl p-5 border-l-4" style={{ borderLeftColor: "#BE185D", borderColor: "rgba(190,24,93,0.15)" }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#BE185D" }}>
              Lancet Commission 2024
            </div>
            <div className="text-3xl font-extrabold mb-1" style={{ color: "#BE185D" }}>14</div>
            <div className="text-xs text-gray-400 mb-2">modifiable risk factors</div>
            <div className="text-2xl font-bold" style={{ color: "#BE185D" }}>~45%</div>
            <div className="text-xs text-gray-400">of dementia cases potentially preventable</div>
            <div className="text-xs text-gray-600 mt-3">doi:10.1016/S0140-6736(24)01296-0</div>
          </div>
        </div>

        {/* Lancet 2024 figure */}
        <div className="mt-6 glass-card rounded-xl p-5 border" style={{ borderColor: "rgba(190,24,93,0.2)" }}>
          <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-3">
            Figure — Lancet Commission 2024: 14 Modifiable Risk Factors Across the Life Course
          </div>
          <div className="flex justify-center">
            <img
              src="/ad-diversity-website/images/lancet2024_risk_factors.png"
              alt="Lancet 2024 Commission: 14 modifiable risk factors for dementia across the life course, totalling 45% potentially modifiable cases"
              className="rounded-lg max-w-sm w-full"
              style={{ maxHeight: "520px", objectFit: "contain" }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-3 italic">
            Adapted from: Livingston et al. (2024). Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission.{" "}
            <em>The Lancet</em>, 404(10452), 572–628. doi:10.1016/S0140-6736(24)01296-0.
            Bubble size represents percentage reduction in dementia cases if that risk factor is eliminated.
          </p>
        </div>

        <div className="glass-card rounded-xl p-5 border mt-4" style={{ borderColor: "rgba(190,24,93,0.2)" }}>
          <div className="text-xs font-semibold text-pink-400 mb-2">New in 2024 — Two additional risk factors identified:</div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-pink-400">▸</span> Untreated vision loss
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-pink-400">▸</span> Elevated LDL cholesterol
            </div>
          </div>
        </div>
      </section>

      {/* Section 1.3 — Defining Diversity */}
      <section id="diversity-scope" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-100">Defining the Diversity that Impacts AD</h2>
        </div>

        <div className="space-y-6">
          {/* Geographic & ethnic */}
          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(30,58,138,0.3)" }}>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#93C5FD" }}>
              <span>🌍</span> Geographic & Ethnic Diversity
            </h3>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                The research landscape for Alzheimer&apos;s disease is heavily skewed towards populations of European
                descent. The major genome-wide association studies (GWAS) that identified key AD risk loci —
                including variants in <em>BIN1</em>, <em>CLU</em>, <em>CR1</em>, <em>PICALM</em>, and dozens of others —
                were conducted almost exclusively in European cohorts through consortia such as IGAP, EADB, and ADGC.
                This creates a fundamental problem: allele frequencies, linkage disequilibrium patterns, and
                gene-environment interactions differ substantially across ancestral groups, meaning that
                risk variants identified in European populations may have limited predictive validity in
                African, Asian, Latin American, or South Asian populations.
              </p>
              <p>
                The burden of this limitation falls disproportionately on populations already facing the greatest
                dementia burden. Latin America is projected to experience a 220% increase in dementia prevalence
                by 2050 — far exceeding projections for Europe (7.7%) or North America (12.1%). Yet the BrainLat
                project, the first regional multimodal neuroimaging dataset of neurodegenerative diseases from
                Latin America, involving 780 participants across five countries (Argentina, Chile, Colombia, Mexico, Peru),
                serves as a stark reminder of how under-resourced this research landscape remains
                (Prado et al., <em>Scientific Data</em>, 2023; doi:10.1038/s41597-023-02806-8).
              </p>
              <p>
                Addressing this gap requires not only recruiting more diverse cohorts but adopting appropriate
                data infrastructure. The FAIR data principles — that research data be Findable, Accessible,
                Interoperable, and Reusable — provide a framework for maximising the scientific value of diverse
                datasets across international boundaries (Wilkinson et al., <em>Scientific Data</em>, 2016;
                doi:10.1038/sdata.2016.18).
              </p>
            </div>
          </div>

          {/* Sex & Gender */}
          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(190,24,93,0.3)" }}>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#F9A8D4" }}>
              <span>♀</span> Sex & Gender in AD Research
            </h3>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Women bear a disproportionate burden of Alzheimer&apos;s disease: approximately two-thirds of all people
                living with AD worldwide are women. This disparity is only partially explained by women&apos;s longer
                life expectancy. Growing evidence points to biological sex differences in AD pathophysiology —
                including hormonal influences (oestrogen withdrawal at menopause accelerating amyloid accumulation),
                sex-specific <em>APOE4</em> interactions (women carrying one <em>APOE4</em> allele face greater AD risk
                than men with the same genotype), immune system differences, and distinct patterns of tau propagation.
              </p>
              <p>
                Despite this, sex-stratified analyses remain rare in the published AD literature. Most cohort studies
                use sex as a covariate rather than as a primary analytical variable, obscuring sex-specific biological
                mechanisms and limiting the development of targeted interventions. The UK Biobank
                Whole-Genome Sequencing project — sequencing 490,640 participants — explicitly noted that while
                biological sex was included as a covariate in association analyses, no gender-based analyses were
                performed (UK Biobank WGS Consortium, <em>Nature</em>, 2025; doi:10.1038/s41586-025-09272-9),
                illustrating the persistent gap.
              </p>
              <p>
                Progress is being made. A major sex-specific initiative is the Women&apos;s Brain Project, which promotes
                the study of sex and gender differences in brain health and dementia. Their advocacy, combined with
                the NIH mandate on &quot;sex as a biological variable,&quot; is gradually shifting research practice.
                The reproducibility audit conducted as part of this project (Sub-repo 3) quantifies the current
                proportion of <em>Alzheimer&apos;s & Dementia</em> papers that explicitly perform sex-stratified analyses —
                providing a baseline for tracking this critical methodological transition.
              </p>
            </div>

            {/* Key stat */}
            <div className="mt-4 p-3 rounded-lg flex items-center gap-4" style={{ background: "rgba(190,24,93,0.1)" }}>
              <div className="text-center">
                <div className="text-2xl font-extrabold" style={{ color: "#BE185D" }}>~2:1</div>
                <div className="text-xs text-gray-400">Female-to-male AD ratio</div>
              </div>
              <div className="text-xs text-gray-400 leading-relaxed flex-1">
                Despite women comprising ~65% of people living with AD, 57% of modifiable risk factors identified
                in the 2024 Lancet Commission are more prevalent in men — revealing a systematic gap in
                sex-inclusive evidence.
              </div>
            </div>
          </div>

          {/* Data infrastructure */}
          <div className="glass-card rounded-xl p-6 border" style={{ borderColor: "rgba(107,33,168,0.3)" }}>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#c4b5fd" }}>
              <span>🔬</span> The Role of Data Infrastructure
            </h3>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Addressing the diversity gap in AD research is not only a scientific imperative but a
                data infrastructure challenge. Datasets that are FAIR (Findable, Accessible, Interoperable, Reusable)
                enable researchers globally to build upon existing evidence, conduct harmonised analyses, and avoid
                duplication. The Five Safes framework — Safe People, Safe Projects, Safe Settings, Safe Data,
                Safe Outputs — developed by the UK&apos;s Office for National Statistics, provides an
                internationally recognised model for balancing data access with participant privacy
                (Boylan et al., <em>Lancet Digital Health</em>, 2024; doi:10.1016/S2589-7500(24)00028-1).
              </p>
              <p>
                Trusted Research Environments (TREs) and federated analysis approaches (e.g., DataSHIELD) are
                increasingly adopted to enable international collaboration without centralising sensitive data.
                These approaches are especially relevant for AD research, where cross-national datasets are needed
                to power analyses of diverse populations while complying with varying national data protection
                frameworks. Patient and Public Involvement and Engagement (PPIE) in research design further
                ensures that diverse communities can participate meaningfully in the studies that affect them
                (Blackburn et al., <em>Research Involvement and Engagement</em>, 2018;
                doi:10.1186/s40900-018-0100-8).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t" style={{ borderColor: "rgba(167,139,250,0.15)" }}>
        <div className="text-xs text-gray-600 self-center">
          References: Livingston et al. 2020, 2024 (Lancet); Prado et al. 2023 (Sci Data); 
          Wilkinson et al. 2016 (Sci Data); Boylan et al. 2024 (Lancet Digital Health); 
          Blackburn et al. 2018 (Res Involv Engagem); UK Biobank WGS Consortium 2025 (Nature)
        </div>
        <a href="/part2" className="btn-glow text-sm shrink-0 ml-4">
          Part II: Initiatives →
        </a>
      </div>
    </div>
  );
}
