<template>
  <div class="layout">

    <!-- TOPBAR -->
    <div class="topbar">
      <div class="menu-btn" @click="toggleSidebar">☰</div>
      <h3>🌱 Smart Compost</h3>
      
    </div>

    <!-- SIDEBAR -->
    <div :class="['sidebar', { show: isOpen }]">
      <h2 class="logo">🌱 Smart Compost</h2>

      <ul>
        <li @click="$router.push('/dashboard')">
          <LayoutDashboard class="icon" />
          Dashboard
        </li>

        <li @click="$router.push('/setting')">
          <Settings class="icon" />
          Settings
        </li>

        <li @click="$router.push('/history')">
  <History class="icon" />
  History
</li>

        <li @click="logout">
          <LogOut class="icon" />
          Logout
        </li>
      </ul>
    </div>

    <!-- OVERLAY (mobile) -->
    <div v-if="isOpen" class="overlay" @click="toggleSidebar"></div>

    <!-- MAIN CONTENT -->
    <div class="main">
      <router-view />
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import {
  LayoutDashboard,
  Settings,
  History,
  LogOut
} from 'lucide-vue-next'

const router = useRouter()

const isOpen = ref(false)
const user = ref(null)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const logout = () => {
  router.push('/')
}

onMounted(() => {
  user.value = { name: "Guest" }
})
</script>
<style scoped>

/* ======================
   LAYOUT
====================== */
.layout {
  display: flex;
}

/* ======================
   TOPBAR
====================== */
.topbar {
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  height: 60px;
  background: #000000;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
}

/* MENU BUTTON */
.menu-btn {
  display: none;
  font-size: 22px;
  cursor: pointer;
}

/* ======================
   SIDEBAR
====================== */
.sidebar {
  width: 220px;
  background: linear-gradient(#1b5e20, #66bb6a);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 20px;
  z-index: 1100;
  transition: 0.3s;
}

.logo {
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;
}

.sidebar li:hover {
  background: rgba(255,255,255,0.15);
}

.sidebar .active {
  background: rgba(255,255,255,0.25);
}

/* ICON */
.icon {
  width: 20px;
  height: 20px;
}

/* ======================
   MAIN CONTENT
====================== */
.main {
  margin-left: 220px;
  margin-top: 60px;
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

/* ======================
   OVERLAY (mobile)
====================== */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
}

/* ======================
   MOBILE RESPONSIVE
====================== */
@media (max-width: 768px) {

  .topbar {
    left: 0;
  }

  .menu-btn {
    display: block;
  }

  .sidebar {
    left: -250px;
  }

  .sidebar.show {
    left: 0;
  }

  .main {
    margin-left: 0;
    padding: 80px 20px 20px;
  }
}

</style>