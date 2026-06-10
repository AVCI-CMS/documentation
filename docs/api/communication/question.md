---
id: question
title: Questions & Answers (Q&A)
sidebar_position: 7
---

# Q&A (Question) Operations

This is the "Question and Answer (Q&A)" infrastructure often seen on marketplaces as "Ask the Seller" or enabling users to ask questions they are curious about regarding a specific product.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Questions and Ask New Question

Used to publicly list all questions asked about a specific product or content and *answered by the seller*, or to ask a new question.

*   **Get Answered Questions:** `GET /question/:type/:id`
*   **Ask Seller a Question:** `POST /question/:type/:id`
*   **Parameters:**
    *   `type`: Content type (e.g., `product`, `merchant`)
    *   `id`: The ID of the Content/Seller.

---

## 2. Answer the Question

It's for only those with the relevant authorization (Product owner store, etc.) to respond to the asked question.

*   **Provide Answer:** `POST /question/:type/question/:questionId/answer`
*   **Update Answer:** `PUT /question/:type/question/:questionId/answer` (Usually, editing is allowed within 1 hour).
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 3. Like Questions (Helpful / Not Helpful)

Used to trigger "Was this answer helpful?" buttons.

*   **Like/Undo Like Question:** `POST /question/:type/question/:questionId/like`
*   **Like/Undo Like Answer:** `POST /question/:type/question/:questionId/answer-like`

---

## 4. Close Question

Sets the question to a "Closed" state to indicate that the relevant question has been resolved or to prevent further replies.

*   **Endpoint:** `PUT /question/:type/question/:questionId/close`
