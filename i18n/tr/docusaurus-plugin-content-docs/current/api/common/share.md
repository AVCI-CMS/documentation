---
id: share
title: Paylaşım Takibi (Share)
sidebar_position: 5
---

# Paylaşım İşlemleri (Share / Referral)

E-ticaret veya içerik sitelerinde, bir ürünün "WhatsApp'ta Paylaş", "Twitter'da Paylaş" gibi butonlara kaç kez tıklandığını takip etmek ve raporlamak için kullanılan sayıcıdır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Paylaşım Tıklamasını Kaydet (Record Share)

Kullanıcı "Paylaş" butonuna tıkladığında arka planda bu endpoint tetiklenerek ürünün/içeriğin popülarite skoru artırılır.

*   **Endpoint:** `POST /share/:type/:id`
*   **Auth Gereksinimi:** `x-avci-client`
*   **Parametreler:**
    *   `type`: Paylaşılan içerik tipi (Örn: `product`, `blog`)
    *   `id`: Paylaşılan nesnenin benzersiz ID'si.

**Örnek JSON Body:**
```json
{
  "platform": "whatsapp"
}
```
