import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// ⬇️ PENTING
import MainLayout from '../layouts/MainLayout.vue'

// ⬇️ halaman dalam layout
import Dashboard from '../views/Dashboard.vue'
import Setting from '../views/setting.vue'
import History from '../views/history.vue'

const routes = [
  // HALAMAN TANPA LOGIN
  { path: '/', component: Login },
  { path: '/register', component: Register },

  // HALAMAN DENGAN SIDEBAR
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'setting', component: Setting },
      { path: 'history', component: History }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router