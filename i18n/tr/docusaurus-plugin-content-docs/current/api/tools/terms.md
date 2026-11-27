---
id: terms
title: Dinamik Sözleşmeler & SHA-256 Onay Defteri
sidebar_position: 6
---

# Dinamik Sözleşmeler & SHA-256 Onay Defteri

**Sözleşmeler (Terms) Aracı**, AVCI CMS'i kendi web, mobil, SaaS veya fintech uygulamanız için bağımsız bir **Dinamik Sözleşme ve Kriptografik Onay Defteri (Consent Ledger)** motoruna dönüştürür — kullanıcılarınız AVCI CMS içinde kayıtlı olmasa bile.

Handlebars değişkenleriyle (`{{customerName}}`, `{{planName}}`, `{{amount}}`) her işlemde dinamik sözleşmeler üretin, kullanıcıya gösterilen tam metni **SHA-256** (`contentHash` + `proofHash`) ile kilitleyin ve dilediğiniz zaman REST API, `@avci/sdk` veya yönetim panelindeki **Araçlar → Sözleşmeler → Onay Kayıtları** ekranından bütünlüğünü doğrulayın.

> **Zorunlu Başlık:** Tüm public/storefront isteklerinde `x-avcicms-client` başlığı zorunludur. Sözleşme dilini seçmek için `x-avcicms-language` (`tr`, `en` vb.) başlığını kullanın.

---

## Uçtan Uca Kriptografik Onay Akışı

1. **Derle (Render):** Dinamik `variables` nesnenizle `POST /v1/terms/:slug/render` çağrısı yapın. AVCI CMS şablonu derleyip HTML çıktısını ve deterministik **SHA-256 `contentHash`** özetini döner.
2. **Göster ve Onayla (Accept):** Derlenen metni kullanıcıya gösterin. Kullanıcı onayladığında aynı `variables` ve `expectedContentHash` değerleriyle `POST /v1/terms/:slug/consents` isteğini atın. Sunucu SHA-256'yı yeniden hesaplar — metin veya şablon bu arada değiştiyse `409 Conflict` (`ERR_TERMS_CONSENT_1003`) ile işlemi reddeder.
3. **Doğrula ve Denetle (Verify):** Her onay kaydı değiştirilemez HTML snapshot, `contentHash`, `proofHash` (`consentId`, `termSlug`, `version`, `contentHash`, `externalId`, `signedAt` ve `clientIp` bileşimi) ve isteğe bağlı PDF bağlantısıyla saklanır. `POST /v1/terms/consents/:consentId/verify` ile kaydın sonradan değiştirilmediğini matematiksel olarak kanıtlayabilirsiniz.

---

## 1. Yayındaki Sözleşme Şablonlarını Listele

* **Uç Nokta:** `GET /v1/terms`
* **Başlıklar:** `x-avcicms-client`, `x-avcicms-language` (opsiyonel)

---

## 2. Dinamik Sözleşme Derleme (Önizleme + SHA-256)

Şablonu gönderdiğiniz özel değişkenlerle derler ve SHA-256 içerik özetini döner.

* **Uç Nokta:** `POST /v1/terms/:slug/render`
* **Başlıklar:** `x-avcicms-client`, `x-avcicms-language` (opsiyonel)

```json title="İstek Gövdesi"
{
  "language": "tr",
  "variables": {
    "customerName": "Ayşe Yılmaz",
    "planName": "Pro Yıllık",
    "contractAmount": "14.990 TL"
  }
}
```

```json title="Yanıt (200 OK)"
{
  "status": "success",
  "data": {
    "templateId": "674...",
    "slug": "saas-hizmet-sozlesmesi",
    "key": "saas-hizmet-sozlesmesi",
    "title": "SaaS Hizmet Sözleşmesi",
    "version": 2,
    "versionLabel": "2.0",
    "language": "tr",
    "requiresReconsent": true,
    "renderedContent": "<p>İşbu sözleşme ... Ayşe Yılmaz ...</p>",
    "contentHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    "algorithm": "SHA-256"
  }
}
```

---

## 3. Kullanıcı Onayı Kaydetme (SHA-256 Kilitli)

Onay Defteri'ne değiştirilemez (append-only) bir onay kaydı ekler. Aynı `(subject.externalId, termSlug)` için önceki aktif kayıtlar silinmeden `SUPERSEDED` olarak işaretlenir.

* **Uç Nokta:** `POST /v1/terms/:slug/consents`
* **Başlıklar:** `x-avcicms-client`

```json title="İstek Gövdesi"
{
  "subject": {
    "type": "EXTERNAL",
    "externalId": "usr_987654",
    "email": "ayse@ornek.com",
    "fullName": "Ayşe Yılmaz",
    "metadata": { "app": "ios-v3.2" }
  },
  "variables": {
    "customerName": "Ayşe Yılmaz",
    "planName": "Pro Yıllık",
    "contractAmount": "14.990 TL"
  },
  "expectedContentHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "generatePdf": false
}
```

* PDF arşivi (`evidence.pdfUrl`) oluşturmak isterseniz `"generatePdf": true` gönderin. Varsayılan `false` değeri, yüksek trafikli API onaylarında maksimum hız sağlarken tam HTML snapshot ve SHA-256 kanıtını eksiksiz saklar.

---

## 4. Kullanıcı Onay Durumu Sorgulama (Yeniden Onay Kontrolü)

Bir kullanıcının bir veya birden fazla sözleşmenin güncel sürümünü onaylayıp onaylamadığını kontrol eder — giriş veya ödeme öncesi kontroller için idealdir.

* **Uç Nokta:** `GET /v1/terms/consents/status?externalId=usr_987654&slugs=kvkk,saas-hizmet-sozlesmesi`
* **Başlıklar:** `x-avcicms-client`

---

## 5. SHA-256 Bütünlük Doğrulama

Saklanan `renderedContent` ve kanıt alanlarından `contentHash` ile `proofHash` değerlerini yeniden hesaplayarak kayıtlı SHA-256 özetleriyle karşılaştırır.

* **Uç Nokta:** `POST /v1/terms/consents/:consentId/verify`
* **Gövde (opsiyonel):** `{ "hash": "<beklenen-sha256-ozeti>" }`

---

## 6. Onay İptali / Rıza Geri Çekme (KVKK & GDPR)

Tarihsel denetim izini silmeden onay kaydını `REVOKED` olarak işaretler.

* **Uç Nokta:** `POST /v1/terms/consents/:consentId/revoke`
* **Gövde (opsiyonel):** `{ "reason": "Kullanıcı açık rızasını geri çekti" }`

---

## Yönetim Paneli & Onay Defteri

**PRO ve üzeri** paketlerde **Sözleşmeler (`TERMS`)** aracını etkinleştirerek **Araçlar → Sözleşmeler** (`/tools/terms`) altından tüm süreci yönetebilirsiniz:
- **Sözleşme Şablonları:** Zengin metin editörü, Handlebars değişkenleri, çok dilli çeviriler, versiyon karşılaştırma (diff) ve ek belgeler.
- **Onay Kayıtları (SHA-256):** Özne ID, e-posta, sözleşme veya SHA-256 hash ile arama; `ACTIVE` / `REVOKED` / `SUPERSEDED` filtreleme; tek tıkla canlı SHA-256 doğrulama ve onay anındaki tam HTML snapshot önizleme.
