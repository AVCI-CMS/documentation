---
id: ticket
title: Destek Talepleri (Ticket)
sidebar_position: 5
---

# Destek Talebi (Ticket) İşlemleri

Kullanıcıların veya müşterilerin Satış Sonrası Destek, İade Talebi veya Teknik Servis gibi konular için oluşturdukları Destek Taleplerini (Ticket) yönetmek için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**. Ayrıca işlemin hangi kullanıcı adına yapıldığını bilmek için `Authorization` başlığı ile giriş yapılmış olması gerekir.

---

## 1. Yeni Destek Talebi Oluşturma

Kullanıcının seçtiği kategori ve konu altında yeni bir destek talebi (Ticket) oluşturur.

*   **Endpoint:** `POST /ticket`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

**Örnek JSON Body:**
```json
{
  "subject": "Kargom Gelmedi",
  "category": "Kargo ve Teslimat",
  "priority": "HIGH",
  "message": "Siparişim 5 gündür yolda görünüyor."
}
```

---

## 2. Kullanıcının Taleplerini Listeleme

Oturum açmış olan kullanıcının geçmişte açtığı tüm destek taleplerini, durumlarıyla (Açık, Yanıtlandı, Kapalı) birlikte listeler.

*   **Endpoint:** `GET /ticket/customer`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 3. Talep Detayı (Ticket Details)

ID'si verilen belirli bir biletin durumunu ve ana detaylarını getirir.

*   **Endpoint:** `GET /ticket/:id`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 4. Talebe Mesaj Gönderme / Okuma (Ticket Messages)

Destek talebi içindeki yazışmaları okumak ve yeni yanıt göndermek için kullanılır.

*   **Mesaj Gönder:** `POST /ticket/message` (Gövde: `{ "ticketId": "...", "content": "..." }`)
*   **Mesajları Listele:** `GET /ticket/message/ticket/:ticketId`
*   **Mesajı Güncelle/Sil:** `PUT /ticket/message/:id` ve `DELETE /ticket/message/:id`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 5. Talep Geri Bildirimi (Feedback)

Destek talebi kapatıldıktan sonra müşterinin "Bu yanıttan memnun kaldınız mı?" şeklindeki puanlama/anket (Feedback) verisini iletmek için kullanılır.

*   **Geri Bildirim Gönder:** `POST /ticket/feedback`
*   **Mevcut Bildirimi Oku:** `GET /ticket/feedback/ticket/:ticketId`
