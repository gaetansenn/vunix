
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['vunix-nuxt']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['vunix-nuxt']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
