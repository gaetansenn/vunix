import type { DefaultConfig } from "../../../../utils/config";
import type { InputBaseConfig } from "../base/InputBase.config";
import type { InputGroupConfig } from "../group/InputGroup.config";

export interface InputTextConfig extends DefaultConfig {
  InputBase?: InputBaseConfig,
  InputGroup?: InputGroupConfig,
}