
// @ts-ignore
import { defineNuxtPlugin } from '#app'
import { defineConfig, Config } from '@vunix/core/dist/runtime/utils/config';

export default defineNuxtPlugin(async (nuxtApp) => {
  const appConfig = useAppConfig();
  let preset = appConfig.vunix?.preset

  if (!preset) preset = await import('@vunix/core/dist/runtime/presets/default/index').then((m) => m.default)

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