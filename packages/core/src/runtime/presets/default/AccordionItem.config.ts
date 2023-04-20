import { SizeEnum } from '../../utils/config';
import type { AccordionItemConfig } from '../../components/disclosure/accordion/item/AccordionItem.config'

const config = {
  header: {
    class: 'border-b border-gray-200',
    button: {
      class: 'flex items-center justify-between w-full rounded-none',
      sizes: {
        [SizeEnum.sm]: 'px-2 py-2',
        [SizeEnum.md]: 'px-2 py-2',
        [SizeEnum.lg]: 'px-2 py-2',
        [SizeEnum.xl]: 'px-2.5 py-2.5'
      },
      content: {
        class: 'font-medium grow text-left',
        sizes: {
          [SizeEnum.sm]: 'text-sm',
          [SizeEnum.md]: '',
          [SizeEnum.lg]: 'text-xl',
          [SizeEnum.xl]: 'text-2xl'
        },
      },
      icon: {
        class: ({ opened }) => {
          const classes = 'transition transform duration-500 ease-in-out'

          return opened.value ? `rotate-180 ${classes} text-blue-600 hover:text-blue-700` : `text-gray-300 hover:text-gray-400 ${classes}`
        },
        icon: 'heroicons-solid:chevron-down',
        sizes: {
          [SizeEnum.sm]: '1.25rem',
          [SizeEnum.md]: '1.5rem',
          [SizeEnum.lg]: '1.75rem',
          [SizeEnum.xl]: '1.75rem'
        },
      }
    },
  },
  content: {
    class: 'p-2'
  }
} as AccordionItemConfig;

export default config;