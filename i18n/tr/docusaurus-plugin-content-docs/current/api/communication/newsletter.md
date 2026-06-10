---
id: newsletter
title: E-Bülten (Newsletter)
sidebar_position: 4
---

# E-Bülten (Newsletter) İşlemleri

Kullanıcıların veya ziyaretçilerin e-posta pazarlama listelerine (Kampanya habercisi vb.) kayıt olmasını veya listeden çıkmasını sağlar.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Bültene Abone Ol (Subscribe)

Bir kullanıcının e-posta adresini, AVCI CMS'deki e-Bülten veritabanına ekler. Eğer adres zaten kayıtlıysa veya sistemde kullanıcı (User) kaydı varsa onu da ilişkilendirir.

*   **Endpoint:** `POST /newsletter/subscribe`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Body:**
```json
{
  "email": "customer@example.com"
}
```

---

## 2. Bültenden Çıkış (Unsubscribe)

Kullanıcının e-posta adresini pazarlama listesinden çıkartır veya abonelik durumunu pasife çeker.

*   **Endpoint:** `POST /newsletter/unsubscribe`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Body:**
```json
{
  "email": "customer@example.com"
}
```
