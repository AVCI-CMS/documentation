---
id: webhook
title: Webhooks
sidebar_position: 4
---

# Webhook Operations

These are webhook endpoints that allow external systems (Shipping companies, Payment Gateways, Marketplaces) to communicate with AVCI CMS on an event basis.

Since it is generally server-to-server (S2S) communication, the routes in this file **might not require** `x-avci-client`; instead, the external system's own Secret key is used.

---

## 1. Payment Success Notification (Payment Webhook)

When a customer completes a payment with 3D Secure, payment providers like Iyzico or Stripe asynchronously send a success/failure notification to this route.

*   **Endpoint:** `POST /webhook/payment`

---

## 2. Shipment Status Notification (Shipment Webhook)

When shipping systems like FedEx, UPS, or DHL change a shipment status to "Delivered", this webhook is triggered so that the order status also changes to delivered.

*   **Endpoint:** `POST /webhook/shipment`
