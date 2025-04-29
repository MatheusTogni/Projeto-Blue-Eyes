import { registerPlugins } from '@/plugins'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'


import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

registerPlugins(app)
app.use(router)
app.mount('#app')

registerSW({ immediate: true })
