import { Config } from '@vunix/core'
import { defineNuxtModule, installModule, addComponentsDir, resolvePath, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  forms?: any,
  darkMode?: any // Selector use to detect dark mode
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

    // TODO: make this generic according to preset type
    installModule('@vunix/nuxt-tailwind')

    addPlugin(resolve('./runtime/plugin'))
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
