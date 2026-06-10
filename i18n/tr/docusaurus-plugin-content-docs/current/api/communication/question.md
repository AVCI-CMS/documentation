---
id: question
title: Soru ve Cevaplar (Q&A)
sidebar_position: 7
---

# Soru-Cevap (Question) İşlemleri

Pazaryerlerinde sıkça görülen "Satıcıya Soru Sor" veya ürün özelinde kullanıcıların merak ettikleri soruları sormalarını sağlayan "Soru ve Cevap (Q&A)" altyapısıdır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Soru Listesi ve Yeni Soru Sorma

Belirli bir ürüne veya içeriğe sorulmuş ve *satıcı tarafından cevaplanmış* tüm soruları herkese açık olarak listelemek veya yeni bir soru sormak için kullanılır.

*   **Cevaplanmış Soruları Getir:** `GET /question/:type/:id`
*   **Satıcıya Soru Sor:** `POST /question/:type/:id`
*   **Parametreler:**
    *   `type`: İçerik tipi (Örn: `product`, `merchant`)
    *   `id`: İçeriğin/Satıcının ID'si.

---

## 2. Soruyu Cevaplama (Answer)

Sadece ilgili yetkiye sahip kişilerin (Ürün sahibi mağaza vb.) sorulan soruya yanıt verebilmesi içindir. 

*   **Cevap Ver:** `POST /question/:type/question/:questionId/answer`
*   **Cevabı Güncelle:** `PUT /question/:type/question/:questionId/answer` (Genelde 1 saat içinde düzenleme izni verilir).
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 3. Soruları Beğenme (Helpful / Not Helpful)

"Bu cevap faydalı oldu mu?" butonlarını çalıştırmak için kullanılır.

*   **Soruyu Beğen/Geri Al:** `POST /question/:type/question/:questionId/like`
*   **Cevabı Beğen/Geri Al:** `POST /question/:type/question/:questionId/answer-like`

---

## 4. Soru Kapatma (Close)

İlgili sorunun çözüme ulaştığını belirtmek veya daha fazla yanıtı engellemek için soruyu "Kapalı (Closed)" durumuna çeker.

*   **Endpoint:** `PUT /question/:type/question/:questionId/close`
