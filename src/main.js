import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'   // 🔥 INI YANG KURANG
import VueApexCharts from 'vue3-apexcharts'


const app = createApp(App)
app.component('apexchart', VueApexCharts)
app.use(router)
app.use(createPinia())

app.mount('#app')