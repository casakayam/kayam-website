# Schema Templates

Use these as starters, then fill only visible or user-confirmed values.

## Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "PAGE TITLE",
  "description": "PAGE DESCRIPTION",
  "author": {
    "@type": "Person",
    "name": "AUTHOR NAME"
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD"
}
```

## Product

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "PRODUCT NAME",
  "description": "VISIBLE PRODUCT DESCRIPTION",
  "brand": {
    "@type": "Brand",
    "name": "BRAND NAME"
  }
}
```

## LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BUSINESS NAME",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "STREET",
    "addressLocality": "CITY",
    "addressRegion": "REGION",
    "postalCode": "POSTAL CODE",
    "addressCountry": "COUNTRY"
  }
}
```

