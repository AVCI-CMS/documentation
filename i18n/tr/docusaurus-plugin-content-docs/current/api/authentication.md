---
id: authentication
title: Kullanıcı Kimlik Doğrulama (Auth)
sidebar_position: 3
---

# Kullanıcı Kimlik Doğrulama İşlemleri

AVCI CMS Public API üzerinden geliştirme yaparken, sadece herkese açık olan verileri okumanın ötesinde; bir e-ticaret üyesini kayıt etmek, giriş yaptırmak, şifresini sıfırlamak veya sadece bu üyeye özel verileri listelemek isteyebilirsiniz. 

Tüm User Auth işlemleri `/auth` rotası üzerinden yürütülür ve başarılı bir giriş işleminin ardından güvenli bir JWT (JSON Web Token) elde edersiniz.

---

## 1. Kullanıcı Kaydı (Sign Up / Register)

Yeni bir B2C müşterisi (veya uygun ayarlanmışsa B2B müşterisi) oluşturmak için kullanılır. İstek gövdesinde (body) `name`, `email`, `password` ve `contact` detaylarının iletilmesi zorunludur.

*   **Endpoint:** `POST /auth/signup`
*   **Header Gereksinimi:** `x-avci-client`

**Örnek Body:**
```json
{
  "email": "ahmet@ornek.com",
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

## 2. Kullanıcı Girişi (Login)

Sisteme kayıtlı kullanıcının e-posta ve şifre ile giriş yapıp access ve refresh token'larını almasını sağlar.

*   **Endpoint:** `POST /auth/login`
*   **Header Gereksinimi:** `x-avci-client`

**Örnek Body:**
```json
{
  "email": "ahmet@ornek.com",
  "password": "SecurePassword123!"
}
```

**Örnek Response:**
Giriş başarılı olduğunda sunucu size erişim token'ını ve oturumu yenilemek için kullanılacak yenileme token'ını dönecektir.
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "u_987654",
      "email": "ahmet@ornek.com",
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

## 3. Güvenli Çıkış (Logout)

Kullanıcının oturumunu sonlandırmak ve sistemdeki `refreshToken` değerini geçersiz kılmak için kullanılır.

*   **Endpoint:** `POST /auth/logout`
*   **Header Gereksinimi:** `x-avci-client`

**Örnek Body:**
```json
{
  "refreshToken": "def50200ca..."
}
```

---

## 4. Token Yenileme (Refresh Tokens)

Erişim (access) token'ınızın süresi dolduğunda, kullanıcıyı tekrar giriş ekranına yönlendirmemek için `refreshToken` ile yeni bir oturum token'ı oluşturmanızı sağlar.

*   **Endpoint:** `POST /auth/refresh-tokens`
*   **Header Gereksinimi:** `x-avci-client`

**Örnek Body:**
```json
{
  "refreshToken": "def50200ca..."
}
```

---

## 5. Şifremi Unuttum (Forgot Password)

Kullanıcının şifresini sıfırlaması için e-posta (veya SMS) adresine güvenli bir sıfırlama bağlantısı gönderilmesini tetikler.

*   **Endpoint:** `POST /auth/forgot-password`
*   **Header Gereksinimi:** `x-avci-client`

**Örnek Body:**
```json
{
  "email": "ahmet@ornek.com",
  "method": "email" // "email" veya "sms" olabilir. (Varsayılan: "email")
}
```

---

## 6. Şifreyi Sıfırlama (Reset Password)

Kullanıcının e-postasına gönderilen `token` ile yeni şifresini belirlemesini sağlar. Token, URL'den query parametresi olarak alınır.

*   **Endpoint:** `POST /auth/reset-password?token=<sifirlama_tokeni>`
*   **Header Gereksinimi:** `x-avci-client`

**Örnek Body:**
```json
{
  "password": "NewSecurePassword123!"
}
```

---

## 7. Doğrulama İşlemleri (Verification)

Kullanıcının e-posta adresini veya telefonunu doğrulaması gereken senaryolarda aşağıdaki uç noktalar kullanılır:

*   **E-Posta Doğrulama Gönderimi:** `POST /auth/send-verification-email` (Auth gerektirir)
*   **E-Posta Doğrulama:** `POST /auth/verify-email?token=<token>`
*   **Telefon Doğrulama Gönderimi:** `POST /auth/send-phone-verification` (Auth gerektirir)
*   **Telefon Doğrulama:** `POST /auth/verify-phone`

---

## 8. OTP (One Time Password) Yönetimi

Şifresiz (Passwordless) giriş veya SMS tabanlı güvenlik süreçleri için:

*   **OTP Kodu Gönderimi/Tekrar Gönderimi:** `POST /auth/resend-otp`
    *   *Body:* `{"email": "ahmet@ornek.com", "method": "sms"}`
*   **OTP Kodunu Doğrulama:** `POST /auth/verify-otp`
    *   *Body:* `{"email": "ahmet@ornek.com", "otp": "123456"}`

---

## 9. Sosyal Medya ile Giriş (Social Login)

Google, Apple, Facebook vb. platformlar üzerinden dönen token'lar ile kullanıcıyı sisteme kaydeder veya otomatik giriş yaptırır.

*   **Endpoint:** `POST /auth/social-login`
*   **Header Gereksinimi:** `x-avci-client`

---

## Token Kullanımı (Authorization Header)

Giriş veya kayıt sonrası `tokens.access.token` içinde elde ettiğiniz bu uzun şifreli metni, yetki gerektiren (kullanıcının sepetine ürün ekleme veya profil bilgilerini okuma gibi) her istekte **Authorization** header'ı olarak göndermek zorundasınız.

```bash
curl -X GET "https://api.avcicms.com/v1/finance/basket" \
  -H "Content-Type: application/json" \
  -H "x-avci-client: d9c8b7a6-1234-5678-abcd-ef0987654321" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn..."
```
