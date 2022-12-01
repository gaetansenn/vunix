
import type { App } from 'vue'
import { components } from '@vunix/core/dist/runtime'

export interface PluginOptions {
  registerComponents: boolean
}

const plugin = {
  install(app: App, options?: PluginOptions) {
    if (options && options.registerComponents) {
      for (const prop in components) {
        // @ts-expect-error: I want to index import using string
        const component = components[prop]
        app.component(`Dw${component.__name}`, component)
      }
    }
  },
}

export { VunixComponentResolver } from './componentResolver'
export * from '@vunix/core/dist/runtime/components'
export { plugin as vunix }
