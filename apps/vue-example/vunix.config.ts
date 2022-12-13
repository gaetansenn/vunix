import type { Config } from '@vunix/core'

export default {
    Button: {
      class: 'tt',
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
} as Config