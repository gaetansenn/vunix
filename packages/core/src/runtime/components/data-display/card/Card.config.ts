import type { DefaultConfig, IconType, MethodOrStringType, MethodOrObject } from "../../../utils/config"
import type { AccordionItemConfig } from "../../disclosure/accordion"

export interface CardConfig extends DefaultConfig {
  AccordionItem?: Partial<AccordionItemConfig>,
  header?: {
    class?: MethodOrStringType,
    sizes?: MethodOrObject, // Contain all sizes key / value
    size?: MethodOrStringType,
  },
  content: {
    class?: MethodOrStringType,
    sizes?: MethodOrObject, // Contain all sizes key / value
    size?: MethodOrStringType,
  },
  footer: {
    class?: MethodOrStringType,
    sizes?: MethodOrObject, // Contain all sizes key / value
    size?: MethodOrStringType,
  }
}