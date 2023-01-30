import type { DefaultConfig, MethodOrObject, MethodOrStringType } from "../../../../utils/config"

export interface InputBaseConfig extends DefaultConfig {
  input: {
    class: MethodOrStringType,
  }
  trailing: {
    class: MethodOrStringType,
    sizes?: MethodOrObject,
    size?: MethodOrStringType,
  },
  leading: {
    class: MethodOrStringType,
    sizes?: MethodOrObject,
    size?: MethodOrStringType,
  }
}