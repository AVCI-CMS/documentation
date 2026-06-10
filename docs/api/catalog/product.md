---
id: product
title: Products
sidebar_position: 1
---

# Product Operations

Through the AVCI CMS Public API, you can list, filter, fetch details, and retrieve SEO data for active products in your store.

The `x-avci-client` identity header is **mandatory** for all requests. *See the [Getting Started](/api/getting-started) page for details.*

---

## 1. List Products

Lists products in the catalog with pagination and rich filtering options.

*   **Endpoint:** `GET /product`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

Pagination and sorting rules apply (See: [Pagination & Filtering](/api/extra/pagination)).

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `category` | String \| Array | Category ID or array of IDs. Supports multiple selections. |
| `brand` | String | Filter by Brand ID. |
| `merchant` | String | Filter by Seller (Merchant) ID. |
| `minPrice` | Number | Minimum price filter. |
| `maxPrice` | Number | Maximum price filter. |
| `year` | Number | Production year filter. |
| `language` | String | Translation / Language filter. |
| `attributes` | String | Filter by attributes (e.g., color:red). |
| `discard` | Array | Array of product IDs to exclude (not show). |
| `search` | String | Text search in product name or description. |

**Example cURL Request:**
```bash
curl -X GET "https://api.avcicms.com/v1/product?category=cat_123&minPrice=100&maxPrice=500" \
  -H "x-avci-client: <tenant_id>"
```

**Example JSON Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "prod_123",
      "slug": "blue-mens-tshirt",
      "name": "Blue Men's T-Shirt",
      "price": 129.99,
      "brand": { "id": "b_1", "name": "Mavi" }
    }
  ],
  "pagination": {
    "totalRecords": 45,
    "totalPages": 5,
    "currentPage": 1,
    "limit": 10
  }
}
```

**TypeScript Response Interface:**
```typescript
export interface ProductListResponse {
  _id: string; // Types.ObjectId
  title: string;
  name: string;
  thumbnail?: string;
  slug: string;
  stockAmount?: number;
  featuredImage?: string;
  saleType?: string;
  price: {
    sale?: number;
    list?: number;
    amount?: number;
    discount?: number;
    currency?: string;
    lowestPrice30Days?: number;
  };
  category?: {
    value: string; // Types.ObjectId
    label: string;
  }[];
  status: string; // 'PUBLISHED' | 'DRAFT' | 'OUT_OF_STOCK' etc.
  brand?: {
    name?: string;
    slug?: string;
    image?: string;
  };
  merchant?: {
    _id?: string;
    name?: string;
    slug?: string;
    image?: string;
  };
  year?: number;
  attributes?: any[];
  liked?: boolean;
  isHolidayActive?: boolean;
  badges?: any[];
}
```

---

## 2. Product Details

Fetches all details of a specific product using its slug value.

*   **Endpoint:** `GET /product/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "prod_123",
    "slug": "blue-mens-tshirt",
    "name": "Blue Men's T-Shirt",
    "description": "<p>100% cotton...</p>",
    "price": 129.99,
    "stock": 50,
    "variants": [],
    "images": ["https://..."]
  }
}
```

**TypeScript Response Interface:**
```typescript
export interface ProductDetailsResponse {
  id: string; // Types.ObjectId
  name: string;
  slug: string;
  year?: number;
  liked: boolean;
  images: string[];
  brief?: string;
  price: {
    sale?: number;
    currency?: string;
    amount?: number;
    discount?: number;
    lowestPrice30Days?: number;
  };
  brand?: {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
  };
  merchant?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  description?: string;
  properties?: any[];
  sku?: string;
  techniques?: string[];
  materials?: string[];
  tools?: string[];
  saleType?: string;
  edition?: {
    number?: number;
    amount?: number;
  };
  modelNo?: string;
  stn?: string;
  category?: any[];
  stock?: {
    amount?: number;
    min?: number;
  };
  holidayMode?: {
    active: boolean;
    message?: string;
  };
  badges?: any[];
}
```

---

## 3. New Products

Lists newly added products in the system with pagination.

*   **Endpoint:** `GET /product/new?page=1&limit=10`
*   **Auth Requirement:** `x-avci-client`

---

## 4. Popular Products

Lists the best-selling or most visited popular products.

*   **Endpoint:** `GET /product/popular?page=1&limit=10`
*   **Auth Requirement:** `x-avci-client`

---

## 5. Random Products

Fetches a specified amount of random products (e.g., for homepage discovery sections).

*   **Endpoint:** `GET /product/random/:amount`
*   **Auth Requirement:** `x-avci-client`

**Example:** `/product/random/5`

---

## 6. Faceted Search (Filters)

Returns active filters (price range, brands, categories) that can be shown in the sidebar based on current search/category criteria.

*   **Endpoint:** `GET /product/filters`
*   **Auth Requirement:** `x-avci-client`
*   **Parameters:** Accepts the same query parameters (`category`, `search`, `brand`) as the list operation.

---

## 7. Similar Products

Suggests alternative products (in the same category, etc.) similar to a viewed product.

*   **Endpoint:** `GET /product/:slug/similar?limit=4`
*   **Auth Requirement:** `x-avci-client`
