import { createRouter, createWebHistory } from 'vue-router'

// HOME
import Home from '../views/home.vue'

// LAYOUT

// HALAMAN DASHBOARD
import Dashboard from '../views/Dashboard.vue'
import Setting from '../views/setting.vue'
import History from '../views/history.vue'

const routes = [

  // HOME LANDING PAGE
  {
    path: '/',
    component: Home
  },

  // HALAMAN DENGAN SIDEBAR
  {
    path: '/dashboard',
    children: [

      // default /dashboard
      {
        path: '',
        component: Dashboard
      },

      // /dashboard/setting
      {
        path: 'setting',
        component: Setting
      },

      // /dashboard/history
      {
        path: 'history',
        component: History
      }

    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router