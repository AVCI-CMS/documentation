---
id: payment
title: Payments
sidebar_position: 2
---

# Payment Operations

AVCI CMS offers a secure and modular payment infrastructure so your customers can pay via credit card (3D Secure), Bank Transfer, or Crypto methods.

These endpoints are used on your Checkout page to communicate with virtual POS providers and wallet systems.

The `x-avci-client` identity header is mandatory for all requests.

---

## 1. Installment Options

On the checkout screen, it fetches the installment rates and commissions of the active virtual POS based on the total amount in the cart and the credit card BIN number (first 6 or 8 digits) entered by the customer.

*   **Endpoint:** `POST /payment/installment`
*   **Auth Requirement:** `x-avci-client`

---

## 2. 3D Secure Credit Card Payment

Initiates the 3D Secure safe payment process with a credit card and returns the HTML form to redirect to the bank's verification screen.

*   **Endpoint:** `POST /payment/3ds`
*   **Auth Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "basketId": "bskt_12345",
  "cardNumber": "4111111111111111",
  "expireMonth": "12",
  "expireYear": "2028",
  "cvc": "123",
  "cardHolderName": "Ahmet Yilmaz"
}
```

### 3D Secure Callback Handling
After the user enters the SMS code from the bank, the bank reports the result to this URL. No authorization is required for this route (The bank posts data in its own format).
*   **Endpoint:** `POST /payment/3ds/callback`

### 3D Secure Complete
Called to finalize the Order after the transaction concludes successfully.
*   **Endpoint:** `POST /payment/3ds/complete`
*   **Auth Requirement:** `x-avci-client`

---

## 3. Bank Transfer (EFT) Operations

Creates a Payment Intent via bank transfer.

*   **Initiate Transfer:** `POST /payment/bank-transfer`
    *   **Description:** The user notifies they will make a transfer. The system creates a pending payment record.
*   **Verify Transfer:** `POST /payment/bank-transfer/:paymentId/verify`
    *   **Description:** Triggered for receipt check/verification of the payment after the customer sends the money (or via webhooks).

---

## 4. Crypto Payments

Manages Web3 payment integration processes using cryptocurrency wallets.

*   **Initiate Crypto Payment:** `POST /payment/crypto`
*   **Verify Crypto Payment:** `POST /payment/crypto/:paymentId/verify`
    *   **Description:** Executes the process of verifying the transaction on the Blockchain network (Tx Hash) and confirming the order.
