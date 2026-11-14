---
id: media
title: Media & Image Transformation
sidebar_position: 5
---

# Media & Dynamic Image Transformation (`resizeonfly`)

AVCI CMS features a high-performance, on-the-fly image processing and delivery engine powered by libvips/Sharp. Images are stored once as pristine master files in Cloud Storage / disk and dynamically resized, cropped, compressed, and converted into modern formats (WebP, AVIF) at request time.

Every transformed image is served with long-term immutable caching headers (`Cache-Control: public, max-age=31536000, immutable`), making it fully CDN-ready and ultra-fast for edge delivery across web and mobile storefronts.

---

## 1. On-The-Fly Image Resizing (`resizeonfly`)

Dynamically transforms and streams the requested image according to dimensions, format, and quality parameters.

*   **Endpoint:** `GET /v1/:tenant/images/:type/:filename`
*   **Authentication:** Public (No authorization token required)
*   **CORS Support:** `Cross-Origin-Resource-Policy: cross-origin` and `Access-Control-Allow-Origin: *`

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `tenant` | String | Workspace tenant slug or project identifier (e.g. `avci`, `my-store`). |
| `type` | String | Module category of the asset (`product`, `blog`, `avatar`, `cover`, `event`, `general`). |
| `filename` | String | Unique filename with extension stored in the CMS (e.g. `shoe-01.jpg`). |

### Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `w` | Number | - | Target width in pixels (e.g. `?w=400`). If height is omitted, aspect ratio is preserved. |
| `h` | Number | - | Target height in pixels (e.g. `?h=300`). If width is omitted, aspect ratio is preserved. |
| `q` | Number | `85` | Compression quality between `1` and `100`. |
| `f` | String | `auto` | Target format: `webp`, `avif`, `jpeg`, `png`, or `auto`. When `auto`, format is negotiated based on client `Accept` header. |
| `fit` | String | `inside` | Resize fitting strategy: `inside` (default), `cover`, `contain`, `fill`, `outside`. |
| `auto` | Boolean | `false` | When set to `true` (or when no dimensions are supplied), the engine detects mobile/desktop user-agent and auto-scales width and quality. |

### Fitting Modes (`fit`)

*   `inside` *(Default)*: Preserves aspect ratio and scales image to be as large as possible while staying within the specified bounding box.
*   `cover`: Crops to fill the exact `w` and `h` dimensions, cropping overflow edges (ideal for uniform product cards and hero banners).
*   `contain`: Embeds the image within `w` and `h`, leaving empty space around the image if ratios differ.
*   `fill`: Stretches image to exactly match `w` and `h` without respecting aspect ratio.

---

## 2. Common URL Examples

#### Product Card Thumbnail (300px WebP)
```http
GET /v1/acme-store/images/product/sneaker-black.jpg?w=300&f=webp
```

#### Hero Banner with Fixed Crop (1200x514px 21:9 Cover)
```http
GET /v1/acme-store/images/cover/festival-hero.jpg?w=1200&h=514&fit=cover&f=webp&q=90
```

#### Avatar Square Crop (160x160px)
```http
GET /v1/acme-store/images/avatar/user-42.jpg?w=160&h=160&fit=cover&f=webp
```

#### Device-Adaptive Automatic Optimization
```http
GET /v1/acme-store/images/blog/article-header.jpg?auto=true
```

---

## 3. Global Workspace Assets (Logo & Favicon)

Direct convenience endpoints to fetch the active tenant's brand identity. These endpoints accept the exact same transformation query parameters (`w`, `h`, `f`, `q`).

### Get Tenant Logo
*   **Endpoint:** `GET /v1/logo` or `GET /v1/logo/:tenant/:filename`
*   **Example:** `GET /v1/logo?w=200&f=webp`

### Get Tenant Favicon
*   **Endpoint:** `GET /v1/favicon` or `GET /v1/favicon/:tenant/:filename`
*   **Example:** `GET /v1/favicon?w=64&h=64`

---

## 4. HTTP Response Headers

Every successful image response returns with optimization and caching metadata:

| Header | Example Value | Description |
| :--- | :--- | :--- |
| `Content-Type` | `image/webp` | MIME type of the transformed image. |
| `Cache-Control` | `public, max-age=31536000, immutable` | Tells CDNs and browsers to cache the asset indefinitely for 1 year. |
| `X-Image-Width` | `400` | Exact rendered width in pixels. |
| `X-Image-Height` | `300` | Exact rendered height in pixels. |
| `Content-Length` | `24580` | Size of the streamed buffer in bytes. |

---

## 5. Frontend & Next.js Integration

### Using the Frontend Helper
The `@avci/sdk` and Next.js frontend utility `getImageUrl(path, width)` automatically appends the optimal `?w=` query parameter:

```typescript
import { getImageUrl } from '@/lib/utils/image';

// Produces: https://api.avcicms.com/v1/images/product/item.jpg?w=400
const optimizedUrl = getImageUrl('/product/item.jpg', 400);
```

### Next.js `<Image>` Custom Loader
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
      alt="Product Hero"
      width={800}
      height={600}
      priority
    />
  );
}
```
