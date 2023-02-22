import { configProp, roundedProp, sizeProp, variantProp } from '../../commons/props'
import { commonsProps } from '../commons.props'
import { inputGroupProps } from '../input/group/InputGroup.props'

const textAreaProps = {
  /**
   * @description The initial value of the control
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   * @type {string}
   */
  modelValue: {
    type: String,
    required: true
  },
  /**
   * Name of the form control
   */
  name: {
    type: String,
    required: true
  },
  /**
   * @description Short hint that describes the expected value of the textarea
   * @see https://developer.mozilla.org/fr/docs/Web/HTML/Element/Textarea#attr-placeholder
   * @type {String}
  */
  placeholder: {
    type: String,
    defaultValue: undefined
  },
  /**
   * @description Whether the form control is disabled
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Textarea#attr-disabled
   * @type {Boolean}
   */
  disabled: {
    type: Boolean,
    defaultValue: undefined
  },
}

export const props = {
  ...textAreaProps,
  ...sizeProp,
  ...variantProp,
  ...roundedProp,
  ...configProp('TextArea'),
  ...inputGroupProps,
  ...commonsProps<string>()
}
