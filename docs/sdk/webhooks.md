---
id: webhooks
title: Webhooks & Events
sidebar_position: 5
---

# Webhooks & Real-time Events

Webhooks allow your external services, accounting backends, and notification systems to receive real-time HTTP POST notifications whenever events happen inside your AVCI CMS workspace.

---

## Configuring a Webhook Endpoint

1. Navigate to **Workspace > Settings > Webhooks**.
2. Click **"Add Webhook"**.
3. Specify your receiving server URL (e.g., `https://api.mycompany.com/webhooks/avci`).
4. Select the event types you wish to subscribe to.
5. Copy the generated **Webhook Signing Secret** (`whsec_...`). You will need this secret to verify signatures.

---

## Supported Event Types

| Event Identifier | Trigger Description |
| :--- | :--- |
| `order.created` | Emitted immediately when a customer creates a new order in checkout. |
| `order.paid` | Emitted when payment confirmation is received from the payment gateway. |
| `order.fulfilled` | Emitted when tracking details or shipment labels are assigned to the order. |
| `inventory.depleted` | Emitted when a product or SKU stock level hits zero. |
| `ticket.purchased` | Emitted when an event ticket is issued to an attendee. |
| `form.submitted` | Emitted when a customer fills out a contact or custom lead capture form. |

---

## Verifying Webhook Signatures

To ensure incoming requests genuinely originated from AVCI CMS and were not intercepted or tampered with, every delivery includes an HMAC signature in the `x-avci-signature` HTTP header.

### Verification Example (Node.js / Express)

```typescript
import crypto from 'crypto';
import express from 'express';

const app = express();

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

app.post('/webhooks/avci', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-avci-signature'] as string;
  const rawBody = req.body.toString();
  const secret = process.env.AVCI_WEBHOOK_SECRET!;

  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    return res.status(401).send('Signature verification failed.');
  }

  const event = JSON.parse(rawBody);

  switch (event.type) {
    case 'order.paid':
      console.log('Order paid successfully:', event.data.orderId);
      break;
    case 'inventory.depleted':
      console.warn('Stock out for SKU:', event.data.sku);
      break;
  }

  res.status(200).json({ received: true });
});
```

---

## Retry Policy & Delivery Guarantees

* If your endpoint responds with any status other than `2xx` (or times out after 10 seconds), AVCI CMS retries delivery with exponential backoff:
  * 1st retry: after 1 minute
  * 2nd retry: after 5 minutes
  * 3rd retry: after 30 minutes
  * 4th retry: after 2 hours
* After 5 failed attempts, the event delivery is logged as `failed` in your dashboard where you can manually trigger a redelivery once your server recovers.

