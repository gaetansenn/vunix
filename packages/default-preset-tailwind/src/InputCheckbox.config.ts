import type { InputCheckboxConfig } from '@vunix/core'

const config = {
  class: 'flex flex-col',
  wrapper: {
    class: 'flex items-center font-medium relative',
    input: {
      class: 'grid place-content-center appearance-none shrink-0 peer',
      variants: {
        default: `min-h-[10px] min-w-[10px] w-5 h-5 focus:outline-none border-[1.5px] rounded-md border-gray-300 dark:border-white checked:bg-blue-600 dark:checked:border-blue-600 checked:border-blue-600 checked:focus:outline-offset-0 checked:focus:outline-2 checked:focus:outline-blue-400 focus:border-blue-400`,
      }
    },
    checked: {
      class: 'absolute hidden text-white left-[2px] peer-checked:inline-flex',
      icon: 'heroicons-solid:check',
      size: '16px'
    },
    indeterminate: {
      class: 'absolute hidden bg-blue-600 rounded w-3 h-3 left-[4px] peer-indeterminate:inline-flex',
    },
    label: {
      class: 'pl-2 text-gray-900 dark:text-gray-100 text-sm ',
    }
  },
  bottom: {
    class: 'text-gray-500 dark:text-gray-400 ml-7 text-xs'
  }
} as InputCheckboxConfig;

export default config;