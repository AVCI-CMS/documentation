---
id: groups
title: Gruplar (Groups)
sidebar_position: 4
---

# Grup İşlemleri (Groups)

Koleksiyonlar (Collections) ürüne özgüyken; Gruplar (Groups) genellikle blog yazıları, haberler, SSS veya diğer soyut içerikleri gruplamak için kullanılır. Kategori yapısına çok benzer çalışır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Grupları Listeleme

Sistemde oluşturulan tüm grupları hiyerarşik veya sayfalayarak listeler. Belirli bir içerik tipi (Örn: SSS, Blog) için filtreleme destekler.

*   **Endpoint:** `GET /groups`
*   **Auth Gereksinimi:** `x-avci-client`
*   **Query Parametreleri:**
    *   `type`: (Opsiyonel) Grup türü.

---

## 2. Grup Detayı Getirme

Grup ID'si veya slug ile bir grubun açıklamasını, başlığını ve varsa içine eklenmiş kayıtları (posts) döner.

*   **Endpoint:** `GET /groups/:slug`
*   **Auth Gereksinimi:** `x-avci-client`
