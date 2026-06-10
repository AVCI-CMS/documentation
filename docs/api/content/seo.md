---
id: seo
title: SEO Management (Global SEO)
sidebar_position: 6
---

# Dynamic SEO Management

AVCI CMS has a powerful SEO service that dynamically provides all the `<title>`, `<meta>`, and `<link>` tags your application needs when rendering in SSR (Server Side Rendering) frameworks like Next.js or Nuxt.js.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Global / Default SEO Data

If the page you are on (e.g., Home Page) does not have specific SEO data, it returns the "Default" (Fallback) SEO data defined for the entire Workspace (Tenant).

*   **Endpoint:** `GET /seo/`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "metaTitle": "AVCI CMS | Modern Management",
    "metaDescription": "Turkey's most advanced Headless e-Commerce Infrastructure.",
    "ogImage": "https://cdn.avcicms.com/og-default.jpg"
  }
}
```

---

## 2. Module-Based Detail SEO Data

Fetches the specific SEO titles and descriptions of a particular product, news item, or blog post. These endpoints can be fetched from the independent detail endpoints of the respective modules, but they can also be fetched from **independent SEO routes** to increase performance when only SEO data is needed while rendering pages on the SSR side.

Available modules and SEO endpoints are below:

*   **Product SEO:** `GET /seo/product/:slug`
*   **Event SEO:** `GET /seo/event/:slug`
*   **Project SEO:** `GET /seo/project/:slug`
*   **Blog SEO:** `GET /seo/blog/:slug`
*   **News SEO:** `GET /seo/news/:slug`
*   **Page SEO:** `GET /seo/page/:slug`
*   **Dictionary (Word) SEO:** `GET /seo/word/:slug`

---

## 3. Listing / Archive Pages SEO Data

Not only detail pages but also listing pages (e.g., the `/products` page, the `/blog` main page) have their own unique SEO settings.

*   **Product List SEO:** `GET /seo/product`
*   **Blog List SEO:** `GET /seo/blog`
*   **News List SEO:** `GET /seo/news`
*   **Pages List SEO:** `GET /seo/page`

---

## 4. Brand, Merchant, and Location SEO

SEO data for the special profiles of marketplace merchants or brands:

*   **Merchant SEO:** `GET /seo/merchant/:slug` (List: `GET /seo/merchant`)
*   **Brand SEO:** `GET /seo/brand/:slug` (List: `GET /seo/brand`)
*   **Place SEO:** `GET /seo/place/:slug` (List: `GET /seo/place`)
*   **Organization SEO:** `GET /seo/organization/:slug`

---

## 5. Common Groupings SEO

Dynamic SEO retrieval for Categories and Collections (along with the information of the type they are attached to):

*   **Category SEO:** `GET /seo/category/:type/:slug`
*   **Group SEO:** `GET /seo/group/:type/:slug`
*   **Collection SEO:** `GET /seo/collection/:type/:slug`
