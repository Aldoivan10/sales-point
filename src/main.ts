import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './assets/main.css'

import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/es'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    config: {
        brand: {
            primary: '#ffc107',
            secondary: '#ff9800',
            accent: '#9C27B0',

            dark: '#333333',
            'dark-page': '#1d1d1d',

            positive: '#21BA45',
            negative: '#f44336',
            info: '#448aff',
            warning: '#fec408'
        }
    },
    lang: quasarLang,
})

app.mount('#app')
