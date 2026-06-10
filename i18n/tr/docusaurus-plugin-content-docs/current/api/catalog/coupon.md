---
id: coupon
title: Kuponlar (Coupon)
sidebar_position: 6
---

# Kupon (Coupon) İşlemleri

Sitenizdeki aktif indirim kodlarının geçerliliğini sorgulamak ve sepet/ödeme aşamalarında kupon kurallarını doğrulamak için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**. Ayrıca kullanıcıların kupon tanımlarını görebilmesi için `Authorization` başlığıyla JWT token gönderilmesi gerekir.

---

## 1. Kupon Kodu Kontrolü (Check Code)

Kullanıcının girdiği bir kupon kodunun (Örn: `YAZ2026`) sistemde var olup olmadığını ve o müşteri için geçerli olup olmadığını kontrol eder.

*   **Endpoint:** `GET /coupon/check/:code`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`

**Örnek:** `/coupon/check/YAZ2026`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "cpn_123",
    "code": "YAZ2026",
    "discountType": "percentage",
    "discountValue": 20,
    "minOrderAmount": 500,
    "isValid": true
  }
}
```

---

## 2. Kupon Doğrulama (Validate)

Sepetteki mevcut ürünler ve tutarlar baz alınarak kuponun uygulanabilir olup olmadığını (Örn: "Sepetinizde kampanya dışı ürün var" kontrolü) doğrular. 

*   **Endpoint:** `GET /coupon/validate`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`
*   **Not:** Genellikle sorgu parametresi olarak `code` ve gerekirse `basketId` alır.

**Örnek cURL İsteği:**
```bash
curl -X GET "https://api.avcicms.com/v1/coupon/validate?code=YAZ2026&basketId=bskt_789" \
  -H "x-avci-client: <tenant_id>" \
  -H "Authorization: Bearer <token>"
```
