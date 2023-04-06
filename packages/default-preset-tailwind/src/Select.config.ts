import type { SelectConfig } from '@vunix/core';
import { SizeEnum } from '@vunix/core';

const config = {
  class: 'focus:outline-none font-medium',
  variants: {
    default: ({ props }) => {
      const focused = props.error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-blue-300 focus:ring-blue-300'

      return `bg-gray-100 dark:text-gray-700 hover:bg-gray-200 focus:ring-2 disabled:text-gray-400 ${focused}`
    }
  },
  sizes: {
    [SizeEnum.sm]: 'pl-3 py-1.5 text-xs',
    [SizeEnum.md]: 'px-3 py-2 text-sm',
    [SizeEnum.lg]: 'px-3 py-1 text-xl',
  },
  carret: {
    class: 'bg-no-repeat appearance-none',
    icon: 'heroicons-solid:chevron-down',
    fill: 'rgb(156, 163, 175)',
    sizes: {
      [SizeEnum.sm]: 'bg-[length:20px_20px] bg-[right_4px_center]',
      [SizeEnum.md]: 'bg-[length:24px_24px] bg-[right_6px_center]',
      [SizeEnum.lg]: 'bg-[length:24px_24px] bg-[right_10px_center]',
    }
  }
} as SelectConfig;

export default config;