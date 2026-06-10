---
id: coupon
title: Coupons
sidebar_position: 6
---

# Coupon Operations

Used to query the validity of active discount codes on your site and to validate coupon rules during the cart/checkout stages.

The `x-avci-client` identity header is **mandatory** for all requests. Additionally, to allow users to see their coupon definitions, a JWT token must be sent via the `Authorization` header.

---

## 1. Check Coupon Code

Checks whether a coupon code entered by the user (e.g., `SUMMER2026`) exists in the system and whether it is valid for that specific customer.

*   **Endpoint:** `GET /coupon/check/:code`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

**Example:** `/coupon/check/SUMMER2026`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "cpn_123",
    "code": "SUMMER2026",
    "discountType": "percentage",
    "discountValue": 20,
    "minOrderAmount": 500,
    "isValid": true
  }
}
```

---

## 2. Validate Coupon

Validates whether the coupon is applicable based on the existing products and amounts in the cart (e.g., checking "There is a product in your cart that is excluded from the campaign").

*   **Endpoint:** `GET /coupon/validate`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`
*   **Note:** Typically takes `code` and, if necessary, `basketId` as query parameters.

**Example cURL Request:**
```bash
curl -X GET "https://api.avcicms.com/v1/coupon/validate?code=SUMMER2026&basketId=bskt_789" \
  -H "x-avci-client: <tenant_id>" \
  -H "Authorization: Bearer <token>"
```
