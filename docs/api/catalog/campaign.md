---
id: campaign
title: Campaigns
sidebar_position: 7
---

# Campaign Operations

Used to list and show details to customers for special day discounts, "Buy 3 Pay for 2" deals, or major category-based campaigns.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Campaigns

Lists all campaigns in the system along with pagination and filtering parameters.

*   **Endpoint:** `GET /campaign`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `search` | String | Text search within the campaign name. |

---

## 2. Active Campaigns

Lists currently valid campaigns (those that have started and not yet ended) to be displayed in storefronts (like homepage banners, etc.).

*   **Endpoint:** `GET /campaign/active`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "cmp_123",
      "title": "Spring Deals",
      "coverImage": "https://cdn.avcicms.com/images/spring-banner.jpg",
      "endDate": "2026-06-30T23:59:59Z"
    }
  ]
}
```

---

## 3. Campaign Details

Fetches full details of a specific campaign (participation conditions, included brands, or product groups) using its MongoDB `_id` value.

*   **Endpoint:** `GET /campaign/:_id`
*   **Auth Requirement:** `x-avci-client`

**Example:** `/campaign/60d5ecb54d6e9f1234567890`
