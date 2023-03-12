
import type { InputGroupConfig } from '../../components/form/input/group/InputGroup.config';
import { SizeEnum } from '../../utils/config';

const config = {
  class: ({ props }) => {
    if (props.inline) return 'sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200'

    return 'flex flex-col'
  },
  label: {
    wrapper: 'inline-flex items-center mb-2',
    class: 'inline align-center font-semibold text-gray-900',
    required: 'inline-flex text-red-600',
    sizes: {
      [SizeEnum.sm]: 'text-base',
      [SizeEnum.md]: 'text-base',
      [SizeEnum.lg]: 'px-4 py-2 text-xl',
    },
    optional: 'text-gray-500 pl-2 font-light text-xs'
  },
  bottom: {
    class: 'inline-flex relative',
    validation: {
      class: 'text-red-600 pt-1 pl-1 text-xs',
      sizes: {
        [SizeEnum.sm]: 'text-sm',
        [SizeEnum.md]: 'text-sm',
        [SizeEnum.lg]: 'text-base',
      }
    },
    description: {
      class: 'text-xs text-gray-500 pl-1 pt-1'
    }
  }
} as InputGroupConfig;

export default config;