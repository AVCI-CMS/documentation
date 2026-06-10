---
id: contact-form
title: Contact Forms
sidebar_position: 1
---

# Contact Form Operations

Used to submit the messages sent by end users (customers or visitors) from the Contact Us / Contact pages to the system.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Send New Message

Sends the data filled in the contact form (first name, last name, email, subject, message) to the AVCI CMS admin panel. Admins see these messages as "Unread" in the Inbox section.

*   **Endpoint:** `POST /contactForm`
*   **Auth Requirement:** `x-avci-client` (It's a public endpoint for visitors, does not require a Token).

**Example JSON Body:**
```json
{
  "name": {
    "first": "Ahmet",
    "last": "Yilmaz"
  },
  "email": "ahmet@example.com",
  "tel": 905551234567,
  "subject": "Order Delay",
  "message": "Hello, my order still hasn't shipped. Can you help?"
}
```

**TypeScript Body Schema (Request Interface):**
```typescript
export interface ContactForm {
  name: {
    first: string;
    last: string;
  };
  email: string;
  tel: number;
  subject: string;
  message: string;
}
```
