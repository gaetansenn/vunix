import type { ModalConfig } from '../../components/others/modal/Modal.config'

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
    wrapper: 'transform transition-all overflow-hidden sm:w-full sm:max-w-lg flex justify-center',
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
      class: 'font-semibold text-2xl sm:text-3xl leading-tight text-left mr-8',
      icon: {
        class: 'absolute h-6 w-6 flex-shrink-0 text-black hover:text-gray-700 cursor-pointer right-0 top-0 mt-1',
        icon: 'heroicons-solid:x'
      }
    }
  }
} as ModalConfig;

export default config;