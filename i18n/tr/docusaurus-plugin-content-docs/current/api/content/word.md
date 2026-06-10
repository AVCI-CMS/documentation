---
id: word
title: Sözlük / Kelimeler (Word)
sidebar_position: 4
---

# Sözlük ve Terimler (Word)

Bilgi bankası, teknik terimler sözlüğü veya platforma özel lügat alanları oluşturmak için kullanılan modüldür. "SEO odaklı sözlük (Dictionary)" projeleri için tasarlanmıştır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Kelimeleri Listeleme (List Words)

Sözlükteki tüm kelimeleri sayfalama veya baş harflerine göre (A-Z) filtreleme mantığıyla listeler.

*   **Endpoint:** `GET /dictionary`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `search` | String | Terim aramak için kullanılır (Örn: `search=Kripto`). |

---

## 2. Kelime Detayı (Word Details)

Slug değeri üzerinden belirli bir kelimenin, terimin veya kısaltmanın kapsamlı ansiklopedik/sözlük açıklamasını getirir.

*   **Endpoint:** `GET /dictionary/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "id": "wrd_123",
    "slug": "api-nedir",
    "term": "API",
    "definition": "<p>Application Programming Interface...</p>",
    "relatedTerms": [
      { "term": "REST", "slug": "rest-nedir" }
    ]
  }
}
```
