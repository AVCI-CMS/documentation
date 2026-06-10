---
id: jsonld
title: JSON-LD Operations (SEO)
sidebar_position: 3
---

# JSON-LD Operations

This is the service that outputs the content on the page (Product, Event, Organization, etc.) as Structured Data in order to generate rich snippets (Rich Results) for search engines (Google, Bing).

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Get JSON-LD Data

By providing the slug value and type of a specific content, it returns the JSON-LD object that can be directly injected into the page (as a Script tag).

*   **Endpoint:** `GET /jsonld/:type/:slug`
*   **Auth Requirement:** Only `x-avci-client`
*   **Supported Types (`type`):** `product`, `event`, `blog`, `merchant`, `organization`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Blue Men's T-Shirt",
    "image": [
      "https://example.com/photos/1x1/photo.jpg"
    ],
    "description": "100% cotton men's t-shirt.",
    "offers": {
      "@type": "Offer",
      "url": "https://example.com/product/blue-mens-t-shirt",
      "priceCurrency": "USD",
      "price": "19.99"
    }
  }
}
```
