import { configProp, roundedProp, sizeProp, variantProp } from '../../commons/props'
import { commonsProps } from '../commons.props'
import { FormGroupProps } from '../group/FormGroup.props'

const selectProps = {
  /**
   * @description The initial value of the control
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   * @type {string}
   */
  modelValue: {
    type: [String, Number, Object],
    required: true
  },
  /**
   * @description Is used to define items contained in the select
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
   * @type {Array<any>}
   *  */
  options: {
    type: Array,
    required: true
  },
  /**
   * @decription Key to get value of option from selected option. This is only active if the type of options prop is of type Array<Object>
   * @type {string}
   */
  valueKey: {
    type: String,
    default: undefined
  },
  /**
   * @description Key to get label of option from selected option. This is only active if type of options prop is of type Array<Object>
   */
  labelKey: {
    type: String,
    default: 'label'
  },
  /**
   * Name of the form control
   */
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    // TODO: handle i18n for default value
    default: 'Please select one'
  }
}

export const props = {
  ...FormGroupProps,
  ...roundedProp,
  ...sizeProp,
  ...variantProp,
  ...selectProps,
  ...commonsProps<unknown>(),
  ...configProp('Select'),
}
