import '@quasar/extras/material-icons-round/material-icons-round.css'
import 'quasar/src/css/index.sass'
import './assets/main.css'

import { createPinia } from 'pinia'
import { Quasar, Dialog, Notify } from 'quasar'
import quasarLang from 'quasar/lang/es'
import { ApiCLientPlugin } from '@aldoivan10/v-api-client'
import { createApp } from 'vue'
import iconSet from 'quasar/icon-set/material-icons-round'

import App from './App.vue'
import router from './router'
import { VITE_API_URL } from './config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ApiCLientPlugin, { baseUrl: VITE_API_URL })
app.use(Quasar, {
    plugins: { Dialog, Notify },
    config: {
        brand: {
            primary: '#F28028',
            secondary: '#F26929',
            accent: '#9C27B0',

            dark: '#333333',
            'dark-page': '#1d1d1d',

            positive: '#21BA45',
            negative: '#f44336',
            info: '#448aff',
            warning: '#fec408',
        },
        notify: {
            actions: [
                {
                    icon: 'r_close',
                    color: 'white',
                    round: true,
                    size: 'sm',
                },
            ],
            timeout: 5000,
        },
    },
    iconSet,
    lang: quasarLang,
})

app.mount('#app')
