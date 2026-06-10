---
id: news
title: Haberler / Duyurular (News)
sidebar_position: 3
---

# Haberler ve Duyurular (News)

Şirket haberlerini, basın bültenlerini, platform içi duyuruları veya kampanya bildirimlerini yayınlamak için kullanılan modüldür.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Haberleri Listeleme (List News)

Sistemdeki yayınlanmış tüm haberleri sayfalama ve filtreleme seçenekleriyle listeler.

*   **Endpoint:** `GET /news`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `category` | String | Belirli bir kategori ID'sine (Örn: Basın, Güncelleme) göre listeler. |
| `search` | String | Başlıkta veya haber özetinde metin araması yapar. |

---

## 2. Haber Detayı (News Details)

Slug değeri üzerinden belirli bir haberin tam içeriğini (body), görsellerini ve yayın tarihini getirir.

*   **Endpoint:** `GET /news/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "nw_001",
    "slug": "yeni-subemiz-acildi",
    "title": "Yeni Şubemiz Ankara'da Açıldı!",
    "summary": "Ankara şubemizin açılışında sizleri de bekliyoruz.",
    "content": "<h1>Açılışımıza Davetlisiniz...</h1>",
    "publishDate": "2026-06-15T10:00:00Z"
  }
}
```

---

## 3. En Yeni Haberler (New News)

Uygulamanın ana sayfasında veya header'da "Son Dakika" gibi en güncel haberleri listelemek için kullanılır.

*   **Endpoint:** `GET /news/new`
*   **Auth Gereksinimi:** `x-avci-client`
