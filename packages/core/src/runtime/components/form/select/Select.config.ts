import type { DefaultConfig, IconType, MethodOrObject, MethodOrStringType } from "../../../utils/config";

export interface SelectConfig extends DefaultConfig {
  carret?: {
    icon?: string,
    class: MethodOrStringType,
    sizes?: MethodOrObject,
    size?: MethodOrStringType,
    fill?: string,
    stroke?: string,
  }
}