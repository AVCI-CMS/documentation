---
id: like
title: Beğeniler (Like/Favorite)
sidebar_position: 7
---

# Beğeni İşlemleri (Like / Favorite)

Bir e-ticaret sitesindeki ürünleri "Favorilere Ekleme (Wishlist)" veya blog yazılarına "Kalp bırakma" fonksiyonudur.

Tüm isteklerde `x-avci-client` kimlik başlığı ve `Authorization` **zorunludur**.

---

## 1. Favorileri Listeleme (My Wishlist)

Kullanıcının daha önceden kalplediği (favoriye aldığı) tüm ürünleri/içerikleri listeler.

*   **Endpoint:** `GET /like`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`
*   **Query Parametreleri:**
    *   `type`: (Opsiyonel) Sadece favori ürünleri getirmek için `?type=product`.

---

## 2. Beğen / Beğenmekten Vazgeç (Toggle Like)

İçeriğin `_id` değerini alarak, kullanıcı eğer daha önce beğendiyse beğeniyi geri alır (Unlike), beğenmediyse favorilere ekler.

*   **Endpoint:** `POST /like/:type/:id`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`
