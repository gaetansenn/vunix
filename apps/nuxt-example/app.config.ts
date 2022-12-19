export default defineAppConfig({
  vunix: {
    config: {
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
    },
  }
})