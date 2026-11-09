---
id: python
title: Python SDK
sidebar_position: 4
---

# Python SDK Guide

The official Python client (`avcicms`) is built for automation workflows, backend integrations, data migrations, and automated AI agents interacting with AVCI CMS.

---

## Installation

Install using `pip` or your favorite package manager:

```bash
pip install avcicms
# or using poetry
poetry add avcicms
```

---

## Authentication & Initialization

```python
from avcicms import AvciClient

client = AvciClient(
    api_key="your_api_key_here",
    project_id="your_project_id_here"
)
```

---

## Example Operations

### 1. Bulk Inventory Updates
Quickly sync inventory levels from an external ERP or warehouse spreadsheet:

```python
inventory_updates = [
    {"sku": "TSHIRT-BLK-S", "stock": 45},
    {"sku": "TSHIRT-BLK-M", "stock": 120},
    {"sku": "TSHIRT-BLK-L", "stock": 80},
]

for item in inventory_updates:
    client.catalog.update_stock(sku=item["sku"], quantity=item["stock"])
    print(f"Updated {item['sku']} to {item['stock']} units.")
```

### 2. Exporting Order Records for Data Science

```python
orders = client.finance.list_orders(status="completed", limit=100)

total_revenue = sum(order.total_amount for order in orders)
print(f"Processed {len(orders)} orders with total revenue: ${total_revenue:.2f}")
```

### 3. AI Agent Integration
Easily empower your LLMs or autonomous agents with real-time product search:

```python
def search_products_for_user(query: str):
    results = client.catalog.search(query=query, limit=5)
    return [
        {"name": p.name, "price": p.price, "url": f"https://mystore.com/products/{p.slug}"}
        for p in results
    ]
```

