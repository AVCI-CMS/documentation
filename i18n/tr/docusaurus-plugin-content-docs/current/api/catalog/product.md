---
id: product
title: Ürünler (Products)
sidebar_position: 1
---

# Ürün İşlemleri

AVCI CMS Public API üzerinden mağazanızdaki aktif ürünleri listeleyebilir, filtreleyebilir, detaylarını çekebilir ve SEO verilerini alabilirsiniz.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**. *Detaylar için [Başlangıç](/api/getting-started) sayfasına göz atın.*

---

## 1. Ürünleri Listeleme (List Products)

Katalogdaki ürünleri sayfalama ve zengin filtreleme seçenekleriyle listeler.

*   **Endpoint:** `GET /product`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

Sayfalama ve sıralama kuralları geçerlidir (Bknz: [Sayfalama & Filtreleme](/api/extra/pagination)).

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `category` | String \| Array | Kategori ID'si veya ID dizisi. Çoklu seçim destekler. |
| `brand` | String | Marka ID'sine göre filtreleme. |
| `merchant` | String | Satıcı (Mağaza) ID'sine göre filtreleme. |
| `minPrice` | Number | Minimum fiyat filtresi. |
| `maxPrice` | Number | Maksimum fiyat filtresi. |
| `year` | Number | Üretim yılı filtresi. |
| `language` | String | Çeviri / Dil filtresi. |
| `attributes` | String | Özelliklere göre filtreleme (Örn: renk:kirmizi). |
| `discard` | Array | Gösterilmeyecek (dışlanan) ürün ID'leri dizisi. |
| `search` | String | Ürün adı veya açıklamasında metin araması. |

**Örnek cURL İsteği:**
```bash
curl -X GET "https://api.avcicms.com/v1/product?category=cat_123&minPrice=100&maxPrice=500" \
  -H "x-avci-client: <tenant_id>"
```

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "prod_123",
      "slug": "mavi-erkek-tisort",
      "name": "Mavi Erkek Tişört",
      "price": 129.99,
      "brand": { "id": "b_1", "name": "Mavi" }
    }
  ],
  "pagination": {
    "totalRecords": 45,
    "totalPages": 5,
    "currentPage": 1,
    "limit": 10
  }
}
```

**TypeScript Yanıt Şeması (Response Interface):**
```typescript
export interface ProductListResponse {
  _id: string; // Types.ObjectId
  title: string;
  name: string;
  thumbnail?: string;
  slug: string;
  stockAmount?: number;
  featuredImage?: string;
  saleType?: string;
  price: {
    sale?: number;
    list?: number;
    amount?: number;
    discount?: number;
    currency?: string;
    lowestPrice30Days?: number;
  };
  category?: {
    value: string; // Types.ObjectId
    label: string;
  }[];
  status: string; // 'PUBLISHED' | 'DRAFT' | 'OUT_OF_STOCK' vb.
  brand?: {
    name?: string;
    slug?: string;
    image?: string;
  };
  merchant?: {
    _id?: string;
    name?: string;
    slug?: string;
    image?: string;
  };
  year?: number;
  attributes?: any[];
  liked?: boolean;
  isHolidayActive?: boolean;
  badges?: any[];
}
```

---

## 2. Ürün Detayı (Product Details)

Belirli bir ürünün slug değeri kullanılarak tüm detaylarını getirir.

*   **Endpoint:** `GET /product/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "prod_123",
    "slug": "mavi-erkek-tisort",
    "name": "Mavi Erkek Tişört",
    "description": "<p>Yüzde yüz pamuk...</p>",
    "price": 129.99,
    "stock": 50,
    "variants": [],
    "images": ["https://..."]
  }
}
```

**TypeScript Yanıt Şeması (Response Interface):**
```typescript
export interface ProductDetailsResponse {
  id: string; // Types.ObjectId
  name: string;
  slug: string;
  year?: number;
  liked: boolean;
  images: string[];
  brief?: string;
  price: {
    sale?: number;
    currency?: string;
    amount?: number;
    discount?: number;
    lowestPrice30Days?: number;
  };
  brand?: {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
  };
  merchant?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  description?: string;
  properties?: any[];
  sku?: string;
  techniques?: string[];
  materials?: string[];
  tools?: string[];
  saleType?: string;
  edition?: {
    number?: number;
    amount?: number;
  };
  modelNo?: string;
  stn?: string;
  category?: any[];
  stock?: {
    amount?: number;
    min?: number;
  };
  holidayMode?: {
    active: boolean;
    message?: string;
  };
  badges?: any[];
}
```

---

## 3. Yeni Ürünler (New Products)

Sisteme yeni eklenen ürünleri sayfalamalı olarak listeler.

*   **Endpoint:** `GET /product/new?page=1&limit=10`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 4. Popüler Ürünler (Popular Products)

Çok satan veya en çok ziyaret edilen popüler ürünleri listeler.

*   **Endpoint:** `GET /product/popular?page=1&limit=10`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 5. Rastgele Ürünler (Random Products)

Belirtilen miktarda rastgele ürün getirir (Örn. ana sayfa keşfet bölümleri için).

*   **Endpoint:** `GET /product/random/:amount`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek:** `/product/random/5`

---

## 6. Dinamik Filtreler (Faceted Search)

Mevcut arama/kategori kriterlerine göre yan menüde (sidebar) gösterilebilecek aktif filtreleri (fiyat aralığı, markalar, kategoriler) getirir.

*   **Endpoint:** `GET /product/filters`
*   **Auth Gereksinimi:** `x-avci-client`
*   **Parametreler:** Listeleme işlemiyle aynı query parametrelerini (`category`, `search`, `brand`) alır.

---

## 7. Benzer Ürünler (Similar Products)

Görüntülenen bir ürüne benzeyen (aynı kategoride vb.) alternatif ürünleri getirir.

*   **Endpoint:** `GET /product/:slug/similar?limit=4`
*   **Auth Gereksinimi:** `x-avci-client`
