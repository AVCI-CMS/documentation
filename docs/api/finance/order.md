---
id: order
title: Order API
sidebar_position: 2
---

# Order API

The Order API orchestrates the finalization of purchases, participant registration for ticketed items, credit card installments, customer purchase histories, and merchant vendor sub-order tracking.

---

## 1. Storefront & Customer Endpoints

### Create Order (Checkout)
Finalizes checkout using an existing basket, delivery addresses, and payment credentials.

* **Endpoint:** `POST /v1/order`
* **Headers:** `x-avci-client: <client_key>`, `Authorization: Bearer <token>`
* **Body Fields:**
  | Field | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `basketId` | `string` | Yes | Prepared basket identifier. |
  | `paymentMethod` | `string` | Yes | `CREDIT_CARD`, `BANK_TRANSFER`, `WALLET`, etc. |
  | `addresses` | `object` | Yes | `{ shipmentAddressId, billingAddressId }` |
  | `card` | `object` | No* | Credit card payload (if paying by direct card). |
  | `cardId` | `string` | No* | Stored card token identifier (for one-click checkout). |
  | `installment` | `number` | No | Installment count (e.g., `1`, `3`, `6`, `12`). |
  | `participants` | `array` | Conditional | **Required if the basket contains ticket items (`event` or `route`).** |

#### Participant Information for Ticket Items
When the basket contains **event** or **route** items, attendee information must be provided for each seat slot:
```json
{
  "basketId": "bskt_987654321",
  "paymentMethod": "CREDIT_CARD",
  "addresses": {
    "shipmentAddressId": "6735c0001112223334445556",
    "billingAddressId": "6735c0001112223334445556"
  },
  "participants": [
    {
      "basketItemId": "item_event_slot_1",
      "name": "Ahmet Yılmaz",
      "email": "ahmet@example.com",
      "phone": "+905551112233"
    },
    {
      "basketItemId": "item_route_slot_2",
      "name": "Zeynep Kaya",
      "email": "zeynep@example.com"
    }
  ]
}
```

> [!NOTE]
> For **route** tickets, attendee details are automatically registered into the parent route and all sub-events contained within that route inside a single atomic database transaction.

---

### List Customer Orders
Returns the authenticated customer's order history.

* **Endpoint:** `GET /v1/order`
* **Query Parameters:** `page`, `limit`, `status`
* **Headers:** `x-avci-client: <client_key>`, `Authorization: Bearer <token>`

---

### Get Customer Order Details
Fetches detailed tracking, invoice, agreement, and item records for a single customer order.

* **Endpoint:** `GET /v1/order/:orderId`
* **Headers:** `x-avci-client: <client_key>`, `Authorization: Bearer <token>`

---

### Query Installment Options
Retrieves installment matrix and bank rates based on the customer's credit card BIN number.

* **Endpoint:** `POST /v1/order/installment`
* **Headers:** `x-avci-client: <client_key>`
* **Body:**
  ```json
  {
    "binNumber": "540667",
    "price": 1500.00
  }
  ```

---

### Saved Payment Cards
Manage stored credit cards for registered customers:
- **List Saved Cards:** `GET /v1/order/saved-cards`
- **Store Card:** `POST /v1/order/saved-cards`
- **Delete Card:** `DELETE /v1/order/saved-cards/:id`

---

## 2. Vendor / Merchant Isolated Endpoints

Vendors (`WORKSPACE_MERCHANT`) operate with strict row-level security. The platform verifies sub-order ownership (`validateSubOrderOwnership`), ensuring merchants can never access items, customer data, or financials outside their assigned sub-order.

### List Vendor Sub-Orders
Retrieves all sub-orders assigned to the authenticated merchant.

* **Endpoint:** `GET /v1/order/vendor`
* **Headers:** `Authorization: Bearer <merchant_token>`
* **Query Parameters:** `page`, `limit`, `status`

### Get Vendor Sub-Order Details
Retrieves detailed information for a single assigned sub-order.

* **Endpoint:** `GET /v1/order/vendor/:orderId`
* **Headers:** `Authorization: Bearer <merchant_token>`

---

## 3. Order Cancellations & RMA Returns Workflow

> [!IMPORTANT]
> **End-Users (Customers) Never Access the Management Panel:**
> Customers interact solely via the Storefront. When a customer requests an order cancellation, return, or dispute:
> 1. The customer submits a return or cancellation request from their Storefront account.
> 2. The platform automatically creates a ticket in the **Ticket API** (`category: 'CANCELLATION'` or `category: 'RETURN'`).
> 3. Store operators and merchants review and process the dispute in the management console, where an active cancellation banner highlights the pending request.
> 
> For ticket creation details, see the [Ticket API Documentation](../communication/ticket.md).

