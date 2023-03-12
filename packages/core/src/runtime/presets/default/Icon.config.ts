
import type { IconConfig } from '../../components/icon/Icon.config';
import { SizeEnum } from '../../utils/config';

const config = {
  class: 'inline align-middle',
  variants: {
    default: '',
  },
  sizes: {
    [SizeEnum.sm]: '1em',
    [SizeEnum.md]: '2em',
    [SizeEnum.lg]: '3em',
  },
  defaults: {
    size: SizeEnum.md
  }
} as IconConfig;

export default config;