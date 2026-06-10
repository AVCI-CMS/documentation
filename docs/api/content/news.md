---
id: news
title: News / Announcements
sidebar_position: 3
---

# News and Announcements

This is the module used to publish company news, press releases, in-platform announcements, or campaign notifications.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List News

Lists all published news in the system with pagination and filtering options.

*   **Endpoint:** `GET /news`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `category` | String | Lists based on a specific category ID (e.g., Press, Update). |
| `search` | String | Performs text search in the title or news summary. |

---

## 2. News Details

Fetches the full content (body), images, and publish date of a specific news item via its slug value.

*   **Endpoint:** `GET /news/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "nw_001",
    "slug": "our-new-branch-opened",
    "title": "Our New Branch Opened in Ankara!",
    "summary": "We are waiting for you at the opening of our Ankara branch.",
    "content": "<h1>You are invited to our opening...</h1>",
    "publishDate": "2026-06-15T10:00:00Z"
  }
}
```

---

## 3. Newest News

Used to list the most current news, like "Breaking News", on the homepage or header of the application.

*   **Endpoint:** `GET /news/new`
*   **Auth Requirement:** `x-avci-client`
