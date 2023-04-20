import { configProp, roundedProp, shadowProp, sizeProp } from "../../commons/props"

const cardProps = {
  /**
   * @description Header text content
   * @type {string}
   */
  header: {
    type: String,
  },
  /**
   * @description Activate collapse feature
   * @type {boolean}
   */
  collapse: {
    type: Boolean,
    default: false
  },
  /**
   * @description Is card collapsed
   */
  collapsed: {
    type: Boolean,
    defaultValue: false
  },
  /**
   * @description Display or not the arrow icon if collapsed is true
   */
  arrow: {
    type: Boolean,
    default: true
  }
}

export const props = {
  ...cardProps,
  ...roundedProp,
  ...shadowProp,
  ...sizeProp,
  ...configProp('Card')
}