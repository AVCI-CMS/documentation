---
id: page
title: Pages
sidebar_position: 1
---

# Page Operations

You can create dynamic content pages in AVCI CMS (e.g., About Us, Privacy Policy, Contact, Return Policy) and render them in your application (Frontend, Mobile) via these API endpoints.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Pages

Lists all pages in the Published state in the system with pagination support.

*   **Endpoint:** `GET /page`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `category` | String | Filters pages belonging to a specific category (e.g., Corporate, Help) |

**Example JSON Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "pg_123",
      "slug": "about-us",
      "title": "About Us",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## 2. Page Details (Content)

Fetches the full content (body) in HTML or rich text format, the title, and metadata of a specific page via its slug value.

*   **Endpoint:** `GET /page/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example:** `/page/privacy-policy`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "pg_124",
    "slug": "privacy-policy",
    "title": "Privacy Policy",
    "content": "<h1>Our Privacy Policy</h1><p>Our company's customer data...</p>",
    "seo": {
      "metaTitle": "Privacy Policy | AVCI CMS",
      "metaDescription": "Learn about our data security and privacy standards."
    }
  }
}
```
