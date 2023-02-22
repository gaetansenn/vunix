import type { PropType } from "vue"

import { configProp, roundedProp, sizeProp, validateEnum, variantProp } from "../../../commons/props"

export enum InputTypeEnum {
  Date = 'date',
  DateTimeLocal = 'datetime-local',
  Email = 'email',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Search = 'search',
  Tel = 'tel',
  Text = 'text',
  Time = 'time',
  Url = 'url',
  Week = 'week'
}

const inputProps = {
  /**
   * @description The initial value of the control
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   * @type {string}
   */
  modelValue: {
    // TODO: Add another value type on new components
    type: String,
    require: true
  },
  /**
   * @description Type of generated input
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value
   * @values 'date|datetime-local|email|month|number|password|search|tel|text|time|url|week'
   * @type {string}
   */
  type: {
    type: String as PropType<InputTypeEnum>,
    default: InputTypeEnum.Text,
    validator: validateEnum(InputTypeEnum)
  },
  /**
   * Name of the form control
   */
  name: {
    type: String,
    required: true
  },
  /**
   * @description Short hint that describes the expected value of an input field
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder
   * @type {String}
  */
  placeholder: {
    type: String,
    defaultValue: undefined
  },
  /**
   * @description content added at the left of the input
   * @type {String}
   */
  trailing: {
    type: String,
    defaultValue: undefined
  },
  /**
   * @description content added at the left of the input
   * @type {String}
   */
  leading: {
    type: String,
    defaultValue: undefined
  },
  /**
   * @description Is input with error
   */
  error: {
    type: Boolean,
    defaultValue: false
  }
}

export const props = (type: string = 'InputText') => ({
  ...sizeProp,
  ...variantProp,
  ...roundedProp,
  ...inputProps,
  ...configProp(type)
})
