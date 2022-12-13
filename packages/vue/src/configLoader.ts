import { Config, defineConfig } from '@vunix/core/dist/runtime/utils/config'
import { App } from 'vue'

export default function (app: App, config: Config) {
    defineConfig(config, app)
}