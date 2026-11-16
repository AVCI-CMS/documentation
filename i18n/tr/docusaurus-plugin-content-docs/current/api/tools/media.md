---
id: media
title: Medya ve Görsel Dönüştürme
sidebar_position: 5
---

# Medya ve Dinamik Görsel Dönüştürme (`resizeonfly`)

AVCI CMS, libvips/Sharp tabanlı yüksek performanslı bir anlık (on-the-fly) görsel işleme motoruna sahiptir. Görseller Cloud Storage veya sunucu diskinde tek bir orijinal ana dosya olarak saklanır ve istek anında istemcinin ihtiyaç duyduğu boyut, kırpma, kalite ve modern formatlara (WebP, AVIF) dönüştürülerek sunulur.

Dönüştürülen her görsel, uzun vadeli değişmez önbellek başlıklarıyla (`Cache-Control: public, max-age=31536000, immutable`) iletilir. Bu sayede CDN (İçerik Dağıtım Ağı) ve tarayıcı önbelleğinde saklanarak web ve mobil vitrinlerde milisaniyeler içinde yüklenir.

---

## 1. Anlık Görsel Boyutlandırma (`resizeonfly`)

İstenen görseli belirtilen boyut, format ve kalite parametrelerine göre dinamik olarak işler ve stream eder.

*   **Endpoint:** `GET /v1/:tenant/images/:type/:filename`
*   **Yetkilendirme:** Public (Token gerektirmez)
*   **CORS Desteği:** `Cross-Origin-Resource-Policy: cross-origin` ve `Access-Control-Allow-Origin: *`

### URL Parametreleri (Path Parameters)

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| `tenant` | String | Workspace tenant slug'ı veya proje kimliği (örn: `avci`, `magazam`). |
| `type` | String | Görselin ait olduğu modül kategorisi (`product`, `blog`, `avatar`, `cover`, `event`, `general`). |
| `filename` | String | CMS üzerinde kayıtlı benzersiz dosya adı ve uzantısı (örn: `ayakkabi-01.jpg`). |

### Sorgu Parametreleri (Query Parameters)

| Parametre | Tip | Varsayılan | Açıklama |
| :--- | :--- | :--- | :--- |
| `w` | Number | - | Hedef genişlik (piksel, örn: `?w=400`). Yükseklik belirtilmezse en-boy oranı korunur. |
| `h` | Number | - | Hedef yükseklik (piksel, örn: `?h=300`). Genişlik belirtilmezse en-boy oranı korunur. |
| `q` | Number | `85` | Sıkıştırma kalitesi (`1` ile `100` arası). |
| `f` | String | `auto` | Hedef format: `webp`, `avif`, `jpeg`, `png` veya `auto`. `auto` seçildiğinde tarayıcının `Accept` başlığına göre modern format otomatik seçilir. |
| `fit` | String | `inside` | Boyutlandırma sığdırma modu: `inside` (varsayılan), `cover`, `contain`, `fill`, `outside`. |
| `auto` | Boolean | `false` | `true` verildiğinde (veya boyut parametresi verilmediğinde) motor mobil/masaüstü cihaz tespiti yaparak genişlik ve kaliteyi otomatik optimize eder. |

### Sığdırma Modları (`fit`)

*   `inside` *(Varsayılan)*: En-boy oranını korur ve görseli belirtilen kutu sınırları içine sığacak en büyük boyuta getirir (Taşma ve bozulma yapmaz).
*   `cover`: Belirtilen `w` ve `h` alanını tamamen dolduracak şekilde kenarlardan kırpar (Özellikle ürün vitrin kartları ve kapak banner'ları için idealdir).
*   `contain`: Görseli `w` ve `h` içine tamamen sığdırır; oran farkı varsa boş kalan kenarları saydam bırakır.
*   `fill`: En-boy oranını dikkate almadan görseli tam olarak `w` ve `h` boyutlarına çeker.

---

## 2. Yaygın Kullanım Örnekleri

#### Ürün Kartı Küçük Resmi (300px WebP)
```http
GET /v1/magazam/images/product/ayakkabi-siyah.jpg?w=300&f=webp
```

#### Sabit Kırpılmış Kapak Banner'ı (1200x514px 21:9 Cover)
```http
GET /v1/magazam/images/cover/festival-kapak.jpg?w=1200&h=514&fit=cover&f=webp&q=90
```

#### Profil Avatarı Kare Kırpma (160x160px)
```http
GET /v1/magazam/images/avatar/kullanici-42.jpg?w=160&h=160&fit=cover&f=webp
```

#### Cihaza Göre Otomatik Optimizasyon
```http
GET /v1/magazam/images/blog/makale-kapagi.jpg?auto=true
```

---

## 3. Global Marka Varlıkları (Logo ve Favicon)

Kiracının marka kimliği görsellerine doğrudan erişim sağlayan uç noktalar. Standart görsel parametrelerini (`w`, `h`, `f`, `q`) birebir destekler.

### Kiracı Logosu
*   **Endpoint:** `GET /v1/logo` veya `GET /v1/logo/:tenant/:filename`
*   **Örnek:** `GET /v1/logo?w=200&f=webp`

### Kiracı Faviconu
*   **Endpoint:** `GET /v1/favicon` veya `GET /v1/favicon/:tenant/:filename`
*   **Örnek:** `GET /v1/favicon?w=64&h=64`

---

## 4. HTTP Yanıt Başlıkları

Başarılı her görsel isteği, optimizasyon ve önbellek meta verileriyle birlikte döner:

| Başlık | Örnek Değer | Açıklama |
| :--- | :--- | :--- |
| `Content-Type` | `image/webp` | Dönüştürülen görselin MIME türü. |
| `Cache-Control` | `public, max-age=31536000, immutable` | CDN ve tarayıcılara görseli 1 yıl boyunca önbellekte tutmasını bildirir. |
| `X-Image-Width` | `400` | İşlenmiş gerçek genişlik (piksel). |
| `X-Image-Height` | `300` | İşlenmiş gerçek yükseklik (piksel). |
| `Content-Length` | `24580` | Gönderilen verinin bayt cinsinden boyutu. |

---

## 5. Frontend ve Next.js Entegrasyonu

### Frontend Yardımcı Fonksiyonu
Frontend projesinde yer alan `getImageUrl(path, width)` fonksiyonu dinamik olarak `?w=` parametresini ekler:

```typescript
import { getImageUrl } from '@/lib/utils/image';

// Çıktı: https://api.avcicms.com/v1/images/product/urun.jpg?w=400
const optimizedUrl = getImageUrl('/product/urun.jpg', 400);
```

### Next.js `<Image>` Özel Loader Kullanımı
```typescript
import Image from 'next/image';

const avciImageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 85}&f=webp`;
};

export function ProductHero({ imagePath }: { imagePath: string }) {
  return (
    <Image
      loader={avciImageLoader}
      src={`https://api.avcicms.com/v1/images${imagePath}`}
      alt="Ürün Görseli"
      width={800}
      height={600}
      priority
    />
  );
}
```
