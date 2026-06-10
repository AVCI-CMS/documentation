---
id: project
title: Projects
sidebar_position: 8
---

# Project Operations

These are endpoints that expose data belonging to the "Projects" module for B2B architectural firms, real estate sites, or institutions showcasing portfolios using AVCI CMS.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Projects

Lists completed or ongoing projects with pagination, category, and filtering capabilities.

*   **Endpoint:** `GET /project`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `category` | String | A specific project category (e.g., Residential, Commercial). |
| `search` | String | Searches within the project name or description. |

---

## 2. Project Details

Fetches all details of a specific project (delivery date, photo gallery, location, etc.) via its slug value.

*   **Endpoint:** `GET /project/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "prj_001",
    "slug": "scenic-homes",
    "title": "Scenic Homes Project",
    "status": "completed",
    "completionDate": "2025-12-01T00:00:00Z",
    "gallery": [
      "https://cdn.avcicms.com/prj_1.jpg",
      "https://cdn.avcicms.com/prj_2.jpg"
    ]
  }
}
```
