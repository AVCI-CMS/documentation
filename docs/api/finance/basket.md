---
id: basket
title: Basket / Cart
sidebar_position: 1
---

# Basket Management

Basket operations, which form the core module of e-commerce and order processes, allow a user or guest visitor to collect products, update quantities, and assign shipping.

These endpoints automatically handle background stock (reservation) checks and dynamic price calculations. The `x-avci-client` header is mandatory in all requests.

---

## 1. Create Basket

Used to create a new, empty basket (usually when a guest user first visits the site). Upon success, it returns a `basketId`. All subsequent operations are carried out using this ID.

*   **Endpoint:** `POST /basket`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "id": "bskt_123456",
    "status": "active",
    "totalPrice": 0,
    "items": []
  }
}
```

---

## 2. Get Basket

Fetches the current state of an existing basket, the items inside it, and its calculated total amounts.

*   **Endpoint:** `GET /basket/:basketId`
*   **Auth Requirement:** `x-avci-client`

---

## 3. Add Items to Basket

Adds a new product/variant to an existing basket. If the product is already in the basket, it increases its quantity.

*   **Endpoint:** `POST /basket/:basketId/items`
*   **Auth Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "productId": "prod_123",
  "variantId": "var_456",
  "quantity": 2
}
```

---

## 4. Update Item Quantity

Changes the quantity of an item that was previously added to the basket. If stock is insufficient, it returns a `400 Bad Request` or `INSUFFICIENT_STOCK` error.

*   **Endpoint:** `PUT /basket/:basketId/items/:itemId`
*   **Auth Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "quantity": 5
}
```

---

## 5. Remove Item from Basket

Completely removes a specific item from the basket.

*   **Endpoint:** `DELETE /basket/:basketId/items/:itemId`
*   **Auth Requirement:** `x-avci-client`

---

## 6. Clear / Delete Basket

Completely deletes the basket or empties all items inside it.

*   **Endpoint:** `DELETE /basket/:basketId`
*   **Auth Requirement:** `x-avci-client`

---

## 7. Assign Carrier (Shipping)

Assigns which shipping company or shipping rules will apply to the items in the basket. This step is critical for calculating shipping fees before proceeding to the checkout stage.

*   **Endpoint:** `POST /basket/:basketId/carriers`
*   **Auth Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "carrierId": "crr_789"
}
```

---

## 8. Set Basket Notes

Saves the order notes to the basket that the user wants to pass on to the seller or the team preparing the order.

*   **Endpoint:** `POST /basket/:basketId/notes`
*   **Auth Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "note": "Please gift wrap."
}
```

---

## 9. Prepare Terms (Contracts)

Dynamically generates drafts of legal documents such as the Distance Selling Contract and Preliminary Information Form, which the user must accept before proceeding to Checkout, based on the current products and prices in the basket.

*   **Endpoint:** `POST /basket/terms`
*   **Auth Requirement:** `x-avci-client`
*   **Note:** Contextual data such as `basketId` or payment methods might be requested in the request body. (Review the SDK reference for parameters).
