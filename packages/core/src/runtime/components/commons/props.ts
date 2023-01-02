import type { PropType } from 'vue'

import { DEFAULT_VARIANT, DEFAULT_ROUNDED, DEFAULT_SIZE, SizeEnum, RoundedEnum, KeyValue } from '../../utils/config'

export const sizeProp = {
  /**
   * @description Use specific size according to root configuration
   * @type {String}
   * @values xs|sm|md|lg|xl
   */
  size: {
    type: String as PropType<SizeEnum>,
    defaultValue: DEFAULT_SIZE
  }
}

export const roundedProp = {
  /**
   * @description Use specific border radius to root element
   * @type {String}
   * @values string
   */
  rounded: {
    type: String as PropType<RoundedEnum>,
    defaultValue: DEFAULT_ROUNDED
  }
}

export const toProp = {
  /**
   * @description Route Location the link should navigate to when clicked on.
   * @type {String}
   * @values string | RouteLocationPathRaw | RouteLocationNamedRaw
   * @see https://router.vuejs.org/api/#routelocationraw
   */
  to: {
    type: [String, Object],
    defaultValue: undefined
  }
}

export const variantProp = {
  /**
   * @description Use specific variant injected to default classes. Please see configuration for more details.
   * @type {String}
   * @values string
   */
  variant: {
    type: String,
    defaultValue: DEFAULT_VARIANT
  }
}

export function injectDefaultValues(props: KeyValue<any> = {}, defaultValues: any, configValues: KeyValue<any> = {}) {
  // convert defaultValues as object / value
  const _defaultValues = Object.keys(defaultValues).reduce((accu: any, key: string) => {
    if (defaultValues[key]?.defaultValue) accu[key] = defaultValues[key].defaultValue

    return accu;
  }, {})

  Object.keys(props).forEach((key) => {
    if (props[key] === undefined) {
      if (configValues[key] !== undefined) props[key] = configValues[key]
      else if (_defaultValues[key] !== undefined) props[key] = _defaultValues[key]
    }
  })
}