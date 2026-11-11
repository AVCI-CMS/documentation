---
id: custom-form
title: Custom Forms
sidebar_position: 2
---

# Custom Form & Application Engine

The AVCI CMS Custom Form Engine enables administrators to design dynamic, schema-driven forms directly from the panel and collect structured submissions from storefront users without writing frontend code.

Beyond standard surveys, Custom Forms power **Platform Application Workflows** (`MERCHANT_APPLICATION`, `BRAND_APPLICATION`, `ORGANIZATION_APPLICATION`), featuring automated status tracking, review workspaces, smart attribute mapping, and 1-click entity provisioning upon approval.

> **Architecture Note:**  
> Custom Forms are distinct from **Contact Forms**. Contact Forms manage basic inquiries and support messages, while Custom Forms manage structured entity-mapped applications and lifecycle approval workflows.

The `x-avci-client` header is **mandatory** for all requests.

---

## Form Purposes & Lifecycle Actions

| Purpose | Description | Automatic Action on Approval |
| :--- | :--- | :--- |
| `STANDARD` | General inquiry, registration, or data collection | None (status transition only) |
| `MERCHANT_APPLICATION` | Vendor onboarding for marketplace sellers | Creates `Merchant`, assigns owner, sets `MERCHANT_ONBOARDING_SETUP` |
| `BRAND_APPLICATION` | Brand registry and manufacturer application | Creates `Brand`, links owner, sets `BRAND_SETUP` |
| `ORGANIZATION_APPLICATION` | Cooperative / trade chamber application | Creates `Organization`, links owner, sets `ORGANIZATION_SETUP` |
| `SURVEY` | Customer feedback and satisfaction metrics | Updates form conversion & statistical aggregates |

---

## Smart Attribute Mapping (`mappedAttributeId`)

Fields inside a Custom Form can be linked directly to an entity attribute via `mappedAttributeId`. When an application is approved, responses for mapped fields are automatically converted into the target entity's normalized EAV `attributes` array:

```json
{
  "fields": [
    {
      "id": "tax_id_field",
      "name": "taxNumber",
      "label": "Corporate Tax Identification Number",
      "type": "TEXT",
      "required": true,
      "mappedAttributeId": "660c1d2e3f4a5b6c7d8e9f01"
    }
  ]
}
```

---

## 1. Storefront & Public APIs

### 1.1 Fetch Form Schema
Retrieves the form title, description, and list of input fields for dynamic frontend rendering.

* **Endpoint:** `GET /customForm/:formId`
* **Auth Requirement:** `x-avci-client`

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "660c1d2e3f4a5b6c7d8e9a01",
    "title": "Marketplace Vendor Application",
    "purpose": "MERCHANT_APPLICATION",
    "fields": [
      {
        "id": "fld_1",
        "name": "businessName",
        "label": "Business Legal Name",
        "type": "TEXT",
        "required": true
      },
      {
        "id": "fld_2",
        "name": "city",
        "label": "Registered City",
        "type": "SELECT",
        "options": ["Istanbul", "Ankara", "Izmir"]
      }
    ]
  }
}
```

### 1.2 Submit Form Responses
Submits the user's answers against the dynamic schema.

* **Endpoint:** `POST /customForm/submit/:formId`
* **Auth Requirement:** `x-avci-client`

**Request Body:**
```json
{
  "businessName": "Artisan Leather Crafts Ltd.",
  "city": "Izmir"
}
```

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "submissionId": "660c1d2e3f4a5b6c7d8e9b99",
    "status": "PENDING",
    "submittedAt": "2026-11-11T12:00:00.000Z"
  }
}
```

### 1.3 Check Prior Submission
Verifies if the authenticated user has already submitted a form limited to one entry:
* **Endpoint:** `GET /customForm/has-submission/:formId`
* **Auth Requirement:** `x-avci-client` + `Authorization: Bearer <token>`

---

## 2. Management & Backoffice APIs

Requires workspace administrator credentials (`Authorization: Bearer <token>`).

### 2.1 Form Management
* **List Forms:** `GET /customForm?page=1&limit=20`
* **Get Form Details:** `GET /customForm/:formId`
* **Create Form:** `POST /customForm`
* **Update Form:** `PUT /customForm/:formId`
* **Delete Form:** `DELETE /customForm/:formId`

### 2.2 Submissions Oversight
* **List Submissions:** `GET /customForm/:formId/submissions?status=PENDING&page=1&limit=20`
* **Submission Review Detail:** `GET /customForm/:formId/submissions/:subId`
* **Update Status:** `PUT /customForm/:formId/submissions/:subId/status`
  * Body: `{ "status": "UNDER_REVIEW", "note": "Identity documents verified" }`
  * Valid states: `PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `CANCELLED`

### 2.3 Process Approval Action
Executes the form's automated approval lifecycle:
* **Endpoint:** `POST /customForm/submissions/:submissionId/process`
* **Action:** Provisions the entity (`Merchant`, `Brand`, `Organization`), links mapped EAV attributes, creates initial credentials, and assigns onboarding setup stages.

```json
{
  "status": "success",
  "data": {
    "success": true,
    "entityId": "660c1d2e3f4a5b6c7d8e9c55",
    "entityType": "MERCHANT",
    "status": "APPROVED"
  }
}
```

### 2.4 Statistics & Audit Logs
* **Get Form Analytics:** `GET /customForm/:formId/statistics`
* **Get Submission Logs:** `GET /customForm/:submissionId/logs`

---

## 3. SDK Code Examples

### TypeScript SDK (`@avci/sdk`)
```typescript
import { AvciCMS } from 'avcicms';

const avci = new AvciCMS({
  apiKey: process.env.AVCI_API_KEY!,
  clientId: process.env.AVCI_CLIENT_ID!,
});

// 1. Storefront: fetch schema and submit application
const { data: form } = await avci.customForm.getSchema('form_vendor_application');
const { data: submission } = await avci.customForm.submit('form_vendor_application', {
  businessName: 'Artisan Woodworks',
  city: 'Istanbul',
});

// 2. Backoffice: approve application & auto-provision merchant
await avci.customForm.updateSubmissionStatus(
  'form_vendor_application',
  submission.submissionId,
  'APPROVED',
  'Approved after legal compliance review'
);
await avci.customForm.processApproval(submission.submissionId);
```

### Python SDK (`avcicms`)
```python
from avcicms import AvciCMS

client = AvciCMS(
    api_key="your_api_key",
    project_id="your_project_id",
)

# 1. Fetch form submissions in review
submissions = client.custom_form.get_submissions(
    form_id="660c1d2e3f4a5b6c7d8e9a01",
    status="PENDING",
    page=1,
)

# 2. Process approval and provision entity
for sub in submissions.get("docs", []):
    client.custom_form.process_approval(sub["_id"])
```
