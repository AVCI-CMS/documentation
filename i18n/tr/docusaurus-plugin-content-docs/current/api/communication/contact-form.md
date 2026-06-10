---
id: contact-form
title: İletişim Formları (Contact Form)
sidebar_position: 1
---

# İletişim Formu İşlemleri

Son kullanıcıların (müşteriler veya ziyaretçiler) Bize Ulaşın / İletişim sayfalarından gönderdikleri mesajları sisteme iletmek için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Yeni Mesaj Gönderme

İletişim formundan doldurulan veriyi (ad, soyad, e-posta, konu, mesaj) AVCI CMS yönetim paneline iletir. Yöneticiler bu mesajları Gelen Kutusu bölümünde "Okunmadı" olarak görür.

*   **Endpoint:** `POST /contactForm`
*   **Auth Gereksinimi:** `x-avci-client` (Ziyaretçiler için açık uç noktadır, Token gerektirmez).

**Örnek JSON Body:**
```json
{
  "name": {
    "first": "Ahmet",
    "last": "Yılmaz"
  },
  "email": "ahmet@example.com",
  "tel": 905551234567,
  "subject": "Sipariş Gecikmesi",
  "message": "Merhaba, siparişim halen kargoya verilmedi. Yardımcı olur musunuz?"
}
```

**TypeScript Gövde Şeması (Request Interface):**
```typescript
export interface ContactForm {
  name: {
    first: string;
    last: string;
  };
  email: string;
  tel: number;
  subject: string;
  message: string;
}
```
