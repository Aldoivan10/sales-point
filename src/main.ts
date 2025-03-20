import '@quasar/extras/material-icons-round/material-icons-round.css'
import 'quasar/src/css/index.sass'
import '@/assets/main.css'

import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import { ApiCLientPlugin } from '@aldoivan10/v-api-client'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { theme, VITE_API_URL } from './config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ApiCLientPlugin, { baseUrl: VITE_API_URL })
app.use(Quasar, theme)

app.mount('#app')
