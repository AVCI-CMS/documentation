---
id: pagination
title: Sayfalama (Pagination) & Filtreleme
sidebar_position: 1
---

# Liste API'lerinde Sayfalama ve Filtreleme

AVCI CMS Public API'leri, büyük veri kümelerini (Örneğin; Binlerce ürünü olan bir katalog, yüzlerce satıcısı olan bir pazar yeri) performanslı bir şekilde getirebilmeniz için standartlaştırılmış bir **Sayfalama (Pagination)** ve **Filtreleme** altyapısı kullanır.

Bu dokümanda anlatılan kurallar, aksine bir not düşülmedikçe, bir liste döndüren (`GET` ve çoğul isimli) tüm API uç noktaları için geçerlidir.

## 1. Sayfalama (Pagination) Parametreleri

Sayfalama işlemleri için Query URL içerisine genellikle iki temel parametre gönderilir:

*   `page`: Çekmek istediğiniz sayfa numarası (Varsayılan: `1`).
*   `limit` veya `perPage`: Bir sayfada gösterilecek maksimum kayıt sayısı (Varsayılan: `10` veya `20`).

**Örnek cURL İsteği:**
```bash
curl -X GET "https://api.avcicms.com/v1/catalog/product?page=2&limit=15" \
  -H "x-avci-client: <tenant_id>"
```

### Standart API Yanıt Yapısı (Meta Veri)

Sayfalamalı liste isteklerinizde dönen JSON yanıtında sadece verilerin (data) kendisi değil, arayüzünüzde (frontend) sayfa numaralarını oluşturabilmeniz için bir `meta` veya `pagination` objesi de bulunur.

```json
{
  "status": "success",
  "data": [
    { "id": "1", "name": "Ürün A" },
    { "id": "2", "name": "Ürün B" }
  ],
  "meta": {
    "totalRecords": 150,     // Toplam kayıt sayısı
    "totalPages": 10,        // Toplam sayfa sayısı
    "currentPage": 2,        // Şuan bulunduğunuz sayfa
    "limit": 15,             // Sayfa başına düşen kayıt sayısı
    "hasNextPage": true,     // Sonraki sayfa var mı?
    "hasPrevPage": true      // Önceki sayfa var mı?
  }
}
```

## 2. Sıralama (Sorting)

Verilerinizi belirli bir alana göre (Örneğin fiyata veya oluşturulma tarihine göre) sıralamak için `sort` ve `order` parametreleri kullanılır.

*   `sort` veya `sortBy`: Sıralamanın yapılacağı alanın adı (Örn: `price`, `createdAt`, `name`).
*   `order`: Sıralama yönü. Genellikle `asc` (Artan/Eskiden yeniye) veya `desc` (Azalan/Yeniden eskiye).

**Örnek: Ürünleri fiyata göre yüksekten düşüğe sıralama**
```bash
curl -X GET "https://api.avcicms.com/v1/catalog/product?sortBy=price&order=desc" \
  -H "x-avci-client: <tenant_id>"
```

## 3. Arama ve Filtreleme

Gelişmiş sorgular oluşturmak için alan adlarını URL parametresi olarak geçebilirsiniz. Modül detay sayfalarında hangi alanların filtrelenebilir olduğu listelenecektir ancak genel yaklaşım şöyledir:

*   **Tam Eşleşme:** `?status=active` veya `?categoryId=123`
*   **Arama (Search/Like):** Belirli bir metne göre arama yapmak için genelde `?search=kazak` veya `?q=kazak` kullanılır. Sistemin Full-Text Search veya Elasticsearch destekli kısımları bu arama terimini en alakalı şekilde eşleştirir.

## Frontend (SDK) Önerisi

Frontend tarafında bir liste oluştururken, state (durum) yönetiminde mevcut sayfanızı tutarak yeni sayfaya geçildiğinde parametreyi artırarak aynı API'yi tekrar çağırmanız yeterlidir:

```javascript
// Örnek Frontend SDK Çağrısı (Yakında)
const response = await avci.catalog.getProducts({
  page: 2,
  limit: 20,
  sortBy: 'createdAt',
  order: 'desc'
});

console.log(response.data); // Ürünler
console.log(response.meta.totalPages); // Frontend'de kaç sayfa çizeceğiniz
```
