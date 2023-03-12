import ArrowPathIcon from '@heroicons/vue/20/solid/esm/ArrowPathIcon.js';

import type { ButtonConfig } from '../../components/elements/button/Button.config';
import { RoundedEnum, SizeEnum } from '../../utils/config';

const config = {
  class: ({ props }) => {
    const fixed = 'inline-flex transition ease-in-out duration-150 items-center justify-center border disabled:cursor-not-allowed focus:outline-none focus:shadow-outline'

    return `${fixed} ${(props.block) ? 'flex w-full' : 'inline-flex'}`
  },
  variants: {
    default: 'bg-blue-100 text-blue-900 font-medium hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 disabled:text-gray-400 disabled:bg-gray-200',
    outline: 'border border-blue-500 text-blue-500 hover:text-blue-600 hover:border-blue-600 focus:outline-none focus:ring focus:ring-blue-300 font-medium',
    text: ''
  },
  sizes: {
    [SizeEnum.sm]: 'px-2 py-1.5 text-xs',
    [SizeEnum.md]: 'px-3 py-2 text-sm',
    [SizeEnum.lg]: 'px-4 py-2 text-xl',
  },
  loading: {
    class: 'ml-0.5 animate-spin',
    sizes: {
      [SizeEnum.sm]: 'h-4 w-4',
      [SizeEnum.md]: 'h-5 w-5',
      [SizeEnum.lg]: 'h-6 w-6',
    },
    icon: ArrowPathIcon
  },
  defaults: {
    rounded: RoundedEnum.lg
  }
} as ButtonConfig;

export default config;