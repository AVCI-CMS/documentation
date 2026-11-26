---
id: authentication
title: Kullanıcı Kimlik Doğrulama (Auth)
sidebar_position: 3
---

# Kimlik Doğrulama, Header ve API Anahtarı Standardı

AVCI CMS; Storefront, Mobil Uygulama ve Sunucu entegrasyonları için **`x-avcicms-*`** header standardını ve bağımsız döndürülebilir **Çift Anahtar (`pk_live_` / `sk_live_`)** mimarisini kullanır.

| Header | Amaç | Format | Güvenlik Sınıfı |
| :--- | :--- | :--- | :--- |
| **`x-avcicms-client`** | Workspace Public Kimliği (`workspace.clientId`) | UUID (asla MongoDB ObjectId değil) | Public (tarayıcı & mobil güvenli) |
| **`x-avcicms-api-key`** | Döndürülebilir API Anahtarı | `pk_live_...` (İstemci / Public Read + GUEST view log) veya `sk_live_...` (Sunucu / SSR Yazma & Yönetim) | `pk_live_`: Public, `sk_live_`: Gizli (Yalnızca Sunucu) |
| **`Authorization`** | Son Kullanıcı / Yönetici Oturum JWT'si | `Bearer <jwt>` | Oturum Token'ı (asla API key konulmaz) |
| **`x-avcicms-language`** | İçerik Dili Seçimi | `tr`, `en`, `tr-TR` | Public |

> **Güvenlik Notu:** `sk_live_...` anahtarını asla tarayıcı koduna veya `NEXT_PUBLIC_*` değişkenlerine koymayın. Tarayıcı/mobil isteklerinde `x-avcicms-client` + `pk_live_...` kullanın; her iki anahtarı da **Workspace Ayarları → API Anahtarları** ekranından bağımsız olarak yenileyebilirsiniz (rotate).

---

## Kullanıcı Kimlik Doğrulama İşlemleri

AVCI CMS Public API üzerinden geliştirme yaparken, sadece herkese açık olan verileri okumanın ötesinde; bir e-ticaret üyesini kayıt etmek, giriş yaptırmak, şifresini sıfırlamak veya sadece bu üyeye özel verileri listelemek isteyebilirsiniz. 

Tüm User Auth işlemleri `/auth` rotası üzerinden yürütülür ve başarılı bir giriş işleminin ardından güvenli bir JWT (JSON Web Token) elde edersiniz.

---

## 1. Kullanıcı Kaydı (Sign Up / Register)

Yeni bir B2C müşterisi (veya uygun ayarlanmışsa B2B müşterisi) oluşturmak için kullanılır. İstek gövdesinde (body) `name`, `email`, `password` ve `contact` detaylarının iletilmesi zorunludur.

*   **Endpoint:** `POST /auth/signup`
*   **Header Gereksinimi:** `x-avcicms-client`

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
*   **Header Gereksinimi:** `x-avcicms-client`

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
*   **Header Gereksinimi:** `x-avcicms-client`

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
*   **Header Gereksinimi:** `x-avcicms-client`

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
*   **Header Gereksinimi:** `x-avcicms-client`

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
*   **Header Gereksinimi:** `x-avcicms-client`

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
*   **Header Gereksinimi:** `x-avcicms-client`

---

## Token Kullanımı (Authorization Header)

Giriş veya kayıt sonrası `tokens.access.token` içinde elde ettiğiniz bu uzun şifreli metni, yetki gerektiren (kullanıcının sepetine ürün ekleme veya profil bilgilerini okuma gibi) her istekte **Authorization** header'ı olarak göndermek zorundasınız.

```bash
curl -X GET "https://api.avcicms.com/v1/finance/basket" \
  -H "Content-Type: application/json" \
  -H "x-avcicms-client: d9c8b7a6-1234-5678-abcd-ef0987654321" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn..."
```
