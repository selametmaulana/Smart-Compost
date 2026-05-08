import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/MainLayout.vue'

// HOME
import Home from '../views/home.vue'

// DASHBOARD PAGES
import Dashboard from '../views/Dashboard.vue'
import Perangkat from '../views/perangkat.vue'
import History from '../views/history.vue'
import Notifikasi from '../views/notifikasi.vue'
import Pengaturan from '../views/pengaturan.vue'
import Setting from '../views/setting.vue'

const routes = [

  // =========================
  // HOME LANDING PAGE
  // =========================
  {
    path: '/',
    component: Home
  },

  // =========================
  // DASHBOARD ROUTES
  // =========================
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: Dashboard
      },
      {
        path: '/dashboard/perangkat',
        component: Perangkat
      },
      {
        path: '/dashboard/history',
        component: History
      },
      {
        path: '/dashboard/notifikasi',
        component: Notifikasi
      },
      {
        path: '/dashboard/pengaturan',
        component: Pengaturan
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router