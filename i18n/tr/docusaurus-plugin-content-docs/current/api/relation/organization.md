---
id: organization
title: Organizasyonlar (Organization)
sidebar_position: 3
---

# Organizasyon (Organization) İşlemleri

Şirketler, dernekler, etkinlik düzenleyiciler veya büyük kurumlar gibi çatı yapıları (Organization) listelemek ve profillerini çekmek için bu uç noktaları kullanabilirsiniz.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Organizasyonları Listeleme

Sistemdeki tüm organizasyonları sayfalama ve filtreleme parametreleriyle birlikte listeler.

*   **Endpoint:** `GET /organization`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `search` | String | Organizasyon adı içinde arama yapar. |

---

## 2. Organizasyon Detayı

Slug değeri üzerinden belirli bir organizasyonun tüm detaylarını (hakkında yazısı, logo, iletişim vb.) getirir.

*   **Endpoint:** `GET /organization/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek:** `/organization/acme-corp`

---

## 3. ID ile Organizasyon Detayı

MongoDB `_id` değeri kullanılarak organizasyonun detaylarını döner.

*   **Endpoint:** `GET /organization/id/:_id`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 4. Organizasyon Özet Kartı (Card)

Kısa önizlemeler ve kart görünümleri için organizasyonun sadece özet (isim, logo, kısa tanım) bilgilerini getirir.

*   **Endpoint:** `GET /organization/short/:slug`
*   **Auth Gereksinimi:** `x-avci-client`
