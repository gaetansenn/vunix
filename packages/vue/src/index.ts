import type { App } from 'vue'

import { components } from '@vunix/core/dist/runtime'
import { Config, defineConfig } from '@vunix/core/dist/runtime/utils/config'

export interface PluginOptions {
  registerComponents?: boolean,
  preset: Config,
  config?: Config
}

export const plugin = {
  install(app: App, options: PluginOptions) {
    defineConfig({ ...options, app })

    if (options && options.registerComponents) {
      for (const prop in components) {
        // @ts-expect-error: I want to index import using string
        const component = components[prop]
        app.component(`V${component.__name}`, component)
      }
    }
  }
}

export { ComponentResolver } from './componentResolver'
export * from '@vunix/core/dist/runtime/components'
export * from '@vunix/core/dist/runtime/utils/config'
export * as presets from '@vunix/core/dist/runtime/presets'
