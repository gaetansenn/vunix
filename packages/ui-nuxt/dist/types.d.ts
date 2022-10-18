
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['ui-nuxt']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['ui-nuxt']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
