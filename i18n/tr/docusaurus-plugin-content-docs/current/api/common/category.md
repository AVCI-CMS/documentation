---
id: category
title: Kategoriler (Category)
sidebar_position: 1
---

# Kategori (Category) İşlemleri

Sistemdeki ürünlerin, etkinliklerin, blog yazılarının veya haberlerin sınıflandırıldığı kategorileri (Ağaç yapısında) çekmek için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Kategori Ağacını Getirme (Category Tree)

Frontend tarafında "Kategori Menüsü (Mega Menü)" veya "Kategori Filtresi" çizerken ihtiyaç duyulan kategorileri hiyerarşik olarak (İç içe children dizileriyle) getirir.

*   **Endpoint:** `GET /category/tree`
*   **Auth Gereksinimi:** `x-avci-client`
*   **Query Parametreleri:**
    *   `type`: Kategori tipi (Örn: `product`, `blog`, `event`, `merchant`). Gönderilmezse tüm ağacı getirir.

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "cat_1",
      "name": "Elektronik",
      "slug": "elektronik",
      "children": [
        {
          "id": "cat_2",
          "name": "Telefonlar",
          "slug": "telefonlar",
          "children": []
        }
      ]
    }
  ]
}
```

---

## 2. Düz Liste Getirme (Category List)

Kategorileri iç içe ağaç (tree) yerine düz bir dizi (flat array) olarak döner. Özellikle selectbox'lar veya hızlı arama (autocomplete) için uygundur.

*   **Endpoint:** `GET /category/list`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 3. Kategori Detayı (Category Detail)

Verilen kategori ID'si veya slug'ına göre kategorinin açıklamasını, banner görselini ve üst (parent) kategorisini getirir.

*   **Endpoint:** `GET /category/:slug`
*   **Auth Gereksinimi:** `x-avci-client`
