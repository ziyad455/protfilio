# Full SEO Audit — Ziyad Tber Portfolio

Audit date: 2026-08-21

Live site: https://ziyadtber.netlify.app/

Scope: production HTTP behavior and local React/Vite source

## Executive summary

- Baseline SEO health: **36/100**
- Projected after the repository fixes are deployed: **70/100**
- Business type: personal software-engineering portfolio
- Content quality: 64/100
- E-E-A-T: 68/100
- AI/GEO readiness before fixes: 24/100
- Core Web Vitals: not measured; no CrUX/PageSpeed credentials were configured and Lighthouse was not run

The strongest problems were production deep routes returning HTTP 404, an empty client-rendered HTML shell, and the complete absence of canonical, social, discovery, and structured metadata. The repository now contains safe fixes for routing, metadata, schema, discovery files, headings, landmarks, selected image signals, and SEO-related accessibility. The live site is unchanged until a future deployment.

## Critical

1. **Production deep routes return HTTP 404.** `/works`, the bespoke case studies, and all generic project routes failed on direct request. Fixed locally with allowlisted Netlify rewrites for known routes while preserving genuine 404 responses for unknown URLs.
2. **Meaningful page content is JavaScript-rendered.** The live homepage response is a 459-byte shell with an empty root element. This remains an architectural limitation: prerendering or static generation is required for reliable non-JavaScript and AI crawler access.

## High

1. The deployed title is the misspelled `protfilio`; description, canonical, robots meta, Open Graph, Twitter cards, and JSON-LD are absent. Fixed locally with factual homepage metadata and route-aware rendered metadata.
2. `robots.txt` and `sitemap.xml` return 404. Fixed locally with current-domain discovery files covering 12 canonical routes.
3. No entity markup exists. Fixed locally with `WebSite`, `ProfilePage`, `Person`, `CollectionPage`, and `CreativeWork` JSON-LD using existing portfolio facts.
4. The active CV PDF contains an embedded link to `https://ziyadprotfilo.netlify.app/`. This remains because the repository has no editable CV source and raw PDF byte replacement risks corrupting the document.

## Medium

1. `/works` lacked an `h1`; generic detail pages jumped from `h1` to `h3`. Fixed locally.
2. Home, Works, and generic detail pages lacked a `main` landmark. Fixed locally.
3. Fifteen referenced images exceed 500 KB and twelve exceed 1 MB. The largest are approximately 2.0–2.15 MB. Responsive WebP/AVIF conversion remains recommended.
4. The hero portrait lacked intrinsic dimensions, high fetch priority, and descriptive alt text. Fixed locally.
5. Google Fonts were loaded through CSS `@import`. Fixed locally with document-level stylesheet loading and preconnects.
6. The legacy `/works/project-3` page duplicates the Nexus subject. Fixed locally with a permanent redirect to the canonical Nexus case study.
7. Generic project slugs such as `/works/project-1` remain unclear. Renaming them requires a deliberate migration with permanent redirects.

## Low

1. Icon-only social links and one-letter home links needed explicit accessible names. Fixed locally.
2. External detail-page links opened new tabs without explicit `noopener noreferrer`. Fixed locally.
3. The hero portrait exposed non-semantic click behavior pointing to `#`. Fixed locally by removing the false action while preserving its presentation.
4. The custom SVG favicon is valid and returns 200. Apple touch icons and a manifest remain optional enhancements.

## Confirmed passes

- HTTPS works; HTTP redirects to HTTPS.
- HSTS is enabled.
- Viewport metadata and `lang="en"` are present.
- Unknown production URLs return genuine HTTP 404 responses.
- Bespoke case studies contain clear roles, contribution boundaries, and descriptive image alternatives.
- Internal link structure is coherent in source.

## Validation and limitations

- Focused ESLint on all changed TypeScript/TSX files: passed.
- Production build and TypeScript compilation: passed.
- Built SEO artifacts and local HTTP smoke test for the homepage, robots, and sitemap: passed.
- Repository-wide ESLint: failed on 12 pre-existing errors in untouched shared UI/context files and one existing warning.
- `git diff --check`: passed.
- JSON-LD parsed successfully; canonical, Open Graph, Twitter, robots, and sitemap assertions passed.
- Sitemap contains 12 unique current-domain URLs.
- No browser rendering, Lighthouse, accessibility suite, visual test, GSC inspection, or deployment was performed.
- The live site remains unchanged until the user deploys these repository changes.
