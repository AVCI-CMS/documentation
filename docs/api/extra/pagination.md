---
id: pagination
title: Pagination & Filtering
sidebar_position: 1
---

# Pagination and Filtering in List APIs

AVCI CMS Public APIs use a standardized **Pagination** and **Filtering** infrastructure to help you fetch large datasets (e.g., a catalog with thousands of products, or a marketplace with hundreds of merchants) in a highly performant way.

Unless noted otherwise, the rules described in this document apply to all API endpoints that return a list (`GET` requests and plural names).

## 1. Pagination Parameters

For pagination operations, two basic parameters are typically sent within the Query URL:

*   `page`: The page number you want to fetch (Default: `1`).
*   `limit` or `perPage`: The maximum number of records to show on a single page (Default: `10` or `20`).

**Example cURL Request:**
```bash
curl -X GET "https://api.avcicms.com/v1/product?page=2&limit=15" \
  -H "x-avci-client: <tenant_id>"
```

### Standard API Response Structure (Metadata)

In the JSON response returned for paginated list requests, you get not only the data itself but also a `meta` or `pagination` object so you can render page numbers on your frontend interface.

```json
{
  "status": "success",
  "data": [
    { "id": "1", "name": "Product A" },
    { "id": "2", "name": "Product B" }
  ],
  "meta": {
    "totalRecords": 150,     // Total number of records
    "totalPages": 10,        // Total number of pages
    "currentPage": 2,        // Your current page
    "limit": 15,             // Number of records per page
    "hasNextPage": true,     // Is there a next page?
    "hasPrevPage": true      // Is there a previous page?
  }
}
```

## 2. Sorting

To sort your data by a specific field (for example, by price or creation date), the `sort` and `order` parameters are used.

*   `sort` or `sortBy`: The name of the field to sort by (e.g., `price`, `createdAt`, `name`).
*   `order`: The sort direction. Usually `asc` (Ascending/Old to New) or `desc` (Descending/New to Old).

**Example: Sorting products by price from highest to lowest**
```bash
curl -X GET "https://api.avcicms.com/v1/product?sortBy=price&order=desc" \
  -H "x-avci-client: <tenant_id>"
```

## 3. Searching and Filtering

To create advanced queries, you can pass field names as URL parameters. The module detail pages will list which fields are filterable, but the general approach is as follows:

*   **Exact Match:** `?status=active` or `?categoryId=123`
*   **Search (Search/Like):** To search by specific text, `?search=sweater` or `?q=sweater` is typically used. Parts of the system supported by Full-Text Search or Elasticsearch will match this search term in the most relevant way.
s
## Frontend (SDK) Recommendation

When rendering a list on the frontend, simply keep your current page in your state management, and when moving to a new page, increment the parameter and call the same API again:

```javascript
// Example Frontend SDK Call (Coming Soon)
const response = await avci.catalog.getProducts({
  page: 2,
  limit: 20,
  sortBy: 'createdAt',
  order: 'desc'
});

console.log(response.data); // Products
console.log(response.meta.totalPages); // How many pages to render on the frontend
```
