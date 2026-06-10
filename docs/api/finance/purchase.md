---
id: purchase
title: Purchase
sidebar_position: 4
---

# Purchase Operations

This is the Orchestrator module that handles the processes of converting the cart into an approval, finalizing the Order or Subscription, and notifying the Merchants after the Payment step.

It works in strict coordination with the Payment module. The `x-avci-client` is mandatory for all requests.

---

## 1. Process Purchase (Finalize Order)

Directly concludes the purchase of a prepared Basket or a standard credit card / prepaid balance that does not require 3D Secure, creating the Order Record.

*   **Endpoint:** `POST /purchase`
*   **Auth Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "basketId": "bskt_12345",
  "paymentMethod": "credit_card",
  "paymentIntentId": "pi_789"
}
```

---

## 2. Subscription Purchase

Unlike products, it makes the first collection of monthly or annually renewable Subscription packages and starts the plan.

*   **Endpoint:** `POST /purchase/subscription`
*   **Auth Requirement:** `x-avci-client`

---

## 3. 3D Secure Orchestration

These are the steps that capture responses returning from the bank during 3D Secure credit card transactions via the payment module and convert them into an order.

*   **3D Secure Callback (Bank Notification):** `POST /purchase/3ds/callback`
    *   There is no Authorization on this route; the Bank posts directly.
*   **3D Secure Complete:** `POST /purchase/3ds/complete`
    *   Called to confirm the order from your Checkout screen when the transaction finishes successfully.

---

## 4. Alternative Payment Verifications

If the customer has chosen Bank Transfer or Crypto, the transactions are not instantly approved. It is used to approve the transaction when the customer sends the money.

*   **Bank Transfer/EFT Approval:** `POST /purchase/payment/verify/bank-transfer`
*   **Crypto Network Approval:** `POST /purchase/payment/verify/crypto`
