import { configProp, roundedProp, sizeProp } from "../../commons/props"

const modalProps = {
  /**
   * Add header title
   */
  header: {
    type: String,
  },
  modelValue: {
    type: Boolean
  },
  /**
   * Prevent modal to be closed from mask
  */
  preventClose: {
    type: Boolean,
    default: false
  },
  /** 
   * whether to hide the close button
   */
  hideClose: {
    type: Boolean,
    default: false
  },
  /**
   * wheter to append Modal to html body element
   */
  appendToBody: {
    type: Boolean,
    default: true
  },
  /**
   * wheter scroll body is disabled when Modal is opened
   */
  scrollBody: {
    type: Boolean,
    default: false
  }
}

export const props = {
  ...sizeProp,
  ...modalProps,
  ...roundedProp,
  ...configProp('Modal')
}