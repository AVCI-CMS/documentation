---
id: nfc
title: NFC Operations
sidebar_position: 1
---

# NFC (Near Field Communication) Operations

Manages the mapping and validation of URLs written to NFC chips, especially used in physical events (ticket control) or products like digital business cards.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Read NFC Tag and Redirect

This is a background API triggered when a mobile device taps an NFC tag (NFC Tag Read). It redirects the device to the detail page of the relevant event or profile.

*   **Endpoint:** `GET /nfc/tag/:tagId`
*   **Auth Requirement:** Only `x-avci-client` (Public)

---

## 2. NFC Pairing

Used by an administrator or device owner to pair a new physical NFC card with their own profile (or with an event ticket).

*   **Endpoint:** `POST /nfc/pair`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`
