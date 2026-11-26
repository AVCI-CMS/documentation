---
id: place
title: Mekanlar
sidebar_position: 4
---

# Mekan (Place) İşlemleri

Fiziksel alanları, konser salonlarını, etkinlik merkezlerini, atölyeleri veya mağaza şubelerini (Place) listelemek ve vitrin detaylarına erişmek için bu uç noktaları kullanabilirsiniz. Harita, rezervasyon ve etkinlik tabanlı uygulamalar için temel modüllerden biridir.

Tüm isteklerde `x-avcicms-client` kimlik başlığı **zorunludur**.

---

## 1. Mekanları Listele

Platformdaki tüm mekanları ve fiziksel alanları sayfalama ve filtreleme desteğiyle listeler.

*   **Endpoint:** `GET /v1/place`
*   **Yetki Gereksinimi:** `x-avcicms-client`

### Sorgu Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: `1`) |
| `limit` | Number | Sayfa başına kayıt adedi (Varsayılan: `10`) |
| `area` | String | Bölge / kategori ObjectId değerine göre filtreleme. |
| `search` | String | Mekan adı ve açıklama metninde arama yapar. |

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "6735c03a9f1a2b3c4d5e6f70",
      "name": "KüçükÇiftlik Park",
      "slug": "kucukciftlik-park",
      "abstract": "İstanbul'un prestijli açık hava etkinlik ve performans alanı.",
      "logo": {
        "_id": "6735c03a9f1a2b3c4d5e6f71",
        "path": "https://cdn.avcicms.com/uploads/kcp-logo.webp"
      },
      "featuredImage": {
        "_id": "6735c03a9f1a2b3c4d5e6f72",
        "path": "https://cdn.avcicms.com/uploads/kcp-featured.webp"
      },
      "capacity": {
        "min": 500,
        "max": 17000
      },
      "address": {
        "city": "İstanbul",
        "district": "Şişli",
        "formattedAddress": "Harbiye Mah. Kadırgalar Cad. No:4, Şişli/İstanbul",
        "location": {
          "type": "Point",
          "coordinates": [28.9950, 41.0450]
        }
      },
      "pricing": {
        "isPaid": true,
        "pricingType": "PER_EVENT",
        "amount": 250000,
        "currency": "TRY"
      },
      "status": "ACTIVE"
    }
  ]
}
```

---

## 2. Slug ile Mekan Detayı

Mekanın slug değeri üzerinden tüm profil verilerini (fotoğraflar, kapasite, çalışma saatleri, fiyatlandırma modeli, harita koordinatları) getirir.

*   **Endpoint:** `GET /v1/place/:slug`
*   **Yetki Gereksinimi:** `x-avcicms-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "_id": "6735c03a9f1a2b3c4d5e6f70",
    "name": "KüçükÇiftlik Park",
    "slug": "kucukciftlik-park",
    "abstract": "İstanbul'un prestijli açık hava etkinlik ve performans alanı.",
    "description": "Konserler, festivaller ve kurumsal organizasyonlar için dünya standartlarında sahne ve lojistik imkanları.",
    "capacity": {
      "min": 500,
      "max": 17000
    },
    "working": [
      {
        "day": 1,
        "hours": { "start": "09:00", "end": "23:00" }
      },
      {
        "day": 5,
        "hours": { "start": "10:00", "end": "02:00" }
      }
    ],
    "pricing": {
      "isPaid": true,
      "pricingType": "DAILY",
      "amount": 250000,
      "currency": "TRY"
    },
    "address": {
      "city": "İstanbul",
      "district": "Şişli",
      "street": "Kadırgalar Cad.",
      "buildingNumber": "4",
      "formattedAddress": "Harbiye Mah. Kadırgalar Cad. No:4, Şişli/İstanbul",
      "location": {
        "type": "Point",
        "coordinates": [28.9950, 41.0450]
      }
    },
    "logo": { "path": "https://cdn.avcicms.com/uploads/kcp-logo.webp" },
    "coverImage": { "path": "https://cdn.avcicms.com/uploads/kcp-cover.webp" },
    "gallery": [
      { "path": "https://cdn.avcicms.com/uploads/kcp-stage.webp" },
      { "path": "https://cdn.avcicms.com/uploads/kcp-crowd.webp" }
    ],
    "status": "ACTIVE"
  }
}
```

---

## 3. ID ile Mekan Detayı

Mekanın MongoDB `_id` kimliği üzerinden detay profilini getirir.

*   **Endpoint:** `GET /v1/place/id/:_id`
*   **Yetki Gereksinimi:** `x-avcicms-client`

---

## 4. Mekan Özet Kartı (Short)

Harita pin pencereleri, mobil kart listeleri ve ızgara görünümleri için optimize edilmiş hafif özet profil döndürür.

*   **Endpoint:** `GET /v1/place/short/:slug`
*   **Yetki Gereksinimi:** `x-avcicms-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "_id": "6735c03a9f1a2b3c4d5e6f70",
    "name": "KüçükÇiftlik Park",
    "slug": "kucukciftlik-park",
    "abstract": "İstanbul'un prestijli açık hava etkinlik ve performans alanı.",
    "logo": { "path": "https://cdn.avcicms.com/uploads/kcp-logo.webp" },
    "capacity": { "min": 500, "max": 17000 },
    "address": {
      "city": "İstanbul",
      "district": "Şişli"
    },
    "pricing": {
      "isPaid": true,
      "amount": 250000,
      "currency": "TRY"
    }
  }
}
```

---

## 5. Alt Servisler & Topluluk Etkileşimleri

Mekan modülü, AVCI CMS ortak mikroservisleriyle entegre çalışır:

*   **Kategoriler:** `GET /v1/place/category` — Mekan sektörel ve tip kategorilerini listeler.
*   **Gruplar:** `GET /v1/place/group` — Özel derlemeler (örn: "Tarihi Mekanlar", "Açık Hava Sahneleri").
*   **Koleksiyonlar:** `GET /v1/place/collection` — Küratör mekan koleksiyonları.
*   **Favori / Beğeni:** `POST /v1/place/like/:slug` — Kullanıcı favori durumunu değiştirir.
*   **Görüntülenme Sayacı:** `POST /v1/place/view/:slug` — Vitrin sayacı analizini artırır.
*   **Sosyal Paylaşım:** `POST /v1/place/share/:slug` — Sosyal kanal yönlendirme paylaşımlarını kaydeder.
*   **Soru-Cevap:** `GET /v1/place/question/:slug` & `POST /v1/place/question/:slug` — Mekana yönelik doğrudan sorular ve cevaplar.
