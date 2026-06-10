---
id: newsletter
title: Newsletter
sidebar_position: 4
---

# Newsletter Operations

Allows users or visitors to subscribe to or unsubscribe from email marketing lists (Campaign news, etc.).

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Subscribe to Newsletter

Adds a user's email address to the Newsletter database in AVCI CMS. If the address is already registered or if there is a User record in the system, it associates it as well.

*   **Endpoint:** `POST /newsletter/subscribe`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Body:**
```json
{
  "email": "customer@example.com"
}
```

---

## 2. Unsubscribe from Newsletter

Removes the user's email address from the marketing list or sets their subscription status to passive.

*   **Endpoint:** `POST /newsletter/unsubscribe`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Body:**
```json
{
  "email": "customer@example.com"
}
```
