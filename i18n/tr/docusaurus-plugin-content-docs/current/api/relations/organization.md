---
id: organization-api
title: Organization API Reference
sidebar_label: Organization API
---

# Organization Public API

This section documents the public endpoints available for the Organization module.

## Endpoints

### List Organizations
`GET /organization`

Retrieves a paginated list of organizations.

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

### Get Organization Locations
`GET /organization/location`

Retrieves the geographical locations of organizations.

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

### Get Organization Overview Card
`GET /organization/card/:slug`

Retrieves a lightweight summary card of an organization using its slug.

#### Parameters (Path)
| Name | Type | Required | Description |
|---|---|---|---|
| `slug` | `string` | Yes | Unique slug of the organization |

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

### Get Organization Details by ID
`GET /organization/id/:_id`

Retrieves the full public details of an organization using its ID.

#### Parameters (Path)
| Name | Type | Required | Description |
|---|---|---|---|
| `_id` | `string` | Yes | Unique ID of the organization |

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

### Get Organization Details by Slug
`GET /organization/:slug`

Retrieves the full public details of an organization using its slug.

#### Parameters (Path)
| Name | Type | Required | Description |
|---|---|---|---|
| `slug` | `string` | Yes | Unique slug of the organization |

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
