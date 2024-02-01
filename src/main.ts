import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import initInjects from './injects'

import '@/styles/global.css'

const app = createApp(App)
app.use(router)
initInjects(app)

app.mount('#app')
