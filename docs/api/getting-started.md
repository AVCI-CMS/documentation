---
id: getting-started
title: Getting Started
sidebar_position: 2
---

# API Getting Started Guide

Before you begin developing with the AVCI CMS Public APIs, you need to understand the Base URL and the mandatory HTTP headers you must include in your requests.

## Base URL

All your Public API requests should be made to the following Base URL.

*   **All Environments:** `https://api.avcicms.com/v1`

For simplicity and readability, the Base URL is omitted in all endpoints listed on other pages of this documentation, showing only the service path directly (e.g., `/auth/login` or `/catalog/product`). You simply need to append these paths to the Base URL.

## Mandatory HTTP Headers

AVCI CMS has a multi-tenant infrastructure. To help us understand which **Workspace** or **Tenant** account your external application is reading from or writing to, you must send a mandatory Identification Header with every request.

### `x-avci-client`

All public endpoints are protected by a special security middleware called `tenantResolver`. If you do not send this header, the server will return an unauthorized access error.

```http
x-avci-client: <Your-Workspace-ID-Value>
```

**Where can I find it?**
You can find your Workspace ID or Client ID value in the **Settings > API Keys** or **Workspace Details** section after logging into the AVCI CMS Dashboard panel.

## Optional Headers

If you are calling a Public Endpoint that requires authorization (like a B2C e-commerce member's actions) where the user (your customer) is logged into their account, you also need to send the authentication token.

### `Authorization`

This is the key in JWT (JSON Web Token) or Bearer token format obtained after the user logs in. It is only sent in requests that require permission, such as the user's personal profile, past orders, or cart. It is not mandatory for publicly available data like the product list.

```http
Authorization: Bearer <user_token>
```

*(For detailed information on how users will log in and how you will obtain this token, review the [User Authentication](/api/authentication) page).*

## Standard cURL Request Example

In light of all this information, here is an example of a successful API request (e.g., listing products) to the AVCI CMS server:

```bash
curl -X GET "https://api.avcicms.com/v1/catalog/product" \
  -H "Content-Type: application/json" \
  -H "x-avci-client: d9c8b7a6-1234-5678-abcd-ef0987654321"
```

## CORS and Domain Whitelisting

To ensure server security, AVCI CMS blocks API calls from unauthorized websites (browsers) using CORS (Cross-Origin Resource Sharing) policies.

In order for your website to successfully call the Public APIs, make sure you have added your frontend domain (e.g., `https://www.mysite.com`) to the **CORS Settings / Allowed Domains** list via the CMS panel. Mobile applications (iOS/Android) naturally do not fall under CORS rules.

## Developer SDK (Coming Soon)

To maximize the developer experience (DX) instead of calling REST APIs manually, our official Node.js and Browser supported `@avci/sdk` package is under development. In these documentation pages, you will also see draft usage examples of the SDK functions that will be available in the future.
