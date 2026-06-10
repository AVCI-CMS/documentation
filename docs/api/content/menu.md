---
id: menu
title: Menus
sidebar_position: 5
---

# Menu Management

Allows you to dynamically fetch the Header (Top), Footer (Bottom), or Sidebar (Side) navigation links of your frontend application from the AVCI CMS panel. Thus, you can change your site's link structure without needing a developer.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Menus

Lists the main menu groups defined in the system (e.g., "Header Menu", "Footer Menu").

*   **Endpoint:** `GET /menu`
*   **Auth Requirement:** `x-avci-client`

---

## 2. Get Menu Items

Fetches all menu links (Items) on the platform as a tree structure or flat list.

*   **Endpoint:** `GET /menu/items`
*   **Auth Requirement:** `x-avci-client`

---

## 3. Fetch a Specific Menu and Its Links

Fetches all links belonging to that menu in a tree (hierarchical) structure based on the menu's "slug" value (e.g., `header-menu`). This endpoint is most frequently used when rendering the Header.

*   **Endpoint:** `GET /menu/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "name": "Header Menu",
    "slug": "header-menu",
    "items": [
      {
        "title": "Home",
        "url": "/",
        "target": "_self",
        "children": []
      },
      {
        "title": "Our Services",
        "url": "/services",
        "children": [
          {
            "title": "Web Design",
            "url": "/web-design"
          }
        ]
      }
    ]
  }
}
```
