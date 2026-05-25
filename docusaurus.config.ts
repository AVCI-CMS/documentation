import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AVCI CMS',
  tagline: 'AVCI CMS Documentation',
  favicon: 'img/AVCI-cms-icon.png',

  // Removed future v4 flag for plugin compatibility

  // Set the production url of your site here
  url: 'https://doc.avcicms.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AVCI-CMS', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['tr', 'en'],
  },

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "tr"],
        docsRouteBasePath: "/",
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'AVCI-CMS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sdkSidebar',
          position: 'left',
          label: 'SDK',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: 'AVCI-CMS Logo',
        src: 'img/logo.svg',
        href: 'https://avcicms.com',
        width: 140,
      },
      links: [
        {
          title: 'Şirket',
          items: [
            { label: 'Hakkımızda', href: 'https://avcicms.com/company/about-us' },
            { label: 'Kariyer', href: 'https://avcicms.com/company/careers' },
            { label: 'Basın', href: 'https://avcicms.com/company/press' },
            { label: 'İş Ortakları', href: 'https://avcicms.com/company/partners' },
            { label: 'İletişim', href: 'https://avcicms.com/company/contact-us' },
          ],
        },
        {
          title: 'Özellikler',
          items: [
            { label: 'Pazarlama', href: 'https://avcicms.com/features/marketing' },
            { label: 'White Label', href: 'https://avcicms.com/features/white-label' },
            { label: 'Analitik', href: 'https://avcicms.com/features/analytics' },
            { label: 'SEO & LLM Optimizasyonu', href: 'https://avcicms.com/features/seo-llm-optimization' },
            { label: 'Görsel Optimizasyonu', href: 'https://avcicms.com/features/image-optimization' },
            { label: 'Üye Yönetimi', href: 'https://avcicms.com/features/member-management' },
          ],
        },
        {
          title: 'Kaynaklar',
          items: [
            { label: 'Blog', href: 'https://avcicms.com/resources/blog' },
            { label: 'Yardım Merkezi', href: 'https://avcicms.com/resources/help-center' },
            { label: 'Eğitimler', href: 'https://avcicms.com/resources/tutorials' },
            { label: 'Müşteri Hikayeleri', href: 'https://avcicms.com/resources/client-stories' },
          ],
        },
        {
          title: 'Geliştiriciler',
          items: [
            { label: 'Dokümantasyon', to: '/' },
            { label: 'API', to: '/api' },
            { label: 'SDK', to: '/sdk' },
            { label: 'Topluluk', href: 'https://avcicms.com/developers/community' },
            { label: 'GitHub', href: 'https://github.com/avcicms' },
          ],
        },
        {
          title: 'Yasal',
          items: [
            { label: 'Çerez Politikası', href: 'https://avcicms.com/legal/cerez-politikasi' },
            { label: 'Gizlilik ve KVKK', href: 'https://avcicms.com/legal/gizlilik-politikasi-ve-kvkk-aydinlatma-metni' },
            { label: 'İptal ve İade Koşulları', href: 'https://avcicms.com/legal/iptal-ve-iade-kosullari' },
            { label: 'Kullanım Koşulları', href: 'https://avcicms.com/legal/kullanim-kosullari' },
            { label: 'Mesafeli Satış Sözleşmesi', href: 'https://avcicms.com/legal/mesafeli-satis-sozlesmesi' },
          ],
        },
      ],
      copyright: `
        <div class="footer-bottom">
          <div class="footer-copyright">Copyright © ${new Date().getFullYear()} AVCI CMS. Built with Docusaurus.</div>
          <div class="footer-socials">
            <a href="https://instagram.com/avcicms" target="_blank" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://twitter.com/avcicms" target="_blank" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://linkedin.com/company/avcicms" target="_blank" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://youtube.com/avcicms" target="_blank" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
