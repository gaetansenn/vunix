import type { DefaultConfig, IconType } from "../../../../utils/config";
import type { InputBaseConfig } from "../base/InputBase.config";
import type { FormGroupConfig } from "../../group/FormGroup.config";

export interface InputPasswordConfig extends DefaultConfig {
  InputBase?: InputBaseConfig,
  FormGroup?: FormGroupConfig,
  /**
   * Icon used to show / hide password
   */
  eye: {
    on: IconType, // Password hidden
    off: IconType // Password show
  }
}