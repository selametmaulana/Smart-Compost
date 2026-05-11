<template>

  <div class="layout">

    <!-- SIDEBAR -->
  
<aside class="sidebar">

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
      exact-active-class="active"
    >
      <i class="ri-dashboard-line"></i>
      <span>Dashboard</span>
    </router-link>

    <!-- PERANGKAT -->
    <router-link
      to="/dashboard/perangkat"
      class="menu-item"
      exact-active-class="active"
    >
      <i class="ri-cpu-line"></i>
      <span>Perangkat</span>
    </router-link>

    <!-- HISTORY -->
    <router-link
      to="/dashboard/history"
      class="menu-item"
      exact-active-class="active"
    >
      <i class="ri-bar-chart-line"></i>
      <span>History</span>
    </router-link>

    <!-- NOTIFIKASI -->
    <router-link
      to="/dashboard/notifikasi"
      class="menu-item"
      exact-active-class="active"
    >
      <i class="ri-notification-3-line"></i>
      <span>Notifikasi</span>
    </router-link>

    <!-- PENGATURAN -->
    <router-link
      to="/dashboard/pengaturan"
      class="menu-item"
      exact-active-class="active"
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

import { onMounted } from 'vue'

onMounted(() => {

  const saved =
    JSON.parse(
      localStorage.getItem('system_settings')
    )

  if(saved?.theme === 'dark'){

    document.body.classList.add('dark-mode')

  }else{

    document.body.classList.remove('dark-mode')

  }

})

</script>

<style scoped>

.layout{ 
  width:100%; 
  min-height:100vh; 
  display:flex; 
  gap:20px; 
  padding:18px; 
  background:#E9ECE8;
}

/* =========================
   SIDEBAR
========================= */

.sidebar{
  width:260px;
  height:calc(100vh - 36px);
  position:sticky;
  top:18px;
  background:linear-gradient(180deg,#08240d,#123c18);
  border-radius:38px;
  padding:36px 22px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  box-shadow:0 10px 30px rgba(0,0,0,0.08);
}

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

/* DEFAULT MENU */
.menu-item{
  display:flex;
  align-items:center;
  gap:14px;
  color:#ffffff;
  text-decoration:none;
  padding:16px 18px;
  border-radius:18px;
  transition:0.3s;
  font-size:17px;
  font-weight:500;
  position:relative;
}

/* ICON */
.menu-item i{
  font-size:22px;
}

/* HOVER */
.menu-item:hover{
  background:rgba(255,255,255,0.08);
  color:white;
}

/* =========================
   ACTIVE MENU
   HIJAU HANYA 1
========================= */

.menu-item.active{
  background:#22c55e;
  color:white;

  box-shadow:
  0 10px 25px rgba(34,197,94,.35);
}

/* HAPUS GARIS PUTIH BAWAH */
.menu-item.active::after{
  display:none;
}

/* CARD BAWAH */
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

/* =========================
   DARK MODE
========================= */

body.dark-mode .layout{

  background:
  radial-gradient(
    circle at top left,
    #000000,
    #020617 45%
  );

}

/* SIDEBAR */
body.dark-mode .sidebar{

  background:
  linear-gradient(
    180deg,
    #03120a,
    #020617
  );

  border:1px solid rgba(0,255,120,.08);

  box-shadow:
  0 0 30px rgba(0,255,120,.08);

}

/* =========================
   TEXT WAJIB PUTIH
========================= */

body.dark-mode .logo,
body.dark-mode .menu-item,
body.dark-mode .menu-item i,
body.dark-mode .sidebar-card,
body.dark-mode .sidebar-card h3,
body.dark-mode .sidebar-card p{

  color:#ffffff;

}

body.dark-mode .menu-item i {
  color: #fff !important;
}

/* MENU HOVER */
body.dark-mode .menu-item:hover{

  background:rgba(255,255,255,.05);

}

/* ACTIVE MENU */
body.dark-mode .menu-item.active{

  background:
  linear-gradient(
    90deg,
    #15803d
  );

  color:#ffffff;

  box-shadow:
  0 0 25px rgba(34,197,94,.35);

}

/* HAPUS GARIS PUTIH ACTIVE */
body.dark-mode .menu-item.active::after{
  display:none;
}

/* SIDEBAR CARD */
body.dark-mode .sidebar-card{

  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.06);
  backdrop-filter:blur(14px);

}

/* RESPONSIVE */
@media(max-width:768px){

  .sidebar{
    width:100%;
    height:auto;
    position:relative;
  }

}

</style>