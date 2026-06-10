---
id: slider
title: Slayt Gösterisi (Slider)
sidebar_position: 2
---

# Slayt İşlemleri (Slider / Carousel)

Web sitesinin veya mobil uygulamanın ana sayfasında yer alan büyük dönen kampanya görsellerini (Slider / Carousel) yönetmek için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Aktif Slider'ları Listeleme

Yönetim panelinden "Yayında" olarak işaretlenmiş slayt görsellerini, sırasına (order) göre listeler.

*   **Endpoint:** `GET /slider`
*   **Auth Gereksinimi:** Sadece `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": [
    {
      "title": "Kış İndirimleri Başladı!",
      "image": "https://cdn.../slider-1.jpg",
      "mobileImage": "https://cdn.../slider-1-mobil.jpg",
      "link": "/kategori/kis-kreasyonu",
      "order": 1
    }
  ]
}
```
