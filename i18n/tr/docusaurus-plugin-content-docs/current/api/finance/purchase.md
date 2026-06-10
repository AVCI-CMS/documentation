---
id: purchase
title: Satın Alma (Purchase)
sidebar_position: 4
---

# Satın Alma (Purchase) İşlemleri

Ödeme (Payment) adımından sonra, sepetin onaya dönüşmesi, siparişin (Order) veya aboneliğin (Subscription) kesinleştirilip satıcılara (Merchant) bildirilmesi süreçlerini yürüten Orkestratör (Orchestrator) modülüdür.

Payment modülüyle sıkı bir uyum içinde çalışır. Tüm isteklerde `x-avci-client` zorunludur.

---

## 1. Siparişi Kesinleştirme (Process Purchase)

Hazırlanmış bir sepetin (Basket) veya 3D Secure gerektirmeyen standart bir kredi kartı / ön ödemeli bakiyenin satın alma işlemini doğrudan sonlandırarak sipariş kaydını (Order Record) oluşturur.

*   **Endpoint:** `POST /purchase`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek Body:**
```json
{
  "basketId": "bskt_12345",
  "paymentMethod": "credit_card",
  "paymentIntentId": "pi_789"
}
```

---

## 2. Abonelik Satın Alma (Subscription)

Ürünlerden farklı olarak, aylık veya yıllık yenilenebilir abonelik (Subscription) paketlerinin ilk tahsilatını yapıp planı başlatır.

*   **Endpoint:** `POST /purchase/subscription`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 3. 3D Secure Orkestrasyonu

Kredi kartı 3D Secure işlemleri sırasında, bankadan dönen yanıtları ödeme modülünden yakalayıp siparişe dönüştüren adımlardır.

*   **3D Secure Callback (Banka Bildirimi):** `POST /purchase/3ds/callback`
    *   Bu rotada Authorization yoktur, doğrudan Banka post atar.
*   **3D Secure Tamamlama:** `POST /purchase/3ds/complete`
    *   İşlem başarıyla bittiğinde, Checkout ekranınızdan siparişi onaylamak için çağrılır.

---

## 4. Alternatif Ödeme Doğrulamaları

Eğer müşteri Havale veya Kripto seçmişse, işlemler anında onaylanmaz. Müşteri parayı gönderdiğinde işlemi onaylamak için kullanılır.

*   **Havale/EFT Onayı:** `POST /purchase/payment/verify/bank-transfer`
*   **Kripto Ağ Onayı:** `POST /purchase/payment/verify/crypto`
