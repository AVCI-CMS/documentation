---
id: slider
title: Slider
sidebar_position: 2
---

# Slider / Carousel Operations

Used to manage the large rotating campaign images (Slider / Carousel) located on the homepage of the website or mobile application.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Active Sliders

Lists the slide images marked as "Published" from the admin panel, sorted by their order.

*   **Endpoint:** `GET /slider`
*   **Auth Requirement:** Only `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": [
    {
      "title": "Winter Sales Started!",
      "image": "https://cdn.../slider-1.jpg",
      "mobileImage": "https://cdn.../slider-1-mobile.jpg",
      "link": "/category/winter-collection",
      "order": 1
    }
  ]
}
```
