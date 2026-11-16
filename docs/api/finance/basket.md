---
id: basket
title: Shopping Basket API
sidebar_position: 1
---

# Shopping Basket API

The Basket API manages the customer cart lifecycle, supporting physical goods, digital products, and ticketed catalog items (events and routes). It automatically performs real-time stock and capacity checks, calculates multi-merchant sub-totals, and applies discounts and shipping costs.

All public Storefront endpoints require the standard `x-avci-client` header (and optional `Authorization: Bearer <token>` for authenticated customers).

---

## Architecture & Calculation Rules

### 1. Multi-Item Support
A basket can simultaneously hold items across different catalog domains:
- **`product`:** Physical or digital catalog goods with optional variants.
- **`event`:** Event tickets. Adding an event ticket to the basket creates a **temporary capacity reservation (cart lock)** for 10 minutes in Redis, ensuring the seat is protected while the customer completes checkout.
- **`route`:** Tour / route tickets covering multiple sequenced events.

### 2. Multi-Merchant Grouping & Shipment Precedence
In Marketplace mode, items from multiple merchants can coexist in a single basket:
- At checkout, the order is automatically partitioned into **Sub-Orders** per merchant.
- **Shipment Fee Precedence:** Shipping costs are determined by checking configurations in the following order:
  1. **Brand Settings:** If the product's brand has designated custom carrier and fee rules.
  2. **Merchant Settings:** If the merchant has defined dedicated courier rules.
  3. **Workspace Default:** Fallback to workspace-level default shipping parameters.

---

## Endpoints Reference

### 1. Create Basket
Creates a new shopping basket for a guest visitor or customer session.

* **Endpoint:** `POST /v1/basket`
* **Headers:** `x-avci-client: <client_key>`
* **Body:**
  ```json
  {
    "currency": "TRY"
  }
  ```
* **Response (`data`):**
  ```json
  {
    "_id": "6735e1234567890abcdef123",
    "basketId": "bskt_987654321",
    "items": [],
    "price": {
      "subtotal": 0,
      "discount": 0,
      "shipping": 0,
      "total": 0,
      "currency": "TRY"
    }
  }
  ```

---

### 2. Get Basket
Retrieves the current state, active items, applied coupons, and calculated totals of an existing basket.

* **Endpoint:** `GET /v1/basket/:basketId`
* **Headers:** `x-avci-client: <client_key>`

---

### 3. Add Items to Basket
Adds one or more products, event tickets, or route tickets to the basket.

* **Endpoint:** `POST /v1/basket/add/:basketId`
* **Headers:** `x-avci-client: <client_key>`
* **Body:**
  ```json
  {
    "items": [
      {
        "id": "6735a1112223334445556667",
        "quantity": 2,
        "itemType": "product",
        "variantId": "var_red_xl"
      },
      {
        "id": "6735b9998887776665554443",
        "quantity": 1,
        "itemType": "event"
      }
    ]
  }
  ```

> [!IMPORTANT]
> When adding **event** or **route** items, capacity is temporarily reserved. You must collect attendee details for these items before final checkout (see [Order API](order.md)).

---

### 4. Update Item Quantity
Modifies the quantity of an item or removes it.

* **Endpoint:** `PUT /v1/basket/update/:basketId/:itemId/:action`
* **URL Parameters:**
  - `basketId`: Basket ID
  - `itemId`: The item `_id` inside the basket
  - `action`: `increase` | `decrease` | `delete`
* **Headers:** `x-avci-client: <client_key>`

---

### 5. Change Basket Currency
Dynamically recalibrates all line items and shipping costs to the specified currency.

* **Endpoint:** `PUT /v1/basket/currency/:basketId`
* **Headers:** `x-avci-client: <client_key>`
* **Body:**
  ```json
  {
    "currency": "USD"
  }
  ```

---

### 6. Update Basket Metadata & Coupons
Applies coupons or binds delivery and billing address IDs to the basket.

* **Endpoint:** `PUT /v1/basket/:basketId`
* **Headers:** `x-avci-client: <client_key>`
* **Body:**
  ```json
  {
    "coupon": "SUMMER2026",
    "shippingAddressId": "6735c0001112223334445556",
    "billingAddressId": "6735c0001112223334445556"
  }
  ```

---

### 7. Prepare Legal Terms (Agreements)
Generates the legal documents (Distance Selling Contract and Preliminary Information Form) tailored to the items and prices currently in the basket.

* **Endpoint:** `POST /v1/basket/terms/`
* **Headers:** `x-avci-client: <client_key>`, `Authorization: Bearer <token>`
* **Body:**
  ```json
  {
    "basketId": "bskt_987654321"
  }
  ```
* **Response (`data`):**
  ```json
  {
    "distanceSaleAgreement": "HTML or markdown contract text...",
    "preliminaryInformationForm": "HTML or markdown preliminary form text..."
  }
  ```

---

### 8. Clear Basket
Empties all items from the basket and releases any temporary ticket capacity locks.

* **Endpoint:** `DELETE /v1/basket/:basketId`
* **Headers:** `x-avci-client: <client_key>`
