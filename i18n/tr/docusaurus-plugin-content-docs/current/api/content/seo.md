---
id: seo
title: SEO Yönetimi (Global SEO)
sidebar_position: 6
---

# Dinamik SEO Yönetimi

AVCI CMS, uygulamanızın Next.js veya Nuxt.js gibi SSR (Server Side Rendering) altyapısında render edilirken ihtiyaç duyduğu `<title>`, `<meta>` ve `<link>` etiketlerinin tümünü dinamik olarak sağlayan güçlü bir SEO servisine sahiptir.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Global / Varsayılan SEO Verisi

Eğer bulunduğunuz sayfanın (Örn: Ana Sayfa) spesifik bir SEO verisi yoksa, tüm Workspace (Tenant) için tanımlanmış olan "Varsayılan" (Fallback) SEO verilerini getirir.

*   **Endpoint:** `GET /seo/`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "metaTitle": "AVCI CMS | Modern Yönetim",
    "metaDescription": "Türkiye'nin en gelişmiş Headless e-Ticaret Altyapısı.",
    "ogImage": "https://cdn.avcicms.com/og-default.jpg"
  }
}
```

---

## 2. Modül Bazlı Detay SEO Verisi

Belirli bir ürünün, haberin veya blog yazısının spesifik SEO başlık ve açıklamalarını getirir. Bu uç noktalar, ilgili modüllerin kendi detay uç noktalarından da çekilebileceği gibi, SSR tarafında sayfalar render edilirken sadece SEO verisine ihtiyaç duyulduğunda performansı artırmak için **bağımsız SEO rotalarından** da çekilebilir.

Kullanılabilir modüller ve SEO uç noktaları aşağıdadır:

*   **Ürün SEO:** `GET /seo/product/:slug`
*   **Etkinlik SEO:** `GET /seo/event/:slug`
*   **Proje SEO:** `GET /seo/project/:slug`
*   **Blog SEO:** `GET /seo/blog/:slug`
*   **Haber SEO:** `GET /seo/news/:slug`
*   **Sayfa SEO:** `GET /seo/page/:slug`
*   **Sözlük (Word) SEO:** `GET /seo/word/:slug`

---

## 3. Listeleme / Arşiv Sayfaları SEO Verisi

Sadece detay sayfalarının değil, listeleme sayfalarının da (Örn: `/urunler` sayfası, `/blog` ana sayfası) kendilerine has SEO ayarları vardır.

*   **Ürün Listesi SEO:** `GET /seo/product`
*   **Blog Listesi SEO:** `GET /seo/blog`
*   **Haber Listesi SEO:** `GET /seo/news`
*   **Sayfalar Listesi SEO:** `GET /seo/page`

---

## 4. Marka, Satıcı ve Lokasyon SEO

Pazar yeri satıcılarının veya markaların özel profillerinin SEO verileri:

*   **Satıcı SEO:** `GET /seo/merchant/:slug` (Listesi: `GET /seo/merchant`)
*   **Marka SEO:** `GET /seo/brand/:slug` (Listesi: `GET /seo/brand`)
*   **Mekan SEO:** `GET /seo/place/:slug` (Listesi: `GET /seo/place`)
*   **Organizasyon SEO:** `GET /seo/organization/:slug`

---

## 5. Ortak Gruplandırmalar SEO

Kategoriler ve Koleksiyonlar için dinamik SEO çekimi (Bağlı olduğu türün bilgisiyle birlikte):

*   **Kategori SEO:** `GET /seo/category/:type/:slug`
*   **Grup SEO:** `GET /seo/group/:type/:slug`
*   **Koleksiyon SEO:** `GET /seo/collection/:type/:slug`
