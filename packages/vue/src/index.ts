import type { App } from 'vue'

import { components } from '@vunix/core/dist/runtime'
import { Config } from '@vunix/core/dist/runtime/utils/config'
import configLoader from './configLoader'

export interface PluginOptions {
  registerComponents: boolean
}

export const plugin = (config: Config) => {
  return {
    install(app: App, options?: PluginOptions) {
      // Inject configuration
      configLoader(app, config)

      if (options && options.registerComponents) {
        for (const prop in components) {
          // @ts-expect-error: I want to index import using string
          const component = components[prop]
          app.component(`Dw${component.__name}`, component)
        }
      }


    }
  }
}

export { ComponentResolver } from './componentResolver'
export * from '@vunix/core/dist/runtime/components'
export * from '@vunix/core/dist/runtime/utils/config'
