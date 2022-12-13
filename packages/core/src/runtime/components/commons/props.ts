import { PropType } from 'vue'
import { DEFAULT_VARIANT, DEFAULT_ROUNDED, DEFAULT_SIZE, SizeEnum, RoundedEnum } from '../../utils/config'

export const sizeProp = {
  /**
   * @description Use specific size according to root configuration
   * @type {String}
   * @values xs|sm|md|lg|xl
   */
  size: {
    type: String as PropType<SizeEnum>,
    default: DEFAULT_SIZE
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
    default: DEFAULT_ROUNDED
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
    default: undefined
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
    default: DEFAULT_VARIANT
  }
}
