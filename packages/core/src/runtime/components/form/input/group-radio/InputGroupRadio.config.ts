import type { DefaultConfig, MethodOrStringType } from "../../../../utils/config";
import type { FormGroupConfig } from "../../group/FormGroup.config";

export interface InputGroupRadioConfig extends DefaultConfig {
  FormGroup?: FormGroupConfig,
  slot: MethodOrStringType
}