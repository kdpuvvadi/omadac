// @ts-check
// See https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OmadaC',
  tagline: 'Deploy Omada Controller',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://omadac.puvvadi.me',
  baseUrl: '/',

  organizationName: 'kdpuvvadi',
  projectName: 'omadac',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/kdpuvvadi/omadac/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'OmadaC',
        logo: {
          alt: 'OmadaC Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://blog.puvvadi.me',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://github.com/kdpuvvadi/omadaC',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://twitter.com/kdpuvvadi/',
            label: 'Twitter',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} OmadaC   <a href='https://github.com/kdpuvvadi' target='_blank'>kdpuvvadi</a> and <a href='/docs/contributors'>contributors</a>.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
