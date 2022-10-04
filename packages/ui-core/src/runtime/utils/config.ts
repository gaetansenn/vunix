import { FunctionalComponent } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/20/solid';

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

export interface ButtonConfig extends DefaultConfig {
  loading: {
    fixed: MethodOrStringType,
    size: MethodOrStringType,
    icon: IconType
  }
}

export const buttonConfig: ButtonConfig = {
  class: ({ props }) => {
    const fixed = 'inline-flex transition ease-in-out duration-150 items-center justify-center border disabled:cursor-not-allowed focus:outline-none focus:shadow-outline'

    return `${fixed} ${(props.block) ? 'flex w-full' : 'inline-flex'}`
  },
  variants: {
    default: 'bg-blue-100 text-blue-900',
    outline: '',
    text: ''
  },
  // Inject it globaly for all component that need it with an extend from class ?
  rounded,
  variant: ({ props }) => {
    return buttonConfig.variants[props.variant]
  },
  size: ({ props }) => {
    return ({
      [SizeEnum.xs]: 'px-2 py-2 text-xs leading-4',
      [SizeEnum.sm]: 'px-3 py-2 text-sm leading-4',
      [SizeEnum.md]: 'px-4 py-2 text-sm leading-5',
      [SizeEnum.lg]: 'px-4 py-2 text-base leading-6',
      [SizeEnum.xl]: 'px-6 py-3 text-base leading-6'
    } as any)[props.size]
  },
  loading: {
    fixed: 'ml-3 animate-spin',
    size: ({ props }) => {
      return ({
        [SizeEnum.xs]: 'h-4 w-4',
        [SizeEnum.sm]: 'h-4 w-4',
        [SizeEnum.md]: 'h-5 w-5',
        [SizeEnum.lg]: 'h-6 w-6',
        [SizeEnum.xl]: 'h-6 w-6'
      }as any)[props.size]
    },
    icon: ArrowPathIcon
  }
}
