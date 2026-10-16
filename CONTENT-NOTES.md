# Content verification

Source: supplied Spanish CV, NESTOR ANDRES ROSSIL - BCV - ES.pdf.

- Timeline: all five positions, employers and date ranges follow the CV.
- BI: the CV documents over 20 SSIS ETL processes, over 50 Power BI dashboards and over 50 Crystal Reports/SSRS reports.
- Warehouse applications: the CV documents Power Apps for physical inventory counts and picking. These are described as warehouse support applications, without claiming a complete WMS implementation.
- SAP Business One: the CV documents three VB.NET add-ons, SQL queries, stored procedures, formatted searches and approval procedures.
- No financial savings, productivity percentages, client records, internal screenshots or proprietary code are included. At the user’s explicit request, the supplied Spanish CV is available as public/andres-rossil-cv-es.pdf for download.
- The current ERP position is listed as ongoing in the supplied CV; confirm this when updating the portfolio later.

# Publication

Local branch: `portfolio-experience`, based on the existing remote `main` history.

Validate with `npm ci`, `npm run lint` and `npm run build` using Node 22.12 or newer supported by the installed Vite version.

The included `.github/workflows/deploy.yml` builds on pushes to `main` or manual runs and publishes `dist` through GitHub Pages. In the repository, Pages must use GitHub Actions as its source. Repository settings were not verified through the API.

The user site uses the root path `/`; no repository subpath is needed. Review and merge the prepared branch into `main` to trigger publication. The approved portfolio has been published to main and GitHub Pages. Subsequent approved changes are validated before publication.

- User-confirmed SSRS experience: reverse engineering of subscription XML to implement fully automatic dynamic report distribution, using SQL tables or business actions to determine recipients without manual subscription changes; SQL Server Agent and stored procedures for process automation. No actual XML, table names, recipient data or internal configuration is published.

- Interactive BI demo: 432 deterministic synthetic single-line orders for 2024–2025. USD values are stored in integer cents. This web demo is not an Arium system or embedded Power BI. Filters and bilingual search share one selection function; prior-quarter/year comparison uses the same selection criteria. No external data or production configuration is used.
