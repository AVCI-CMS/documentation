---
id: comment
title: Yorum ve Değerlendirmeler (Comment)
sidebar_position: 6
---

# Yorum ve Değerlendirme (Comment & Rating) İşlemleri

Ürünler, blog yazıları, etkinlikler veya satıcı profilleri altına kullanıcıların bıraktığı yorumları, yıldızlı değerlendirmeleri (Rating) ve yorum beğenilerini yöneten esnek yapıdır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Yorumları Listeleme ve Gönderme

Belirli bir içeriğin (Örn: Ürün veya Blog) altındaki onaylanmış yorumları listelemek veya yeni bir yorum göndermek için kullanılır.

*   **Yorumları Getir:** `GET /comment/:type/:id`
*   **Yorum Gönder:** `POST /comment/:type/:id` (Göndermek için Auth gerekir)
*   **Parametreler:**
    *   `type`: İçerik tipi (Örn: `product`, `blog`, `event`)
    *   `id`: İçeriğin `_id` değeri.

**Örnek:** `/comment/product/prod_123`

---

## 2. Yıldızlı Değerlendirme (Rating)

Bir ürüne veya içeriğe sadece 1-5 yıldız arası puan vermek (veya istatistiklerini çekmek) için kullanılır.

*   **Puan Ver/Güncelle:** `POST /comment/:type/rating`
*   **Genel İstatistikler (Ortalama Puan):** `GET /comment/:type/rating/stats`
*   **İçerik İstatistiği (5 yıldız X kişi verdi):** `GET /comment/:type/rating/:contentId/stats`
*   **Kullanıcının Verdiği Puan:** `GET /comment/:type/rating/:contentId`

---

## 3. Yorum Yanıtlama (Reply)

Mevcut bir yoruma "Yanıt (Reply)" göndermek için kullanılır. Genellikle satıcıların veya diğer kullanıcıların tartışma yaratmasını sağlar.

*   **Endpoint:** `POST /comment/:type/comment/:commentId/reply`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 4. Yorumu Beğenme (Like / Dislike)

Kullanıcıların bir yorumu "Faydalı Buldum" (Like) diyerek öne çıkarmasını sağlar.

*   **Ana Yorumu Beğen/Geri Al:** `POST /comment/:type/comment/:commentId/like`
*   **Alt Yanıtı Beğen/Geri Al:** `POST /comment/:type/comment/:commentId/reply-like`

---

## 5. Görselli Yorumlar (Images)

Kullanıcılar satın aldıkları ürüne fotoğraflı yorum bırakmak istediklerinde, yoruma fotoğraf eklemek veya kaldırmak için bu uç noktalar kullanılır.

*   **Görsel Ekle:** `POST /comment/:type/comment/:commentId/images`
*   **Sadece Görselli Yorumları Listele:** `GET /comment/:type/with-images`
