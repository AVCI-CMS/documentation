---
id: attribute
title: Attributes
sidebar_position: 2
---

# Attribute & Variation Operations

Lists the attribute types of variant products in the e-commerce system (e.g., Color, Size, Memory Option) and the options belonging to these types (Blue, Red, S, M, L).

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Attributes for Filtering

Returns the list of all active product attributes (along with their options) that will be used as filters on the side of the catalog screen (Sidebar).

*   **Endpoint:** `GET /attribute`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "attr_color",
      "name": "Color",
      "type": "COLOR",
      "options": [
        { "label": "Red", "value": "#FF0000" },
        { "label": "Blue", "value": "#0000FF" }
      ]
    },
    {
      "id": "attr_size",
      "name": "Size",
      "type": "TEXT",
      "options": [
        { "label": "Small", "value": "S" },
        { "label": "Large", "value": "L" }
      ]
    }
  ]
}
```

---

## 2. Specific Attribute Detail

Returns the details of a specific attribute set, such as only "Size" or only "Color".

*   **Endpoint:** `GET /attribute/:id`
*   **Auth Requirement:** `x-avci-client`
