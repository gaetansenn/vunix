import { Config } from '@vunix/core'
import { defineNuxtModule, installModule, resolvePath, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  colors: boolean,
  darkMode?: any // Selector use to detect dark mode
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vunix/nuxt-tailwind',
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

      // Handle dark mode
      config.darkMode = moduleOptions.darkMode === false ? '' : moduleOptions.darkMode

      // // Handle tailwind colors injection
      // if (moduleOptions.colors) {
      //   // Inject dynamic colors plugin
      //   config.plugins.push(require('@vunix/tailwind-variant-colors').plugin(moduleOptions.colors !== true ? moduleOptions.colors : []))
      // }

      // Inject @tailwindcss/forms
      // TODO: use dynamic import to inject tailwindcss/forms
      // config.plugins.push(moduleOptions.forms || require('@tailwindcss/forms')({
      //   strategy: 'base'
      // }))
    })

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
