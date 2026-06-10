---
id: follow
title: Follow Operations
sidebar_position: 5
---

# Follow Operations

This module provides the infrastructure for customers/users to "Follow" stores, brands, authors, or organizations.

The `x-avci-client` identity header is **mandatory** for all requests. Additionally, a JWT token must be sent via the `Authorization` header to authenticate users so they can perform follow operations.

---

## 1. Check Follow Status

Checks whether the logged-in user is following a specific item (Store, Brand, etc.).

*   **Endpoint:** `GET /follow/:type/:id`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`
*   **Parameters:**
    *   `type`: Type of the followed item (e.g., `merchant`, `brand`, `organization`)
    *   `id`: The ID of the item.

**Example:** `/follow/merchant/merch_123`

---

## 2. Toggle Follow

Allows the user to follow a specific item. If they are already following it, they will be unfollowed (Toggle behavior).

*   **Endpoint:** `POST /follow/:type/:id`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 3. User Follows

Lists all followed items of a specific type for the logged-in user. For example, "stores I follow".

*   **Endpoint:** `GET /follow/:type`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

**Example:** `/follow/merchant`

---

## 4. Get Followers of an Item

Lists who follows a specific store or brand.

*   **Endpoint:** `GET /follow/:type/:id/follows`
*   **Auth Requirement:** `x-avci-client`

---

## 5. Get Follow Count

Returns only the total follow count for a specific item. Ideal for displaying "1,200 Followers" on profile pages.

*   **Endpoint:** `GET /follow/:type/:id/count`
*   **Auth Requirement:** `x-avci-client`
