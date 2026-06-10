---
id: faq
title: Sıkça Sorulan Sorular (FAQ)
sidebar_position: 8
---

# Sıkça Sorulan Sorular (FAQ) İşlemleri

Müşterilerin en çok sorduğu soruları gruplar halinde (Kargo Süreçleri, İadeler, Ödeme Yöntemleri vb.) Frontend tarafında göstermek için kullanılır. 

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Tüm SSS Listesini Getirme (List FAQs)

Sistemdeki aktif sıkça sorulan soruları, arama kelimesine göre filtreleyerek veya sayfalayarak listeler.

*   **Endpoint:** `GET /faq`
*   **Auth Gereksinimi:** `x-avci-client`

### Query Parametreleri

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `page` | Number | Sayfa numarası (Varsayılan: 1) |
| `limit` | Number | Sayfa başı kayıt sayısı (Varsayılan: 10) |
| `search` | String | Soru veya cevap metninde arama yapar. |

**TypeScript Yanıt Şeması (Response Interface):**
```typescript
export type FAQ = {
  _id: string;
  question: string;
  answer: string;
  date: string; // Date ISO
  group: {
    _id: string;
    title: string;
    slug: string;
  };
};
```

---

## 2. Gruplanmış SSS Getirme (Grouped FAQs)

Belirli bir gruba (Örn: `iade-kosullari`) ait sıkça sorulan soruları, grup detaylarıyla birlikte getirir. Akordeon (Accordion) bileşenleri çizerken sıkça kullanılır.

*   **Endpoint:** `GET /faq/:slug`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "title": "İade Koşulları",
    "slug": "iade-kosullari",
    "description": "İadelerinizle ilgili genel kurallar.",
    "questions": [
      {
        "question": "İade süresi kaç gündür?",
        "answer": "Teslimat tarihinden itibaren 14 gün içinde..."
      }
    ]
  }
}
```

**TypeScript Yanıt Şeması (Group Response Interface):**
```typescript
export type FAQGroup = {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  questions: FAQ[]; // Üstteki FAQ tipi
  parent?: string;
  children?: FAQGroup[];
};
```
