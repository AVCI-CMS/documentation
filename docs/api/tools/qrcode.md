---
id: qrcode
title: QR Code
sidebar_position: 3
---

# QR Code Operations

These are the backend operations for QR codes, especially used for validating event tickets at the door entrance (Check-in) or for in-store physical directions.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. QR Code Validation (Check-in / Scan)

When the ticket reader (Attendant) scans the QR code at the door, this endpoint is triggered. It checks the barcode hash, and if the ticket is valid, it returns a "Check-in Successful" response.

*   **Endpoint:** `POST /qrcode/scan`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>` (Requires attendant authorization)
*   **Body Parameters:**
    *   `hash`: The string value inside the scanned QR code.

---

## 2. Dynamic QR Generation

Used to instantly generate a QR Code image in Base64 or SVG format for a content or ticket.

*   **Endpoint:** `GET /qrcode/generate/:type/:id`
*   **Auth Requirement:** `x-avci-client`
