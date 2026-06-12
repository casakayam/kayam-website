# Schema Decision Tree

Choose the smallest schema type that truthfully matches the page.

## Quick Mapping

- Editorial article or blog post -> `Article` or `BlogPosting`
- Product detail page -> `Product`
- Business location or brand page -> `LocalBusiness`
- Question-and-answer page -> `FAQPage`
- Step-based tutorial -> `HowTo`
- Navigation path -> `BreadcrumbList`
- Video-led page -> `VideoObject`
- Event page -> `Event`

## Rules

- Prefer one primary type plus nested supporting types when needed.
- Do not apply `Product` to a general category page unless there is a real product entity.
- Do not apply `Review` unless a real review exists on the page.
- Use `FAQPage` only when the questions and answers are visibly present.

