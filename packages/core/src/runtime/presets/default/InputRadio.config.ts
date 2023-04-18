import type { InputRadioConfig } from '../../components/form/input/radio/InputRadio.config'

const config = {
  class: 'flex flex-col',
  wrapper: {
    class: 'flex items-center font-medium',
    input: {
      class: 'grid place-content-center appearance-none shrink-0 after:transition-transform	after:duration-100 after:ease-in-out',
      variants: {
        default: `min-h-[10px] min-w-[10px] w-5 h-5 focus:outline-none border-2 rounded-full after:bg-[CanvasText] border-gray-300 dark:border-white focus:border-blue-400 after:content-[''] after:w-[10px] after:h-[10px] after:rounded-lg after:scale-0 checked:after:scale-100 after:shadow-[inset_1em_1em_#2563EB]`,
      }
    },
    label: {
      class: 'pl-2 text-gray-900 dark:text-gray-100 text-sm',
    }
  },
  bottom: {
    class: 'text-gray-500 dark:text-gray-400 ml-7 text-xs'
  }
} as InputRadioConfig;

export default config;