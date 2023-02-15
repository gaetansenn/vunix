import type { DefaultConfig, IconType } from "../../../../utils/config";
import type { InputBaseConfig } from "../base/InputBase.config";

export interface InputPasswordConfig extends DefaultConfig {
  InputBase: InputBaseConfig,
  /**
   * Icon used to show / hide password
   */
  eye: {
    on: IconType, // Password hidden
    off: IconType // Password show
  }
}