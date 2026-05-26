---
id: merchant-api
title: Merchant API Reference
sidebar_label: Merchant API
---

# Merchant Public API

This section documents the public endpoints available for the Merchant module. These endpoints are accessible by end-users (e.g. mobile app or public website) and are automatically included in our generated SDKs.

## Endpoints

### List Merchants
`GET /merchant`

Retrieves a paginated list of merchants.

#### Parameters (Query)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | `integer` | No | Page number (default: 1) |
| `limit` | `integer` | No | Number of results per page (default: 10) |
| `search` | `string` | No | Search query |
| `category` | `string` | No | Category ID to filter by |

#### Response `200`
```json
{
  "status": "success",
  "data": [
    {
      "_id": "string",
      "name": "string",
      "slug": "string",
      "status": "string",
      "owner": "string",
      "metadata": {
        "created": { "date": "string", "by": "string" },
        "published": { "date": "string", "by": "string" },
        "edited": [ { "date": "string", "by": "string" } ]
      }
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

---

### Get Merchant Locations
`GET /merchant/location`

Retrieves the geographical locations (latitude/longitude) of merchants for map views.

#### Response `200`
```json
{
  "status": "success",
  "data": [
    {
      "_id": "string",
      "name": "string",
      "slug": "string",
      "location": {
        "type": "Point",
        "coordinates": [28.9784, 41.0082]
      }
    }
  ]
}
```

---

### Get Merchant Overview Card
`GET /merchant/card/:slug`

Retrieves a lightweight summary card of a merchant using its slug.

#### Parameters (Path)
| Name | Type | Required | Description |
|---|---|---|---|
| `slug` | `string` | Yes | Unique slug of the merchant |

#### Response `200`
```json
{
  "status": "success",
  "data": {
    "_id": "string",
    "name": "string",
    "slug": "string",
    "abstract": "string",
    "logo": "string",
    "status": "string"
  }
}
```

---

### Get Merchant Details
`GET /merchant/:slug`

Retrieves the full public details of a merchant.

#### Parameters (Path)
| Name | Type | Required | Description |
|---|---|---|---|
| `slug` | `string` | Yes | Unique slug of the merchant |

#### Response `200`
```json
{
  "status": "success",
  "data": {
    "_id": "string",
    "name": "string",
    "slug": "string",
    "status": "string",
    "owner": "string",
    "metadata": {
      "created": { "date": "string", "by": "string" }
    }
  }
}
```
