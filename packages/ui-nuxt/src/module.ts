import { defineNuxtModule, installModule } from '@nuxt/kit'
import defaultTheme from 'tailwindcss/defaultTheme'

export interface ModuleOptions {
}

console.log(require.resolve('ui-core'))

const coreDistPath = require.resolve('ui-core').replace('index.ts.mjs', '')

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'ui-nuxt',
    configKey: 'ui-nuxt',
    compatibility: {
      nuxt: '>=3.0.0-rc.9'
    }
  },
  hooks: {
    // inject components
    'components:dirs': (dirs) => {
      dirs.push({
        path: coreDistPath.replace('dist', 'dist/runtime/components'),
        ignore: ['index*'],
        global: true
      })
    },
    'build:before': (nuxt, buildOptions) => {
      buildOptions.transpile.push('ui-core')
    }
  },
  setup (moduleOptions, nuxt) {
    nuxt.options.app.head.link?.push({
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

    installModule('@nuxtjs/tailwindcss')
  }
})
