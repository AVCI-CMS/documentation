---
id: qrcode
title: QR Kod (QRCode)
sidebar_position: 3
---

# QR Kod (QR Code) İşlemleri

Özellikle etkinlik (Event) biletlerinin kapı girişinde doğrulanması (Check-in) veya fiziksel mağaza içi yönlendirmelerde kullanılan QR kodların arka uç işlemleridir.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. QR Kod Doğrulama (Check-in / Scan)

Bilet okuyucu (Görevli) kapıda QR kodu tarattığında bu uç nokta tetiklenir. Barkod hash'ini kontrol eder ve bilet geçerliyse "Check-in Başarılı" yanıtı döner.

*   **Endpoint:** `POST /qrcode/scan`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>` (Görevli yetkisi gerekir)
*   **Body Parametreleri:**
    *   `hash`: Taratılan QR kodun içindeki string değer.

---

## 2. Dinamik QR Üretme

Bir içerik veya bilet için anlık Base64 veya SVG formatında QR Kod imajı üretmek için kullanılır.

*   **Endpoint:** `GET /qrcode/generate/:type/:id`
*   **Auth Gereksinimi:** `x-avci-client`
