---
id: errors
title: Error Codes & Handling
sidebar_position: 2
---

# API Error Codes & Handling

When an API request to AVCI CMS Public Storefront endpoints fails, the server responds with a standardized JSON error envelope accompanied by an appropriate HTTP status code. 

All error codes follow a structured, predictable 3-part nomenclature that enables client applications to programmatically handle failures and display localized error feedback.

---

## Standard Error Response Structure

Failed requests always return HTTP status codes in the `4xx` or `5xx` range with the following standard JSON structure:

```json
{
  "status": "error",
  "error": {
    "code": "ERR_CATALOG_PRODUCT_1001",
    "module": "catalog",
    "entity": "product",
    "codeNumber": 1001,
    "message": "The requested product was not found in this catalog.",
    "statusCode": 404
  }
}
```

### Response Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `status` | String | Always returns `"error"`. |
| `error.code` | String | The unified 3-part machine-readable error code (`ERR_[MODULE]_[ENTITY]_[CODE]`). |
| `error.module` | String | The business module that produced the error (e.g., `catalog`, `relation`, `common`, `finance`). |
| `error.entity` | String | The specific entity within the module (e.g., `product`, `merchant`, `category`, `cart`). |
| `error.codeNumber` | Number | Numeric subcode indicating the exact failure reason (e.g., `1001`, `1002`, `2001`). |
| `error.message` | String | Localized human-readable error explanation resolved using the request's `Accept-Language` or workspace default language. |
| `error.statusCode` | Number | Matching HTTP status code (400, 401, 403, 404, 429, 500). |

---

## Standard Code Number Ranges

The `codeNumber` field follows standard category allocations across all modules:

| Code Range | Meaning | Typical HTTP Status | Example |
| :--- | :--- | :---: | :--- |
| `1001 - 1008` | **Resource State & Retrieval**<br/>(Not found, duplicate slug, inactive entity) | `404` / `409` | `ERR_CATALOG_PRODUCT_1001`<br/>*(Product not found)* |
| `2001 - 2004` | **Validation & Payload Errors**<br/>(Missing required parameters, invalid format, out of bounds) | `400` | `ERR_FINANCE_BASKET_2001`<br/>*(Insufficient inventory for item)* |
| `3001 - 3004` | **Authentication & Permissions**<br/>(Missing client ID, expired token, role forbidden) | `401` / `403` | `ERR_RELATION_MERCHANT_3001`<br/>*(Access denied to private merchant data)* |

---

## Handling Errors in Client Applications

### Example: TypeScript / JavaScript SDK Error Handling

When using `@avci/sdk` or standard `fetch`, catch errors and inspect the structured `code` or `codeNumber`:

```typescript
import { AvciClient } from '@avci/sdk';

const client = new AvciClient({
  clientId: process.env.NEXT_PUBLIC_AVCI_CLIENT_ID!,
});

try {
  const product = await client.catalog.getProductBySlug('limited-edition-sneaker');
  console.log(product);
} catch (error: any) {
  if (error.code === 'ERR_CATALOG_PRODUCT_1001') {
    // Gracefully handle 404 Not Found in your storefront UI
    console.warn('Product does not exist or has been archived.');
  } else if (error.statusCode === 429) {
    // Rate limit hit
    console.error('Too many requests. Please throttle calls.');
  } else {
    // Generic fallback
    console.error('API Error:', error.message);
  }
}
```

---

## Common HTTP Status Codes

### `400 Bad Request`
The request body or query parameters failed validation. Ensure required fields are present and follow documented types.

### `401 Unauthorized`
The mandatory `x-avci-client` header is either missing or contains an invalid Tenant Client ID. Verify your credentials in **Workspace > Settings > General**.

### `403 Forbidden`
The client ID does not have permission to access the requested resource, or an unauthorized cross-tenant request was attempted.

### `404 Not Found`
The target record (product, category, merchant, article) could not be located or is marked as `draft`/`archived`.

### `429 Too Many Requests`
The workspace has reached its plan rate limit. Respect the `Retry-After` HTTP header before issuing subsequent calls.
