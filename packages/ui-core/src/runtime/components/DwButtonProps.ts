const typeTypes = ['a', 'nuxt-link', 'router-link', 'button', 'div', 'span'] as const
export type TypeType = typeof typeTypes[number]

export const tagProp = {
  /**
   * @description Use to overide automatic typing of component
   * @values 'a|nuxt-link|router-link|button|div|span'
   * @type {TypeType}
  */
  tag: {
    type: String,
    default: undefined,
    validator: (prop: TypeType) => typeTypes.includes(prop)
  }
}
