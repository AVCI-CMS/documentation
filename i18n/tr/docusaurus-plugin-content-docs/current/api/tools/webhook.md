---
id: webhook
title: Webhooklar (Webhook)
sidebar_position: 4
---

# Webhook İşlemleri

Dış sistemlerin (Kargo firmaları, Ödeme Geçitleri, Pazaryerleri) AVCI CMS ile olay bazlı konuşmasını sağlayan webhook uç noktalarıdır.

Genellikle sunucudan sunucuya (S2S) iletişim olduğu için bu dosyadaki rotalar `x-avci-client` **gerektirmeyebilir**, yerine dış sistemin kendi gizli anahtarı (Secret) kullanılır.

---

## 1. Ödeme Başarı Bildirimi (Payment Webhook)

İyzico veya Stripe gibi ödeme sağlayıcılar, müşteri ödemeyi 3D Secure ile tamamladığında asenkron olarak bu rotaya başarılı/başarısız bilgisini gönderir.

*   **Endpoint:** `POST /webhook/payment`

---

## 2. Kargo Durumu Bildirimi (Shipment Webhook)

MNG, Yurtiçi veya Aras Kargo sistemleri kargo "Teslim Edildi" statüsüne geçtiğinde sipariş durumunun da teslim edildiye dönmesi için bu webhook tetiklenir.

*   **Endpoint:** `POST /webhook/shipment`
