import { ArrowPathIcon } from '@heroicons/vue/20/solid';

import { DefaultConfig, IconType, MethodOrStringType, rounded, SizeEnum } from "../../../utils/config"

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