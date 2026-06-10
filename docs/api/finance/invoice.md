---
id: invoice
title: Invoices
sidebar_position: 3
---

# Invoice Operations

Manages the automatic formalization of e-Invoice / e-Archive documents resulting from orders, subscriptions, or commissions (via integrators) and presenting them to the users.

The `x-avci-client` identity header is **mandatory** for all requests. To list a user's invoices, a session token is also required via the `Authorization` header.

---

## 1. List User's Invoices

Lists all invoices in the system for the logged-in user (B2C Customer or B2B Dealer). Usually used on the "My Account > My Invoices" page.

*   **Endpoint:** `GET /invoice/user/invoices`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 2. Invoice Details and Download

Returns the details of a specific invoice (line items, taxes, etc.) or a direct link to the output in PDF format.

*   **Endpoint:** `GET /invoice/:invoiceId`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 3. Auto-Generate Sales Invoice

Triggers the automatic generation of an e-Commerce (Sales) invoice via the integrator after the payment and delivery of an Order are completed.

*   **Endpoint:** `POST /invoice/sales/:orderId`
*   **Auth Requirement:** `x-avci-client`

---

## 4. Generate Commission Invoice

In a marketplace model, it generates the e-Invoice for the platform commission arising from the portion transferred to the seller from a Sub-Order.

*   **Endpoint:** `POST /invoice/commission/:subOrderId`
*   **Auth Requirement:** `x-avci-client`

---

## 5. Generate Subscription Invoice

Generates the periodic collection invoices for monthly/annually renewed SaaS or service Subscriptions.

*   **Endpoint:** `POST /invoice/subscription/:subscriptionId`
*   **Auth Requirement:** `x-avci-client`

---

## 6. Create Freestyle Invoice

Creates an independent invoice request (independent of Order or Subscription) directly via API. (e.g., A special B2B collection).

*   **Endpoint:** `POST /invoice`
*   **Auth Requirement:** `x-avci-client`

> **Note:** For sellers to upload manual invoices they issued externally into the system, the file upload endpoint `/api/v1/media/file/invoice` should be used, not the invoice endpoint.
