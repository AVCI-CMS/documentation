---
id: route
title: Routes / Tours
sidebar_position: 9
---

# Route / Tour Operations

Used to list custom travel routes and sightseeing tours (e.g., "7-Day Black Sea Tour") created for tourism, travel, or event-focused systems.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Routes

Lists all travel routes and tour packages in the system with pagination support.

*   **Endpoint:** `GET /route`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `search` | String | Text search within the route title. |

---

## 2. Route Details

Fetches all details of a specific travel route (stops, map coordinates, program content) via its slug value.

*   **Endpoint:** `GET /route/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "rt_99",
    "slug": "seven-day-black-sea-tour",
    "title": "7-Day Black Sea Tour",
    "durationDays": 7,
    "stops": [
      {
        "day": 1,
        "title": "Trabzon Uzungol",
        "description": "Walking around the lake..."
      }
    ]
  }
}
```
