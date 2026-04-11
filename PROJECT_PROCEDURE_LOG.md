
---

## 8. PHASE 0–5 COMPLETION RECORD

### Phase 0 — Infrastructure ✅
- Next.js 16 project created with TypeScript + Tailwind CSS
- `next.config.ts` configured: `output: "export"`, `basePath: "/ad-diversity-website"`
- GitHub Actions workflow: `.github/workflows/deploy.yml` builds and deploys to `gh-pages` branch
- All 4 Git repositories initialised locally with `main` branch

### Phase 1 — Site Skeleton ✅
- Global layout: `app/layout.tsx` with NavBar + Footer
- Color scheme: CSS variables in `app/globals.css` (purple-800, violet-600, pink-700, blue-800)
- All 7 routes created and building cleanly:
  - `/` (Home)
  - `/part1` (Need for Diversity)
  - `/part2` (Initiatives)
  - `/part2/datasets` (Dataset Catalogue)
  - `/part2/openscience` (Open Science)
  - `/original-research` (Sub-repo hub)
  - `/_not-found` (auto-generated)

### Phase 2 — Interactive Components ✅
- `components/NavBar.tsx`: sticky, glass morphism, dropdown sub-navigation, mobile burger menu
- `components/WorldMap.tsx`: D3.js v7 + TopoJSON bubble map, clickable regions, detail panel
- `components/DatasetTable.tsx`: filterable (search, access level, data type), sortable (name/year/N), expandable rows
- `components/DatasetTimeline.tsx`: collapsible chronological timeline 1958–2021, colour-coded by geographic origin
- `components/Footer.tsx`: links to all 4 repos

### Phase 3 — Sub-repo 1: Dataset Catalogue ✅
- 20 AD datasets documented with full metadata
- `data/neuroimaging_genetics.json` with validated schema
- `schema.md` with controlled vocabulary and validation rules
- `docs/contributing.md` with PR workflow instructions

### Phase 4 — Sub-repo 2: Atlases & Harmonisation ✅ (skeleton)
- Structure created, awaiting author content
- Schema defined for atlas and harmonisation pipeline entries

### Phase 5 — Sub-repo 3: Reproducibility Pipeline ✅
- 7 Python scripts implementing full 8-step pipeline:
  1. `get_ad_dois_by_year.py` — Crossref DOI retrieval
  2. `sort_ad_pdfs_by_acceptance_and_build_workbook.py` — PDF sorting + OSF workbook
  3. `scan_keywords_update_workbook.py` — open-science keyword scan (PyPDF2)
  4. `scan_sex_keywords_update_workbook.py` — **NOVEL** sex-specific keyword detection
  5. `add_affiliation_country_from_pdfs.py` — country extraction (pdfminer + pycountry)
  6. `run_ad_analysis.py` — statistics (sharing rates, chi-square, Cramér's V)
  7. `plot_ad_results.py` — 4 publication-ready matplotlib figures
- `DISCLAIMER.md` with explicit scope limitations
- `environment.yml` + `requirements.txt` for reproducibility
- `.gitignore` excluding PDFs (copyright)

### Build Verification ✅
- `npm run build` passed: 0 errors, 0 warnings
- 9 static pages generated
- All 4 repos committed to `main` branch

---

## 9. NEXT STEPS (Days 2–3)

### Remaining for Day 2
- [ ] Create the 4 repositories on GitHub (`KahinaBch/ad-diversity-website` etc.)
- [ ] Push all local repos: `git remote add origin <url> && git push -u origin main`
- [ ] Enable GitHub Pages on the main repo (Settings → Pages → GitHub Actions source)
- [ ] Verify live deployment at `https://kahinabch.github.io/ad-diversity-website`
- [ ] Provide atlas/harmonisation content → populate sub-repo 2

### Remaining for Day 3
- [ ] Write Part I scientific content (AD definition, Lancet references, diversity framing)
- [ ] Identify and cite sex-specific AD women's health study
- [ ] Populate open-science initiatives section with confirmed details
- [ ] Final cross-browser and mobile responsiveness check
- [ ] Update world-datasets.json if any corrections needed
- [ ] Final procedure log update

### Instructions to Push Repos to GitHub
```bash
# 1. Create repos on github.com (empty, no README)
# 2. Then for each repo:

cd /path/to/ad-diversity-website
git remote add origin https://github.com/KahinaBch/ad-diversity-website.git
git push -u origin main

cd /path/to/ad-dataset-catalogue
git remote add origin https://github.com/KahinaBch/ad-dataset-catalogue.git
git push -u origin main

cd /path/to/ad-atlases-harmonisation
git remote add origin https://github.com/KahinaBch/ad-atlases-harmonisation.git
git push -u origin main

cd /path/to/ad-reproducibility-audit
git remote add origin https://github.com/KahinaBch/ad-reproducibility-audit.git
git push -u origin main

# 3. On ad-diversity-website repo:
#    Settings → Pages → Source: GitHub Actions → Save
#    The deploy.yml workflow will trigger automatically on the next push.
```
