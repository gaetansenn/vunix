import { FunctionalComponent } from 'vue'

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

export interface DefaultConfig {
  class: MethodOrStringType, // style classes of root element
  variants: VariantsConfig,
  variant: ConfigMethodType,
  size?:MethodOrStringType,
  rounded?: MethodOrStringType
}
