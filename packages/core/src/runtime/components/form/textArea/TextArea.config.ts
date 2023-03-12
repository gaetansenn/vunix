import type { DefaultConfig, MethodOrStringType } from "../../../utils/config";
import type { InputGroupConfig } from "../input/group/InputGroup.config";

export interface TextAreaConfig extends DefaultConfig {
  counter?: {
    class?: MethodOrStringType,
    spliter?: MethodOrStringType,
    currentLength?: MethodOrStringType,
    totalLength?: MethodOrStringType
  },
  InputGroup?: Partial<InputGroupConfig>
}