---
id: menu
title: Menüler (Menu)
sidebar_position: 5
---

# Menü Yönetimi (Menu)

Frontend uygulamanızın Header (Üst), Footer (Alt) veya Sidebar (Yan) navigasyon bağlantılarını AVCI CMS panelinden dinamik olarak çekmenizi sağlar. Böylece yazılımcıya ihtiyaç duymadan sitenizin link yapısını değiştirebilirsiniz.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Menüleri Listeleme (List Menus)

Sistemde tanımlı olan ana menü gruplarını (Örn: "Header Menüsü", "Footer Menüsü") listeler.

*   **Endpoint:** `GET /menu`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 2. Menü Öğelerini (Items) Getirme

Platformdaki tüm menü linklerini (Items) ağaç yapısı veya düz liste olarak getirir.

*   **Endpoint:** `GET /menu/items`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 3. Belirli Bir Menüyü ve Linklerini Çekme

Menünün "slug" değerine (Örn: `header-menu`) göre o menüye ait tüm bağlantıları ağaç (hiyerarşik) yapısında getirir. Header çizerken en sık bu uç nokta kullanılır.

*   **Endpoint:** `GET /menu/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "name": "Header Menu",
    "slug": "header-menu",
    "items": [
      {
        "title": "Ana Sayfa",
        "url": "/",
        "target": "_self",
        "children": []
      },
      {
        "title": "Hizmetlerimiz",
        "url": "/hizmetler",
        "children": [
          {
            "title": "Web Tasarım",
            "url": "/web-tasarim"
          }
        ]
      }
    ]
  }
}
```
