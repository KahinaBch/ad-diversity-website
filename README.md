# Diversity in Alzheimer's Disease Research

**GBM6330E Final Project** | KahinaBch  
🌐 [Live Site](https://kahinabch.github.io/ad-diversity-website) · 
📊 [Dataset Catalogue](https://github.com/KahinaBch/ad-dataset-catalogue) · 
🗺️ [Atlases & Harmonisation](https://github.com/KahinaBch/ad-atlases-harmonisation) · 
⚗️ [Reproducibility Audit](https://github.com/KahinaBch/ad-reproducibility-audit)

---

## Overview

This website explores the **inclusion of diversity in the prevention and diagnosis of neurodegenerative diseases**, using Alzheimer's disease as the central example.

It is structured around:

- **Part I** — The need for diversity (defining AD, its heterogeneity, scope of diversity)
- **Part II** — Initiatives integrating diversity (interactive world dataset map, catalogues, open science)
- **Original Research** — Three reproducible sub-repositories

## Architecture

```
ad-diversity-website/          ← This repo (main site)
├── ad-dataset-catalogue       ← Sub-repo 1: open dataset documentation
├── ad-atlases-harmonisation   ← Sub-repo 2: atlases & harmonisation pipelines
└── ad-reproducibility-audit   ← Sub-repo 3: reproducibility audit pipeline
```

## Tech Stack

- **Framework:** Next.js 16 (static export)
- **Styling:** Tailwind CSS
- **Visualisation:** D3.js v7 + TopoJSON
- **Deployment:** GitHub Actions → GitHub Pages
- **Language:** TypeScript

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/ad-diversity-website](http://localhost:3000/ad-diversity-website)

## Contributing

Dataset contributions are welcome via Pull Request to the [dataset catalogue sub-repository](https://github.com/KahinaBch/ad-dataset-catalogue).

## License

MIT — open source for academic use and community extension.

## Citation

If you use this platform or its data, please cite:

> KahinaBch (2025). *Diversity in Alzheimer's Disease Research*. GBM6330E Final Project. GitHub. https://github.com/KahinaBch/ad-diversity-website
