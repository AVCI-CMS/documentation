---
id: invoice
title: Faturalar (Invoice)
sidebar_position: 3
---

# Fatura (Invoice) İşlemleri

Siparişler, abonelikler veya komisyonlar sonucu oluşan e-Fatura / e-Arşiv belgelerinin otomatik olarak resmileştirilmesini (entegratörler üzerinden) ve kullanıcılara sunulmasını yönetir.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**. Kullanıcının faturalarını listelemek için ayrıca `Authorization` başlığıyla oturum token'ı gerekir.

---

## 1. Müşterinin Faturalarını Listeleme

Giriş yapmış kullanıcının (B2C Müşterisi veya B2B Bayisi) sistemdeki tüm faturalarını listeler. Genellikle "Hesabım > Faturalarım" sayfasında kullanılır.

*   **Endpoint:** `GET /invoice/user/invoices`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 2. Fatura Detayı ve İndirme

Belirli bir faturanın detaylarını (kalemler, vergiler vb.) veya doğrudan PDF formatındaki çıktı linkini döner.

*   **Endpoint:** `GET /invoice/:invoiceId`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

---

## 3. Otomatik Satış Faturası Kesme

Bir siparişin (Order) ödemesi ve teslimatı tamamlandıktan sonra, e-Ticaret (Sales) faturasını entegratör üzerinden otomatik kesmeyi tetikler.

*   **Endpoint:** `POST /invoice/sales/:orderId`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 4. Komisyon Faturası Kesme

Pazaryeri modelinde, bir alt-siparişin (Sub-Order) satıcıya aktarılan kısmından doğan platform komisyonunun e-Faturasını keser.

*   **Endpoint:** `POST /invoice/commission/:subOrderId`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 5. Abonelik Faturası Kesme

Aylık/Yıllık yenilenen SaaS veya hizmet aboneliklerinin (Subscription) dönemsel tahsilat faturalarını keser.

*   **Endpoint:** `POST /invoice/subscription/:subscriptionId`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 6. Serbest Fatura Oluşturma

Doğrudan API üzerinden bağımsız (Siparişten veya Abonelikten bağımsız) bir fatura talebi oluşturur. (Örn: B2B özel bir tahsilat).

*   **Endpoint:** `POST /invoice`
*   **Auth Gereksinimi:** `x-avci-client`

> **Not:** Satıcıların dışarıdan kestikleri manuel faturaları sisteme yüklemesi için fatura endpointi değil, dosya yükleme endpointi olan `/api/v1/media/file/invoice` yolu kullanılmalıdır.
