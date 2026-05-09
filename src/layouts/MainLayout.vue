<template>

  <div class="layout">




    <!-- SIDEBAR -->
    <!-- SIDEBAR -->
    <aside  class="sidebar">

<!-- ATAS -->
<div class="sidebar-top">

  <h1 class="logo">
    SmartCompost
  </h1>

  <nav class="menu">

    <!-- DASHBOARD -->
    <router-link
      to="/dashboard"
      class="menu-item"
      active-class="active"
    >
      <i class="ri-dashboard-line"></i>
      <span>Dashboard</span>
    </router-link>

    <!-- PERANGKAT -->
    <router-link
      to="/dashboard/perangkat"
      class="menu-item"
      active-class="active"
    >
      <i class="ri-cpu-line"></i>
      <span>Perangkat</span>
    </router-link>

    <!-- HISTORY -->
    <router-link
      to="/dashboard/history"
      class="menu-item"
      active-class="active"
    >
      <i class="ri-bar-chart-line"></i>
      <span>History</span>
    </router-link>

    <!-- NOTIFIKASI -->
    <router-link
      to="/dashboard/notifikasi"
      class="menu-item"
      active-class="active"
    >
      <i class="ri-notification-3-line"></i>
      <span>Notifikasi</span>
    </router-link>

    <!-- PENGATURAN -->
    <router-link
      to="/dashboard/pengaturan"
      class="menu-item"
      active-class="active"
    >
      <i class="ri-settings-3-line"></i>
      <span>Pengaturan</span>
    </router-link>

  </nav>

</div>

<!-- PALING BAWAH -->
<div class="sidebar-card">

  <Leaf size="28" />

  <div>
    <h3>Kompos Berkualitas</h3>
    <p>Lingkungan Terjaga</p>
  </div>

</div>

</aside>

    <!-- CONTENT -->
    <main class="main-content">

      <!-- HALAMAN AKAN MUNCUL DI SINI -->
      <router-view />

    </main>

  </div>

</template>

<script setup>
import { ref } from 'vue'

const showSidebar = ref(false)
</script>

<style scoped>

.layout{ 
  width:100%; 
  min-height:100vh; 
  display:flex; 
  gap:20px; 
  padding:18px; 
  background:#E9ECE8; }

/* SIDEBAR */


/* BAGIAN ATAS */
.sidebar-top{
  display:flex;
  flex-direction:column;
}

/* LOGO */
.logo{
  color:white;
  font-size:24px;
  font-weight:800;
  margin-bottom:42px;
}

/* MENU */
.menu{
  display:flex;
  flex-direction:column;
  gap:14px;
}

.menu-item{
  display:flex;
  align-items:center;
  gap:14px;

  color:white;
  text-decoration:none;

  padding:16px 18px;
  border-radius:18px;

  transition:0.3s;

  font-size:17px;
  font-weight:500;
}

.menu-item i{
  font-size:22px;
}

.menu-item:hover{
  background:rgba(255,255,255,0.08);
}

.menu-item.active{
  background:#52B84E;
}

/* CARD PALING BAWAH */
.sidebar-card{
  background:rgba(255,255,255,0.08);
  border-radius:24px;

  padding:24px;

  display:flex;
  gap:15px;
  align-items:center;

  color:white;
}

.sidebar-card h3{
  font-size:16px;
  margin-bottom:4px;
}

.sidebar-card p{
  font-size:13px;
  opacity:0.8;
}

</style>