---
id: attribute
title: Özellikler (Attribute)
sidebar_position: 2
---

# Özellik İşlemleri (Attributes & Variations)

E-ticaret sistemindeki varyasyonlu ürünlerin (Örn: Renk, Beden, Hafıza Seçeneği) özellik tiplerini ve bu tiplere ait seçenekleri (Mavi, Kırmızı, S, M, L) listeler.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Filtreleme İçin Özellikleri Getir (List Attributes)

Katalog ekranının yan tarafında (Sidebar) filtre olarak kullanılacak olan tüm aktif ürün özellikleri listesini (Seçenekleriyle birlikte) döner.

*   **Endpoint:** `GET /attribute`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "attr_color",
      "name": "Renk",
      "type": "COLOR",
      "options": [
        { "label": "Kırmızı", "value": "#FF0000" },
        { "label": "Mavi", "value": "#0000FF" }
      ]
    },
    {
      "id": "attr_size",
      "name": "Beden",
      "type": "TEXT",
      "options": [
        { "label": "Small", "value": "S" },
        { "label": "Large", "value": "L" }
      ]
    }
  ]
}
```

---

## 2. Belirli Bir Özellik Detayı

Sadece "Beden" veya sadece "Renk" gibi spesifik bir özellik setinin detaylarını döner.

*   **Endpoint:** `GET /attribute/:id`
*   **Auth Gereksinimi:** `x-avci-client`
