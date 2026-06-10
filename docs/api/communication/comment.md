---
id: comment
title: Comments and Ratings
sidebar_position: 6
---

# Comment & Rating Operations

It is a flexible structure that manages comments, star ratings, and comment likes left by users under products, blog posts, events, or seller profiles.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List and Send Comments

Used to list approved comments under a specific content (e.g., Product or Blog) or to post a new comment.

*   **Get Comments:** `GET /comment/:type/:id`
*   **Send Comment:** `POST /comment/:type/:id` (Requires Auth to send)
*   **Parameters:**
    *   `type`: Content type (e.g., `product`, `blog`, `event`)
    *   `id`: The `_id` value of the content.

**Example:** `/comment/product/prod_123`

---

## 2. Star Rating

Used only to give a 1-5 star score to a product or content (or to fetch its statistics).

*   **Give/Update Score:** `POST /comment/:type/rating`
*   **General Statistics (Average Score):** `GET /comment/:type/rating/stats`
*   **Content Statistic (X people gave 5 stars):** `GET /comment/:type/rating/:contentId/stats`
*   **Score Given by User:** `GET /comment/:type/rating/:contentId`

---

## 3. Reply to Comment

Used to post a "Reply" to an existing comment. It generally allows sellers or other users to initiate a discussion.

*   **Endpoint:** `POST /comment/:type/comment/:commentId/reply`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`

---

## 4. Like / Dislike Comment

Allows users to highlight a comment by marking it as "Helpful" (Like).

*   **Like/Undo Like Main Comment:** `POST /comment/:type/comment/:commentId/like`
*   **Like/Undo Like Sub-Reply:** `POST /comment/:type/comment/:commentId/reply-like`

---

## 5. Comments with Images

When users want to leave a review with photos for a product they purchased, these endpoints are used to add or remove photos from the comment.

*   **Add Image:** `POST /comment/:type/comment/:commentId/images`
*   **List Only Comments with Images:** `GET /comment/:type/with-images`
