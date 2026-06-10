---
id: errors
title: Common Error Codes
sidebar_position: 2
---

# API Error Codes and Management

When a request you make to the AVCI CMS Public APIs fails, the server returns a standardized JSON error format along with an HTTP status code. This page explains the common errors you might encounter and how to interpret them.

## Standard Error Response (JSON)

The following JSON structure is returned for all failed requests:

```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "There are missing fields in the submitted data.",
    "details": [
      {
        "field": "email",
        "issue": "Not a valid email address"
      }
    ]
  }
}
```

*   `status`: Always returns `"error"`.
*   `code`: A standard string constant that the system can programmatically catch (can be checked with if-else in frontend code).
*   `message`: A descriptive message that can be shown to the end-user (or developer).
*   `details`: (Optional) An array indicating exactly where the error occurred in cases like Validation errors.

## Common HTTP Status Codes

### 400 Bad Request
The parameters sent in the request are missing, incorrect, or in a format the system cannot accept.
*   Example Error Code: `VALIDATION_FAILED`, `INVALID_PARAMETER`
*   Solution: Check the required fields and types in the endpoint documentation.

### 401 Unauthorized
You do not have permission to access. This can be caused by one of the following:
*   The `x-avci-client` header was not sent or contains an invalid ID.
*   The `Authorization` header (JWT Token) is missing or has expired.
*   Example Error Code: `TENANT_NOT_FOUND`, `TOKEN_EXPIRED`, `UNAUTHORIZED`

### 403 Forbidden
You have logged into the system, but you do not have the required role or permission for the resource or action you want to call.
*   Example Error Code: `PERMISSION_DENIED`

### 404 Not Found
The resource you requested (product, page, member, etc.) could not be found in the database or has been deleted. Or, the endpoint URL was typed incorrectly.
*   Example Error Code: `RESOURCE_NOT_FOUND`

### 429 Too Many Requests (Rate Limit)
You made requests to the server much faster and more frequently than the set limits. Your IP address or Client ID might be temporarily blocked on endpoints with active protection.
*   Example Error Code: `RATE_LIMIT_EXCEEDED`
*   Solution: Slow down your operations by checking the `Retry-After` time in the response (or Header).

### 500 Internal Server Error
An unexpected error occurred on the AVCI CMS servers. These situations are immediately reported to the system administrators.
*   Example Error Code: `INTERNAL_ERROR`
