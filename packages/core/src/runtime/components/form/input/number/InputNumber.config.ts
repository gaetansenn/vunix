import type { DefaultConfig } from "../../../../utils/config";
import type { InputBaseConfig } from "../base/InputBase.config";
import type { FormGroupConfig } from "../../group/FormGroup.config";

export interface InputNumberConfig extends DefaultConfig {
  InputBase?: InputBaseConfig,
  FormGroup?: FormGroupConfig,
}