# Technical SEO Audit Templates

Use one shape throughout: evidence -> checks -> issues -> fix -> score.

## Shared Conventions

- Status: `PASS`, `RISK`, `FAIL`
- Severity: `P0`, `P1`, `P2`
- Section scores: `/10`
- Final score: `/100`

## Step 1: Scope

Capture:
- domain or URL
- audit mode
- deployment context
- evidence sources
- constraints

## Step 2: Crawlability

Check:
- robots rules
- crawl traps
- blocked assets
- discoverable internal navigation
- obvious JS-only dependency risks

## Step 3: Indexability

Check:
- `noindex`
- canonical conflicts
- duplicate variants
- soft-404 patterns
- thin or empty template pages

## Step 4: Redirects and Canonicals

Check:
- redirect chains
- protocol and host normalization
- trailing slash consistency
- canonical self-reference or mismatch

## Step 5: Robots and Sitemaps

Check:
- sitemap validity
- sitemap freshness
- robots syntax
- unwanted blocks
- missing references between robots and sitemap

## Step 6: Performance and Rendering

Check what can actually be supported by evidence:
- render-blocking assets
- oversized images
- script weight
- lazy loading
- critical CSS or JS problems
- hydration or SPA discoverability issues

## Step 7: Mobile and International

Check:
- viewport setup
- mobile navigation hazards
- hreflang presence or conflicts
- locale routing consistency

## Step 8: Structured Data and Security

Check:
- schema presence
- schema obvious errors
- HTTPS and mixed content observations
- security headers only if visible from provided config

## Step 9: Final Summary

Use this scorecard:

| Area | Score | Top Issue | First Fix |
|---|:---:|---|---|
| Crawlability | [X]/10 | [issue] | [fix] |
| Indexability | [X]/10 | [issue] | [fix] |
| Redirects/Canonicals | [X]/10 | [issue] | [fix] |
| Robots/Sitemaps | [X]/10 | [issue] | [fix] |
| Performance | [X]/10 | [issue] | [fix] |
| Mobile/Intl | [X]/10 | [issue] | [fix] |
| Schema/Security | [X]/10 | [issue] | [fix] |

Then finish with:
- overall score
- top `P0`, `P1`, `P2`
- deployment order
- recheck list after fixes

