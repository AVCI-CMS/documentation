---
id: index
title: Public API Reference
slug: /api
sidebar_position: 1
---

# AVCI CMS Public API

AVCI CMS provides a comprehensive and powerful **Public API** network, allowing developers to build their e-commerce storefronts, mobile applications, B2B portals, and marketplaces with 100% freedom using a Headless architecture.

## What is Headless Architecture?

In the AVCI CMS backend architecture, each module and service is perfectly isolated into **Public** and **Private (Management)** scopes.

*   `Private API:` These are the APIs serving only the CMS management panel and authorized admin users, where you manage critical configurations.
*   `Public API:` These are the APIs directly accessed by your end-users (customers) via your mobile app or e-commerce website to list products, add items to the cart, and process checkouts.

In this section, you will find the **Public API** capabilities and endpoints.

## API Organization

Our API reference is categorized into the following massive modules and services based on business logic:

1.  **[Finance & Cart Operations (Finance)](/api/finance/basket):** Cart (Basket), payment gateways, purchasing, and invoicing operations.
2.  **[Catalog & E-commerce (Catalog)](/api/catalog/product):** Products, variants, stock statuses, campaigns, coupons, and categories.
3.  **[Relations (Relation)](/api/relation/merchant):** Merchants, brands, stores, places, and follow operations.
4.  **[Content Management (Content)](/api/content/page):** Blog posts, news, corporate pages, menus, and dictionary (translation) data.
5.  **[Communication (Communication)](/api/communication/contact-form):** Comments, support tickets, forms, FAQs, and notifications.
6.  **[Common Structures (Common)](/api/common/category):** Categories, collections, product attributes, and likes/favorites.
7.  **[Tools (Tools)](/api/tools/qrcode):** Sliders (Carousel), QR, and NFC operations.
8.  **[Extra Services (Extra)](/api/extra/pagination):** Standards, pagination structure, SEO, and Common Error Codes.

## Next Steps

To get started with the AVCI CMS API, set up the necessary HTTP Header configurations (e.g., using `x-avci-client`), and send your first request, check out our **[Getting Started](/api/getting-started)** page.
