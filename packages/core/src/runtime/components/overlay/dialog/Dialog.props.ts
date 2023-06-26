import { configProp, roundedProp, sizeProp } from "../../commons/props"

const dialogProps = {
  /**
   * Title to apply to
   */
  title: {
    type: String,
  },
  /**
   * Submit content
   */
  submit: {
    type: String
  },
  /**
   * Cancel content
   */
  cancel: {
    type: String
  },
  /**
   * Method to call on submit
   */
  onSubmit: {
    type: Function
  },
  /**
   * Method to call on cancel a cancel emit is also emited
   */
  onCancel: {
    type: Function
  }
}

export const props = {
  ...sizeProp,
  ...dialogProps,
  ...roundedProp,
  ...configProp('Dialog')
}