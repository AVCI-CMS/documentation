---
id: collections
title: Koleksiyonlar (Collections)
sidebar_position: 3
---

# Koleksiyon İşlemleri (Collections)

Bir mağazanın veya sistemin özel olarak grupladığı ürün vitrinleridir (Örn: "Yaza Merhaba Koleksiyonu", "Sevgililer Günü Hediyeleri"). Kampanyalarla birlikte kullanılarak özel sayfa (Landing page) oluşturmak için harikadır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Koleksiyonları Listeleme

Sistemdeki tüm yayında olan (aktif) koleksiyonları sayfalamalı olarak listeler. Koleksiyonların kendi vitrin görselleri ve açıklamaları bulunur.

*   **Endpoint:** `GET /collections`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 2. Koleksiyon Detayı (İçindeki Ürünler)

Belirli bir koleksiyonun hem banner detaylarını hem de o koleksiyonun **içine dahil edilmiş ürünleri (products)** liste olarak döner.

*   **Endpoint:** `GET /collections/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "title": "2026 Kış Kreasyonu",
    "slug": "2026-kis",
    "banner": "https://...",
    "products": [
      {
        "id": "prod_1",
        "name": "Kışlık Mont",
        "price": 2500
      }
    ]
  }
}
```
