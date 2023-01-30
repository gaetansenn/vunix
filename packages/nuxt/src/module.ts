import { Config } from '@vunix/core'
import { defineNuxtModule, installModule, addPlugin, createResolver } from '@nuxt/kit'

const coreDistPath = require.resolve('@vunix/core').replace('/index.ts.mjs', '')

export default defineNuxtModule({
  meta: {
    name: '@vunix/nuxt',
    configKey: 'vunix',
    compatibility: {
      nuxt: '>=3.0.0-rc.11'
    }
  },
  hooks: {
    // inject components
    'components:dirs': (dirs) => {
      dirs.push({
        path: coreDistPath.replace('dist', 'dist/runtime/components'),
        ignore: ['index*'],
        global: true,
        prefix: 'V',
        extensions: ['.vue'],
        pathPrefix: false
      })
    },
  },
  async setup(moduleOptions, nuxt) {
    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url)

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
        sans: ['Inter var', ...require('tailwindcss/defaultTheme').fontFamily.sans]
      }

      config.content.push(coreDistPath.replace('dist', 'dist/runtime/components/**/*.{vue,js,ts,mjs}'))
      // TODO: Inject selected preset and not all presets
      config.content.push(coreDistPath.replace('dist', 'dist/runtime/presets/**/*.{ts,mjs}'))
      config.content.push(coreDistPath.replace('dist', 'dist/runtime/utils/config.{ts,mjs}'))

      // Inject custom config
      config.content.push(`${nuxt.options.srcDir}/app.config.{ts,js}`)

      // Inject @tailwindcss/forms
      config.plugins.push(moduleOptions.forms || require('@tailwindcss/forms')({
        strategy: 'class'
      }))
    })

    addPlugin(resolve('./runtime/plugin'))

    installModule('@nuxtjs/tailwindcss')
  }
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    vunix?: {
      forms: any
    }
  }
  interface NuxtOptions {
    vunix?: {
      forms: any
    }
  }

  interface AppConfig {
    vunix?: {
      config?: Config;
      preset?: Config;
    }
  }
}
