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
  language: 'tr', // Optional default content language (`x-avcicms-language` header)
});
```

> **Multi-Language Support:** When `language` is provided in `AvciCMSConfig`, the SDK automatically attaches `x-avcicms-language` to every outgoing request (without overriding any per-request `x-avcicms-language` header). See [Multi-Language & Localization](/api/extra/localization) for details.

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

### 5. Shopping Basket & Ticket Checkout Flow

```typescript
// 1. Create a shopping basket
const { data: basket } = await cms.basket.create({ currency: 'TRY' });

// 2. Add product and event tickets (with 10-minute capacity reservation)
await cms.basket.addItems(basket!.basketId, [
  { id: 'prod_123', quantity: 1, itemType: 'product' },
  { id: 'event_456', quantity: 2, itemType: 'event' }
]);

// 3. Prepare legal contracts (Distance Sale & Preliminary Info)
const { data: terms } = await cms.basket.prepareTerms(basket!.basketId);

// 4. Complete checkout with ticket attendee details
const { data: order } = await cms.order.create({
  basketId: basket!.basketId,
  paymentMethod: 'CREDIT_CARD',
  addresses: {
    shipmentAddressId: 'addr_ship_789',
    billingAddressId: 'addr_bill_789'
  },
  card: {
    cardHolderName: 'Ahmet Yılmaz',
    cardNumber: '5406670000000000',
    expireMonth: '12',
    expireYear: '2028',
    cvc: '123'
  },
  participants: [
    { basketItemId: 'item_event_slot_1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com' },
    { basketItemId: 'item_event_slot_2', name: 'Zeynep Kaya', email: 'zeynep@example.com' }
  ]
});

console.log('Order successfully placed:', order?.orderId);

// 5. Cancel order before shipment (if customer changes their mind)
const { data: cancelResult } = await cms.order.cancelOrder(order!.orderId, {
  reason: 'Selected wrong size',
  reasonCode: 'BUYER_CANCELLED'
});

// 6. Manage stored credit cards & set primary card (PCI-DSS compliant)
const { data: cards } = await cms.order.getSavedCards();
// cards[0].isPrimary === true (primary card is always sorted first)

// Designate a specific card as primary / default for 1-click checkouts
await cms.order.setPrimarySavedCard('ct_987654321');

// 7. For vendors / sellers: Cancel an unfulfilled assigned sub-order
await cms.order.cancelSubOrder('sub_ord_456', {
  reason: 'Out of stock'
});
```

### 4. User Address Book & Primary Address

```typescript
// 1. List user addresses
const addresses = await cms.user.listAddresses();

// 2. Add new address (can be set as default immediately)
const newAddress = await cms.user.addAddress({
  title: 'Home',
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  phone: '+905551234567',
  city: 'İstanbul',
  district: 'Kadıköy',
  neighborhood: 'Caferağa Mah.',
  addressLine1: 'Moda Cad. No: 15 D: 4',
  isPrimary: true // Automatically unsets primary on all other addresses
});

// 3. Update an existing address (supports addressId, id, or _id)
await cms.user.updateAddress('addr_6735be91a12e', {
  title: 'Home (Renovated)',
  isPrimary: true
});

// 4. Or switch primary address via dedicated endpoint
await cms.user.setPrimaryAddress('addr_6735be91a12e');

// 5. Delete address
await cms.user.deleteAddress('addr_6735be91a12e');
```

### 5. Artisan, Brand & Organization Self-Service Showcase Profiles

```typescript
// Fetch logged-in artisan profile (e.g., in /profil/sayfam)
const artisan = await cms.merchant.getMe();

// Update public visual branding and biography
await cms.merchant.updateMe({
  logo: 'https://cdn.example.com/logo.png',
  coverImage: 'https://cdn.example.com/cover.jpg',
  description: 'Master leather craftsman producing bespoke artisanal bags.',
  socialMedia: { instagram: 'artisan_leather' },
  attributes: { craftTechnique: 'Hand-stitched', experience: '20 years' }
});

// Similar self-profile endpoints exist for Brands and Organizations:
const brand = await cms.brand.getMe();
await cms.brand.updateMe({ description: 'Sustainable athletic apparel brand.' });

const org = await cms.organization.getMe();
await cms.organization.updateMe({ description: 'Regional Artisan Guild Federation.' });
```

### 6. Geographic Directory & Tax Administrations

```typescript
// List all 81 Turkish cities
const cities = await cms.static.listCities();

// List districts for Istanbul (cityId: 34)
const districts = await cms.static.listDistricts(34);

// List neighborhoods for Kadikoy (districtId: 450)
const neighborhoods = await cms.static.listNeighborhoods(450);

// Get tax offices for Istanbul, filtered by Kadikoy district
// Automatically normalizes city codes (1, 01, 34, 034)
const taxOffices = await cms.static.listTaxOffices(34, 'Kadıköy');
```

### 7. Corporate Team Directory

```typescript
// List public team members for the "Our Team" page
const team = await cms.team.list({ limit: 20, department: 'Executive' });

// Get team member details by slug
const member = await cms.team.getBySlug('jane-doe');
```

### 8. Physical Venues & Places Directory

```typescript
// List active physical venues filtered by region/area
const places = await cms.place.list({ area: '6735c03a9f1a2b3c4d5e6f70', limit: 10 });

// Fetch full venue profile (capacity, working hours, pricing, coordinates)
const venue = await cms.place.getBySlug('kucukciftlik-park');
console.log(venue.data.capacity?.max, venue.data.pricing?.amount);

// Fetch lightweight card for map pin or mobile preview
const pinCard = await cms.place.getShortBySlug('kucukciftlik-park');
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


---

## Dynamic Agreements & SHA-256 Consents (`cms.terms`)

Use `cms.terms` to render personalized legal agreements on the fly, collect cryptographically locked **SHA-256** user consents from any external application, check re-consent status, and verify integrity.

```typescript
// 1. Render agreement with dynamic variables & receive SHA-256 contentHash
const { data: rendered } = await cms.terms.render('saas-master-agreement', {
  language: 'en',
  variables: {
    customerName: 'Jane Doe',
    planName: 'Pro Annual',
    contractAmount: '$499.00',
  },
});

// 2. Record immutable user consent locked to expectedContentHash
const { data: consent } = await cms.terms.accept('saas-master-agreement', {
  subject: {
    type: 'EXTERNAL',
    externalId: 'usr_987654',
    email: 'jane@example.com',
    fullName: 'Jane Doe',
  },
  variables: {
    customerName: 'Jane Doe',
    planName: 'Pro Annual',
    contractAmount: '$499.00',
  },
  expectedContentHash: rendered?.contentHash,
  generatePdf: false,
});

// 3. Check if user needs to re-consent on login/checkout
const { data: status } = await cms.terms.checkStatus({
  externalId: 'usr_987654',
  slugs: ['saas-master-agreement', 'kvkk'],
});

// 4. Verify SHA-256 integrity anytime (tamper-proof audit)
const { data: verification } = await cms.terms.verify(consent!.consentId);
console.log(verification?.valid); // true
```
