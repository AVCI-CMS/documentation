---
id: attribute
title: Attributes
sidebar_position: 2
---

# Common Attribute Engine

The AVCI CMS Attribute Engine provides a unified Entity-Attribute-Value (EAV) infrastructure for defining dynamic, structured, and filterable attributes across multiple platform entities.

Attributes are not restricted to product catalog variants; they power dynamic schemas across seven core entity domains:
* `product`: Product specifications, dimensions, materials, and variant matrices.
* `project`: Portfolio projects, technical stacks, deliverables, and client specs.
* `event`: Event badges, age restrictions, venue seating criteria, and requirements.
* `merchant`: Vendor credentials, business categories, badges, and operational settings.
* `brand`: Brand certifications, origin, and authorized manufacturer metadata.
* `organization`: Cooperative, chamber, and association classification data.
* `place`: Venue amenities, coordinates, accessibility options, and capacities.

The `x-avci-client` header is **mandatory** on all Storefront and Management requests.

---

## Normalized Schema & Attribute ID Standard

All entities storing attributes use the normalized EAV reference standard:
```json
{
  "attributes": [
    {
      "attributeId": "65f1a2b3c4d5e6f7a8b9c0d1",
      "label": "65f1a2b3c4d5e6f7a8b9c0d1",
      "value": "100% Organic Cotton",
      "unit": "GSM"
    }
  ]
}
```

> **Backward Compatibility:**  
> The system automatically maintains two-way synchronization between `attributeId` and legacy `label` fields via automated pre-save middleware. Existing queries targeting `attributes.label` continue to function without disruption.

---

## Supported Data Types

| Data Type | Description | Options / Schema |
| :--- | :--- | :--- |
| `STRING` | Freeform single-line or multi-line text | Optional `regex` validation |
| `NUMBER` | Numeric values (integers, floats) | Optional `min`, `max`, and `unit` |
| `BOOLEAN` | True / False binary flag | Rendered as toggle switch |
| `DATE` | ISO 8601 Date / Timestamp | Supports date pickers |
| `SELECT` | Single-choice from a predefined list | `options: [{ label, value, color }]` |
| `MULTISELECT`| Multiple choices from a predefined list | `options: [{ label, value, color }]` |
| `SOURCE` | Dynamic options populated from another entity | `sourceConfig: { entityType, filterQuery }` |
| `OBJECT` | Complex nested subdocument | `nestedFields: AttributeDto[]` |

---

## 1. Storefront & Public APIs

### 1.1 List Attributes for Catalog Filtering
Retrieves all filterable attributes with their configured options for a specified entity type.

* **Endpoint:** `GET /attribute/:type`
* **Path Parameter:** `type` (one of `product`, `project`, `event`, `merchant`, `brand`, `organization`, `place`)
* **Auth Requirement:** `x-avci-client`

**Example Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "660c1d2e3f4a5b6c7d8e9f01",
      "key": "fabric_composition",
      "label": "Fabric Composition",
      "type": "SELECT",
      "options": [
        { "label": "Cotton", "value": "cotton" },
        { "label": "Linen", "value": "linen" },
        { "label": "Silk", "value": "silk" }
      ]
    },
    {
      "_id": "660c1d2e3f4a5b6c7d8e9f02",
      "key": "origin_country",
      "label": "Country of Origin",
      "type": "STRING"
    }
  ]
}
```

### 1.2 Fetch Dynamic Source Options
Retrieves dynamic dropdown options for `SOURCE`-type attributes linked to relational entities.

* **Endpoint:** `GET /attribute/:type/source-options`
* **Auth Requirement:** `x-avci-client`

**Example Response:**
```json
{
  "status": "success",
  "data": [
    { "label": "Acme Textile Mills", "value": "660c1d2e3f4a5b6c7d8e9a11" },
    { "label": "Global Threads Ltd", "value": "660c1d2e3f4a5b6c7d8e9a12" }
  ]
}
```

---

## 2. Management & Backoffice APIs

All management endpoints require workspace administrator authentication (`Authorization: Bearer <token>`).

### 2.1 Paginated Attribute List
* **Endpoint:** `GET /attribute/:type?page=1&limit=20&search=color`
* **Permission:** `Attributes:View`

### 2.2 Simplified List for Form Dropdowns
Returns key, label, and type without heavy metadata, ideal for UI select components:
* **Endpoint:** `GET /attribute/:type/list`

### 2.3 Check Key Availability
Checks if an attribute slug/key is unique before creation:
* **Endpoint:** `GET /attribute/:type/check?key=fabric_type`

### 2.4 Create New Attribute
* **Endpoint:** `POST /attribute/:type`
* **Permission:** `Attributes:Create`

**Request Body:**
```json
{
  "type": "SELECT",
  "key": "frame_material",
  "label": "Frame Material",
  "description": "Material used in eyeglasses frames",
  "isRequired": false,
  "isFilterable": true,
  "options": [
    { "label": "Titanium", "value": "titanium" },
    { "label": "Acetate", "value": "acetate" },
    { "label": "Stainless Steel", "value": "stainless_steel" }
  ]
}
```

### 2.5 Update Attribute
* **Endpoint:** `PUT /attribute/:type/:id`
* **Permission:** `Attributes:Update`

### 2.6 Delete Attribute
* **Endpoint:** `DELETE /attribute/:type/:id`
* **Permission:** `Attributes:Delete`

### 2.7 Bulk Delete Attributes
Deletes multiple attributes in an atomic batch operation:
* **Endpoint:** `DELETE /attribute/:type/bulk`
* **Request Body:** `{ "ids": ["660c1d2e3f4a5b6c7d8e9f01", "660c1d2e3f4a5b6c7d8e9f02"] }`

### 2.8 Bulk Status Update
* **Endpoint:** `PUT /attribute/:type/bulk/status`
* **Request Body:** `{ "ids": ["660c1d2e3f4a5b6c7d8e9f01"], "status": "PASSIVE" }`

---

## 3. SDK Code Examples

### TypeScript SDK (`@avci/sdk`)
```typescript
import { AvciCMS } from 'avcicms';

const avci = new AvciCMS({
  apiKey: process.env.AVCI_API_KEY!,
  clientId: process.env.AVCI_CLIENT_ID!,
});

// 1. Fetch public product attributes for storefront sidebar
const { data: filters } = await avci.attribute.getPublicList('product');

// 2. Create a new merchant attribute in backoffice
const { data: newAttr } = await avci.attribute.create('merchant', {
  type: 'SELECT',
  key: 'corporation_size',
  label: 'Corporation Size',
  options: [
    { label: '1 - 10 Employees', value: '1-10' },
    { label: '11 - 50 Employees', value: '11-50' },
    { label: '50+ Employees', value: '50+' },
  ],
});

// 3. Bulk delete obsolete attributes
await avci.attribute.bulkDelete('product', ['attr_id_1', 'attr_id_2']);
```

### Python SDK (`avcicms`)
```python
from avcicms import AvciCMS

client = AvciCMS(
    api_key="your_api_key",
    project_id="your_project_id",
)

# 1. Fetch public attributes
attributes = client.attribute.get_public_list("product")

# 2. Check key uniqueness
is_available = client.attribute.check_key("project", "delivery_date")

# 3. Create a new event attribute
new_attribute = client.attribute.create("event", {
    "type": "BOOLEAN",
    "key": "wheelchair_accessible",
    "label": "Wheelchair Accessible",
    "isFilterable": True,
})
```
