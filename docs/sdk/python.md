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

### 4. User Address Management & Primary Address

```python
# 1. List user addresses
addresses = client.user.list_addresses()

# 2. Add address with primary status
new_address = client.user.add_address({
    "title": "Home",
    "firstName": "Ahmet",
    "lastName": "Yılmaz",
    "phone": "+905551234567",
    "city": "İstanbul",
    "district": "Kadıköy",
    "addressLine1": "Moda Cad. No: 15",
    "isPrimary": True # Automatically unsets other addresses as primary
})

# 3. Update existing address (supports addressId, id, or _id)
client.user.update_address("addr_6735be91a12e", {
    "title": "Home (Updated)",
    "isPrimary": True
})

# 4. Set primary address via dedicated method
client.user.set_primary_address("addr_6735be91a12e")

# 5. Delete address
client.user.delete_address("addr_6735be91a12e")
```

### 5. Entity Showcase Self-Profiles (Artisan, Brand, Organization)

```python
# Fetch and update Artisan / Merchant profile
artisan_profile = client.merchant.get_me()
client.merchant.update_me({
    "logo": "https://cdn.example.com/logo.png",
    "coverImage": "https://cdn.example.com/cover.jpg",
    "description": "Master woodcarver crafting bespoke furniture.",
    "attributes": {"specialty": "Oak & Walnut Carving", "yearsActive": 25}
})

# Fetch and update Brand profile
brand_profile = client.brand.get_me()
client.brand.update_me({"description": "Artisan luxury lifestyle brand."})

# Fetch and update Organization profile
org_profile = client.organization.get_me()
client.organization.update_me({"description": "Craftspeople and Guilds Cooperative."})
```

### 6. Geographic Directory & Tax Offices

```python
# List Turkish cities
cities = client.static.list_cities()

# List districts in Istanbul (cityId: 34)
districts = client.static.list_districts(34)

# List neighborhoods in Kadikoy (districtId: 450)
neighborhoods = client.static.list_neighborhoods(450)

# List tax offices in Istanbul, filtered by district
# Automatically normalizes city codes: 1, 01, 34, 034
tax_offices = client.static.list_tax_offices(34, district="Kadıköy")
```

### 7. Corporate Team Directory

```python
# List public team members
team = client.team.list(limit=20, department="Executive")

# Get team member by slug
member = client.team.get_by_slug("jane-doe")
```

