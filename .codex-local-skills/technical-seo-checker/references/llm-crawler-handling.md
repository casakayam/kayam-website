# LLM Crawler Handling

Use this only when the user explicitly asks about AI crawler policy.

## Required Decision

Ask the user to choose one stance before drafting robots guidance:
- open: allow all relevant crawlers
- closed: block all relevant crawlers
- split: allow retrieval-oriented bots and block training-oriented bots

## Notes

- Do not draft policy from assumptions.
- Review both `robots.txt` and any CDN or edge overrides.
- Make sure the written policy matches the user's legal and content goals.

