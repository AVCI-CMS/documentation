---
id: place
title: Places
sidebar_position: 4
---

# Place Operations

You can use these endpoints to manage and list physical spaces, event venues, concert halls, workshop studios, or store branches (Places). This module is critical for map, event, booking, and location-based applications.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Places

Lists all venues and physical spaces on the platform with pagination and filtering support.

*   **Endpoint:** `GET /v1/place`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: `1`) |
| `limit` | Number | Number of records per page (Default: `10`) |
| `area` | String | Filter by area / category ObjectId. |
| `search` | String | Searches within the place name and description. |

**Example JSON Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "6735c03a9f1a2b3c4d5e6f70",
      "name": "KucukCiftlik Park",
      "slug": "kucukciftlik-park",
      "abstract": "Istanbul's premier open-air event & performance venue.",
      "logo": {
        "_id": "6735c03a9f1a2b3c4d5e6f71",
        "path": "https://cdn.avcicms.com/uploads/kcp-logo.webp"
      },
      "featuredImage": {
        "_id": "6735c03a9f1a2b3c4d5e6f72",
        "path": "https://cdn.avcicms.com/uploads/kcp-featured.webp"
      },
      "capacity": {
        "min": 500,
        "max": 17000
      },
      "address": {
        "city": "İstanbul",
        "district": "Şişli",
        "formattedAddress": "Harbiye Mah. Kadırgalar Cad. No:4, Şişli/İstanbul",
        "location": {
          "type": "Point",
          "coordinates": [28.9950, 41.0450]
        }
      },
      "pricing": {
        "isPaid": true,
        "pricingType": "PER_EVENT",
        "amount": 250000,
        "currency": "TRY"
      },
      "status": "ACTIVE"
    }
  ]
}
```

---

## 2. Place Details by Slug

Fetches full profile details of a specific venue (photos, capacity, working hours, pricing model, map coordinates) via its slug value.

*   **Endpoint:** `GET /v1/place/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "6735c03a9f1a2b3c4d5e6f70",
    "name": "KucukCiftlik Park",
    "slug": "kucukciftlik-park",
    "abstract": "Istanbul's premier open-air event & performance venue.",
    "description": "Offering world-class acoustics and versatile hosting capabilities for concerts, festivals, and corporate celebrations.",
    "capacity": {
      "min": 500,
      "max": 17000
    },
    "working": [
      {
        "day": 1,
        "hours": { "start": "09:00", "end": "23:00" }
      },
      {
        "day": 5,
        "hours": { "start": "10:00", "end": "02:00" }
      }
    ],
    "pricing": {
      "isPaid": true,
      "pricingType": "DAILY",
      "amount": 250000,
      "currency": "TRY"
    },
    "address": {
      "city": "İstanbul",
      "district": "Şişli",
      "street": "Kadırgalar Cad.",
      "buildingNumber": "4",
      "formattedAddress": "Harbiye Mah. Kadırgalar Cad. No:4, Şişli/İstanbul",
      "location": {
        "type": "Point",
        "coordinates": [28.9950, 41.0450]
      }
    },
    "logo": { "path": "https://cdn.avcicms.com/uploads/kcp-logo.webp" },
    "coverImage": { "path": "https://cdn.avcicms.com/uploads/kcp-cover.webp" },
    "gallery": [
      { "path": "https://cdn.avcicms.com/uploads/kcp-stage.webp" },
      { "path": "https://cdn.avcicms.com/uploads/kcp-crowd.webp" }
    ],
    "status": "ACTIVE"
  }
}
```

---

## 3. Place Details by ID

Fetches the complete profile details of a venue using its MongoDB `_id` identifier.

*   **Endpoint:** `GET /v1/place/id/:_id`
*   **Auth Requirement:** `x-avci-client`

---

## 4. Place Summary Card

Returns lightweight preview data optimized for map pin popups, mobile preview cards, and listing grids.

*   **Endpoint:** `GET /v1/place/short/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "6735c03a9f1a2b3c4d5e6f70",
    "name": "KucukCiftlik Park",
    "slug": "kucukciftlik-park",
    "abstract": "Istanbul's premier open-air event & performance venue.",
    "logo": { "path": "https://cdn.avcicms.com/uploads/kcp-logo.webp" },
    "capacity": { "min": 500, "max": 17000 },
    "address": {
      "city": "İstanbul",
      "district": "Şişli"
    },
    "pricing": {
      "isPaid": true,
      "amount": 250000,
      "currency": "TRY"
    }
  }
}
```

---

## 5. Sub-Services & Community Interactions

Places integrate seamlessly with AVCI CMS shared microservices:

*   **Categories:** `GET /v1/place/category` — Filter venues by sector/type categories.
*   **Groups:** `GET /v1/place/group` — Curated groupings (e.g., "Historic Venues", "Open-Air Theatres").
*   **Collections:** `GET /v1/place/collection` — Editorial venue lists.
*   **Favorites / Likes:** `POST /v1/place/like/:slug` — Toggle user favorite status.
*   **View Counter:** `POST /v1/place/view/:slug` — Increment showcase analytics view counter.
*   **Social Shares:** `POST /v1/place/share/:slug` — Track referral shares across social channels.
*   **Q&A Inquiries:** `GET /v1/place/question/:slug` & `POST /v1/place/question/:slug` — Submit direct venue inquiries.
