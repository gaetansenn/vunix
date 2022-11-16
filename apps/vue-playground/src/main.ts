import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { uiVue } from '@vunix/vue'

import './assets/main.css'

const app = createApp(App).use(uiVue)

app.use(router)

app.mount('#app')
