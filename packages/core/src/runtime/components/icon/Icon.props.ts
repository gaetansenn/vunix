import { configProp } from "../commons/props"

const iconProps = {
  /**
   * @description Name of iconify icon
   * @type {String}
   */
  name: {
    type: String,
    required: true
  },
  /**
   * @description Size of the icon
   * Could be `12{px/rem/em}` or juste the number value
   * @type {String}
  */
  size: {
    type: String
  }
}

export const props = {
  ...iconProps,
  ...configProp('Icon')
}