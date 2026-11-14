---
id: organization
title: Organizations
sidebar_position: 3
---

# Organization Operations

You can use these endpoints to list and fetch the profiles of umbrella entities (Organizations) such as companies, associations, event organizers, or large institutions.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Organizations

Lists all organizations in the system along with pagination and filtering parameters.

*   **Endpoint:** `GET /organization`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `search` | String | Searches within the organization name. |

---

## 2. Organization Details

Fetches full details of a specific organization (about text, logo, contact info, etc.) via its slug value.

*   **Endpoint:** `GET /organization/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example:** `/organization/acme-corp`

---

## 3. Organization Details by ID

Returns the details of an organization using its MongoDB `_id` value.

*   **Endpoint:** `GET /organization/id/:_id`
*   **Auth Requirement:** `x-avci-client`

---

## 4. Organization Summary Card

Fetches only the summary (name, logo, brief description) info of the organization for short previews and card views.

*   **Endpoint:** `GET /organization/short/:slug`
*   **Auth Requirement:** `x-avci-client`

---

## 5. Organization Showcase Self-Profile

Authenticated organization managers (cooperatives, chambers of commerce, foundations, trade unions) can inspect and update their public-facing corporate showcase profile directly from their account portal.

*   **Endpoints:**
    *   `GET /v1/organization/me`: Fetch currently logged-in organization profile.
    *   `PUT /v1/organization/me` or `PATCH /v1/organization/me`: Update organization showcase details.
*   **Auth Requirement:** `x-avci-client`, `Authorization: Bearer <org_token>`

### Editable Showcase Fields
*   `logo` / `image`: Official organization emblem or coat of arms.
*   `coverImage` / `cover`: Banner image for the organization directory.
*   `biography` / `description`: Mission statement, governance overview, and bylaws summary.
*   `attributes`: Member registry counts, regional affiliations, accreditation codes.
*   `gallery`: Institutional events, regional projects, or member showcases.
*   `socialMedia`: Official social links and organizational web portal.
*   `address`: Headquarters / secretariat contact address.

> **Security Note:** Umbrella membership statuses, sub-merchant authorisations, and system roles cannot be modified via self-service.

### Example Update Request
```bash
curl -X PUT "https://api.avcicms.com/v1/organization/me" \
  -H "x-avci-client: <tenant_id>" \
  -H "Authorization: Bearer <org_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "logo": "https://cdn.avcicms.com/orgs/union-logo.svg",
    "description": "Federation of Mediterranean Ceramic & Pottery Cooperatives.",
    "attributes": {
      "memberCount": 240,
      "region": "Mediterranean"
    }
  }'
```

