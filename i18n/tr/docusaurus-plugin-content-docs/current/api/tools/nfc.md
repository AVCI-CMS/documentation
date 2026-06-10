---
id: nfc
title: NFC İşlemleri (NFC)
sidebar_position: 1
---

# NFC (Yakın Alan İletişimi) İşlemleri

Özellikle fiziksel etkinliklerde (bilet kontrolü) veya dijital kartvizit gibi ürünlerde kullanılan NFC yongalarına yazılan URL'lerin eşleştirilmesi ve doğrulanmasını yönetir.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. NFC Etiketini Okuma ve Yönlendirme

Bir mobil cihaz NFC etiketine dokunduğunda tetiklenen (NFC Tag Read) arka plan API'sidir. Cihazı ilgili etkinliğin veya profilin detay sayfasına yönlendirir.

*   **Endpoint:** `GET /nfc/tag/:tagId`
*   **Auth Gereksinimi:** Sadece `x-avci-client` (Public)

---

## 2. NFC Eşleştirme (Pairing)

Yönetici veya cihaz sahibi yeni bir fiziksel NFC kartını kendi profiliyle (veya bir etkinlik biletiyle) eşleştirmek için kullanır.

*   **Endpoint:** `POST /nfc/pair`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`
