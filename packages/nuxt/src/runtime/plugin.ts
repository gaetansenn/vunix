import { defineConfig, Config } from '@vunix/core/dist/runtime/utils/config';

export default defineNuxtPlugin(async (nuxtApp) => {

  const config = useAppConfig();
  let preset = config.vunix?.preset

  if (!preset) preset = await import('@vunix/core/dist/runtime/presets/default/index').then((m) => m.default)

  defineConfig({
    config: config.vunix?.config,
    app: nuxtApp.vueApp,
    preset: preset as Config
  })
})