---
id: basket
title: Sepet İşlemleri (Basket)
sidebar_position: 1
---

# Sepet (Basket) Yönetimi

E-ticaret ve sipariş süreçlerinin en temel modülü olan Sepet (Basket) işlemleri, bir kullanıcının veya ziyaretçinin (guest) ürünlerini toplaması, miktar güncellemesi ve kargo ataması yapabilmesini sağlar.

Bu uç noktalar, arka planda stok (rezervasyon) kontrollerini ve dinamik fiyat hesaplamalarını otomatik olarak yürütür. Tüm isteklerde `x-avci-client` header'ı zorunludur.

---

## 1. Sepet Oluşturma

Yeni ve boş bir sepet oluşturmak (genellikle bir misafir kullanıcı siteye ilk girdiğinde) için kullanılır. Başarılı yanıtta size bir `basketId` (sepet ID'si) döner. Sonraki tüm işlemler bu ID üzerinden yürütülür.

*   **Endpoint:** `POST /basket`
*   **Auth:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "bskt_123456",
    "status": "active",
    "totalPrice": 0,
    "items": []
  }
}
```

---

## 2. Sepeti Getirme (Get Basket)

Mevcut bir sepetin güncel durumunu, içerisindeki ürünleri ve hesaplanmış toplam tutarlarını getirir.

*   **Endpoint:** `GET /basket/:basketId`
*   **Auth:** `x-avci-client`

---

## 3. Sepete Ürün Ekleme (Add Items)

Oluşturulmuş bir sepete yeni bir ürün/varyant ekler. Eğer ürün zaten sepetteyse, miktarını artırır.

*   **Endpoint:** `POST /basket/:basketId/items`
*   **Auth:** `x-avci-client`

**Örnek Body:**
```json
{
  "productId": "prod_123",
  "variantId": "var_456",
  "quantity": 2
}
```

---

## 4. Sepetteki Ürün Miktarını Güncelleme

Sepete daha önceden eklenmiş bir ürünün miktarını (quantity) değiştirir. Stok yetersizse `400 Bad Request` veya `INSUFFICIENT_STOCK` hatası döner.

*   **Endpoint:** `PUT /basket/:basketId/items/:itemId`
*   **Auth:** `x-avci-client`

**Örnek Body:**
```json
{
  "quantity": 5
}
```

---

## 5. Ürünü Sepetten Çıkarma

Belirli bir ürünü (item) sepetten tamamen kaldırır.

*   **Endpoint:** `DELETE /basket/:basketId/items/:itemId`
*   **Auth:** `x-avci-client`

---

## 6. Sepeti Temizleme / Silme

Sepeti tamamen siler veya içindeki tüm ürünleri boşaltır.

*   **Endpoint:** `DELETE /basket/:basketId`
*   **Auth:** `x-avci-client`

---

## 7. Kargo (Carrier) Atama

Sepete, ürünlerin hangi kargo firmasıyla gönderileceğini veya hangi kargo kurallarının geçerli olacağını atar. Bu adım, ödeme aşamasına geçmeden önce kargo ücretinin hesaplanabilmesi için kritiktir.

*   **Endpoint:** `POST /basket/:basketId/carriers`
*   **Auth:** `x-avci-client`

**Örnek Body:**
```json
{
  "carrierId": "crr_789"
}
```

---

## 8. Sepet Notu Ekleme (Set Notes)

Kullanıcının satıcıya veya siparişi hazırlayan ekibe iletmek istediği sipariş notlarını sepete kaydeder.

*   **Endpoint:** `POST /basket/:basketId/notes`
*   **Auth:** `x-avci-client`

**Örnek Body:**
```json
{
  "note": "Lütfen hediye paketi yapılsın."
}
```

---

## 9. Sözleşmeleri Hazırlama (Prepare Terms)

Kullanıcının ödeme aşamasına (Checkout) geçmeden önce kabul etmesi gereken Mesafeli Satış Sözleşmesi (Distance Selling Contract) ve Ön Bilgilendirme Formu (Preliminary Information Form) gibi hukuki dokümanların taslaklarını, sepetteki anlık ürünlere ve fiyatlara göre dinamik olarak oluşturur.

*   **Endpoint:** `POST /basket/terms`
*   **Auth:** `x-avci-client`
*   **Not:** İstek body'sinde `basketId` veya ödeme yöntemleri gibi bağlamsal veriler istenebilir. (Parametreler için SDK referansını inceleyin).
