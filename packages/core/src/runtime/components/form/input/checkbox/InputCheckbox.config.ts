import type { DefaultConfig, IconType, MethodOrObject, MethodOrStringType, VariantsConfig } from "../../../../utils/config";

export interface InputCheckboxConfig extends DefaultConfig {
  // Wrapper for <input> and <label>
  wrapper: {
    class: MethodOrStringType, // style classes of wrapper
    input: {
      class: MethodOrStringType, // style classes of input element
      variants?: VariantsConfig, // Contain all variants key / value
      variant?: MethodOrStringType,
      sizes?: MethodOrObject, // Contain all sizes key / value
      size?: MethodOrStringType,
    },
    // Checked icon applied on checkbox
    checked: {
      icon?: IconType,
      class: MethodOrStringType,
      sizes?: MethodOrObject,
      size?: MethodOrStringType,
    },
    // Indeterminate icon applied on checkbox
    indeterminate: {
      icon?: IconType,
      class: MethodOrStringType,
      sizes?: MethodOrObject,
      size?: MethodOrStringType,
    },
    label: {
      class: MethodOrStringType // style classes of label
    },
  }
  // Buttom content of InputRadio
  bottom: {
    class: MethodOrStringType // style classes of bottom
  }
}