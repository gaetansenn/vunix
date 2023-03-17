import type { DefaultConfig, MethodOrObject, MethodOrStringType, VariantsConfig } from "../../../../utils/config";
import type { InputBaseConfig } from "../../input/base/InputBase.config";

export interface InputRadioConfig extends DefaultConfig {
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
    label: {
      class: MethodOrStringType // style classes of label
    },
  }
  // Buttom content of InputRadio
  bottom: {
    class: MethodOrStringType // style classes of bottom
  }
}