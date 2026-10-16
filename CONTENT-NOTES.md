# Content verification

Source: supplied Spanish CV, NESTOR ANDRES ROSSIL - BCV - ES.pdf.

- Timeline: all five positions, employers and date ranges follow the CV.
- BI: the CV documents over 20 SSIS ETL processes, over 50 Power BI dashboards and over 50 Crystal Reports/SSRS reports.
- Warehouse applications: the CV documents Power Apps for physical inventory counts and picking. These are described as warehouse support applications, without claiming a complete WMS implementation.
- SAP Business One: the CV documents three VB.NET add-ons, SQL queries, stored procedures, formatted searches and approval procedures.
- No financial savings, productivity percentages, client records, internal screenshots or proprietary code are included. The source CV is not copied into the public site.
- The current ERP position is listed as ongoing in the supplied CV; confirm this when updating the portfolio later.

# Publication

Local branch: `portfolio-experience`, based on the existing remote `main` history.

Validate with `npm ci`, `npm run lint` and `npm run build` using Node 22.12 or newer supported by the installed Vite version.

The included `.github/workflows/deploy.yml` builds on pushes to `main` or manual runs and publishes `dist` through GitHub Pages. In the repository, Pages must use GitHub Actions as its source. Repository settings were not verified through the API.

The user site uses the root path `/`; no repository subpath is needed. Review and merge the prepared branch into `main` to trigger publication. No push or deployment has been performed by this task.
