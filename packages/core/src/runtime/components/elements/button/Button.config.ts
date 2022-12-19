import { DefaultConfig, IconType, MethodOrStringType } from "../../../utils/config"

export interface ButtonConfig extends DefaultConfig {
  loading: {
    fixed: MethodOrStringType,
    size: MethodOrStringType,
    icon: IconType
  }
}