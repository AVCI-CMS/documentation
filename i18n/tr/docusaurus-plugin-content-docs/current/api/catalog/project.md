---
id: project
title: Projeler (Project)
sidebar_position: 8
---

# Proje (Project) İşlemleri

AVCI CMS kullanan B2B mimari firmalar, emlak siteleri veya portfolyo sergileyen kurumlar için "Projeler" modülüne ait verileri dışarıya açan uç noktalardır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Projeleri Listeleme (List Projects)

Tamamlanmış veya devam eden projeleri sayfalama, kategori ve filtreleme yetenekleriyle listeler.

*   **Endpoint:** `GET /project`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `category` | String | Belirli bir proje kategorisi (Örn: Konut, Ticari). |
| `search` | String | Proje adı veya açıklamasında arama yapar. |

---

## 2. Proje Detayı (Project Details)

Slug değeri üzerinden belirli bir projenin tüm detaylarını (teslim tarihi, fotoğraf galerisi, lokasyon vb.) getirir.

*   **Endpoint:** `GET /project/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "prj_001",
    "slug": "manzara-evleri",
    "title": "Manzara Evleri Projesi",
    "status": "completed",
    "completionDate": "2025-12-01T00:00:00Z",
    "gallery": [
      "https://cdn.avcicms.com/prj_1.jpg",
      "https://cdn.avcicms.com/prj_2.jpg"
    ]
  }
}
```
