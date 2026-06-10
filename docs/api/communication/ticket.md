---
id: ticket
title: Support Tickets
sidebar_position: 5
---

# Support Ticket Operations

Used to manage Support Tickets created by users or customers for issues like After-Sales Support, Return Requests, or Technical Service.

The `x-avci-client` identity header is **mandatory** for all requests. Additionally, a login with the `Authorization` header is required to know on whose behalf the operation is performed.

---

## 1. Create New Support Ticket

Creates a new support ticket under the category and subject chosen by the user.

*   **Endpoint:** `POST /ticket`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

**Example JSON Body:**
```json
{
  "subject": "My Package Didn't Arrive",
  "category": "Shipping and Delivery",
  "priority": "HIGH",
  "message": "My order shows as in transit for 5 days."
}
```

---

## 2. List User's Tickets

Lists all support tickets opened by the logged-in user in the past, along with their statuses (Open, Answered, Closed).

*   **Endpoint:** `GET /ticket/customer`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 3. Ticket Details

Fetches the status and main details of a specific ticket given its ID.

*   **Endpoint:** `GET /ticket/:id`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 4. Send / Read Ticket Messages

Used to read the conversations within the support ticket and send a new reply.

*   **Send Message:** `POST /ticket/message` (Body: `{ "ticketId": "...", "content": "..." }`)
*   **List Messages:** `GET /ticket/message/ticket/:ticketId`
*   **Update/Delete Message:** `PUT /ticket/message/:id` and `DELETE /ticket/message/:id`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 5. Ticket Feedback

Used to submit the customer's rating/survey (Feedback) data, such as "Were you satisfied with this response?", after the support ticket is closed.

*   **Send Feedback:** `POST /ticket/feedback`
*   **Read Existing Feedback:** `GET /ticket/feedback/ticket/:ticketId`
