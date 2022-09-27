
import { ModuleOptions, ModuleHooks } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['ui-nuxt']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['ui-nuxt']?: ModuleOptions }
  interface NuxtHooks extends ModuleHooks {}
}


export { default } from './module'
