---
id: place
title: Places
sidebar_position: 4
---

# Place Operations

You can use these endpoints to manage and list physical spaces, concert venues, store branches, or tourist locations (Places). This module is highly critical for map and event-based applications.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Places

Lists all venues and physical spaces on the platform with pagination support.

*   **Endpoint:** `GET /place`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `search` | String | Searches within the place name. |

---

## 2. Place Details

Fetches full profile details of a specific place (photos, capacity, map coordinates, etc.) via its slug value.

*   **Endpoint:** `GET /place/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "plc_123",
    "name": "KucukCiftlik Park",
    "slug": "kucukciftlik-park",
    "capacity": 17000,
    "location": {
      "lat": 41.0450,
      "lng": 28.9950,
      "address": "Sisli, Istanbul"
    }
  }
}
```

---

## 3. Place Details by ID

Fetches the details of a place using its MongoDB `_id` value.

*   **Endpoint:** `GET /place/id/:_id`
*   **Auth Requirement:** `x-avci-client`

---

## 4. Place Summary Card

Returns short preview data to be displayed purely as a card in the user interface. Improves performance by reducing data transfer.

*   **Endpoint:** `GET /place/short/:slug`
*   **Auth Requirement:** `x-avci-client`
