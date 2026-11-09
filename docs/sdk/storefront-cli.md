---
id: storefront-cli
title: Storefront CLI
sidebar_position: 3
---

# Storefront CLI (`create-avcicms-app`)

The `create-avcicms-app` CLI tool is the fastest way to bootstrap modern web applications powered by AVCI CMS. It downloads tested templates, injects environment credentials, and configures styling in seconds.

---

## Quickstart

Run the CLI in your terminal:

```bash
npx create-avcicms-app@latest
```

Alternatively, pass your target project folder name directly:

```bash
npx create-avcicms-app@latest my-ecommerce-store
```

---

## Interactive Wizard Steps

1. **Project Directory:** Enter the target directory name (e.g. `my-store`).
2. **Template Selection:** Select the boilerplate tailored to your business model:
   * **B2C Storefront (Recommended):** Full e-commerce storefront with product grids, filters, variant selectors, cart drawers, and checkout redirection.
   * **Event & Ticket Showcase:** Event schedules, venue maps, and booking flows.
   * **Headless Blog & Media:** High-performance Jamstack blog with search and newsletter subscription.
   * **Blank Starter:** Minimalist setup with the SDK and Tailwind CSS configured.
3. **API Credentials:** The wizard will prompt you to paste:
   * **AVCI Project ID**
   * **AVCI API Key**
4. **Automated Setup:** The CLI clones the template, generates `.env.local` with your credentials, and executes `npm install`.

---

## Running Your Storefront

After installation finishes, navigate into your directory and start the local development server:

```bash
cd my-ecommerce-store
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore your live storefront connected to your AVCI CMS catalog.

