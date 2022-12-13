/**
 * Use to handle boolean type in DOM
 */
const booleanTypes = ['false', 'true'] as const
export type BooleanType = typeof booleanTypes[number]

const tristateTypes = [...booleanTypes, 'mixed'] as const
export type TristateType = typeof tristateTypes[number]

const booleanWithUndefinedTypes = [...booleanTypes, 'undefined'] as const
export type BooleanWithUndefinedType = typeof booleanWithUndefinedTypes[number]

export function toAriaBoolean (value: Boolean | undefined): String {
  return value ? booleanTypes[0] : booleanTypes[1]
}

export const ariaLabelAttr = {
  /**
   * @description Overide default html accessible name of an element
   * This name attribute can be used to reference the element in a JavaScript.
   * @type {String}
   * @see https://www.tpgi.com/what-is-an-accessible-name/
  */
  ariaLabel: {
    type: String,
    default: undefined
  }
}

export const ariaLabelledByAttr = {
  /**
   * @description Overide default html accessible name from another element. Attribute takes an id ref as its value
   * @type {String}
   * @see https://www.tpgi.com/what-is-an-accessible-name/
  */
  ariaLabelledby: {
    type: String,
    default: undefined
  }
}

export const ariaExpandedAttr = {
  /**
   * @description The aria-expanded attribute is set on an element to indicate if a control is expanded or collapsed, and whether or not its child elements are displayed or hidden.
   * @type {Boolean}
   * @values true|false|undefined
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
  */
  ariaExpanded: {
    type: String,
    default: undefined,
    validator: (prop: BooleanWithUndefinedType) => booleanWithUndefinedTypes.includes(prop)
  }
}

export const ariaControlsAttr = {
  /**
   * @description The global aria-controls property identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.
   * @type {String}
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
  */
   ariaControls: {
    type: Boolean,
    default: undefined
  }
}

export const ariaOwnsAttr = {
  /**
   * @description The aria-owns attribute identifies an element (or elements) in order to define a visual, functional, or contextual relationship between a parent and its child elements when the DOM hierarchy cannot be used to represent the relationship.
   * @type {String}
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-owns
  */
  ariaOwns: {
    type: String,
    default: undefined
  }
}


export const ariaAutocompleteAttrTypes = ['inline', 'list', 'both'] as const
export type AriaAutocompleteAttrType = typeof ariaAutocompleteAttrTypes[number]
export const ariaAutocompleteAttr = {
  /**
   * @description The aria-autocomplete attribute indicates whether inputting text could trigger display of one or more predictions of the user's intended value for a combobox, searchbox, or textbox and specifies how predictions will be presented if they are made.
   * @type {AriaAutocompleteAttrTypes}
   * @values inline|list|both
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete
  */
  ariaAutocomplete: {
    type: String,
    default: undefined,
    validator: (prop: AriaAutocompleteAttrType) => ariaAutocompleteAttrTypes.includes(prop)
  }
}

export const ariaCheckedAttr = {
  /**
   * @description The aria-checked attribute indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @type {TristateType}
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
  */
  ariaChecked: {
    type: String,
    default: undefined,
    validator: (prop: TristateType) => tristateTypes.includes(prop)
  }
}

export const ariaDescriptionAttr = {
  /**
   * @description The global aria-description attribute defines a string value that describes or annotates the current element.
   * @type {String}
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-description
  */
   ariaDescription: {
    type: String,
  }
}

export const ariaDescribedByAttr = {
  /**
   * @description The global aria-describedby attribute identifies the element (or elements) that describes the element on which the attribute is set.
   * @type {String}
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
  */
   ariaDecribedBy: {
    type: String,
  }
}

export const ariaDetailsAttr = {
  /**
   * @description The global aria-details attribute identifies the element (or elements) that provide additional information related to the object.
   * @type {String}
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-details#description
  */
   ariaDetails: {
    type: String,
  }
}
