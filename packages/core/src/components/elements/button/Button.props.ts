const typeTypes = ['a', 'nuxt-link', 'router-link', 'button', 'div', 'span'] as const
export type TypeType = typeof typeTypes[number]

export const props = {
  /**
   * @description Use to overide automatic typing of component
   * @values 'a|nuxt-link|router-link|button|div|span'
   * @type {TypeType}
  */
  tag: {
    type: String,
    default: undefined,
    validator: (prop: TypeType) => typeTypes.includes(prop)
  },
  /**
   * @description Use to display a loader to notify the user that a processing taking place.
   * You can customize the loading content from the congiguration file or by using the scope slot loading
   * @type {Boolean}
  */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description If true apply display block type to fill available space
   * @type {Boolean}
   */
  block: {
    type: Boolean,
    default: false
  },
  /**
   * @description Use to set button as toggle button
   * @todo Handle implementation of aria-pressed gaetansenn/dw-ui-v3#1
   * @type {Boolean}
  */
  toggle: {
    type: Boolean,
    default: undefined
  }
}
