import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import { reveal } from '@/directives/reveal'
import { tilt } from '@/directives/tilt'
import router from '@/router'

import '@/assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Global, reusable motion directives
app.directive('reveal', reveal)
app.directive('tilt', tilt)

app.mount('#app')
