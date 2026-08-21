# SEO Action Plan

## Critical

- Deploy the reviewed repository changes when ready, then verify every sitemap URL returns 200 and unknown URLs still return 404.
- Add prerendering/static generation for the finite public route set so headings, content, links, canonicals, and route-specific social metadata are present in initial HTML.

## High

- Update the portfolio hyperlink in the editable CV source to `https://ziyadtber.netlify.app/`, re-export the PDF, and replace `src/assets/cv_en (1).pdf.pdf`.
- If the old Netlify site is still controllable, configure a site-level permanent redirect from `ziyadprotfilo.netlify.app` to the new homepage.
- Submit the deployed sitemap in Google Search Console and Bing Webmaster Tools, then request indexing for the homepage and key case studies.

## Medium

- Convert oversized screenshots to appropriately sized WebP/AVIF variants; retain original high-detail diagrams only where zoom quality requires them.
- Measure mobile and desktop LCP, INP, and CLS after deployment using PageSpeed Insights or CrUX.
- Stop the hero animation loop when off-screen or inactive and respect `prefers-reduced-motion`.
- Initialize AOS once instead of once per section.
- Consider descriptive project slugs through a planned permanent-redirect migration.

## Low

- Create a dedicated 1200×630 social preview image based only on existing branding and factual content.
- Add an Apple touch icon and web manifest if installability or richer device presentation is desired.
- Add verified case-study dates or measurable outcomes only when evidence is available.
