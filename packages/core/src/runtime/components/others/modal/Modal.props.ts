import { configProp } from "../../commons/props"

const modalProps = {
  modelValue: {
    type: Boolean
  },
  /**
     * Prevent modal to be closed
     */
  preventClose: {
    type: Boolean,
    default: false
  },
  submit: {
    type: Function,
    default: null
  }
}

export const props = {
  ...modalProps,
  ...configProp('Modal')
}