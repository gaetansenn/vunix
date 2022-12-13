import { defineConfig } from '@vunix/core/dist/runtime/utils/config';

export default defineNuxtPlugin((nuxtApp) => {
    const config = JSON.parse('<%= options.config %>')

    defineConfig(config, nuxtApp.vueApp)
})