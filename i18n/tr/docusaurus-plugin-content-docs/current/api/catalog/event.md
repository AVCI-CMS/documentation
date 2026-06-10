---
id: event
title: Etkinlikler (Event)
sidebar_position: 5
---

# Etkinlik (Event) İşlemleri

AVCI CMS, sadece e-ticaret (ürün satışı) değil; biletli etkinlikler, webinarlar, atölyeler ve konserler gibi zamana bağlı etkinliklerin de satışını ve yönetimini destekler. 

Bu uç noktalar aracılığıyla platformdaki etkinlikleri listeleyebilir, bilet satışına açık olanları çekebilir ve müşterinin biletlerini görüntüleyebilirsiniz. Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi zorunludur.

---

## 1. Etkinlikleri Listeleme (List Events)

Platformdaki tüm etkinlikleri (konser, tiyatro vb.) filtreleyerek listeler.

*   **Endpoint:** `GET /event`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `category` | String | Etkinlik kategori ID'si (Örn: Konser, Tiyatro) |
| `search` | String | Etkinlik adı veya açıklamasında arama yapar. |

**TypeScript Yanıt Şeması (Response Interface):**
```typescript
export interface EventListResponse {
  _id: string; // Types.ObjectId
  name: string;
  slug: string;
  status: string; // 'PUBLISHED' | 'SOLD_OUT' | 'PASSED' vb.
  date: {
    start: string; // Date (ISO string)
    end: string;
    year?: number;
  };
  sessions?: {
    start: string;
    end: string;
    label?: string;
  }[] | null;
  recurrenceGroupId?: string | null;
  price: {
    sale?: number;
    amount?: number;
    discount?: any;
    currency?: string;
    lowestPrice30Days?: number;
  };
  place?: any;
  merchant?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  capacity?: {
    min: number;
    max: number;
    cancelation?: boolean;
  };
  featuredImage?: string;
  abstract?: string;
  liked?: boolean;
  isHolidayActive?: boolean;
  badges?: any[];
  attributes?: any[];
  attendees?: number;
}
```

---

## 2. Etkinlik Detayı (Event Details)

Slug değeri üzerinden belirli bir etkinliğin tüm bilgilerini (mekan, tarih, bilet tipleri, açıklama) getirir.

*   **Endpoint:** `GET /event/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**TypeScript Yanıt Şeması (Response Interface):**
```typescript
export interface EventDetailsResponse {
  id: string; // Types.ObjectId
  name: string;
  slug: string;
  status: string;
  liked: boolean;
  images: any[];
  date: {
    start: string;
    end: string;
    year?: number;
  };
  sessions?: {
    start: string;
    end: string;
    label?: string;
  }[] | null;
  recurrenceGroupId?: string | null;
  price: {
    sale?: number;
    amount?: number;
    discount?: any;
    currency?: string;
    lowestPrice30Days?: number;
  };
  place?: any;
  merchant?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  capacity?: {
    min: number;
    max: number;
    cancelation?: boolean;
  };
  content?: string;
  description?: string;
  notes?: string[];
  rules?: string[];
  holidayMode?: {
    active: boolean;
    message?: string;
  };
  badges?: any[];
  attributes?: any[];
}
```

---

## 3. Yaklaşan Etkinlikler (Upcoming Events)

Tarihi henüz geçmemiş, gelecekte yapılacak olan güncel etkinlikleri listeler.

*   **Endpoint:** `GET /event/upcoming`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 4. Geçmiş Etkinlikler (Passed Events)

Tarihi geçmiş (tamamlanmış) etkinlikleri listeler. Genellikle arşiv görünümleri için kullanılır.

*   **Endpoint:** `GET /event/passed`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 5. Yeni Eklenen Etkinlikler (New Events)

Sisteme yakın zamanda eklenmiş ve duyurulmuş en yeni etkinlikleri getirir.

*   **Endpoint:** `GET /event/new`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 6. Dinamik Filtreler (Filters)

Etkinlik arama ekranlarında kullanılabilecek dinamik filtre seçeneklerini (Aktif mekanlar, kategoriler vb.) döner.

*   **Endpoint:** `GET /event/filters`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 7. Benzer Etkinlikler (Similar Events)

Görüntülenen bir etkinliğe benzeyen (aynı mekanda olan veya aynı kategoriye ait) diğer etkinlikleri önerir.

*   **Endpoint:** `GET /event/:slug/similar`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 8. Biletlerim (My Tickets)

**Dikkat:** Bu endpoint, giriş yapmış kullanıcının kendi biletlerini çekmesi içindir. Dolayısıyla `Authorization: Bearer <token>` başlığını da gerektirir.

*   **Tüm Biletleri Getir:** `GET /event/tickets`
    *   Kullanıcının satın aldığı tüm etkinlik biletlerini (QR kod verileriyle birlikte) döner.
*   **Siparişe Göre Biletleri Getir:** `GET /event/tickets/:orderId`
    *   Sadece belirli bir siparişe ait biletleri (Örn: Aynı siparişte alınan 3 bilet) döner.

---

## 9. Etkinlik SEO Verisi (Event SEO)

Etkinlik detay sayfasını oluştururken arama motorları ve sosyal medya paylaşımları (OpenGraph, Twitter Cards) için gerekli olan meta title, description ve og:image gibi verileri getirir.

*   **Endpoint:** `GET /event/:slug/seo`
*   **Auth Gereksinimi:** `x-avci-client`
