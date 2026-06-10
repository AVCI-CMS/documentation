---
id: authentication
title: User Authentication (Auth)
sidebar_position: 3
---

# User Authentication Operations

While developing with the AVCI CMS Public API, beyond just reading public data; you might want to register an e-commerce member, log them in, reset their password, or list data specific to that member.

All User Auth operations are executed via the `/auth` route, and upon successful login, you receive a secure JWT (JSON Web Token).

---

## 1. User Registration (Sign Up / Register)

Used to create a new B2C customer (or B2B customer if configured accordingly). The `name`, `email`, `password`, and `contact` details are required in the request body.

*   **Endpoint:** `POST /auth/signup`
*   **Header Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "email": "ahmet@example.com",
  "password": "SecurePassword123!",
  "name": {
    "first": "Ahmet",
    "last": "Yılmaz"
  },
  "contact": {
    "mobileNumber": [
      {
        "areaCode": 555,
        "countryCode": 90,
        "isoCode": "TR",
        "phoneNumber": 5551234567
      }
    ]
  }
}
```

---

## 2. User Login (Login)

Allows a registered user to log into the system with their email and password to receive access and refresh tokens.

*   **Endpoint:** `POST /auth/login`
*   **Header Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "email": "ahmet@example.com",
  "password": "SecurePassword123!"
}
```

**Example Response:**
When the login is successful, the server will return the access token and the refresh token to be used for renewing the session.
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "u_987654",
      "email": "ahmet@example.com",
      "name": {
        "first": "Ahmet",
        "last": "Yılmaz"
      }
    },
    "tokens": {
      "access": {
        "token": "eyJhbGciOiJIUzI1NiIsIn...",
        "expires": "2026-06-11T10:00:00.000Z"
      },
      "refresh": {
        "token": "def50200ca...",
        "expires": "2026-07-10T10:00:00.000Z"
      }
    }
  }
}
```

---

## 3. Secure Logout (Logout)

Used to terminate the user's session and invalidate the `refreshToken` value in the system.

*   **Endpoint:** `POST /auth/logout`
*   **Header Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "refreshToken": "def50200ca..."
}
```

---

## 4. Token Refresh (Refresh Tokens)

When your access token expires, it allows you to generate a new session token using the `refreshToken` without redirecting the user back to the login screen.

*   **Endpoint:** `POST /auth/refresh-tokens`
*   **Header Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "refreshToken": "def50200ca..."
}
```

---

## 5. Forgot Password

Triggers a secure reset link to be sent to the user's email (or SMS) address so they can reset their password.

*   **Endpoint:** `POST /auth/forgot-password`
*   **Header Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "email": "ahmet@example.com",
  "method": "email" // Can be "email" or "sms". (Default: "email")
}
```

---

## 6. Reset Password

Allows the user to set their new password using the `token` sent to their email. The token is taken as a query parameter from the URL.

*   **Endpoint:** `POST /auth/reset-password?token=<reset_token>`
*   **Header Requirement:** `x-avci-client`

**Example Body:**
```json
{
  "password": "NewSecurePassword123!"
}
```

---

## 7. Verification Operations

The following endpoints are used in scenarios where the user needs to verify their email address or phone number:

*   **Send Email Verification:** `POST /auth/send-verification-email` (Requires Auth)
*   **Verify Email:** `POST /auth/verify-email?token=<token>`
*   **Send Phone Verification:** `POST /auth/send-phone-verification` (Requires Auth)
*   **Verify Phone:** `POST /auth/verify-phone`

---

## 8. OTP (One Time Password) Management

For Passwordless login or SMS-based security processes:

*   **Send/Resend OTP Code:** `POST /auth/resend-otp`
    *   *Body:* `{"email": "ahmet@example.com", "method": "sms"}`
*   **Verify OTP Code:** `POST /auth/verify-otp`
    *   *Body:* `{"email": "ahmet@example.com", "otp": "123456"}`

---

## 9. Social Login

Registers the user into the system or automatically logs them in using tokens returned from platforms like Google, Apple, Facebook, etc.

*   **Endpoint:** `POST /auth/social-login`
*   **Header Requirement:** `x-avci-client`

---

## Token Usage (Authorization Header)

You must send this long encrypted string, which you obtain inside `tokens.access.token` after login or registration, as an **Authorization** header in every request that requires permission (like adding a product to the user's cart or reading profile information).

```bash
curl -X GET "https://api.avcicms.com/v1/finance/basket" \
  -H "Content-Type: application/json" \
  -H "x-avci-client: d9c8b7a6-1234-5678-abcd-ef0987654321" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn..."
```
