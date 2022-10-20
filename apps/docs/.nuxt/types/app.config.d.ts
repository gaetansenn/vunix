
import type { Defu } from 'defu'
import cfg0 from "/Users/gaetansenn/Development/dewib/librairies/ui/apps/docs/app.config"
import cfg1 from "/Users/gaetansenn/Development/dewib/librairies/ui/node_modules/@nuxt-themes/docus-edge/app.config"

declare const inlineConfig = {}
type ResolvedAppConfig = Defu<typeof inlineConfig, [typeof cfg0, typeof cfg1]>

declare module '@nuxt/schema' {
  interface AppConfig extends ResolvedAppConfig { }
}
