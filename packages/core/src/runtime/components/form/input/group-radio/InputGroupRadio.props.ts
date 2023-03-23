import { commonsProps } from '../../commons.props'
import { props as formGroupProps } from '../../group/FormGroup.props'
import { configProp } from '../../../commons/props'

const inputProps = {
  /**
   * @description The initial value of the control
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   * @type {string}
   */
  modelValue: {
    type: [String, Object, Number],
    required: true
  },
}

export const props = {
  ...commonsProps<string>(),
  ...formGroupProps,
  ...inputProps,
  ...configProp('InputGroupRadio')
}
