import type { ConfigTransitionConfig } from '../../components/transitions/config/ConfigTransition.config';

const config = {
  enter: {
    fixed: 'ease-out duration-300',
    from: 'opacity-0',
    to: 'opacity-100'
  },
  leave: {
    fixed: 'ease-in duration-200',
    from: 'opacity-100',
    to: 'opacity-0'
  }
} as ConfigTransitionConfig;

export default config;