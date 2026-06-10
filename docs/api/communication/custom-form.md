---
id: custom-form
title: Custom Forms
sidebar_position: 2
---

# Custom Form Operations

Used to render dynamic form areas created from the AVCI CMS panel without knowing how to code, such as "Job Application Form", "Customer Satisfaction Survey", "Dealership Application", on the Frontend and collect data from users.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. Get Form Structure (Schema)

Using the Form ID, it fetches the JSON schema regarding the form's title, description, and which inputs (Text box, SelectBox, Multiple selection, File upload) you will render on the screen.

*   **Endpoint:** `GET /customForm/:formId`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Response:**
```json
{
  "status": "success",
  "data": {
    "title": "Dealership Application Form",
    "fields": [
      {
        "type": "text",
        "name": "companyName",
        "label": "Company Name",
        "required": true
      },
      {
        "type": "select",
        "name": "city",
        "label": "City",
        "options": ["Istanbul", "Ankara", "Izmir"]
      }
    ]
  }
}
```

---

## 2. Submit Form

Submits the responses filled in the form fields by the user to the system. The incoming data must match the dynamic `fields` schema obtained from the previous endpoint.

*   **Endpoint:** `POST /customForm/submit/:formId`
*   **Auth Requirement:** `x-avci-client`

**Example JSON Body:**
```json
{
  "companyName": "Acme Marketing Ltd.",
  "city": "Istanbul"
}
```

---

## 3. Has Submitted Before? (Has Submission)

Checks whether the logged-in user has previously filled out a form or survey that has a "One-Time" submission limit.

*   **Endpoint:** `GET /customForm/has-submission/:formId`
*   **Auth Requirement:** `x-avci-client` and `Authorization: Bearer <token>`
