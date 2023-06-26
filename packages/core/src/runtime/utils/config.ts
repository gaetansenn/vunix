import { App, ComputedRef, FunctionalComponent, provide, reactive, Ref } from 'vue'
import defu from 'defu'
import get from 'lodash/get.js'
import set from 'lodash/set.js'

import type { ButtonConfig } from '../components/elements/button/Button.config'
import type { InputBaseConfig } from '../components/form/input/base/InputBase.config'
import type { IconConfig } from '../components/icon/Icon.config'
import type { InputTextConfig } from '../components/form/input/text/InputText.config'
import type { FormGroupConfig } from '../components/form/group/FormGroup.config'
import { VunixConfigSymbol } from '../symbols'
import type { InputPasswordConfig } from '../components/form/input/password/InputPassword.config'
import type { InputEmailConfig } from '../components/form/input/email/InputEmail.config'
import type { TextAreaConfig } from '../components/form/textarea/TextArea.config'
import type { InputNumberConfig } from '../components/form/input/number/InputNumber.config'
import type { SelectConfig } from '../components/form/select/Select.config'
import type { InputRadioConfig } from '../components/form/input/radio/InputRadio.config'
import type { InputGroupRadioConfig } from '../components/form/input/group-radio/InputGroupRadio.config'
import type { InputGroupCheckboxConfig } from '../components/form/input/group-checkbox/InputGroupCheckbox.config'
import type { InputCheckboxConfig } from '../components/form/input/checkbox/InputCheckbox.config'
import type { ConfigTransitionConfig } from '../components/transitions/config/ConfigTransition.config'
import type { ModalConfig } from '../components/overlay/modal/Modal.config'
import type { CardConfig } from '../components/data-display/card/Card.config'
import type { AccordionItemConfig } from '../components/disclosure/accordion/item/AccordionItem.config'
import type { AccordionConfig } from '../components/disclosure/accordion/Accordion.config'
import type { DialogConfig } from '../components/overlay/dialog/Dialog.config'

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

export enum ShadowEnum {
  none = 'none',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl'
}
export interface ShadowConfig {
  [ShadowEnum.none]?: ShadowConfig
  [ShadowEnum.xs]?: ShadowEnum,
  [ShadowEnum.sm]?: ShadowEnum,
  [ShadowEnum.md]?: ShadowEnum,
  [ShadowEnum.lg]?: ShadowEnum,
  [ShadowEnum.xl]?: ShadowEnum,
}
export const shadows: ConfigMethodType = ({ props }) => {
  return ({
    none: 'shadow-none',
    xs: 'shadow-sm hover:shadow',
    sm: 'shadow hover:shadow-md',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
    xl: 'shadow-xl hover:shadow-2xl'
  } as any)[props.shadow]
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
  class?: MethodOrStringType, // style classes of root element
  variants?: VariantsConfig, // Contain all variants key / value
  variant?: MethodOrStringType,
  sizes?: MethodOrObject, // Contain all sizes key / value
  size?: MethodOrStringType,
  rounded?: MethodOrObject, // Contain all rounded key / value
  defaults?: KeyValue<any> // Overide the default component props
  shadows?: MethodOrObject, // Contain all shadows key / value
  shadow?: MethodOrObject,
}

export declare interface Config {
  Button: ButtonConfig
  InputBase: InputBaseConfig,
  InputText: InputTextConfig,
  FormGroup: FormGroupConfig
  InputPassword: InputPasswordConfig,
  InputEmail: InputEmailConfig,
  InputNumber: InputNumberConfig,
  InputRadio: InputRadioConfig,
  InputGroupRadio: InputGroupRadioConfig,
  InputGroupCheckbox: InputGroupCheckboxConfig,
  InputCheckbox: InputCheckboxConfig,
  Icon: IconConfig,
  TextArea: TextAreaConfig
  Select: SelectConfig,
  Transition: {
    Fade: ConfigTransitionConfig,
    Collapse: ConfigTransitionConfig
  },
  Modal: ModalConfig,
  Dialog: DialogConfig,
  Card: CardConfig,
  Accordion: AccordionConfig,
  AccordionItem: AccordionItemConfig,
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

  // Merge fade transition to modal
  mergeClasses(preset.Transition.Fade, 'Modal', 'overlay.transition', preset, newConfig);

  // Merge Modal to Dialog
  mergeClasses(preset.Modal, 'Dialog', 'Modal', preset, newConfig);

  // Merge Accordionitem to Card
  mergeClasses(preset.AccordionItem, 'Card', 'AccordionItem', preset, newConfig);

  // Merge FormGroup config with Inputs components
  [...inputsComponents, 'InputGroupRadio', 'InputGroupCheckbox', 'TextArea', 'Select'].forEach(parentPath => mergeClasses(preset.FormGroup, parentPath, 'FormGroup', preset, newConfig))

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
