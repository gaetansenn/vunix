import { configProp, sizeProp, variantProp } from '../../../commons/props'
import { commonsProps } from '../../commons.props'

const inputProps = {
  /**
   * @description The initial value of the control
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   * @type {string}
   */
  modelValue: {
    type: String,
    required: true
  },
}

export const props = {
  ...commonsProps<string>(),
  ...inputProps,
  ...configProp('InputRadio'),
  ...sizeProp,
  ...variantProp
}
