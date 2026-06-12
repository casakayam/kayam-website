---
name: meta-tags-optimizer
description: Create or improve title tags, meta descriptions, Open Graph tags, and Twitter card tags for a live page, pasted content, or local HTML file. Use when Codex needs CTR-oriented metadata options, social-sharing tags, or implementation-ready meta tag blocks without rewriting the full page.
license: Apache-2.0
metadata:
  source: "Adapted from C:\\Users\\Administrator\\.claude\\skills\\meta-tags-optimizer"
---

# Meta Tags Optimizer

Create metadata that matches page intent, improves clickability, and is ready to paste into HTML.

## Workflow

1. Gather the page input.
   Accept:
   - a live URL
   - pasted page copy
   - a local HTML file
   - current meta tags to improve

2. Capture positioning.
   Identify:
   - primary keyword
   - page type
   - audience
   - value proposition
   - CTA

3. Generate metadata options.
   Produce:
   - 3 title options
   - 3 meta description options
   - one recommended winner pair

4. Create implementation-ready social tags.
   Include when relevant:
   - Open Graph tags
   - Twitter card tags
   - canonical
   - robots

5. Explain why the winning version is strongest.

## Decision Rules

- Label performance assumptions as estimated, not measured.
- Do not invent CTR data or SERP behavior.
- If the user only wants one polished final option, still think in variants internally before choosing.
- If the page lacks a clear keyword, infer one from the title, H1, and intro, and label it inferred.

## Formulas

Use [references/meta-tag-formulas.md](references/meta-tag-formulas.md) for title and description patterns.

## Output Shape

Use this order:

1. Page goal
2. Inferred or provided keyword
3. Title options
4. Meta description options
5. Recommended pair
6. OG and Twitter tag block
7. Notes on implementation

## Implementation

Use [references/meta-tag-code-templates.md](references/meta-tag-code-templates.md) for ready-to-paste HTML blocks.

## Boundaries

- Do not promise ranking gains.
- Do not make social-preview claims that depend on unseen images or platform behavior.
- If the user actually needs JSON-LD, say that this is a schema task instead.

