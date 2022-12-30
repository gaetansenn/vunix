import type { DefaultConfig, IconType, MethodOrObject, MethodOrStringType } from "../../../utils/config"

export interface ButtonConfig extends DefaultConfig {
  loading: {
    class: MethodOrStringType,
    sizes: MethodOrObject,
    size?: MethodOrStringType,
    icon: IconType
  }
}