import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { uiVue } from 'ui-vue'

import './assets/main.css'

const app = createApp(App).use(uiVue)

app.use(router)

app.mount('#app')
