---
id: word
title: Dictionary / Words
sidebar_position: 4
---

# Dictionary and Terms (Word)

This is the module used to create knowledge bases, technical term glossaries, or platform-specific dictionary areas. It is designed for "SEO-focused dictionary" projects.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Words

Lists all words in the dictionary with pagination or by filtering by their initials (A-Z).

*   **Endpoint:** `GET /dictionary`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `search` | String | Used to search for a term (e.g., `search=Crypto`). |

---

## 2. Word Details

Fetches the comprehensive encyclopedic/dictionary explanation of a specific word, term, or abbreviation via its slug value.

*   **Endpoint:** `GET /dictionary/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "wrd_123",
    "slug": "what-is-api",
    "term": "API",
    "definition": "<p>Application Programming Interface...</p>",
    "relatedTerms": [
      { "term": "REST", "slug": "what-is-rest" }
    ]
  }
}
```
