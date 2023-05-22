import type { DefaultConfig, IconType, MethodOrStringType, MethodOrObject } from "../../../utils/config"
import type { ConfigTransitionConfig } from "../../transitions/config/ConfigTransition.config";

export interface ModalConfig extends DefaultConfig {
  overlay: {
    // TODO: Handle dynamic injection
    transition?: ConfigTransitionConfig,
    class: MethodOrStringType,
  },
  backdrop: {
    wrapper: MethodOrStringType,
    class: MethodOrStringType
  },
  wrapper: MethodOrStringType,
  modal: {
    wrapper: MethodOrStringType,
    rounded?: MethodOrObject, // Contain all rounded key / value
    transition: ConfigTransitionConfig,
    // Config for default slot injected with title props
    header: {
      class: MethodOrStringType,
      close: {
        class: MethodOrStringType,
        icon: IconType,
        sizes?: MethodOrObject, // Contain all sizes key / value
        size?: MethodOrStringType,
      }
    },
    content: {
      class: MethodOrStringType
    },
    footer: {
      class: MethodOrStringType
    }
  }
}