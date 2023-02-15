import type { DefaultConfig } from "../../../../utils/config";
import type { InputBaseConfig } from "../base/InputBase.config";

export interface InputEmailConfig extends DefaultConfig {
  InputBase: InputBaseConfig
}