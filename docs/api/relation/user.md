---
id: user
title: Users & Addresses
sidebar_position: 4
---

# User Account & Address Operations

The User module allows authenticated storefront customers to manage their profile details and shipping/billing address book.

Both the `x-avci-client` identity header and `Authorization: Bearer <user_token>` are **mandatory** for all requests.

---

## 1. List User Addresses

Lists all saved shipping and billing addresses for the currently authenticated user.

* **Endpoint:** `GET /v1/user/address`
* **Auth Requirement:** `x-avci-client`, `Authorization: Bearer <token>`

### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "addressId": "addr_6735be91a12e",
      "title": "Home",
      "firstName": "Ahmet",
      "lastName": "Yılmaz",
      "phone": "+905551234567",
      "city": "İstanbul",
      "district": "Kadıköy",
      "neighborhood": "Caferağa Mah.",
      "addressLine1": "Moda Cad. No: 15 D: 4",
      "zipCode": "34710",
      "country": "TR",
      "isPrimary": true
    }
  ]
}
```

---

## 2. Add New Address

Adds a new address to the user's address book. If `isPrimary: true` is passed, this address becomes the user's primary/default address and any previous default is automatically unset.

* **Endpoint:** `POST /v1/user/address`
* **Auth Requirement:** `x-avci-client`, `Authorization: Bearer <token>`

### Request Body
```json
{
  "title": "Office",
  "firstName": "Ahmet",
  "lastName": "Yılmaz",
  "phone": "+905551234567",
  "city": "İstanbul",
  "district": "Beşiktaş",
  "neighborhood": "Levent Mah.",
  "addressLine1": "Büyükdere Cad. No: 120 Kat: 5",
  "zipCode": "34394",
  "country": "TR",
  "isPrimary": false
}
```

---

## 3. Update Existing Address

Updates an existing address by its ID.

* **Endpoint:** `PUT /v1/user/address/:id`
* **Auth Requirement:** `x-avci-client`, `Authorization: Bearer <token>`

### Address Identifier Compatibility
The `:id` path parameter supports:
- Modern `addressId` string identifiers (e.g., `addr_6735be91a12e`).
- Legacy `id` strings.
- MongoDB ObjectId (`_id`).

### Primary Address Switching
When sending `"isPrimary": true` inside the request body of `PUT /v1/user/address/:id`, the system will:
1. Update the address fields.
2. Automatically mark this address as primary.
3. Remove the primary flag from all other addresses in the user's address book.

### Request Body
```json
{
  "title": "Office - Headquarters",
  "phone": "+905559876543",
  "addressLine1": "Büyükdere Cad. No: 120 Kat: 6",
  "isPrimary": true
}
```

### Example Response
Returns the updated list of all user addresses.

---

## 4. Set Address as Primary

A dedicated endpoint to set a specific address as the default without updating any other fields.

* **Endpoint:** `PUT /v1/user/address/:id/primary`
* **Auth Requirement:** `x-avci-client`, `Authorization: Bearer <token>`

### Example Request
```bash
curl -X PUT "https://api.avcicms.com/v1/user/address/addr_6735be91a12e/primary" \
  -H "x-avci-client: <tenant_id>" \
  -H "Authorization: Bearer <user_token>"
```

### Example Response
```json
{
  "status": "success",
  "data": {
    "primaryAddressId": "addr_6735be91a12e"
  }
}
```

---

## 5. Delete Address

Removes an address from the user's address book.

* **Endpoint:** `DELETE /v1/user/address/:id`
* **Auth Requirement:** `x-avci-client`, `Authorization: Bearer <token>`

### Example Request
```bash
curl -X DELETE "https://api.avcicms.com/v1/user/address/addr_6735be91a12e" \
  -H "x-avci-client: <tenant_id>" \
  -H "Authorization: Bearer <user_token>"
```

