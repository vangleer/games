import { UserConfig } from 'vitepress'

const isProd = process.env.NODE_ENV === 'production'
export const config: UserConfig = {
  base: isProd ? '/games/' : '',
  title: 'Games',
  description: 'Just playing around.',
  themeConfig: {
    logo: '/images/logo.png',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT vangleer and Games contributors'
    },
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vangleer' }],
    nav: [
      { text: 'Games', link: '/zh/games/puzzle' }
    ],
    sidebar: [
      {
        text: '小游戏',
        items: [
          { text: '在线拼图', link: '/zh/games/puzzle' }
        ]
      }
    ]
  }
}

export default config