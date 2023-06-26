import { Config, PluginList, pluginPaths, defaultPlugins } from '@vunix/core'
import { defineNuxtModule, installModule, addComponentsDir, resolvePath, addPlugin, createResolver, addPluginTemplate } from '@nuxt/kit'

export interface ModuleOptions {
  forms?: any,
  darkMode?: any // Selector use to detect dark mode
}

export interface NuxtConfigModuleOptions extends ModuleOptions {
  disabledPlugins: PluginList
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
    await addComponentsDir({
      path: core.resolve('../runtime/components'),
      ignore: ['index*'],
      global: true,
      prefix: 'V',
      extensions: ['.vue'],
      pathPrefix: false
    })

    const pluginOptions: PluginList = { ...defaultPlugins, ...nuxt.options.vunix?.disabledPlugins }
    const keysWithTrueValue = Object.keys(pluginOptions).filter(key => (pluginOptions as any)[key] === true);
    const paths = keysWithTrueValue.map(key => core.resolve(`../runtime/components/${(pluginPaths as any)[key]}/plugin.${nuxt.options.dev ? 'ts' : 'mjs'}`));

    addPluginTemplate({
      filename: 'vunix-plugins.mjs',
      mode: 'client',
      getContents: () => {
        // Import all plugin files from the same directories as components
        const importStatements = paths.map((path, i) => {
          // Replace the filename at the end of the path with plugin.ts
          return `import plugin${i} from '${path}'`
        }).join('\n')

        // Use plugins in app:created hook
        const useStatements = paths.map((_, i) => `vueApp.use(plugin${i})`).join('\n')

        return `
          ${importStatements}
          export default function (nuxtApp) {
            nuxtApp.hook('app:created', (vueApp) => {
              ${useStatements}
            })
          }
        `
      }
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
    vunix?: NuxtConfigModuleOptions
  }
  interface NuxtOptions {
    vunix?: NuxtConfigModuleOptions
  }

  interface AppConfig {
    vunix?: {
      config?: Config;
      preset?: Config;
    }
  }
}
