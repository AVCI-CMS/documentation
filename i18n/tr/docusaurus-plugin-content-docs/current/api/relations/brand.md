---
id: brand-api
title: Brand API Reference
sidebar_label: Brand API
---

# Brand Public API

This section documents the public endpoints available for the Brand module.

## Endpoints

### List Brands
`GET /brand`

Retrieves a paginated list of brands.

#### Parameters (Query)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | `integer` | No | Page number (default: 1) |
| `limit` | `integer` | No | Number of results per page (default: 10) |
| `search` | `string` | No | Search query |

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

### Get Brand Locations
`GET /brand/location`

Retrieves the geographical locations of brands.

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

### Get Brand Overview Card
`GET /brand/card/:slug`

Retrieves a lightweight summary card of a brand using its slug.

#### Parameters (Path)
| Name | Type | Required | Description |
|---|---|---|---|
| `slug` | `string` | Yes | Unique slug of the brand |

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

### Get Brand Details by ID
`GET /brand/id/:_id`

Retrieves the full public details of a brand using its ID.

#### Parameters (Path)
| Name | Type | Required | Description |
|---|---|---|---|
| `_id` | `string` | Yes | Unique ID of the brand |

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

---

### Get Brand Details by Slug
`GET /brand/:slug`

Retrieves the full public details of a brand using its slug.

#### Parameters (Path)
| Name | Type | Required | Description |
|---|---|---|---|
| `slug` | `string` | Yes | Unique slug of the brand |

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
