import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import store from './store/store'
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

const app = createApp(App)

// Use plugins
app.use(router)
app.use(store)
app.use(VCalendar, {})

// Mount the app
app.mount('#app')
