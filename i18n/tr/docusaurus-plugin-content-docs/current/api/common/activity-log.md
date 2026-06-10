---
id: activity-log
title: Aktivite Kayıtları (Activity Log)
sidebar_position: 6
---

# Aktivite Logları (Activity Log)

Sistem içerisindeki tüm kritik işlemlerin (Sipariş oluşturuldu, Yorum silindi, Profil güncellendi vb.) kayıt altına alındığı defterdir (Audit Log). Frontend tarafında genellikle "Kullanıcı Geçmişi" veya "Hesap Hareketleri" sayfasında gösterilir.

Tüm isteklerde `x-avci-client` kimlik başlığı ve işlem yapanı bilmek için `Authorization` token **zorunludur**.

---

## 1. Kullanıcının Kendi Aktivitelerini Getir

Sadece giriş yapmış olan müşterinin/kullanıcının kendi hesap geçmişini (Ne zaman şifre değiştirdi, ne zaman giriş yaptı vb.) listeler.

*   **Endpoint:** `GET /activity-log/my-logs`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`
