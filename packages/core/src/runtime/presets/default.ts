import { Config } from "../utils/config";

export default {
    Button: {
        class: 'vunix-preset',
        variants: {
          default: 'toto'
        },
        variant: () => {
          return ''
        },
        loading: {
          fixed: 'tt',
          size: 'tt',
          icon: 'tt'
        }
      }
} as Config;