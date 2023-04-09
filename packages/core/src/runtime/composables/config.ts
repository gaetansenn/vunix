import { reactive, computed, markRaw } from 'vue'
import defu from 'defu'
import merge from 'lodash/merge.js'

import { rounded } from '../utils/config'

function handleReactiveConfig(config: any, context: any) {
  // Inject default variants / sizes / rounded computed function
  [{ from: 'variants', of: 'variant' }, { from: 'rounded', of: 'rounded', default: rounded }, { from: 'sizes', of: 'size' }].forEach((el) => {
    if (config[el.from]) {
      if (typeof config[el.of] !== 'function') {
        if (typeof config[el.from][context.props[el.of]] === 'function') config[el.of] = config[el.from][context.props[el.of]]
        else config[el.of] = (context: any) => {
          return config[el.from][context.props[el.of]]
        }
      }
    }

    // Inject default helper
    if (!config[el.of] && el.default && context.props[el.of]) {
      config[el.of] = el.default
    }
  });

  Object.keys(config).forEach((key) => {
    if (key === 'defaults') return
    if (typeof config[key] === 'function') {
      // Mark render function as raw (never be converted to a proxy)
      // https://vuejs.org/api/reactivity-advanced.html#markraw
      // TODO: Handle better way to detect render function
      if (config[key].name === 'render') {
        markRaw(config[key])
      } else config[key] = computed(config[key].bind(null, context))
    } else if (typeof config[key] === 'object') {
      handleReactiveConfig(config[key], context)
    }
  })
}

// Inject library config to component
export const useConfig = <T>(context: any, config: any): T => {
  // Handle path of config according to context
  let path = context.props.configPath

  if (context.props.rootPath) path = `${context.props.rootPath}.${path}`

  // Merge custom component config with config path
  const _config: any = defu({}, context.props.config || {}, merge({}, path.split('.').reduce((value: any, currentKey: string) => value[currentKey], config)))

  // Apply reactivity to config
  handleReactiveConfig(_config, context)

  return reactive(_config) as T
}
