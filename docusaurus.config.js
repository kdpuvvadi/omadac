const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OmadaC',
  tagline: 'Deploy Omada Controller',
  url: 'https://omadac.puvvadi.me/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  organizationName: 'kdpuvvadi',
  projectName: 'omadac',

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
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/kdpuvvadi/omadac',
        },
        blog: {
          showReadingTime: false,
          editUrl:
          'https://github.com/kdpuvvadi/omadac',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'OmadaC',
        logo: {
          alt: 'OmadaC Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            to: 'https://blog.puvvadi.me', 
            label: 'Blog', 
            position: 'left'},
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
        // links: [
        //   {
        //     title: 'Docs',
        //     items: [
        //       {
        //         label: 'Tutorial',
        //         to: '/docs/intro',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Community',
        //     items: [
        //       // {
        //       //   label: 'Stack Overflow',
        //       //   href: 'https://stackoverflow.com/questions/tagged/kdpuvvadi',
        //       // },
        //       // {
        //       //   label: 'Discord',
        //       //   href: 'https://discordapp.com/invite/kdpuvvadi',
        //       // },
        //       {
        //         label: 'Twitter',
        //         href: 'https://twitter.com/kdpuvvadi',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       // {
        //       //   label: 'Blog',
        //       //   to: '/blog',
        //       // },
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/kdpuvvadi/',
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} OmadaC   <a href='https://github.com/kdpuvvadi' target='_blank'>kdpuvvadi</a> and <a href='/docs/contributors'>contributors</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
