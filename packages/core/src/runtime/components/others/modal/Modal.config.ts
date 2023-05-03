import type { DefaultConfig, IconType, MethodOrStringType } from "../../../utils/config"
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
    transition: ConfigTransitionConfig,
    // Config for default slot injected with title props
    header: {
      class: MethodOrStringType,
      icon: {
        class: MethodOrStringType,
        icon: IconType
      }
    }
  }
}