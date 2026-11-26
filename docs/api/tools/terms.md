---
id: terms
title: Dynamic Agreements & SHA-256 Consents
sidebar_position: 6
---

# Dynamic Agreements & SHA-256 Consent Engine

The **Terms Tool** turns AVCI CMS into a standalone **Dynamic Contract & Cryptographic Consent Ledger** for any external web, mobile, SaaS, or fintech application—even when your users live outside AVCI CMS.

Generate personalized legal texts on the fly with Handlebars variables (`{{customerName}}`, `{{planName}}`, `{{amount}}`), lock the exact rendered text with **SHA-256** (`contentHash` + `proofHash`), and verify tamper-proof integrity at any time via REST API, `@avci/sdk`, or the **Tools → Agreements → Consent Ledger** panel.

> **Required Header:** `x-avci-client` is mandatory for all public/storefront API calls. Use `x-avci-language` (`tr`, `en`, etc.) to select the agreement language.

---

## End-to-End Cryptographic Flow

1. **Render:** Call `POST /v1/terms/:slug/render` with your dynamic `variables`. AVCI CMS compiles the template and returns the rendered HTML together with its deterministic **SHA-256 `contentHash`**.
2. **Display & Accept:** Show the rendered agreement to your user. When they click "I Accept", call `POST /v1/terms/:slug/consents` passing the same `variables` and `expectedContentHash`. The server recomputes SHA-256—if the template changed or the payload was altered, it rejects with `409 Conflict` (`ERR_TERMS_CONSENT_1003`).
3. **Verify & Audit:** Every accepted record stores an immutable HTML snapshot, `contentHash`, `proofHash` (binding `consentId`, `termSlug`, `version`, `contentHash`, `externalId`, `signedAt`, and `clientIp`), and optional PDF. Call `POST /v1/terms/consents/:consentId/verify` anytime to mathematically prove the record has never been tampered with.

---

## 1. List Published Agreement Templates

* **Endpoint:** `GET /v1/terms`
* **Headers:** `x-avci-client`, `x-avci-language` (optional)

---

## 2. Render Dynamic Agreement (Preview + SHA-256)

Compiles a template with your custom Handlebars variables and returns the rendered content with its SHA-256 digest.

* **Endpoint:** `POST /v1/terms/:slug/render`
* **Headers:** `x-avci-client`, `x-avci-language` (optional)

```json title="Request Body"
{
  "language": "en",
  "variables": {
    "customerName": "Jane Doe",
    "planName": "Pro Annual",
    "contractAmount": "$499.00"
  }
}
```

```json title="Response (200 OK)"
{
  "status": "success",
  "data": {
    "templateId": "674...",
    "slug": "saas-master-agreement",
    "key": "saas-master-agreement",
    "title": "SaaS Master Services Agreement",
    "version": 2,
    "versionLabel": "2.0",
    "language": "en",
    "requiresReconsent": true,
    "renderedContent": "<p>This agreement is between ... Jane Doe ...</p>",
    "contentHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    "algorithm": "SHA-256"
  }
}
```

---

## 3. Record User Consent (SHA-256 Locked)

Creates an immutable, append-only consent record in the Consent Ledger. Previous active consents for the same `(subject.externalId, termSlug)` are automatically marked `SUPERSEDED` without deleting history.

* **Endpoint:** `POST /v1/terms/:slug/consents`
* **Headers:** `x-avci-client`

```json title="Request Body"
{
  "subject": {
    "type": "EXTERNAL",
    "externalId": "usr_987654",
    "email": "jane@example.com",
    "fullName": "Jane Doe",
    "metadata": { "app": "ios-v3.2" }
  },
  "variables": {
    "customerName": "Jane Doe",
    "planName": "Pro Annual",
    "contractAmount": "$499.00"
  },
  "expectedContentHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "generatePdf": false
}
```

* Set `"generatePdf": true` if you also want an archived PDF uploaded to cloud storage (`evidence.pdfUrl`). Leaving it `false` (default) keeps high-throughput API calls ultra-fast while preserving the immutable HTML snapshot and SHA-256 proof.

---

## 4. Check User Consent Status (Re-consent Gate)

Check whether a user has accepted the latest versions of one or more agreements—ideal for login gates or checkout flows.

* **Endpoint:** `GET /v1/terms/consents/status?externalId=usr_987654&slugs=kvkk,saas-master-agreement`
* **Headers:** `x-avci-client`

```json title="Response (200 OK)"
{
  "status": "success",
  "data": {
    "externalId": "usr_987654",
    "allAccepted": false,
    "items": [
      {
        "slug": "saas-master-agreement",
        "title": "SaaS Master Services Agreement",
        "accepted": true,
        "needsReconsent": false,
        "currentVersion": 2,
        "currentVersionLabel": "2.0",
        "acceptedVersion": 2,
        "consentId": "c9a8d7e6-...",
        "contentHash": "9f86d081..."
      }
    ]
  }
}
```

---

## 5. Verify SHA-256 Integrity

Recomputes both `contentHash` (from the stored `renderedContent` snapshot) and `proofHash` (from the canonical evidence payload) and compares them against the stored cryptographic digests.

* **Endpoint:** `POST /v1/terms/consents/:consentId/verify`
* **Body (optional):** `{ "hash": "<expected-sha256-content-or-proof-hash>" }`

---

## 6. Revoke Consent (KVKK / GDPR Compliance)

Marks an active consent as `REVOKED` with a timestamp and optional reason without deleting the historical audit trail.

* **Endpoint:** `POST /v1/terms/consents/:consentId/revoke`
* **Body (optional):** `{ "reason": "User withdrew marketing consent" }`

---

## Management Panel & Consent Ledger

Enable the **Terms (`TERMS`)** tool on **PRO+** workspaces to manage everything from **Tools → Agreements** (`/tools/terms`):
- **Agreement Templates:** Rich editor, Handlebars variables, multi-language translations, version diffing, and attachments.
- **Consent Ledger (SHA-256):** Search by `externalId`, email, slug, or SHA-256 hash; filter by `ACTIVE` / `REVOKED` / `SUPERSEDED`; run one-click SHA-256 integrity checks; inspect the exact HTML snapshot signed by the user.
