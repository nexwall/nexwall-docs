import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// PR previews are published under a sub path, everything else at the root
const baseUrl = process.env.BASE_URL || '/'

const config: Config = {
  title: 'Nexwall Firewall Documentation',
  tagline: 'Administration guide for Nexwall Firewall',
  favicon: 'img/favicon.svg',
  url: 'https://docs.nexwall.com.br',
  baseUrl,
  organizationName: 'nexwall',
  projectName: 'nexwall-docs',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: { onBrokenMarkdownLinks: 'throw' }
  },
  future: { v4: true, faster: true },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR', 'es'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en' },
      'pt-BR': { label: 'Português (Brasil)', htmlLang: 'pt-BR' },
      es: { label: 'Español', htmlLang: 'es' }
    }
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/nexwall/nexwall-docs/tree/main/'
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    colorMode: { defaultMode: 'light', respectPrefersColorScheme: true },
    navbar: {
      title: 'NEXWALL',
      items: [
        { type: 'docSidebar', sidebarId: 'manual', position: 'left', label: 'Administration guide' },
        { type: 'docSidebar', sidebarId: 'help', position: 'left', label: 'Help' },
        { type: 'localeDropdown', position: 'right' },
        { href: 'https://github.com/nexwall/nexwall-docs', label: 'GitHub', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting started', to: '/docs/getting-started/overview' },
            { label: 'Installation', to: '/docs/installation/requirements-and-images' },
            { label: 'Troubleshooting', to: '/docs/help/troubleshooting' }
          ]
        },
        {
          title: 'Nexwall',
          items: [
            { label: 'Website', href: 'https://nexwall.com.br' },
            { label: 'Support', href: 'https://support.nexwall.com.br' }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Nexwall. Documentation licensed under CC BY-NC 4.0.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'ini']
    }
  } satisfies Preset.ThemeConfig
}

export default config
