---
id: blog
title: Blog / Articles
sidebar_position: 2
---

# Blog (Article) Operations

These are the endpoints used to populate the blog or article section of your site. Blog posts can be categorized and tagged.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Blogs

Lists published blog posts with pagination and filtering support.

*   **Endpoint:** `GET /blog`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `category` | String | Fetches blogs based on a specific category ID (e.g., Technology, Fashion). |
| `search` | String | Performs text search in the post title or summary. |

---

## 2. Blog Details

Fetches the full content in HTML/Rich text format, author information, cover image (thumbnail), and publish date of a specific blog post via its slug value.

*   **Endpoint:** `GET /blog/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example:** `/blog/2026-e-commerce-trends`

---

## 3. New Blogs

Quickly fetches the newest blogs by date to build a widget/slider like "Newest" or "Recently Added" on your blog homepage.

*   **Endpoint:** `GET /blog/new`
*   **Auth Requirement:** `x-avci-client`
