---
id: python
title: Python SDK
sidebar_position: 4
---

# Python SDK Guide

The official Python client (`avcicms`) is built for automation workflows, backend integrations, data pipelines, and AI agents interacting with AVCI CMS. It provides both synchronous and asynchronous (`httpx`-powered) clients with full Pydantic v2 data models.

---

## Installation

Install using `pip` or `poetry`:

```bash
pip install avcicms
# or using poetry
poetry add avcicms
```

---

## Authentication & Initialization

```python
from avcicms import AvciCMS, AsyncAvciCMS

# Synchronous Client
client = AvciCMS(
    api_key="your_api_key_here",
    project_id="your_project_id_here"
)

# Or Asynchronous Client
async_client = AsyncAvciCMS(
    api_key="your_api_key_here",
    project_id="your_project_id_here"
)
```

---

## Example Operations

### 1. Basket Management & Checkout

```python
# 1. Create a basket
basket = client.basket.create(currency="TRY")
basket_id = basket["basketId"]

# 2. Add product and event ticket items
client.basket.add_items(basket_id, [
    {"id": "prod_123", "quantity": 1, "itemType": "product"},
    {"id": "event_456", "quantity": 2, "itemType": "event"}
])

# 3. Create order with attendee information for ticket items
order = client.order.create({
    "basketId": basket_id,
    "paymentMethod": "CREDIT_CARD",
    "addresses": {
        "shipmentAddressId": "addr_ship_789",
        "billingAddressId": "addr_bill_789"
    },
    "card": {
        "cardHolderName": "Ahmet Yilmaz",
        "cardNumber": "5406670000000000",
        "expireMonth": "12",
        "expireYear": "2028",
        "cvc": "123"
    },
    "participants": [
        {"basketItemId": "item_event_1", "name": "Ahmet Yilmaz", "email": "ahmet@example.com"},
        {"basketItemId": "item_event_2", "name": "Zeynep Kaya", "email": "zeynep@example.com"}
    ]
})

print(f"Created order: {order.get('orderId')}")
```

### 2. Vendor / Merchant Sub-Order Integration

Merchants can securely poll and inspect their assigned sub-orders with strict vendor isolation:

```python
# List assigned sub-orders for the authenticated vendor
vendor_orders = client.order.list_vendor_orders(status="PREPARING")

for sub_order in vendor_orders.get("data", []):
    print(f"Sub-Order ID: {sub_order['subOrderId']}, Items count: {len(sub_order['items'])}")
```

### 3. Dynamic Form Submissions

```python
# Submit a dynamic custom form
submission = client.custom_form.submit("contact-form-id", {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "message": "Interested in partnership opportunities."
})
```
