import { App, ComputedRef, FunctionalComponent, provide, reactive, Ref } from 'vue'
import defu from 'defu'
import get from 'lodash/get.js'
import set from 'lodash/set.js'

import type { ButtonConfig } from '../components/elements/button/Button.config'
import type { InputBaseConfig } from '../components/form/input/base/InputBase.config'
import type { IconConfig } from '../components/icon/Icon.config'
import type { InputTextConfig } from '../components/form/input/text/InputText.config'
import type { InputGroupConfig } from '../components/form/input/group/InputGroup.config'
import { VunixConfigSymbol } from '../symbols'
import type { InputPasswordConfig } from '../components/form/input/password/InputPassword.config'
import type { InputEmailConfig } from '../components/form/input/email/InputEmail.config'
import type { TextAreaConfig } from '../components/form/textArea/TextArea.config'
import type { InputNumberConfig } from '../components/form/input/number/InputNumber.config'
import type { SelectConfig } from '../components/form/select/Select.config'

export type KeyValue<T> = { [key: string]: T }
export type ConfigMethodType = (...any: any[]) => string
export type IconType = FunctionalComponent | string
export type MethodOrStringType = ConfigMethodType | ComputedRef<string> | Ref<string> | string
export type MethodOrObject = KeyValue<string> | ConfigMethodType

export const DEFAULT_VARIANT = 'default'
export interface VariantsConfig {
  default: MethodOrStringType,
  [key: string]: MethodOrStringType
}

export enum RoundedEnum {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  full = 'full'
}
export interface RoundedConfig {
  [RoundedEnum.xs]?: RoundedEnum,
  [RoundedEnum.sm]?: RoundedEnum,
  [RoundedEnum.md]?: RoundedEnum,
  [RoundedEnum.lg]?: RoundedEnum,
  [RoundedEnum.xl]?: RoundedEnum,
  [RoundedEnum.full]?: RoundedEnum,
  [key: string]: any
}
export const DEFAULT_ROUNDED = RoundedEnum.sm
export const rounded: ConfigMethodType = ({ props }) => {
  return ({
    xs: 'rounded-sm',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  } as any)[props.rounded]
}

export enum SizeEnum {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl'
}
export interface SizesConfig {
  [SizeEnum.xs]?: SizeEnum,
  [SizeEnum.sm]?: SizeEnum,
  [SizeEnum.md]?: SizeEnum,
  [SizeEnum.lg]?: SizeEnum,
  [SizeEnum.xl]?: SizeEnum,
  [key: string]: any
}
export const DEFAULT_SIZE = SizeEnum.md

export declare interface DefaultConfig {
  class: MethodOrStringType, // style classes of root element
  variants?: VariantsConfig, // Contain all variants key / value
  variant?: MethodOrStringType,
  sizes?: MethodOrObject, // Contain all sizes key / value
  size?: MethodOrStringType,
  rounded?: MethodOrObject, // Contain all rounded key / value
  defaults?: KeyValue<any> // Overide the default component props
}

export declare interface Config {
  Button: ButtonConfig
  InputBase: InputBaseConfig,
  InputText: InputTextConfig,
  InputGroup: InputGroupConfig
  InputPassword: InputPasswordConfig,
  InputEmail: InputEmailConfig,
  InputNumber: InputNumberConfig,
  Icon: IconConfig,
  TextArea: TextAreaConfig
  Select: SelectConfig
}

export type PresetType = string;
export declare interface defineConfigOptions {
  preset: Config,
  config?: Config,
  app?: App
}


/**
 * Use to merge preset config / user config / and merge classes to another config
 *
 * @param {*} parentConfig
 * @param {string} parentPath
 * @param {string} childPath
 * @param {*} defaultConfig
 * @param {*} config
 */
function mergeClasses(parentConfig: any, parentPath: string, childPath: string, defaultConfig: any, config: any) {
  if (!config[parentPath]) {
    config[parentPath] = {}
    set(config[parentPath], childPath, defu({}, get(defaultConfig[parentPath], childPath, {}), config[childPath], parentConfig))
  } else if (!get(config[parentPath], childPath)) set(config[parentPath], childPath, defu({}, get(defaultConfig[parentPath], childPath, {}), config[childPath], parentConfig))
  else if (get(config[parentPath], childPath)) set(config[parentPath], childPath, defu({}, get(config[parentPath], childPath, {}), get(defaultConfig[parentPath], childPath, {}), config[childPath], parentConfig))
}

function mergeConfig(options: Omit<defineConfigOptions, 'app'>) {
  const preset: Config = options.preset;
  const newConfig = Object.assign({}, options?.config || {});

  const inputsComponents = ['InputText', 'InputPassword', 'InputEmail', 'InputNumber']
  // Merge InputBase config with Inputs components
  inputsComponents.forEach(parentPath => mergeClasses(preset.InputBase, parentPath, 'InputBase', preset, newConfig));

  // Merge InputGroup config with Inputs components
  [...inputsComponents, 'TextArea', 'Select'].forEach(parentPath => mergeClasses(preset.InputGroup, parentPath, 'InputGroup', preset, newConfig))

  // Merge user config with default preset
  return defu({}, newConfig, preset)
}

/**
 * Helper to provide config for all components
 * accepts a direct {@link Config} object.
 */
export function defineConfig(options: defineConfigOptions) {
  const _config = reactive(mergeConfig(options));

  (options?.app ? options.app.provide : provide)(VunixConfigSymbol, _config)

  return _config
}
