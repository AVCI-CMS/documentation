---
id: place
title: Mekanlar (Place)
sidebar_position: 4
---

# Mekan (Place) İşlemleri

Fiziksel alanları, konser mekanlarını, mağaza şubelerini veya turistik lokasyonları (Place) yönetmek ve listelemek için bu uç noktaları kullanabilirsiniz. Bu modül harita ve etkinlik tabanlı uygulamalar için oldukça kritiktir.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Mekanları Listeleme

Platformdaki tüm mekanları ve fiziksel alanları sayfalama destekli listeler.

*   **Endpoint:** `GET /place`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `search` | String | Mekan adı (isim) içinde arama yapar. |

---

## 2. Mekan Detayı

Slug değeri üzerinden belirli bir mekanın tam profil detaylarını (fotoğraflar, kapasite, harita koordinatları vb.) getirir.

*   **Endpoint:** `GET /place/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "plc_123",
    "name": "KüçükÇiftlik Park",
    "slug": "kucukciftlik-park",
    "capacity": 17000,
    "location": {
      "lat": 41.0450,
      "lng": 28.9950,
      "address": "Şişli, İstanbul"
    }
  }
}
```

---

## 3. ID ile Mekan Detayı

MongoDB `_id` değeri ile bir mekanın detaylarını getirir.

*   **Endpoint:** `GET /place/id/:_id`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 4. Mekan Özet Kartı (Card)

Arayüzde sadece bir kart (Card) boyutunda gösterilecek kısa önizleme verilerini döndürür. Veri transferini azaltarak performansı artırır.

*   **Endpoint:** `GET /place/short/:slug`
*   **Auth Gereksinimi:** `x-avci-client`
