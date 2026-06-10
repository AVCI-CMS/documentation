---
id: groups
title: Groups
sidebar_position: 4
---

# Group Operations

While Collections are product-specific; Groups are generally used to group blog posts, news, FAQs, or other abstract content. It works very similarly to the Category structure.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Groups

Lists all groups created in the system hierarchically or paginated. Supports filtering for a specific content type (e.g., FAQ, Blog).

*   **Endpoint:** `GET /groups`
*   **Auth Requirement:** `x-avci-client`
*   **Query Parameters:**
    *   `type`: (Optional) Group type.

---

## 2. Get Group Detail

Returns the description, title, and any included records (posts) of a group by Group ID or slug.

*   **Endpoint:** `GET /groups/:slug`
*   **Auth Requirement:** `x-avci-client`
