---
id: category
title: Categories
sidebar_position: 1
---

# Category Operations

Used to fetch the categories (in a tree structure) under which products, events, blog posts, or news in the system are classified.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Get Category Tree

Fetches the categories needed when rendering a "Category Menu (Mega Menu)" or "Category Filter" on the Frontend in a hierarchical format (with nested children arrays).

*   **Endpoint:** `GET /category/tree`
*   **Auth Requirement:** `x-avci-client`
*   **Query Parameters:**
    *   `type`: Category type (e.g., `product`, `blog`, `event`, `merchant`). If not sent, it returns the entire tree.

**Example JSON Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "cat_1",
      "name": "Electronics",
      "slug": "electronics",
      "children": [
        {
          "id": "cat_2",
          "name": "Phones",
          "slug": "phones",
          "children": []
        }
      ]
    }
  ]
}
```

---

## 2. Get Category List (Flat List)

Returns the categories as a flat array instead of a nested tree. It is especially suitable for select boxes or autocomplete.

*   **Endpoint:** `GET /category/list`
*   **Auth Requirement:** `x-avci-client`

---

## 3. Category Detail

Fetches the description, banner image, and parent category of a category based on the given category ID or slug.

*   **Endpoint:** `GET /category/:slug`
*   **Auth Requirement:** `x-avci-client`
