---
id: brand
title: Markalar (Brand)
sidebar_position: 2
---

# Marka (Brand) İşlemleri

Sistemdeki ürün ve mağazalarla ilişkilendirilen Markaları (Brands) listelemek ve profillerini çekmek için bu uç noktaları kullanabilirsiniz.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Markaları Listeleme (List Brands)

Platformdaki tüm markaları sayfalama ve arama destekli olarak listeler.

*   **Endpoint:** `GET /brand`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `search` | String | Marka adı (name) içinde arama yapar. |

---

## 2. Marka Detayı (Brand Details)

Slug değeri üzerinden belirli bir markanın tüm profil detaylarını (logo, açıklama vb.) getirir.

*   **Endpoint:** `GET /brand/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 3. Marka ID ile Detay

MongoDB `_id` değeri kullanılarak belirli bir markanın detaylarını döner.

*   **Endpoint:** `GET /brand/id/:_id`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 4. Marka Özet Kartı (Brand Card)

Performans odaklı senaryolar (örn: ürün listeleme sayfalarındaki marka filtreleri veya logo carousel bileşenleri) için markanın sadece temel özet verilerini getirir.

*   **Endpoint:** `GET /brand/card/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 5. Lokasyonlar (Brand Locations)

Eğer markaların fiziki mağazaları/bayileri sisteme tanımlanmışsa, harita görünümleri (Store Locator) için konum bilgilerini içeren bir liste döner.

*   **Endpoint:** `GET /brand/location`
*   **Auth Gereksinimi:** `x-avci-client`
