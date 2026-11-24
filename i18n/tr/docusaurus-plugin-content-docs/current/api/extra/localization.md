---
id: localization
title: Çoklu Dil ve Yerelleştirme (Localization)
sidebar_position: 4
---

# Çoklu Dil ve Yerelleştirme (Localization)

AVCI CMS, **içerik dilini** (çok dilli katalog, CMS içerikleri ve ilişki kayıtları) **UI / sistem dilinden** (yerelleştirilmiş API hata ve doğrulama mesajları) kesin olarak ayırır.

---

## İki Farklı Dil Kavramı

| Kavram | Amaç | Taşıyıcı | Örnek Değerler |
| :--- | :--- | :--- | :--- |
| **İçerik Dili** | Katalog, CMS içeriği veya ilişki kayıtlarının hangi dildeki çevirisinin okunacağını / yazılacağını belirler | `x-avci-language` header (veya `?language=` / `?lang=` query parametresi) | `tr`, `en`, `tr-TR`, `en-US` |
| **UI / Hata Dili** | Backend `i18next` hata ve doğrulama mesajlarının dilini belirler | `Accept-Language` HTTP header | `tr`, `en` |

:::info Önemli Ayrım
`Accept-Language` başlığı **asla** içerik dili olarak kullanılmaz. Çok dilli içerik okurken veya güncellerken her zaman `x-avci-language` header'ını (veya `?language=` / `?lang=` parametresini) kullanın.
:::

---

## İçerik Dili Çözümleme Önceliği

Gelen her API isteği merkezi `contentLanguageResolver` middleware'inden aşağıdaki öncelik sırasıyla geçer:

1. **Query Parametresi (`?language=` veya `?lang=`)** — CDN veya edge cache arkasındaki **Public GET** istekleri için önerilir; dil bilgisi doğrudan URL cache anahtarına dahil olur.
2. **Resmi Header (`x-avci-language`)** — Yönetim (Management) API'leri, SDK istekleri ve yazma işlemleri (`POST`, `PUT`, `PATCH`) için tek resmi standarttır.
3. **Workspace Varsayılan Dili** — Query parametresi veya `x-avci-language` header'ı gönderilmediğinde otomatik kullanılır.

---

## Dil Kodu Normalizasyonu

AVCI CMS hem **ISO-2** (`tr`, `en`, `de`) hem **BCP-47** (`tr-TR`, `en-US`, `de-DE`) formatlarını destekler:

- Değerler otomatik normalize edilir (örn. `tr_tr` → `tr-TR`, `EN` → `en`).
- Çeviri eşleştirmesi temel ISO-2 kodu üzerinden yapılır (`tr` ile `tr-TR`, `en` ile `en-US` eşleşir). Böylece farklı istemciler arasında mükerrer veya kayıp çeviri oluşmaz.

---

## İstek Örnekleri

### 1. Public API (CDN Uyumlu Query Parametresi)

```bash
curl -X GET "https://api.avcicms.com/v1/catalog/product?language=en" \
  -H "x-avci-client: <Workspace-Client-ID>" \
  -H "Accept-Language: tr"
```

### 2. Resmi Header (`x-avci-language`)

```bash
curl -X GET "https://api.avcicms.com/v1/blog" \
  -H "x-avci-client: <Workspace-Client-ID>" \
  -H "x-avci-language: en-US" \
  -H "Accept-Language: tr"
```

### 3. TypeScript SDK (`@avci/sdk`)

```typescript
import { AvciCMS, CONTENT_LANGUAGE_HEADER } from 'avcicms';

const cms = new AvciCMS({
  apiKey: process.env.AVCI_API_KEY!,
  clientId: process.env.AVCI_CLIENT_ID!,
  language: 'en', // Her istekte otomatik olarak `x-avci-language: en` gönderir
});
```

---

## Çoklu Dil Destekleyen Modüller

`x-avci-language` / `?language=` standardı tüm çok dilli modüllerde ortak çalışır:

- **Katalog:** Ürünler, Etkinlikler, Projeler, Kampanyalar, Kuponlar
- **İçerik:** Blog, Haberler, Sayfalar, Sözlük, Ekip Üyeleri
- **İlişkiler:** Markalar, Satıcılar, Organizasyonlar, Mekanlar
- **Sözleşmeler:** Sözleşme & İlişki Sözleşmesi Önizlemeleri
