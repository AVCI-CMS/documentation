---
id: merchant
title: Merchants
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

---

## 5. Artisan / Merchant Showcase Self-Profile

Authenticated sellers and artisans can inspect and update their public-facing storefront showcase profile directly (e.g., from their account page at `/profil/sayfam`).

*   **Endpoints:**
    *   `GET /v1/merchant/me`: Fetch currently logged-in vendor's profile.
    *   `PUT /v1/merchant/me` or `PATCH /v1/merchant/me`: Update storefront showcase details.
*   **Auth Requirement:** `x-avci-client`, `Authorization: Bearer <vendor_token>`

### Editable Showcase Fields
Vendors can update presentation and branding properties:
*   `logo` / `image`: Storefront avatar / brand logo.
*   `coverImage` / `cover`: Profile banner image.
*   `biography` / `description`: Artisan story and workshop background.
*   `attributes`: Custom showcase attributes (e.g., craft techniques, specialties, awards).
*   `gallery`: Workshop / studio photo gallery.
*   `socialMedia`: Links to Instagram, LinkedIn, website.
*   `address`: Public studio or workshop address.

> **Security Note:** Sensitive fields such as `status`, `commitionRate`, `isVerified`, and payment/banking settings are strictly isolated and cannot be modified via this endpoint.

### Example Update Request
```bash
curl -X PUT "https://api.avcicms.com/v1/merchant/me" \
  -H "x-avci-client: <tenant_id>" \
  -H "Authorization: Bearer <vendor_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "logo": "https://cdn.avcicms.com/uploads/artisan-logo.png",
    "coverImage": "https://cdn.avcicms.com/uploads/artisan-cover.jpg",
    "description": "Master artisan crafting traditional copper and brass homeware.",
    "socialMedia": {
      "instagram": "artisan_crafts"
    },
    "attributes": {
      "technique": "Hand hammered",
      "establishedYear": 1994
    }
  }'
```

