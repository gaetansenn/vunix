import type { DefaultConfig, MethodOrObject, MethodOrStringType } from "../../../../utils/config"

export interface InputGroupConfig extends DefaultConfig {
  label?: {
    wrapper?: MethodOrStringType,
    class?: MethodOrStringType,
    sizes?: MethodOrObject,
    size?: MethodOrStringType,
    required?: MethodOrStringType,
    optional?: MethodOrStringType
  },
  bottom?: {
    class?: MethodOrStringType,
    validation?: {
      class?: MethodOrStringType
    },
    description?: {
      class?: MethodOrStringType
    }
  }
}