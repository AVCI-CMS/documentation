---
id: activity-log
title: Activity Log
sidebar_position: 6
---

# Activity Logs

It is the ledger (Audit Log) where all critical transactions in the system (Order created, Comment deleted, Profile updated, etc.) are recorded. It is usually displayed on the "User History" or "Account Activity" page on the Frontend.

The `x-avci-client` identity header and an `Authorization` token to identify the executor are **mandatory** in all requests.

---

## 1. Get User's Own Activities

Lists only the account history of the logged-in customer/user (When they changed their password, when they logged in, etc.).

*   **Endpoint:** `GET /activity-log/my-logs`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`
