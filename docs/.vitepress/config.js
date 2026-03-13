import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'papyrai-ui',
  description: 'Paper-style Web Components for AI applications',
  appearance: true,
  lastUpdated: true,
  cleanUrls: true,
  base: '/papyrai-ui/',  // 改为你的仓库名

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
      // Load papyrai-ui styles
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/papyrai-ui/dist/papyrai-ui.css';
      document.head.appendChild(link);
    `]
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'papyrai-ui',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/ai/thinking' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Theme', link: '/guide/theme' },
            { text: 'i18n', link: '/guide/i18n' }
          ]
        },
        {
          text: 'AI Components',
          collapsed: false,
          items: [
            { text: 'ai-thinking', link: '/components/ai/thinking' },
            { text: 'ai-stream', link: '/components/ai/stream' },
            { text: 'ai-message', link: '/components/ai/message' },
            { text: 'ai-prompt', link: '/components/ai/prompt' },
            { text: 'ai-citation', link: '/components/ai/citation' },
            { text: 'ai-tool-call', link: '/components/ai/tool-call' },
            { text: 'ai-reasoning', link: '/components/ai/reasoning' },
            { text: 'ai-feedback', link: '/components/ai/feedback' },
            { text: 'ai-guardrail', link: '/components/ai/guardrail' },
            { text: 'ai-source-card', link: '/components/ai/source-card' },
            { text: 'ai-token-usage', link: '/components/ai/token-usage' },
            { text: 'ai-confidence', link: '/components/ai/confidence' },
            { text: 'ai-diff', link: '/components/ai/diff' },
            { text: 'ai-cost', link: '/components/ai/cost' },
            { text: 'ai-hallucination', link: '/components/ai/hallucination' },
            { text: 'ai-not-found', link: '/components/ai/not-found' },
            { text: 'ai-fake-error', link: '/components/ai/fake-error' },
            { text: 'ai-model-badge', link: '/components/ai/model-badge' }
          ]
        },
        {
          text: 'Base Components',
          collapsed: false,
          items: [
            { text: 'Elements', link: '/components/base/elements' },
            { text: 'Inputs', link: '/components/base/inputs' },
            { text: 'Navigation', link: '/components/base/navigation' },
            { text: 'Overlays', link: '/components/base/overlays' },
            { text: 'Layout', link: '/components/base/layout' },
            { text: 'Data', link: '/components/base/data' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HuYaochao/papyrai-ui' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 papyrai-ui'
    },

    editLink: {
      repo: 'HuYaochao/papyrai-ui',
      docsDir: 'docs'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})
