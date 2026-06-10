---
id: payment
title: Ödemeler (Payment)
sidebar_position: 2
---

# Ödeme İşlemleri (Payment)

AVCI CMS, müşterilerinizin kredi kartı (3D Secure), havale (Bank Transfer) veya kripto (Crypto) yöntemleriyle ödeme yapabilmeleri için güvenli ve modüler bir ödeme altyapısı sunar. 

Bu uç noktalar Checkout (Ödeme) sayfanızda sanal poslarla ve cüzdan sistemleriyle konuşmak için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi zorunludur.

---

## 1. Taksit Seçenekleri (Installments)

Ödeme ekranında, sepetteki tutar ve müşterinin gireceği kredi kartı BIN numarasına (ilk 6 veya 8 hane) göre aktif sanal pos'un taksit oranlarını ve komisyonları getirir.

*   **Endpoint:** `POST /payment/installment`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 2. 3D Secure Kredi Kartı Ödemesi

Kredi kartı ile 3D Secure güvenli ödeme sürecini başlatır ve bankanın doğrulama ekranına yönlendirme HTML formunu döner.

*   **Endpoint:** `POST /payment/3ds`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek Body:**
```json
{
  "basketId": "bskt_12345",
  "cardNumber": "4111111111111111",
  "expireMonth": "12",
  "expireYear": "2028",
  "cvc": "123",
  "cardHolderName": "Ahmet Yılmaz"
}
```

### 3D Secure Callback İşleme
Kullanıcı bankadan SMS şifresini girdikten sonra, banka sonucu bu URL'e bildirir. Bu rotada doğrulama gerekmez (Banka kendi formatında veri atar).
*   **Endpoint:** `POST /payment/3ds/callback`

### 3D Secure Tamamlama
İşlemin başarıyla sonuçlanmasının ardından siparişin (Order) kesinleşmesi için çağrılır.
*   **Endpoint:** `POST /payment/3ds/complete`
*   **Auth Gereksinimi:** `x-avci-client`

---

## 3. Havale / EFT İşlemleri (Bank Transfer)

Banka havalesi ile ödeme niyetini (Payment Intent) oluşturur.

*   **Havale Başlatma:** `POST /payment/bank-transfer`
    *   **Açıklama:** Kullanıcı havale yapacağını bildirir. Sistem bekleyen (pending) bir ödeme kaydı oluşturur.
*   **Havale Doğrulama:** `POST /payment/bank-transfer/:paymentId/verify`
    *   **Açıklama:** Müşteri parayı gönderdikten sonra (veya webhook'lar aracılığıyla) ödemenin dekont kontrolü/doğrulaması için tetiklenir.

---

## 4. Kripto Ödemeler (Crypto)

Kripto para cüzdanları ile Web3 ödeme entegrasyonu süreçlerini yönetir.

*   **Kripto Ödeme Başlatma:** `POST /payment/crypto`
*   **Kripto Ödeme Doğrulama:** `POST /payment/crypto/:paymentId/verify`
    *   **Açıklama:** Blockchain ağında (Tx Hash) işlemin doğrulanması ve siparişin onaylanması sürecini yürütür.
