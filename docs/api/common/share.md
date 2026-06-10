---
id: share
title: Share / Referral
sidebar_position: 5
---

# Share Tracking

In e-commerce or content sites, this is the counter used to track and report how many times buttons like "Share on WhatsApp", "Share on Twitter" of a product are clicked.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Record Share Click

When the user clicks the "Share" button, this endpoint is triggered in the background to increase the popularity score of the product/content.

*   **Endpoint:** `POST /share/:type/:id`
*   **Auth Requirement:** `x-avci-client`
*   **Parameters:**
    *   `type`: Type of the shared content (e.g., `product`, `blog`)
    *   `id`: Unique ID of the shared object.

**Example JSON Body:**
```json
{
  "platform": "whatsapp"
}
```
