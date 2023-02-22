import type { DefaultConfig, IconType } from "../../../../utils/config";
import type { InputBaseConfig } from "../base/InputBase.config";
import type { InputGroupConfig } from "../group/InputGroup.config";

export interface InputPasswordConfig extends DefaultConfig {
  InputBase?: InputBaseConfig,
  InputGroup?: InputGroupConfig,
  /**
   * Icon used to show / hide password
   */
  eye: {
    on: IconType, // Password hidden
    off: IconType // Password show
  }
}