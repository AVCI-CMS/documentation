---
id: team
title: Team Members
sidebar_position: 7
---

# Team Operations

The Team API delivers dynamic corporate team listings, executive rosters, and advisory boards for your storefront's "About Us" and "Our Team" pages. It replaces hardcoded static staff sections with backend-managed team profiles.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Team Members

Lists all active team members with pagination, search, and department/order sorting.

* **Endpoint:** `GET /v1/team`
* **Auth Requirement:** `x-avci-client`

### Query Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 20) |
| `search` | String | Searches within member name, title, or biography |
| `department` | String | Filters by department (e.g. `Executive`, `Engineering`, `Design`) |

### Example Request
```bash
curl -X GET "https://api.avcicms.com/v1/team?page=1&limit=10" \
  -H "x-avci-client: <tenant_id>"
```

### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "id": "team_6735a12f9b8c",
      "slug": "jane-doe",
      "name": "Jane Doe",
      "title": "Chief Technology Officer",
      "department": "Engineering",
      "avatar": "https://cdn.avcicms.com/team/jane-doe.jpg",
      "biography": "Leading cloud architecture and platform scalability for over a decade.",
      "socialMedia": {
        "linkedin": "https://linkedin.com/in/janedoe",
        "github": "https://github.com/janedoe"
      },
      "order": 1
    }
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "limit": 10
  }
}
```

---

## 2. Team Member Details by Slug

Fetches full details, bio, and social links of an individual team member via their unique URL slug.

* **Endpoint:** `GET /v1/team/:slug`
* **Auth Requirement:** `x-avci-client`

### Example Request
```bash
curl -X GET "https://api.avcicms.com/v1/team/jane-doe" \
  -H "x-avci-client: <tenant_id>"
```

---

## 3. Team Member Details by ID

Fetches full details of a team member using their unique identifier.

* **Endpoint:** `GET /v1/team/id/:id`
* **Auth Requirement:** `x-avci-client`

### Example Request
```bash
curl -X GET "https://api.avcicms.com/v1/team/id/team_6735a12f9b8c" \
  -H "x-avci-client: <tenant_id>"
```

