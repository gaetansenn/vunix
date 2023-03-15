import type { DefaultConfig, MethodOrStringType } from "../../../utils/config";
import type { FormGroupConfig } from "../input/group/FormGroup.config";

export interface TextAreaConfig extends DefaultConfig {
  counter?: {
    class?: MethodOrStringType,
    spliter?: MethodOrStringType,
    currentLength?: MethodOrStringType,
    totalLength?: MethodOrStringType
  },
  FormGroup?: Partial<FormGroupConfig>
}