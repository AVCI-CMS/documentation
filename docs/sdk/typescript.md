---
id: typescript
title: TypeScript SDK
sidebar_position: 2
---

# TypeScript SDK Guide

The official TypeScript SDK (`avcicms`) provides a type-safe, lightweight, and modern developer experience for integrating AVCI CMS into web applications and mobile apps.

---

## Installation

Install the package via your preferred package manager:

```bash
npm install avcicms
# or
yarn add avcicms
# or
pnpm add avcicms
```

---

## Initialization

Initialize the client with your credentials obtained from **Workspace > Settings > API Keys**:

```typescript
import { AvciCMS } from 'avcicms';

export const cms = new AvciCMS({
  apiKey: process.env.AVCI_API_KEY!,
  projectId: process.env.AVCI_PROJECT_ID!,
  // Optional custom environment: 'production' | 'staging'
});
```

---

## Common Use Cases

### 1. Listing Catalog Products with Filters

```typescript
// Fetch active physical products with category filter
const products = await cms.content.findMany('products', {
  filter: {
    status: 'published',
    category: 'electronics',
  },
  limit: 20,
  page: 1,
});

console.log(`Found ${products.total} products:`, products.items);
```

### 2. Fetching a Single Product by Slug

```typescript
const product = await cms.content.findOne('products', {
  slug: 'minimalist-leather-backpack',
});

if (!product) {
  throw new Error('Product not found');
}

console.log(product.name, product.price);
```

### 3. Submitting a Contact Form

```typescript
await cms.content.create('contact-form', {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Wholesale Inquiry',
  message: 'Hello, we would like to order in bulk.',
});
```

### 4. Headless Müşteri İadesi (RMA) & Kargo Takibi

Storefront müşterileri sipariş iadelerini headless olarak başlatabilir ve anlaşmalı kargo kodunu sorgulayabilir:

```typescript
// İade talebi oluşturma
const returnRequest = await cms.shipment.requestReturn({
  subOrderId: 'SUB-2026-98124',
  reason: 'Beden uymadı',
  note: 'Paket hiç açılmadı.',
});

// İade durumu ve kargo iade kodunu sorgulama
const returnStatus = await cms.shipment.getReturnStatus('SUB-2026-98124');
console.log(returnStatus.data.returnTrackingNumber);
```

---

## Framework Integration (Next.js 15 App Router)

When using the SDK in Next.js Server Components, leverage standard Next.js data-fetching and revalidation:

```typescript
// app/products/[slug]/page.tsx
import { cms } from '@/lib/cms';
import { notFound } from 'next/navigation';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await cms.content.findOne('products', { slug });

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl text-gray-700 mt-2">${product.price}</p>
      <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: product.description }} />
    </main>
  );
}
```

