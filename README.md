# andresrossil.github.io
Professional portfolio - Business Intelligence &amp; ERP Solutions

React + Vite + TypeScript portfolio for Andrés Rossil, with Spanish and English content, professional experience and selected BI, Power Apps and SAP Business One case studies.

## Local development

Use Node.js 22.12+.

```sh
npm ci
npm run dev
```

## Validation and publication

```sh
npm run lint
npm run build
npm run preview
```

GitHub Pages deployment is defined in `.github/workflows/deploy.yml`. A push to `main` builds and deploys `dist`; the repository Pages source must be GitHub Actions.

See `CONTENT-NOTES.md` for source verification and publication status. Do not add internal business data to public assets. The Spanish CV is publicly downloadable at the user’s request.
