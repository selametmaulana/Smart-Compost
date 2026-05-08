<template>

  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <div>

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
            to="/dashboard/setting"
            class="menu-item"
            active-class="active"
          >
            <i class="ri-settings-3-line"></i>
            <span>Pengaturan</span>
          </router-link>

        </nav>

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
</script>

<style scoped>

.layout{
  display:flex;
  min-height:100vh;
  background:#f5f7fb;
}

/* SIDEBAR */

.sidebar{
  width:260px;
  min-height:100vh;
  background:linear-gradient(180deg,#031b08,#0d3b1c);
  padding:30px 20px;
  color:white;
}

.logo{
  font-size:32px;
  font-weight:800;
  margin-bottom:40px;
}

.menu{
  display:flex;
  flex-direction:column;
  gap:12px;
}

.menu-item{
  display:flex;
  align-items:center;
  gap:14px;
  padding:15px 18px;
  border-radius:16px;
  color:white;
  text-decoration:none;
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
  background:#36a536;
  box-shadow:0 10px 25px rgba(54,165,54,0.3);
}

/* CONTENT */

.main-content{
  flex:1;
  padding:25px;
  overflow:auto;
}

</style>