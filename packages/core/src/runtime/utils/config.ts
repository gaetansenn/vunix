import { App, FunctionalComponent, InjectionKey, provide, reactive, UnwrapNestedRefs } from 'vue'
import { ButtonConfig } from '../components/elements/button/Button.config';

export const VunixConfigKey : InjectionKey<UnwrapNestedRefs<Config>> = Symbol('vunix-config');
export type ConfigMethodType = (...any: any[]) => string;
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
  size?:MethodOrStringType,
  rounded?: MethodOrStringType
}

export declare interface Config {
  Button: ButtonConfig
}

// const defaultConfig = {
//   Button
// }

/**
 * Type helper to make it easier to use vunix.config.ts
 * accepts a direct {@link Config} object, or a function that returns it.
 */
export function defineConfig(config: Config, app?: App) {
  // Need to merge from default config
  const _config = reactive(config);

  (app ? app.provide : provide)(VunixConfigKey, _config);

  return _config;
}
