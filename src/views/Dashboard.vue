<template>
  <div class="dashboard-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div>
        <h1 class="logo">SmartCompost</h1>

        <nav class="menu">
          <div class="menu-item active">
            <span>⬚</span>
            Dashboard
          </div>

          <div class="menu-item">
            <span>⚙</span>
            Perangkat
          </div>

          <div class="menu-item">
            <span>📊</span>
            Data & Riwayat
          </div>

          <div class="menu-item">
            <span>🔔</span>
            Notifikasi
          </div>

          <div class="menu-item">
            <span>⚙</span>
            Pengaturan
          </div>
        </nav>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="main-content">

      <!-- TOP -->
      <div class="topbar">
        <h1>Dashboard</h1>
        <p>• Terakhir diperbarui: 10:30 WIB</p>
      </div>

      <!-- CARD SENSOR -->
      <div class="sensor-grid">

        <div class="sensor-card">
          <div class="icon">🌡</div>
          <h3>Suhu</h3>
          <h1>48.6°C</h1>
          <p class="status">● Optimal</p>
        </div>

        <div class="sensor-card">
          <div class="icon">💧</div>
          <h3>Kelembapan</h3>
          <h1>58%</h1>
          <p class="status">● Optimal</p>
        </div>

        <div class="sensor-card">
          <div class="icon">⚗</div>
          <h3>pH</h3>
          <h1>7.2</h1>
          <p class="status">● Optimal</p>
        </div>

        <div class="sensor-card">
          <div class="icon">💨</div>
          <h3>Oksigen</h3>
          <h1>18.6%</h1>
          <p class="status">● Optimal</p>
        </div>

      </div>

      <!-- BOTTOM -->
      <div class="bottom-grid">

        <!-- GRAFIK -->
        <div class="chart-card">

          <div class="chart-top">
            <h3>Grafik Suhu (7 Hari)</h3>

            <div class="day-btn">
              7 Hari
            </div>
          </div>

          <div class="chart-area">

            <svg
              viewBox="0 0 600 250"
              preserveAspectRatio="none"
              class="chart-svg"
            >
              <line
                x1="40"
                y1="170"
                x2="560"
                y2="120"
                stroke="#4CAF50"
                stroke-width="5"
                stroke-linecap="round"
              />
            </svg>

          </div>

        </div>

        <!-- STATUS -->
        <div class="status-card">

          <div class="status-circle">
            ✓
          </div>

          <h2>Optimal</h2>

          <p class="status-text">
            Proses berjalan dengan baik
          </p>

          <div class="recommend-box">
            <h4>Rekomendasi</h4>

            <p>
              Pertahankan kelembapan dan aerasi untuk hasil optimal.
            </p>
          </div>

        </div>

      </div>

    </main>

  </div>
</template>

<script setup>
</script>

<style scoped>

/* IMPORT FONT */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Poppins', sans-serif;
}

body{
  background:#EDEEEE;
}

/* LAYOUT */
.dashboard-layout{
  width:100%;
  min-height:100vh;
  display:flex;
  gap:20px;
  padding:18px;
  background:#EDEEEE;
}

/* SIDEBAR */
.sidebar{
  width:270px;
  background:linear-gradient(180deg,#012C06,#083D0D,#114915);
  border-radius:38px;
  padding:36px 28px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.logo{
  color:white;
  font-size:24px;
  font-weight:800;
  margin-bottom:45px;
}

.menu{
  display:flex;
  flex-direction:column;
  gap:18px;
}

.menu-item{
  color:white;
  display:flex;
  align-items:center;
  gap:14px;
  padding:16px 16px;
  border-radius:18px;
  font-size:18px;
  font-weight:500;
  cursor:pointer;
  transition:0.3s;
}

.menu-item.active{
  background:#52B84E;
}

.menu-item:hover{
  background:rgba(255,255,255,0.1);
}

/* MAIN */
.main-content{
  flex:1;
  display:flex;
  flex-direction:column;
}

/* TOPBAR */
.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:25px;
}

.topbar h1{
  font-size:56px;
  font-weight:800;
  color:#000;
}

.topbar p{
  color:#777;
  font-size:18px;
}

/* SENSOR GRID */
.sensor-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-bottom:22px;
}

.sensor-card{
  background:#F4F4F4;
  border-radius:28px;
  padding:26px 22px;
  min-height:220px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.icon{
  font-size:28px;
  margin-bottom:10px;
}

.sensor-card h3{
  font-size:20px;
  color:#666;
  margin-bottom:18px;
  font-weight:600;
}

.sensor-card h1{
  font-size:48px;
  font-weight:800;
  margin-bottom:18px;
}

.status{
  color:#49AF4E;
  font-size:22px;
  font-weight:500;
}

/* BOTTOM */
.bottom-grid{
  display:grid;
  grid-template-columns:2.2fr 1fr;
  gap:18px;
  flex:1;
}

/* CHART */
.chart-card{
  background:#F4F4F4;
  border-radius:32px;
  padding:24px;
}

.chart-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:24px;
}

.chart-top h3{
  font-size:28px;
  font-weight:700;
}

.day-btn{
  background:white;
  padding:12px 18px;
  border-radius:14px;
  font-weight:600;
  font-size:18px;
}

.chart-area{
  width:100%;
  height:420px;
  background:#EDF4ED;
  border-radius:28px;
  overflow:hidden;
  position:relative;
}

.chart-svg{
  width:100%;
  height:100%;
}

/* STATUS */
.status-card{
  background:#F4F4F4;
  border-radius:32px;
  padding:28px;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.status-circle{
  width:140px;
  height:140px;
  background:#52B84E;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-size:70px;
  margin-top:8px;
  margin-bottom:24px;
}

.status-card h2{
  font-size:42px;
  font-weight:800;
  margin-bottom:8px;
}

.status-text{
  text-align:center;
  font-size:24px;
  line-height:1.5;
  margin-bottom:28px;
}

.recommend-box{
  width:100%;
  background:white;
  border-radius:24px;
  padding:22px;
}

.recommend-box h4{
  font-size:28px;
  font-weight:700;
  margin-bottom:12px;
}

.recommend-box p{
  font-size:20px;
  line-height:1.6;
}

/* RESPONSIVE */
@media(max-width:1200px){

  .sensor-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .bottom-grid{
    grid-template-columns:1fr;
  }

}

@media(max-width:768px){

  .dashboard-layout{
    flex-direction:column;
  }

  .sidebar{
    width:100%;
  }

  .sensor-grid{
    grid-template-columns:1fr;
  }

  .topbar{
    flex-direction:column;
    align-items:flex-start;
    gap:10px;
  }

  .topbar h1{
    font-size:40px;
  }

}

</style>