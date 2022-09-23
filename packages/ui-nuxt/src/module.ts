import { defineNuxtModule } from '@nuxt/kit'
import defaultTheme from 'tailwindcss/defaultTheme'

export interface ModuleOptions {
}

const coreDistPath = require.resolve('ui-core').replace('index.ts', 'dist')

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'dw-ui',
    configKey: 'dwUi'
  },
  hooks: {
    // inject components
    'components:dirs': (dirs) => {
      console.log(require.resolve('ui-core').replace('index.ts', 'dist/runtime/components'))
      dirs.push({
        path: coreDistPath.replace('dist', 'dist/runtime/components'),
        global: true
      })
    }
  },
  setup (moduleOptions, nuxt) {
    nuxt.options.app.head.link.push({
      rel: 'stylesheet',
      href: 'https://rsms.me/inter/inter.css'
    })

    // @ts-ignore - Module might not exist
    nuxt.hook('tailwindcss:config', function (config) {
      config.theme.extend.fontFamily = {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }

      config.content.push(coreDistPath.replace('dist', 'dist/runtime/components/**/*.{vue,js,ts,mjs}'))
      config.content.push(coreDistPath.replace('dist', 'dist/runtime/utils/config.mjs'))
    })
  }
})
