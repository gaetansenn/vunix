import type { DefaultConfig, IconType, MethodOrObject, MethodOrStringType } from "../../../../utils/config"

export interface InputBaseConfig extends DefaultConfig {
  input: {
    class: MethodOrStringType,
  }
  trailing: {
    icon?: IconType,
    class: MethodOrStringType,
    sizes?: MethodOrObject,
    size?: MethodOrStringType,
  },
  leading: {
    icon?: IconType
    class: MethodOrStringType,
    sizes?: MethodOrObject,
    size?: MethodOrStringType,
  }
}