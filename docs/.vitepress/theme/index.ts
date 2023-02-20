import { Theme as ThemeType } from 'vitepress'
import 'vangle/dist/style.css'
import Vangle from 'vangle'
import { Puzzle, Lottery } from '../../../src/components'
// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default/index.js'

const themeConfig: ThemeType = {
  ...Theme,
  enhanceApp: ({ app }) => {
    app.use(Vangle)
    app.component('Puzzle', Puzzle)
    app.component('Lottery', Lottery)
  }
}

export default themeConfig