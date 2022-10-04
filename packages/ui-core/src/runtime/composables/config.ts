import { reactive, computed, markRaw } from 'vue'
import { merge } from 'lodash'

function handleReactiveConfig (config: any, context: any) {
  Object.keys(config).forEach((key) => {
    if (typeof config[key] === 'function') {
      // Mark render function as raw
      // TODO: Handle better way to omit render functions from reactivity
      if (config[key].name === 'render') {
        markRaw(config[key])
      } else config[key] = computed(config[key].bind(null, context))
    } else if (typeof config[key] === 'object') {
      handleReactiveConfig(config[key], context)
    }
  })
}

// Inject library config to component
export const useConfig = <T>(context: any, config: any): T => {
  const _config = merge({}, config)

  handleReactiveConfig(_config, context)

  const proxy = reactive(_config)

  return proxy
}
