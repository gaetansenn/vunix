import { configProp, sizeProp, variantProp } from '../../../commons/props'
import { commonsProps } from '../../commons.props'

const inputProps = {
  /**
   * @description The initial value of the control
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   * @type {string}
   */
  modelValue: {
    type: [String, Object]
  },
  /**
   * @description description of the input radio
   * @type {string}
   */
  description: {
    type: String
  },
  /**
   * @description include label of input radio
   * @see https://developer.mozilla.org/fr/docs/Web/HTML/Element/Label
   * @type {string}
   */
  label: {
    type: String,
  }
}

export const props = {
  ...commonsProps<string>(),
  ...inputProps,
  ...sizeProp,
  ...variantProp,
  ...configProp('InputRadio')
}
