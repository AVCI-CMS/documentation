---
id: notification
title: Notifications
sidebar_position: 9
---

# Notification Operations

AVCI CMS provides a notification infrastructure to deliver instant notifications (Push Notification, Web Notification) to users, such as "Your order has been shipped", "Event time is approaching", or "Campaign started".

Sending the `x-avci-client` identity header and a Bearer token with `Authorization` is **mandatory** in all requests because notifications are user-specific.

---

## 1. List My Notifications

Lists all system notifications (Read and Unread) received by the logged-in user in chronological order.

*   **Endpoint:** `GET /notification`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 2. Mark Notification as Read

When the user clicks on a notification or selects "Mark All as Read", it updates the notification's status to `READ`.

*   **Mark Single:** `PUT /notification/:id/read`
*   **Mark All:** `PUT /notification/read-all`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`
