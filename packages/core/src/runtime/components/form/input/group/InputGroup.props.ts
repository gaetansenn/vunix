import { configProp, sizeProp } from "../../../commons/props"

export const inputGroupProps = {
  /**
   * @description  Name of the input
   * @type {string}
   */
  name: {
    type: String,
    require: true
  },
  /**
   * @description handle inline input
   * @type {boolean}
   */
  inline: {
    type: Boolean,
    default: false
  },
  /**
   * @description A value is required or must be check for the form to be submittable
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder
   * @type {Boolean}
  */
  required: {
    type: Boolean,
    defaultValue: false
  },
  /**
   * @description include label of input
   * @see https://developer.mozilla.org/fr/docs/Web/HTML/Element/Label
   * @type {string}
   */
  label: {
    type: String,
  },
  /**
   * @description description of the field
   * @type {string}
   */
  description: {
    type: String
  },
  /**
  * @description Display optional label if not required
  * @type {boolean}
  */
  optionalLabel: {
    type: Boolean,
    defaultValue: false
  }
}

export const props = {
  ...inputGroupProps,
  ...sizeProp,
  ...configProp('InputGroup')
}
