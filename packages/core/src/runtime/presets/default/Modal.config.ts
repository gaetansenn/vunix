import type { DeepPartial } from '../../utils/types';
import type { ModalConfig } from '../../components/overlay/modal/Modal.config'
import { SizeEnum } from '../../utils/config';

const config = {
  overlay: {
    class: 'fixed inset-0 z-dw-modal overflow-y-auto'
  },
  backdrop: {
    wrapper: 'fixed inset-0 transition-opacity',
    class: 'absolute inset-0 bg-black opacity-75'
  },
  wrapper: 'flex items-center justify-center p-4 min-h-screen',
  modal: {
    wrapper: 'transform transition-all overflow-hidden sm:w-full sm:max-w-lg flex flex-col justify-center bg-white dark:bg-gray-800 relative',
    transition: {
      enter: {
        fixed: 'ease-out duration-300',
        from: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        to: 'opacity-100 translate-y-0 sm:scale-100'
      },
      leave: {
        fixed: 'ease-in duration-200',
        from: 'opacity-100 translate-y-0 sm:scale-100',
        to: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
      }
    },
    // Config for default slot injected with title props
    header: {
      class: 'p-5 font-semibold text-2xl sm:text-3xl leading-tight mr-8 text-black dark:text-white',
      close: {
        class: 'absolute top-3 right-4 text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-300 cursor-pointer',
        icon: 'heroicons-solid:x',
        sizes: {
          [SizeEnum.sm]: '1.25rem',
          [SizeEnum.md]: '1.375rem',
          [SizeEnum.lg]: '1.5rem',
        },
      }
    },
    content: {
      class: 'p-5 text-black dark:text-white mr-5'
    },
    footer: {
      class: 'p-5 text-black dark:text-white'
    }
  }
} as DeepPartial<ModalConfig>;

export default config;