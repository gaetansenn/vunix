
import type { App } from 'vue'
import { components } from '@vunix/core'

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

export * from '@vunix/core'
export { plugin as uiVue }
