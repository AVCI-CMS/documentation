---
id: campaign
title: Kampanyalar (Campaign)
sidebar_position: 7
---

# Kampanya (Campaign) İşlemleri

Özel gün indirimleri, "3 Al 2 Öde" veya kategori bazlı büyük kampanyaları listelemek ve detaylarını müşterilere göstermek için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Kampanyaları Listeleme (List Campaigns)

Sistemdeki tüm kampanyaları sayfalama ve filtreleme parametreleriyle birlikte listeler.

*   **Endpoint:** `GET /campaign`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `search` | String | Kampanya adı içinde arama yapar. |

---

## 2. Aktif Kampanyalar (Active Campaigns)

Şu an geçerli olan (Tarihi başlamış ve henüz bitmemiş) kampanyaları vitrinlerde (Ana sayfa banner'ları vb.) göstermek için listeler.

*   **Endpoint:** `GET /campaign/active`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "cmp_123",
      "title": "Bahar Fırsatları",
      "coverImage": "https://cdn.avcicms.com/images/bahar-banner.jpg",
      "endDate": "2026-06-30T23:59:59Z"
    }
  ]
}
```

---

## 3. Kampanya Detayı (Campaign Details)

MongoDB `_id` değeri kullanılarak belirli bir kampanyanın tam detaylarını (katılım koşulları, dahil olan markalar veya ürün grupları) getirir.

*   **Endpoint:** `GET /campaign/:_id`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek:** `/campaign/60d5ecb54d6e9f1234567890`
