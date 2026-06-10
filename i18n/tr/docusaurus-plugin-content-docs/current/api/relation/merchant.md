---
id: merchant
title: Satıcılar / Mağazalar (Merchant)
sidebar_position: 1
---

# Satıcı (Merchant) İşlemleri

Pazar yeri (Marketplace) mimarisinde, platformunuzda satış yapan farklı markaları, butikleri veya mağazaları (Merchant) listelemek ve profillerini çekmek için bu uç noktaları kullanabilirsiniz.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Satıcıları Listeleme (List Merchants)

Platformdaki tüm satıcıları sayfalama ve arama destekli olarak listeler.

*   **Endpoint:** `GET /merchant`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `search` | String | Mağaza adı (name) veya tanımında arama yapar. |

**Örnek cURL İsteği:**
```bash
curl -X GET "https://api.avcicms.com/v1/merchant?page=1&limit=20" \
  -H "x-avci-client: <tenant_id>"
```

---

## 2. Satıcı Detayı (Merchant Details)

Slug değeri üzerinden belirli bir satıcının tüm profil detaylarını (iletişim bilgileri, hakkımızda metni vb.) getirir.

*   **Endpoint:** `GET /merchant/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek:** `/merchant/ornek-magaza`

---

## 3. Satıcı Özet Kartı (Merchant Card)

Performans odaklı senaryolar (örn: ürün detay sayfasında sadece küçük bir mağaza profil kartı çizmek) için satıcının sadece temel (özet) verilerini getirir.

*   **Endpoint:** `GET /merchant/card/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 4. Lokasyonlar (Merchant Locations)

Harita tabanlı görünümler (Store Locator) için platformdaki fiziki mağazaların konum bilgilerini (enlem, boylam ve adres) içeren optimize edilmiş bir liste döner.

*   **Endpoint:** `GET /merchant/location`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "merch_123",
      "name": "Örnek Mağaza",
      "location": {
        "lat": 41.0082,
        "lng": 28.9784,
        "address": "Kadıköy, İstanbul"
      }
    }
  ]
}
```
