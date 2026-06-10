---
id: event
title: Events
sidebar_position: 5
---

# Event Operations

AVCI CMS is not just for e-commerce (product sales); it also supports the sale and management of time-based activities such as ticketed events, webinars, workshops, and concerts.

Through these endpoints, you can list the events on the platform, fetch the ones open for ticket sales, and view the customer's tickets. Sending the `x-avci-client` identity header is mandatory for all requests.

---

## 1. List Events

Lists all events (concerts, theater, etc.) on the platform with filtering.

*   **Endpoint:** `GET /event`
*   **Auth Requirement:** `x-avci-client`

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page` | Number | Page number (Default: 1) |
| `limit` | Number | Number of records per page (Default: 10) |
| `category` | String | Event category ID (e.g., Concert, Theater) |
| `search` | String | Text search in event name or description. |

**TypeScript Response Interface:**
```typescript
export interface EventListResponse {
  _id: string; // Types.ObjectId
  name: string;
  slug: string;
  status: string; // 'PUBLISHED' | 'SOLD_OUT' | 'PASSED' etc.
  date: {
    start: string; // Date (ISO string)
    end: string;
    year?: number;
  };
  sessions?: {
    start: string;
    end: string;
    label?: string;
  }[] | null;
  recurrenceGroupId?: string | null;
  price: {
    sale?: number;
    amount?: number;
    discount?: any;
    currency?: string;
    lowestPrice30Days?: number;
  };
  place?: any;
  merchant?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  capacity?: {
    min: number;
    max: number;
    cancelation?: boolean;
  };
  featuredImage?: string;
  abstract?: string;
  liked?: boolean;
  isHolidayActive?: boolean;
  badges?: any[];
  attributes?: any[];
  attendees?: number;
}
```

---

## 2. Event Details

Fetches all details of a specific event (venue, date, ticket types, description) via its slug value.

*   **Endpoint:** `GET /event/:slug`
*   **Auth Requirement:** `x-avci-client`

**TypeScript Response Interface:**
```typescript
export interface EventDetailsResponse {
  id: string; // Types.ObjectId
  name: string;
  slug: string;
  status: string;
  liked: boolean;
  images: any[];
  date: {
    start: string;
    end: string;
    year?: number;
  };
  sessions?: {
    start: string;
    end: string;
    label?: string;
  }[] | null;
  recurrenceGroupId?: string | null;
  price: {
    sale?: number;
    amount?: number;
    discount?: any;
    currency?: string;
    lowestPrice30Days?: number;
  };
  place?: any;
  merchant?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  capacity?: {
    min: number;
    max: number;
    cancelation?: boolean;
  };
  content?: string;
  description?: string;
  notes?: string[];
  rules?: string[];
  holidayMode?: {
    active: boolean;
    message?: string;
  };
  badges?: any[];
  attributes?: any[];
}
```

---

## 3. Upcoming Events

Lists current events that will take place in the future, whose date has not yet passed.

*   **Endpoint:** `GET /event/upcoming`
*   **Auth Requirement:** `x-avci-client`

---

## 4. Passed Events

Lists completed events whose dates have passed. Usually used for archive views.

*   **Endpoint:** `GET /event/passed`
*   **Auth Requirement:** `x-avci-client`

---

## 5. New Events

Fetches the newest events that have been recently added and announced to the system.

*   **Endpoint:** `GET /event/new`
*   **Auth Requirement:** `x-avci-client`

---

## 6. Faceted Search (Filters)

Returns dynamic filter options (active venues, categories, etc.) that can be used on event search screens.

*   **Endpoint:** `GET /event/filters`
*   **Auth Requirement:** `x-avci-client`

---

## 7. Similar Events

Suggests other events similar to the viewed event (taking place in the same venue or belonging to the same category).

*   **Endpoint:** `GET /event/:slug/similar`
*   **Auth Requirement:** `x-avci-client`

---

## 8. My Tickets

**Note:** This endpoint is for the logged-in user to fetch their own tickets. Therefore, it also requires the `Authorization: Bearer <token>` header.

*   **Get All Tickets:** `GET /event/tickets`
    *   Returns all event tickets purchased by the user (along with QR code data).
*   **Get Tickets By Order:** `GET /event/tickets/:orderId`
    *   Returns only the tickets belonging to a specific order (e.g., 3 tickets bought in the same order).

---

## 9. Event SEO

Fetches necessary data such as meta title, description, and og:image for search engines and social media sharing (OpenGraph, Twitter Cards) when rendering the event details page.

*   **Endpoint:** `GET /event/:slug/seo`
*   **Auth Requirement:** `x-avci-client`
