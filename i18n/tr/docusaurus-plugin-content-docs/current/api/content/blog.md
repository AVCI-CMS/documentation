---
id: blog
title: Blog / Yazılar
sidebar_position: 2
---

# Blog (Yazı) İşlemleri

Sitenizin blog veya makale bölümünü beslemek için kullanılan uç noktalardır. Blog yazıları kategorilere ayrılabilir ve etiketlenebilir.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Yazıları Listeleme (List Blogs)

Yayınlanmış durumdaki blog yazılarını sayfalama ve filtreleme destekli olarak listeler.

*   **Endpoint:** `GET /blog`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `category` | String | Belirli bir kategori ID'sine (Örn: Teknoloji, Moda) göre blogları getirir. |
| `search` | String | Yazı başlığı veya özetinde kelime araması yapar. |

---

## 2. Yazı Detayı (Blog Details)

Slug değeri üzerinden belirli bir blog yazısının HTML/Zengin metin formatındaki tam içeriğini, yazar bilgisini (author), kapak görselini (thumbnail) ve yayınlanma tarihini getirir.

*   **Endpoint:** `GET /blog/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek:** `/blog/2026-e-ticaret-trendleri`

---

## 3. Yeni Eklenen Yazılar (New Blogs)

Blog ana sayfanızda "En Yeniler" veya "Son Eklenenler" gibi bir widget/slider oluşturmak için tarihe göre en yeni blogları hızlıca getirir.

*   **Endpoint:** `GET /blog/new`
*   **Auth Gereksinimi:** `x-avci-client`
