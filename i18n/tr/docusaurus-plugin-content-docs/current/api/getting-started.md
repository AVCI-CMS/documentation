---
id: getting-started
title: Başlangıç (Getting Started)
sidebar_position: 2
---

# API Başlangıç Kılavuzu

AVCI CMS Public API'leri ile geliştirme yapmaya başlamadan önce, temel Base URL bilgisini ve isteklerinizde kullanmanız gereken zorunlu HTTP başlıklarını (Headers) öğrenmeniz gerekmektedir.

## Base URL (Temel Adres)

Tüm Public API istekleriniz aşağıdaki temel adrese (Base URL) yapılmalıdır. 

*   **Tüm Ortamlar:** `https://api.avcicms.com/v1`

Sadelik ve okunabilirlik açısından, bu dokümantasyondaki diğer sayfalarda yer alan tüm endpoint'lerde Base URL gizlenmiş olup, doğrudan servisin yolu (Örn: `/auth/login` veya `/catalog/product`) verilmiştir. Sizin yapmanız gereken, bu yolları Base URL'in sonuna eklemektir.

## Zorunlu HTTP Başlıkları (Headers)

AVCI CMS, çoklu kiracı (multi-tenant) destekli bir altyapıya sahiptir. Sizin dış uygulamanızın hangi **Workspace** veya **Tenant** hesabına veri yazdığını veya veriyi nereden okuduğunu anlamamız için her istekte zorunlu bir Kimlik Başlığı (Header) göndermelisiniz.

### `x-avci-client`

Tüm public endpoint'ler, `tenantResolver` adlı özel bir güvenlik middleware'i tarafından korunmaktadır. Bu header'ı göndermezseniz sunucu size yetkisiz erişim hatası döndürür.

```http
x-avci-client: <Sizin-Workspace-ID-Degeriniz>
```

**Nereden Bulurum?**
Workspace ID veya Client ID değerinizi, AVCI CMS Dashboard paneline giriş yaptıktan sonra **Ayarlar (Settings) > API Keys** veya **Workspace Detayları** bölümünde bulabilirsiniz.

## İsteğe Bağlı Header'lar

Kullanıcının (Müşterinizin) hesabına giriş yaptığı durumlarda (B2C e-ticaret üyesi gibi) yetkilendirme gerektiren bir Public Endpoint çağırıyorsanız, kimlik doğrulama token'ını da göndermeniz gerekir.

### `Authorization`

Kullanıcı giriş yaptıktan sonra elde edilen JWT (JSON Web Token) veya Bearer token formatındaki anahtardır. Sadece kullanıcının kişisel profili, geçmiş siparişleri veya sepeti gibi yetki gerektiren isteklerde gönderilir. Ürün listesi gibi herkese açık verilerde bu zorunlu değildir.

```http
Authorization: Bearer <user_token>
```

*(Kullanıcıların nasıl giriş yapacağı ve bu token'ı nasıl alacağınızla ilgili detaylı bilgi için [User Authentication](/api/authentication) sayfasını inceleyin).*

## Standart cURL İsteği Örneği

Tüm bu bilgiler ışığında, AVCI CMS sunucusuna yapılacak başarılı bir API isteği örneği (Örneğin: Ürünleri listeleme) aşağıdaki gibidir:

```bash
curl -X GET "https://api.avcicms.com/v1/catalog/product" \
  -H "Content-Type: application/json" \
  -H "x-avci-client: d9c8b7a6-1234-5678-abcd-ef0987654321"
```

## CORS ve Domain İzinleri (Whitelisting)

AVCI CMS, sunucu güvenliğini sağlamak için yetkisiz web sitelerinden (tarayıcılardan) gelen API çağrılarını CORS (Cross-Origin Resource Sharing) politikaları ile engeller.

Sitenizin Public API'leri başarılı bir şekilde çağırabilmesi için, kullandığınız frontend domainini (Örn: `https://www.benimsitem.com`) CMS paneli üzerinden **CORS Ayarları / İzin Verilen Domainler** listesine eklediğinizden emin olun. Mobil uygulamalar (iOS/Android) doğal olarak CORS kurallarına takılmazlar.

## Geliştirici SDK'sı (Yakında)

REST API'leri manuel olarak çağırmak yerine geliştirici deneyimini (DX) en üst düzeye çıkarmak amacıyla Node.js ve Browser destekli resmi `@avci/sdk` paketimiz geliştirilme aşamasındadır. Bu dokümantasyon sayfalarında, gelecekte kullanıma sunulacak olan SDK fonksiyonlarının taslak kullanımlarını da örnekler arasında göreceksiniz.
