import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: 'dark:bg-black'
      }
    }
  },
  modules: [
    '@vunix/nuxt'
  ],
  // vunix: {
  //   disabledPlugins: {
  //     dialog: false
  //   }
  // },
  ssr: false,
})
