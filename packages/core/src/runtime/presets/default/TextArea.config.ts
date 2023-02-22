
import type { TextAreaConfig } from '../../../runtime/components/forms/textArea/TextArea.config';
import { RoundedEnum, SizeEnum } from '../../utils/config';

const config = {
  class: 'placeholder:transition-all focus:placeholder:pl-1 appearance-none bg-transparent focus:outline-none w-full',
  variants: {
    default: ({ props }) => {
      const focused = props.error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-blue-300 focus:ring-blue-300'

      return `bg-gray-100 border text-gray-800 placeholder:text-gray-500 disabled:placeholder:text-gray-400 focus:ring-1 ${focused}`
    }
  },
  sizes: {
    [SizeEnum.sm]: 'px-3 py-2 text-xs',
    [SizeEnum.md]: 'px-3 py-2 text-sm',
    [SizeEnum.lg]: 'px-4 py-2 text-xl',
  },
  defaults: {
    rounded: RoundedEnum.lg
  },
  counter: {
    class: 'absolute right-0 top-0 text-xs font-medium',
    currentLength: 'text-gray-700',
    spliter: 'text-gray-500',
    totalLength: 'text-gray-500'
  },
  InputGroup: {
    bottom: {
      class: 'inline-flex relative pr-5 mt-1'
    }
  }
} as TextAreaConfig;

export default config;