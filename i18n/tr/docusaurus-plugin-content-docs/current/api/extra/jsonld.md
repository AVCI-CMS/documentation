---
id: jsonld
title: JSON-LD İşlemleri (SEO)
sidebar_position: 2
---

# JSON-LD İşlemleri

Arama motorları (Google, Bing) için zengin sonuç (Rich Snippet) üretmek amacıyla, sayfadaki içeriğin (Ürün, Etkinlik, Kurum vb.) yapılandırılmış veri (Structured Data) olarak çıktısını veren servistir.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. JSON-LD Verisini Getir

Belirli bir içeriğin slug değeri ve tipini vererek, doğrudan sayfaya (Script etiketi olarak) eklenebilecek JSON-LD objesini döner.

*   **Endpoint:** `GET /jsonld/:type/:slug`
*   **Auth Gereksinimi:** Sadece `x-avci-client`
*   **Desteklenen Tipler (type):** `product`, `event`, `blog`, `merchant`, `organization`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Mavi Erkek Tişört",
    "image": [
      "https://example.com/photos/1x1/photo.jpg"
    ],
    "description": "Yüzde yüz pamuk erkek tişörtü.",
    "offers": {
      "@type": "Offer",
      "url": "https://example.com/urun/mavi-erkek-tisort",
      "priceCurrency": "TRY",
      "price": "129.99"
    }
  }
}
```
