---
id: collections
title: Collections
sidebar_position: 3
---

# Collection Operations

These are product showcases specially grouped by a store or the system (e.g., "Hello Summer Collection", "Valentine's Day Gifts"). They are great for creating special landing pages in conjunction with campaigns.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Collections

Lists all live (active) collections in the system with pagination. Collections have their own showcase images and descriptions.

*   **Endpoint:** `GET /collections`
*   **Auth Requirement:** `x-avci-client`

---

## 2. Collection Detail (Included Products)

Returns both the banner details of a specific collection and the **products included** in that collection as a list.

*   **Endpoint:** `GET /collections/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "title": "2026 Winter Collection",
    "slug": "2026-winter",
    "banner": "https://...",
    "products": [
      {
        "id": "prod_1",
        "name": "Winter Coat",
        "price": 2500
      }
    ]
  }
}
```
