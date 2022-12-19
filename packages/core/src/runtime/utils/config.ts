import { App, FunctionalComponent, InjectionKey, provide, reactive, UnwrapNestedRefs } from 'vue'
import defu from 'defu'

import type { ButtonConfig } from '../components/elements/button/Button.config'

export const VunixConfigKey: InjectionKey<UnwrapNestedRefs<Config>> = Symbol('vunix-config')
export type ConfigMethodType = (...any: any[]) => string
export type IconType = FunctionalComponent | string
export type MethodOrStringType = ConfigMethodType | string

export const DEFAULT_VARIANT = 'default'
export interface VariantsConfig {
  default: string,
  [key: string]: string
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
export const DEFAULT_SIZE = SizeEnum.sm

export declare interface DefaultConfig {
  class: MethodOrStringType, // style classes of root element
  variants: VariantsConfig,
  variant: ConfigMethodType,
  size?: MethodOrStringType,
  rounded?: MethodOrStringType
}

export declare interface Config {
  Button: ButtonConfig
}

export type PresetType = string;
export declare interface defineConfigOptions {
  preset: Config,
  config?: Config,
  app?: App
}

function mergeConfig(options: Omit<defineConfigOptions, 'app'>) {
  const preset: Config = options.preset;

  return defu({}, preset, options?.config || {})
}

/**
 * Helper to provide config for all components
 * accepts a direct {@link Config} object.
 */
export function defineConfig(options: defineConfigOptions) {
  console.log('options', options)
  const _config = reactive(mergeConfig(options));

  (options?.app ? options.app.provide : provide)(VunixConfigKey, _config)

  return _config
}
