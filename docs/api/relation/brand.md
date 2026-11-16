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

---

## 6. Brand Showcase Self-Profile

Authenticated brand owners can view and update their public-facing brand showcase profile directly from their account portal.

*   **Endpoints:**
    *   `GET /v1/brand/me`: Fetch currently logged-in brand owner's profile.
    *   `PUT /v1/brand/me` or `PATCH /v1/brand/me`: Update brand showcase presentation details.
*   **Auth Requirement:** `x-avci-client`, `Authorization: Bearer <brand_token>`

### Editable Showcase Fields
*   `logo` / `image`: Official brand emblem or logo.
*   `coverImage` / `cover`: Public header visual.
*   `biography` / `description`: Brand manifesto, heritage, and story.
*   `attributes`: Industry attributes, sustainability badges, certifications.
*   `gallery`: Campaign and product imagery.
*   `socialMedia`: Official social media handles and website.
*   `address`: Brand showroom or headquarters address.

> **Security Note:** Platform verification status, GTIN/EAN authorizations, and commercial terms are restricted from self-service alteration.

### Example Update Request
```bash
curl -X PUT "https://api.avcicms.com/v1/brand/me" \
  -H "x-avci-client: <tenant_id>" \
  -H "Authorization: Bearer <brand_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "logo": "https://cdn.avcicms.com/brands/acme-logo.svg",
    "description": "Pioneering sustainable activewear engineered from recycled ocean plastics.",
    "attributes": {
      "certifiedOrganic": true,
      "foundingYear": 2018
    }
  }'
```

