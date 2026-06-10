---
id: notification
title: Bildirimler (Notification)
sidebar_position: 9
---

# Bildirim İşlemleri (Notification)

AVCI CMS, kullanıcılara "Siparişiniz kargoya verildi", "Etkinlik saati yaklaştı" veya "Kampanya başladı" gibi anlık bildirimleri (Push Notification, Web Notification) iletmek için bildirim altyapısı sağlar.

Tüm isteklerde `x-avci-client` kimlik başlığı ve `Authorization` ile Bearer token gönderilmesi **zorunludur**, çünkü bildirimler kişiye özeldir.

---

## 1. Bildirimlerimi Listele (List Notifications)

Giriş yapmış olan kullanıcının aldığı tüm sistem bildirimlerini (Okunmuş ve Okunmamış) kronolojik sırayla listeler.

*   **Endpoint:** `GET /notification`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 2. Bildirimi Okundu Olarak İşaretle (Mark as Read)

Kullanıcı bildirime tıkladığında veya "Tümünü Okundu İşaretle" dediğinde, bildirimin durumunu `READ` (Okundu) olarak günceller.

*   **Tekli İşaretleme:** `PUT /notification/:id/read`
*   **Tümünü İşaretleme:** `PUT /notification/read-all`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`
