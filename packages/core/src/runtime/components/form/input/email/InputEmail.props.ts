import { props as baseProps } from '../base/InputBase.props'
import { commonsProps } from '../../commons.props'
import { inputGroupProps } from '../group/InputGroup.props'

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
  ...baseProps('InputText'),
  ...commonsProps<string>(),
  ...inputGroupProps,
  ...inputProps,
}
