---
id: custom-form
title: Özel Formlar (Custom Form)
sidebar_position: 2
---

# Özel Form İşlemleri (Custom Form)

AVCI CMS panelinden kodlama bilmeden oluşturulan "İş Başvuru Formu", "Müşteri Memnuniyet Anketi", "Bayilik Başvurusu" gibi dinamik form alanlarını Frontend tarafında çizmek ve kullanıcılardan veri toplamak için kullanılır.

Tüm isteklerde `x-avci-client` kimlik başlığının gönderilmesi **zorunludur**.

---

## 1. Form Yapısını (Schema) Getirme

Form ID'sini kullanarak formun başlığını, açıklamasını ve ekrana hangi inputları (Metin kutusu, SelectBox, Çoklu seçim, Dosya yükleme) çizeceğinize dair JSON şemasını getirir.

*   **Endpoint:** `GET /customForm/:formId`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Yanıtı:**
```json
{
  "status": "success",
  "data": {
    "title": "Bayilik Başvuru Formu",
    "fields": [
      {
        "type": "text",
        "name": "companyName",
        "label": "Şirket Unvanı",
        "required": true
      },
      {
        "type": "select",
        "name": "city",
        "label": "Şehir",
        "options": ["İstanbul", "Ankara", "İzmir"]
      }
    ]
  }
}
```

---

## 2. Formu Gönderme (Submit)

Kullanıcının form alanlarına doldurduğu yanıtları sisteme iletir. Gelen veri, bir üst uç noktadan alınan dinamik `fields` şemasına uygun olmalıdır.

*   **Endpoint:** `POST /customForm/submit/:formId`
*   **Auth Gereksinimi:** `x-avci-client`

**Örnek JSON Body:**
```json
{
  "companyName": "Acme Pazarlama Ltd.",
  "city": "İstanbul"
}
```

---

## 3. Daha Önce Gönderim Yaptı mı? (Has Submission)

Giriş yapmış kullanıcının "Tek Seferlik" gönderim hakkı olan bir formu veya anketi daha önceden doldurup doldurmadığını kontrol eder.

*   **Endpoint:** `GET /customForm/has-submission/:formId`
*   **Auth Gereksinimi:** `x-avci-client` ve `Authorization: Bearer <token>`
