import type { CardConfig } from '../../components/data-display/card/Card.config';
import { RoundedEnum, ShadowEnum, SizeEnum } from '../../utils/config';

const sizes = {
  [SizeEnum.sm]: 'p-2',
  [SizeEnum.md]: 'p-3',
  [SizeEnum.lg]: 'p-4',
}

const config = {
  class: 'transition-shadow ease-in-out duration-75 bg-white dark:bg-gray-700 flex flex-col',
  AccordionItem: {
    header: {
      class({ opened, parent }) {
        if (opened.value || parent?.slots.footer) return 'border-b border-gray-200'
      },
      button: {
        sizes
      }
    },
    content: {
      sizes
    }
  },
  header: {
    class: 'border-b border-gray-200 font-medium grow text-left',
    sizes: {
      [SizeEnum.sm]: 'text-sm p-2',
      [SizeEnum.md]: 'p-3',
      [SizeEnum.lg]: 'text-xl p-4',
    },
  },
  content: {
    sizes
  },
  footer: {
    sizes
  },
  defaults: {
    rounded: RoundedEnum.lg,
    shadow: ShadowEnum.sm
  }
} as CardConfig;

export default config;