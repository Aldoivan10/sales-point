import '@/assets/main.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import 'quasar/src/css/index.sass'

import { ApiCLientPlugin } from '@aldoivan10/v-api-client'
import { VShortcut } from '@aldoivan10/v-shortcut'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import { createApp } from 'vue'

import App from './App.vue'
import { theme, VITE_API_URL } from './config'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VShortcut)
app.use(ApiCLientPlugin, { baseUrl: VITE_API_URL })
app.use(Quasar, theme)

app.mount('#app')
