---
id: brand
title: Brands
sidebar_position: 2
---

# Brand Operations

You can use these endpoints to list Brands associated with products and stores in the system and fetch their profiles.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Brands

Lists all brands on the platform with pagination and search support.

*   **Endpoint:** `GET /brand`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `search` | String | Searches within the brand name. |

---

## 2. Brand Details

Fetches full profile details of a specific brand (logo, description, etc.) via its slug value.

*   **Endpoint:** `GET /brand/:slug`
*   **Auth Requirement:** `x-avci-client`

---

## 3. Brand Details by ID

Returns the details of a specific brand using its MongoDB `_id` value.

*   **Endpoint:** `GET /brand/id/:_id`
*   **Auth Requirement:** `x-avci-client`

---

## 4. Brand Summary Card

Fetches only basic summary data of the brand for performance-focused scenarios (e.g., brand filters on product listing pages or logo carousel components).

*   **Endpoint:** `GET /brand/card/:slug`
*   **Auth Requirement:** `x-avci-client`

---

## 5. Brand Locations

If physical stores/dealers of the brands are defined in the system, returns a list containing their location data for map views (Store Locator).

*   **Endpoint:** `GET /brand/location`
*   **Auth Requirement:** `x-avci-client`
