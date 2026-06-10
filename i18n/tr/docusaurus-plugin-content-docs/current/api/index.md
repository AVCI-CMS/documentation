---
id: index
title: Public API Referansı
slug: /api
sidebar_position: 1
---

# AVCI CMS Public API

AVCI CMS, geliştiricilerin e-ticaret vitrinlerini (Storefront), mobil uygulamalarını, B2B portallarını ve pazaryerlerini %100 özgürce ve Headless (Başsız) bir mimariyle inşa edebilmeleri için kapsamlı ve güçlü bir **Public API** ağı sunar.

## Headless Mimari Nedir?

AVCI CMS backend mimarisinde, her bir modül ve servis kendi içerisinde **Public (Dışa Açık)** ve **Private (Yönetim)** olarak kusursuz bir şekilde izole edilmiştir.

*   `Private API:` Sadece CMS yönetim paneline ve yetkilendirilmiş admin kullanıcılarına hizmet veren, kritik konfigürasyonları yönettiğiniz API'lerdir.
*   `Public API:` Doğrudan son kullanıcılarınızın (müşterilerinizin) mobil uygulamanız veya e-ticaret siteniz üzerinden eriştiği, ürünleri listelediği, sepete ekleme yaptığı ve ödeme aşamalarını yürüttüğü API'lerdir.

Bu bölümde **Public API** yeteneklerini ve uç noktalarını (endpoints) bulacaksınız.

## API Organizasyonu

API referansımız iş mantığına göre aşağıdaki devasa modül ve servislere ayrılmıştır:

1.  **[Finans ve Sepet İşlemleri (Finance)](/api/finance/basket):** Sepet (Basket), ödeme (Payment) geçitleri, satın alma (Purchase) ve fatura (Invoice) işlemleri.
2.  **[Katalog ve E-ticaret (Catalog)](/api/catalog/product):** Ürünler, varyantlar, stok durumları, kampanyalar, kuponlar ve kategoriler.
3.  **[İlişkiler (Relation)](/api/relation/merchant):** Satıcılar, markalar, mağazalar, mekanlar ve takipler.
4.  **[İçerik Yönetimi (Content)](/api/content/page):** Blog yazıları, haberler, kurumsal sayfalar, menüler ve sözlük (çeviri) verileri.
5.  **[İletişim (Communication)](/api/communication/contact-form):** Yorumlar, destek talepleri, formlar, SSS ve bildirimler.
6.  **[Ortak Yapılar (Common)](/api/common/category):** Kategoriler, koleksiyonlar, ürün özellikleri (attributes) ve beğeniler.
7.  **[Araçlar (Tools)](/api/tools/qrcode):** Slaytlar (Slider), QR ve NFC işlemleri.
8.  **[Ekstra Servisler (Extra)](/api/extra/pagination):** Standartlar, sayfalama yapısı, SEO ve Ortak Hata Kodları.

## Sonraki Adımlar

AVCI CMS API'sini kullanmaya başlamak, gerekli HTTP Header ayarlarını yapmak (örneğin `x-avci-client` kullanımı) ve ilk isteğinizi göndermek için **[Başlangıç (Getting Started)](/api/getting-started)** sayfamızı inceleyin.
