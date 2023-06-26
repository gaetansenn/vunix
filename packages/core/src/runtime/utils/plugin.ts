import type { App } from "vue";

import type { Config } from "./config";

export interface PluginList {
  dialog: boolean;
}

export const defaultPlugins: PluginList = {
  dialog: true
}

export const pluginPaths = {
  dialog: 'overlay/dialog/plugin.mjs'
}

export default function (config: Config, app: App) {
  Object.values(config).filter(component => component.plugin).map((component) => {
    app.use(component)
  })
}