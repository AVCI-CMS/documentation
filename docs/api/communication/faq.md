---
id: faq
title: Frequently Asked Questions (FAQ)
sidebar_position: 8
---

# Frequently Asked Questions (FAQ) Operations

Used to display the most frequently asked questions by customers on the Frontend, grouped into categories (Shipping Processes, Returns, Payment Methods, etc.).

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Get Full FAQ List

Lists the active frequently asked questions in the system, either paginated or filtered by search term.

*   **Endpoint:** `GET /faq`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `search` | String | Searches in the question or answer text. |

**TypeScript Response Schema (Response Interface):**
```typescript
export type FAQ = {
  _id: string;
  question: string;
  answer: string;
  date: string; // Date ISO
  group: {
    _id: string;
    title: string;
    slug: string;
  };
};
```

---

## 2. Get Grouped FAQs

Fetches the frequently asked questions belonging to a specific group (e.g., `return-conditions`) along with the group details. Often used when rendering Accordion components.

*   **Endpoint:** `GET /faq/:slug`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "title": "Return Conditions",
    "slug": "return-conditions",
    "description": "General rules regarding your returns.",
    "questions": [
      {
        "question": "How many days is the return period?",
        "answer": "Within 14 days from the delivery date..."
      }
    ]
  }
}
```

**TypeScript Group Response Schema (Group Response Interface):**
```typescript
export type FAQGroup = {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  questions: FAQ[]; // FAQ type above
  parent?: string;
  children?: FAQGroup[];
};
```
