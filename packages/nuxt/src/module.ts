import { defineNuxtModule, installModule } from '@nuxt/kit'

export interface ModuleOptions {}

console.log(require.resolve('@vunix/core'))

const coreDistPath = require.resolve('@vunix/core').replace('/vunix.umd.cjs', '')

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vunix/nuxt',
    configKey: '@vunix/nuxt',
    compatibility: {
      nuxt: '>=3.0.0-rc.11'
    }
  },
  hooks: {
    // inject components
    'components:dirs': (dirs) => {
      dirs.push({
        path: coreDistPath.replace('dist', 'dist/components'),
        ignore: ['index*'],
        global: true,
        prefix: 'Dw',
        pathPrefix: false
      })
    },
  },
  setup (moduleOptions, nuxt) {
    nuxt.hook('build:before', () => {
      nuxt.options.build.transpile.push('@heroicons/vue')
    })
    nuxt.options.app.head.link?.push({
      rel: 'stylesheet',
      href: 'https://rsms.me/inter/inter.css'
    })

    // @ts-ignore - Module might not exist
    nuxt.hook('tailwindcss:config', function (config) {
      config.theme.extend.fontFamily = {
        sans: ['Inter var', require('tailwindcss/defaultTheme').fontFamily.sans]
      }

      config.content.push(coreDistPath.replace('dist', 'dist/components/**/*.{vue,js,ts,mjs}'))
      config.content.push(coreDistPath.replace('dist', 'dist/utils/config.{ts,mjs}'))
    })

    installModule('@nuxtjs/tailwindcss')
  }
})
