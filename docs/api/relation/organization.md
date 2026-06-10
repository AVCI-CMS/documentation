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
