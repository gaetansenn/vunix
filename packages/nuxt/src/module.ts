import { Config } from '@vunix/core'
import { defineNuxtModule, installModule, addComponentsDir, resolvePath, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  forms: any
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vunix/nuxt',
    configKey: 'vunix',
    compatibility: {
      nuxt: '>=3.0.0-rc.11'
    }
  },
  async setup(moduleOptions, nuxt) {
    // Create resolver to resolve relative paths within this module
    const { resolve } = createResolver(import.meta.url)

    // Create resolver to resolve dist paths within @vunix/core
    const core = createResolver(await resolvePath('@vunix/core', { cwd: import.meta.url }))

    // Register components
    addComponentsDir({
      path: core.resolve('../runtime/components'),
      ignore: ['index*'],
      global: true,
      prefix: 'V',
      extensions: ['.vue'],
      pathPrefix: false
    })

    const coreRootPath = core.resolve('..') // root dist directory
    nuxt.options.build.transpile.push('@vunix/core', '@heroicons/vue', '@vunix/rules')
    nuxt.options.build.transpile.push(coreRootPath)

    // Add alias of @vunix/core to dist directory
    nuxt.options.alias['@core'] = coreRootPath

    // TODO: make this configurable
    nuxt.options.app.head.link = nuxt.options.app.head.link || []
    nuxt.options.app.head.link.push({
      rel: 'stylesheet',
      href: 'https://rsms.me/inter/inter.css'
    })

    // @ts-ignore - Module might not exist
    nuxt.hook('tailwindcss:config', function (config) {
      config.theme.extend.fontFamily = {
        // TODO: use dynamic import and not require
        sans: ['Inter var', ...require('tailwindcss/defaultTheme').fontFamily.sans]
      }

      config.content.push(core.resolve('../runtime/components/**/*.{vue,js,ts,mjs}'))
      // TODO: Inject selected preset and not all presets
      config.content.push(core.resolve('../runtime/presets/**/*.{ts,mjs}'))
      config.content.push(core.resolve('../runtime/utils/config.{ts,mjs}'))

      // Inject custom config
      config.content.push(`${nuxt.options.srcDir}/app.config.{ts,js}`)

      // Inject @tailwindcss/forms
      // TODO: use dynamic import to inject tailwindcss/forms
      // config.plugins.push(moduleOptions.forms || require('@tailwindcss/forms')({
      //   strategy: 'base'
      // }))
    })

    addPlugin(resolve('./runtime/plugin'))

    await installModule('@nuxtjs/tailwindcss')
  }
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    vunix?: ModuleOptions
  }
  interface NuxtOptions {
    vunix?: ModuleOptions
  }

  interface AppConfig {
    vunix?: {
      config?: Config;
      preset?: Config;
    }
  }
}
