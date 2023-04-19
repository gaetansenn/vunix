import type { DefaultConfig, IconType, MethodOrStringType, MethodOrObject } from "../../../../utils/config"

export interface AccordionItemConfig extends DefaultConfig {
  header: {
    class?: MethodOrStringType,
    sizes?: MethodOrObject, // Contain all sizes key / value
    size?: MethodOrStringType,
    button: {
      class: MethodOrStringType,
      sizes?: MethodOrObject, // Contain all sizes key / value
      size?: MethodOrStringType,
      icon?: {
        icon?: IconType
        class: MethodOrStringType,
        sizes?: MethodOrObject,
        size?: MethodOrStringType,
      },
      content: { // Header content
        class: MethodOrStringType,
        sizes?: MethodOrObject,
        size?: MethodOrStringType,
      }
    }
  },
  content?: {
    wrapper?: MethodOrStringType, // Wrapper of content element
    class?: MethodOrStringType
  }
}