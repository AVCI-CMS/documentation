# AVCI CMS Documentation 📚

This repository contains the official documentation for **[AVCI CMS](https://avcicms.com)**, a next-generation, flexible, high-performance, and SEO-focused headless content management system. 

The live documentation is available at **[doc.avcicms.com](https://doc.avcicms.com)**.

## 🚀 Getting Started

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

### Prerequisites

- Node.js (version 18.0 or above)
- npm or yarn

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/AVCI-CMS/documentation.git
cd documentation
npm install
```

### Local Development

To start the local development server:

```bash
npm start
```
This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

> **Note on Languages:** By default, `npm start` runs the primary language (Turkish). To view and edit the English version locally, run:
> ```bash
> npm start -- --locale en
> ```

### Build

To build the static files for production (both TR and EN locales):

```bash
npm run build
```

You can test the production build locally by running:

```bash
npm run serve
```

## ✍️ Contributing

We welcome contributions to improve the AVCI CMS documentation! 

Since this project supports multiple languages (Turkish and English), please follow the file structure when contributing:

- **Turkish (Default):** Edit files located in the `docs/` directory.
- **English:** Edit files located in the `i18n/en/docusaurus-plugin-content-docs/current/` directory.

### Quick Links
- [Guides](/docs/guides)
- [API Reference](/docs/api)
- [SDKs](/docs/sdk)

## 🤝 Community & Support

- [Help Center](https://avcicms.com/resources/help-center)
- [AVCI CMS Website](https://avcicms.com)

## 📄 License

This documentation is licensed under the MIT License.
