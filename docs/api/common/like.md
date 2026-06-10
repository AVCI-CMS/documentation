---
id: like
title: Likes / Favorites
sidebar_position: 7
---

# Like / Favorite Operations

This is the function to "Add to Favorites (Wishlist)" products on an e-commerce site or "Leave a heart" on blog posts.

The `x-avci-client` identity header and `Authorization` are **mandatory** in all requests.

---

## 1. List Favorites (My Wishlist)

Lists all products/contents previously hearted (added to favorites) by the user.

*   **Endpoint:** `GET /like`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`
*   **Query Parameters:**
    *   `type`: (Optional) `?type=product` to fetch only favorite products.

---

## 2. Toggle Like (Like / Unlike)

Taking the `_id` of the content, if the user has previously liked it, it unlikes it; if not, it adds it to favorites.

*   **Endpoint:** `POST /like/:type/:id`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`
