// @ts-ignore
import { defineNuxtPlugin, useAppConfig } from '#app'
import { defineConfig, Config } from '@vunix/core';
import defaultPreset from '@vunix/default-preset-tailwind';

export default defineNuxtPlugin(async (nuxtApp) => {
  const appConfig = useAppConfig();
  let preset = appConfig.vunix?.preset

  if (!preset) preset = defaultPreset

  const config = defineConfig({
    config: appConfig.vunix?.config,
    app: nuxtApp.vueApp,
    preset: preset as Config
  })

  return {
    provide: {
      vunix: {
        config
      }
    }
  }
})