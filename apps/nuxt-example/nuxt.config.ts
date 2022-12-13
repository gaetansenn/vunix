import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    ['@vunix/nuxt']
  ],
  ssr: false,
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
    }
  }
})
