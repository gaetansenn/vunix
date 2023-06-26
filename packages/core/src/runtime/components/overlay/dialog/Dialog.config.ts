import type { DefaultConfig, MethodOrStringType } from "../../../utils/config"
import type { ModalConfig } from "../modal/Modal.config";

export interface DialogConfig extends DefaultConfig {
  Modal?: ModalConfig,
  button: {
    cancel: {
      fixed: MethodOrStringType,
      variant: String
    },
    submit: {
      fixed: MethodOrStringType,
      variant: String
    },
  },
  plugin: boolean // Activate or not the plugin
}