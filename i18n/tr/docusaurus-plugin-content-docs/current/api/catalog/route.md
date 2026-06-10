---
id: route
title: Rotalar / Turlar (Route)
sidebar_position: 9
---

# Rota / Tur (Route) İşlemleri

Turizm, seyahat veya etkinlik odaklı sistemler için oluşturulmuş özel seyahat rotalarını, gezi turlarını (Örn: "7 Günlük Karadeniz Turu") listelemek için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Rotaları Listeleme (List Routes)

Sistemdeki tüm seyahat rotalarını ve tur paketlerini sayfalama desteğiyle listeler.

*   **Endpoint:** `GET /route`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `search` | String | Rota başlığında arama yapar. |

---

## 2. Rota Detayı (Route Details)

Slug değeri üzerinden belirli bir seyahat rotasının tüm detaylarını (duraklar, harita koordinatları, program içeriği) getirir.

*   **Endpoint:** `GET /route/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "rt_99",
    "slug": "yedi-gunluk-karadeniz-turu",
    "title": "7 Günlük Karadeniz Turu",
    "durationDays": 7,
    "stops": [
      {
        "day": 1,
        "title": "Trabzon Uzungöl",
        "description": "Göl çevresinde yürüyüş..."
      }
    ]
  }
}
```
