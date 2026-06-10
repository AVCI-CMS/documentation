---
id: merchant
title: Merchants / Stores
sidebar_position: 1
---

# Merchant Operations

In a Marketplace architecture, you can use these endpoints to list the different brands, boutiques, or stores (Merchants) selling on your platform and to fetch their profiles.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Merchants

Lists all merchants on the platform with pagination and search support.

*   **Endpoint:** `GET /merchant`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `search` | String | Searches within the store name or description. |

**Example cURL Request:**
```bash
curl -X GET "https://api.avcicms.com/v1/merchant?page=1&limit=20" \
  -H "x-avci-client: <tenant_id>"
```

---

## 2. Merchant Details

Fetches full profile details of a specific merchant (contact information, about us text, etc.) via its slug value.

*   **Endpoint:** `GET /merchant/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example:** `/merchant/sample-store`

---

## 3. Merchant Summary Card

Fetches only the basic (summary) data of the merchant for performance-focused scenarios (e.g., rendering just a small store profile card on the product detail page).

*   **Endpoint:** `GET /merchant/card/:slug`
*   **Auth Requirement:** `x-avci-client`

---

## 4. Merchant Locations

Returns an optimized list containing the location information (latitude, longitude, and address) of physical stores on the platform for map-based views (Store Locator).

*   **Endpoint:** `GET /merchant/location`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "merch_123",
      "name": "Sample Store",
      "location": {
        "lat": 41.0082,
        "lng": 28.9784,
        "address": "Kadikoy, Istanbul"
      }
    }
  ]
}
```
