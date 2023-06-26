import type { DeepPartial } from '../../utils/types';
import type { DialogConfig } from '../../components/overlay/dialog/Dialog.config'

const config = {
  Modal: {
    modal: {
      header: {
        class: 'p-5 pb-1 font-semibold text-lg sm:text-xl leading-tight mr-8 text-black dark:text-white',
      },
      footer: {
        class: 'p-5 sm:flex sm:flex-row-reverse'
      }
    }
  },
  button: {
    cancel: {
      fixed: 'mt-3 sm:mt-0 sm:w-auto',
      variant: 'outline-blue-500'
    },
    submit: {
      fixed: 'sm:ml-3 sm:w-auto',
      variant: 'blue-500'
    }
  },
  plugin: true
} as DeepPartial<DialogConfig>;

export default config;