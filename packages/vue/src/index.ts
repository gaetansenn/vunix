
import type { App } from 'vue'
import * as components from '@vunix/core/dist/runtime/components'

const plugin = {
  install(app: App) {
    console.log('components :>> ', components);
    for (const prop in components.default) {
      // @ts-expect-error: I want to index import using string
      const component = components.default[prop]
      app.component(component.__name, component)
    }
  },
}

export * from '@vunix/core/dist/runtime/components'
export { plugin as uiVue }
