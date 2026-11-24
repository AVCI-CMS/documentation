---
id: localization
title: Multi-Language & Localization
sidebar_position: 4
---

# Multi-Language & Localization

AVCI CMS cleanly separates **content language** (translated catalog, editorial, and relation records) from **UI / system language** (localized API error messages and system responses).

---

## Two Language Concepts

| Concept | Purpose | Transport | Example Values |
| :--- | :--- | :--- | :--- |
| **Content Language** | Selects which translation of CMS content, catalog items, or relation entities is read or written | `x-avci-language` header (or `?language=` / `?lang=` query param) | `tr`, `en`, `tr-TR`, `en-US` |
| **UI / Error Language** | Selects the language of backend `i18next` error & validation messages | `Accept-Language` HTTP header | `tr`, `en` |

:::info Important Separation
`Accept-Language` is **never** used to resolve content language. Always pass `x-avci-language` (or `?language=` / `?lang=`) when requesting or updating translated content.
:::

---

## Content Language Resolution Priority

Every incoming API request passes through the global `contentLanguageResolver` middleware in the following priority order:

1. **Query Parameter (`?language=` or `?lang=`)** — Recommended for **Public GET** requests behind a CDN or edge cache, because the language becomes part of the URL cache key automatically.
2. **Official Header (`x-avci-language`)** — Standard header for Management APIs, SDK requests, and authenticated write operations (`POST`, `PUT`, `PATCH`).
3. **Workspace Default Language** — Used automatically when neither query parameter nor `x-avci-language` header is provided.

---

## Language Code Normalization

AVCI CMS accepts both **ISO-2** (`tr`, `en`, `de`) and **BCP-47** (`tr-TR`, `en-US`, `de-DE`) tags seamlessly:

- Values are normalized automatically (e.g., `tr_tr` → `tr-TR`, `EN` → `en`).
- Translation matching compares base ISO-2 language codes (`tr` matches `tr-TR`, `en` matches `en-US`), preventing duplicate or missed translations across clients.

---

## Request Examples

### 1. Public API (CDN-Friendly Query Parameter)

```bash
curl -X GET "https://api.avcicms.com/v1/catalog/product?language=en" \
  -H "x-avci-client: <Your-Workspace-Client-ID>" \
  -H "Accept-Language: en"
```

### 2. Official Header (`x-avci-language`)

```bash
curl -X GET "https://api.avcicms.com/v1/blog" \
  -H "x-avci-client: <Your-Workspace-Client-ID>" \
  -H "x-avci-language: en-US" \
  -H "Accept-Language: en"
```

### 3. TypeScript SDK (`@avci/sdk`)

```typescript
import { AvciCMS, CONTENT_LANGUAGE_HEADER } from 'avcicms';

const cms = new AvciCMS({
  apiKey: process.env.AVCI_API_KEY!,
  clientId: process.env.AVCI_CLIENT_ID!,
  language: 'en', // Automatically sends `x-avci-language: en` on every request
});
```

---

## Modules Supporting Multi-Language Content

The unified `x-avci-language` / `?language=` standard works across all multi-language modules:

- **Catalog:** Products, Events, Projects, Campaigns, Coupons
- **Content:** Blog, News, Pages, Dictionary (Words), Team Members
- **Relations:** Brands, Merchants, Organizations, Places
- **Agreements:** Terms & Relation Agreement Previews
