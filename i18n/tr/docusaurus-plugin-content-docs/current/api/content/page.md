---
id: page
title: Sayfalar (Page)
sidebar_position: 1
---

# Sayfa (Page) İşlemleri

AVCI CMS'de dinamik içerik sayfaları (Örn: Hakkımızda, Gizlilik Politikası, İletişim, İade Şartları) oluşturabilir ve bunları bu API uç noktaları aracılığıyla uygulamanızda (Frontend, Mobil) çizebilirsiniz.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Sayfaları Listeleme (List Pages)

Sistemde yayınlanmış (Published) durumdaki tüm sayfaları sayfalama destekli olarak listeler.

*   **Endpoint:** `GET /page`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `category` | String | Belirli bir kategoriye ait sayfaları filtreler (Örn: Kurumsal, Yardım) |

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "pg_123",
      "slug": "hakkimizda",
      "title": "Hakkımızda",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## 2. Sayfa İçeriğini Getirme (Page Details)

Slug değeri üzerinden belirli bir sayfanın HTML veya zengin metin formatındaki tam içeriğini (body), başlığını ve meta verilerini getirir.

*   **Endpoint:** `GET /page/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek:** `/page/gizlilik-politikasi`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "pg_124",
    "slug": "gizlilik-politikasi",
    "title": "Gizlilik Politikası",
    "content": "<h1>Gizlilik Politikamız</h1><p>Şirketimiz müşteri verilerini...</p>",
    "seo": {
      "metaTitle": "Gizlilik Politikası | AVCI CMS",
      "metaDescription": "Veri güvenliği ve gizlilik standartlarımız hakkında bilgi alın."
    }
  }
}
```
