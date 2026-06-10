---
id: errors
title: Ortak Hata Kodları (Errors)
sidebar_position: 2
---

# API Hata Kodları ve Yönetimi

AVCI CMS Public API'lerine yaptığınız bir istek başarısız olduğunda, sunucu HTTP durum kodu (Status Code) ile birlikte standartlaştırılmış bir JSON hata formatı döner. Bu sayfa, alabileceğiniz ortak hataları ve bu hataların nasıl yorumlanacağını açıklar.

## Standart Hata Yanıtı (JSON)

Başarısız olan tüm isteklerde aşağıdaki JSON yapısı dönmektedir:

```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Gönderilen verilerde eksiklikler var.",
    "details": [
      {
        "field": "email",
        "issue": "Geçerli bir e-posta adresi değil"
      }
    ]
  }
}
```

*   `status`: Her zaman `"error"` döner.
*   `code`: Sistemin yazılımsal olarak yakalayabileceği (Frontend kodunda if-else ile kontrol edilebilir) standart bir string sabittir.
*   `message`: Son kullanıcıya (veya geliştiriciye) gösterilebilecek açıklayıcı mesaj.
*   `details`: (Opsiyonel) Validation hataları gibi durumlarda hatanın tam olarak nerede olduğunu belirten dizi.

## Ortak HTTP Durum Kodları

### 400 Bad Request
İstekte gönderilen parametreler eksik, hatalı veya sistemin kabul edemeyeceği formatta.
*   Örnek Hata Kodu: `VALIDATION_FAILED`, `INVALID_PARAMETER`
*   Çözüm: Endpoint dokümantasyonundaki zorunlu alanları ve tipleri kontrol edin.

### 401 Unauthorized
Erişim izniniz yok. Bunun sebebi aşağıdaki durumlardan biri olabilir:
*   `x-avci-client` header'ı gönderilmedi veya geçersiz bir ID içeriyor.
*   `Authorization` header'ı (JWT Token) eksik veya süresi (expire) dolmuş.
*   Örnek Hata Kodu: `TENANT_NOT_FOUND`, `TOKEN_EXPIRED`, `UNAUTHORIZED`

### 403 Forbidden
Sisteme giriş yaptınız ancak çağırmak istediğiniz kaynağa veya işleme yetkiniz (role/permission) bulunmuyor.
*   Örnek Hata Kodu: `PERMISSION_DENIED`

### 404 Not Found
Talep ettiğiniz kaynak (ürün, sayfa, üye vs.) veritabanında bulunamadı veya silinmiş. Veya endpoint URL'i yanlış yazılmış.
*   Örnek Hata Kodu: `RESOURCE_NOT_FOUND`

### 429 Too Many Requests (Rate Limit)
Sunucuya belirlenen limitlerden çok daha hızlı ve sık istekte bulundunuz. Koruması aktif olan endpointlerde IP adresiniz veya Client ID'niz geçici olarak bloklanmış olabilir.
*   Örnek Hata Kodu: `RATE_LIMIT_EXCEEDED`
*   Çözüm: Yanıt içerisindeki (veya Header'daki) `Retry-After` süresine bakarak işlemlerinizi yavaşlatın.

### 500 Internal Server Error
AVCI CMS sunucularında beklenmeyen bir hata meydana geldi. Bu durumlar anında sistem yöneticilerine raporlanmaktadır.
*   Örnek Hata Kodu: `INTERNAL_ERROR`
