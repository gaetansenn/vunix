import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { plugin } from '@vunix/vue'
import config from '../vunix.config'

import './assets/main.css'

const app = createApp(App)

app.use(router).use(plugin(config))

app.mount('#app')
