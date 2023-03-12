import type { DefaultConfig, MethodOrObject } from "../../utils/config";

export interface IconConfig extends DefaultConfig {
  sizes: MethodOrObject, // Contain all sizes key / value
}