---
id: follow
title: Takip İşlemleri (Follow)
sidebar_position: 5
---

# Takip İşlemleri (Follow)

Müşterilerin/kullanıcıların mağazaları, markaları, yazarları veya organizasyonları "Takip Etmesi" (Follow) altyapısını sağlayan modüldür. 

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**. Ayrıca kullanıcıların kimliğini doğrulamak ve takip işlemini gerçekleştirebilmeleri için `Authorization` başlığıyla JWT token gönderilmesi gerekir.

---

## 1. Takip Durumunu Kontrol Etme (Check Follow)

Giriş yapmış olan kullanıcının belirli bir öğeyi (Mağaza, Marka vb.) takip edip etmediğini kontrol eder.

*   **Endpoint:** `GET /follow/:type/:id`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`
*   **Parametreler:**
    *   `type`: Takip edilen öğenin türü (Örn: `merchant`, `brand`, `organization`)
    *   `id`: Öğenin ID'si.

**Örnek:** `/follow/merchant/merch_123`

---

## 2. Takip Et / Takipten Çık (Toggle Follow)

Kullanıcının belirli bir öğeyi takip etmesini sağlar. Eğer zaten ediyorsa takipten çıkarır (Toggle davranışı).

*   **Endpoint:** `POST /follow/:type/:id`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 3. Kullanıcının Takip Ettikleri (User Follows)

Giriş yapmış olan kullanıcının belirli bir türdeki tüm takip ettiklerini listeler. Örneğin "Takip ettiğim mağazalar".

*   **Endpoint:** `GET /follow/:type`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

**Örnek:** `/follow/merchant`

---

## 4. Bir Öğenin Takipçilerini Getirme

Belirli bir mağazanın veya markanın kimler tarafından takip edildiğini listeler.

*   **Endpoint:** `GET /follow/:type/:id/follows`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 5. Takipçi Sayısını Getirme (Follow Count)

Belirli bir öğenin sadece toplam takipçi sayısını (Count) getirir. Profil sayfalarında "1,200 Takipçi" ibaresini yazmak için idealdir.

*   **Endpoint:** `GET /follow/:type/:id/count`
*   **Auth Gereksinimi:** `x-avci-client`
