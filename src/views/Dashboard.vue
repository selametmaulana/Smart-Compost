<template>
  <div class="dashboard-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <div>

        <h1 class="logo">SmartCompost</h1>

        <nav class="menu">

          <div class="menu-item active">
            <i class="ri-dashboard-line"></i>
            <span>Dashboard</span>
          </div>

          <div class="menu-item">
            <i class="ri-cpu-line"></i>
            <span>Perangkat</span>
          </div>

          <div class="menu-item">
            <i class="ri-bar-chart-line"></i>
            <span>Data & Riwayat</span>
          </div>

          <div class="menu-item">
            <i class="ri-notification-3-line"></i>
            <span>Notifikasi</span>
          </div>

          <div class="menu-item">
            <i class="ri-settings-3-line"></i>
            <span>Pengaturan</span>
          </div>

        </nav>

      </div>

    </aside>

    <!-- MAIN -->
    <main class="main-content">

      <!-- TOPBAR -->
      <div class="topbar">

        <div>
          <h1>Dashboard</h1>
          <p>Monitoring kondisi kompos secara realtime</p>
        </div>

        <div class="last-update">
          <i class="ri-time-line"></i>
          Terakhir diperbarui: 10:30 WIB
        </div>

      </div>

      <!-- SENSOR -->
      <div class="sensor-grid">

        <div class="sensor-card">
          <div class="sensor-icon temp">
            <i class="ri-temp-hot-line"></i>
          </div>

          <div class="sensor-info">
            <h4>Suhu</h4>
            <h2>48.6°C</h2>
            <p>Optimal</p>
          </div>
        </div>

        <div class="sensor-card">
          <div class="sensor-icon humidity">
            <i class="ri-drop-line"></i>
          </div>

          <div class="sensor-info">
            <h4>Kelembapan</h4>
            <h2>58%</h2>
            <p>Optimal</p>
          </div>
        </div>

        <div class="sensor-card">
          <div class="sensor-icon ph">
            <i class="ri-flask-line"></i>
          </div>

          <div class="sensor-info">
            <h4>pH</h4>
            <h2>7.2</h2>
            <p>Optimal</p>
          </div>
        </div>

        <div class="sensor-card">
          <div class="sensor-icon oxygen">
            <i class="ri-windy-line"></i>
          </div>

          <div class="sensor-info">
            <h4>Oksigen</h4>
            <h2>18.6%</h2>
            <p>Optimal</p>
          </div>
        </div>

      </div>

      <!-- BOTTOM -->
      <div class="bottom-grid">

        <!-- CHART -->
        <div class="chart-card">

          <div class="chart-header">

            <div>
              <h3>Grafik Suhu</h3>
              <p>Data 7 hari terakhir</p>
            </div>

            <button>7 Hari</button>

          </div>

          <div class="chart-area">

            <svg
              viewBox="0 0 600 250"
              preserveAspectRatio="none"
              class="chart-svg"
            >

              <polyline
                fill="none"
                stroke="#4CAF50"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
                points="
                  40,170
                  120,150
                  200,160
                  280,120
                  360,130
                  440,90
                  520,110
                "
              />

            </svg>

          </div>

        </div>

        <!-- STATUS -->
        <div class="status-card">

          <div class="status-circle">
            <i class="ri-check-line"></i>
          </div>

          <h2>Optimal</h2>

          <p class="status-desc">
            Proses pengomposan berjalan dengan baik dan stabil.
          </p>

          <div class="recommend-box">

            <h4>Rekomendasi</h4>

            <p>
              Pertahankan kelembapan dan aerasi untuk menjaga kualitas kompos.
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

/* GOOGLE FONT */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

/* REMIX ICON */
@import url('https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Poppins',sans-serif;
}

body{
  background:#EEF2F1;
}

/* LAYOUT */
.dashboard-layout{
  display:flex;
  min-height:100vh;
  background:#EEF2F1;
  padding:20px;
  gap:20px;
}

/* SIDEBAR */
.sidebar{
  width:270px;
  background:linear-gradient(180deg,#062B0C,#0E4717);
  border-radius:28px;
  padding:28px 20px;
  box-shadow:0 10px 30px rgba(0,0,0,0.08);
}

.logo{
  color:white;
  font-size:28px;
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
  padding:16px 18px;
  color:#D9E8DC;
  border-radius:16px;
  cursor:pointer;
  transition:0.3s ease;
  font-size:16px;
  font-weight:500;
}

.menu-item i{
  font-size:22px;
}

.menu-item:hover{
  background:rgba(255,255,255,0.08);
}

.menu-item.active{
  background:#57C15A;
  color:white;
}

/* MAIN */
.main-content{
  flex:1;
  display:flex;
  flex-direction:column;
  gap:20px;
}

/* TOPBAR */
.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.topbar h1{
  font-size:42px;
  font-weight:800;
  color:#111;
}

.topbar p{
  color:#666;
  margin-top:5px;
}

.last-update{
  background:white;
  padding:12px 18px;
  border-radius:14px;
  display:flex;
  align-items:center;
  gap:10px;
  color:#666;
  font-size:14px;
  box-shadow:0 5px 20px rgba(0,0,0,0.05);
}

.last-update i{
  color:#4CAF50;
}

/* SENSOR GRID */
.sensor-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
}

.sensor-card{
  background:white;
  border-radius:24px;
  padding:24px;
  display:flex;
  align-items:center;
  gap:18px;
  box-shadow:0 10px 25px rgba(0,0,0,0.05);
  transition:0.3s;
}

.sensor-card:hover{
  transform:translateY(-5px);
}

.sensor-icon{
  width:70px;
  height:70px;
  border-radius:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:34px;
  color:white;
}

.temp{
  background:#FF7043;
}

.humidity{
  background:#42A5F5;
}

.ph{
  background:#AB47BC;
}

.oxygen{
  background:#66BB6A;
}

.sensor-info h4{
  color:#777;
  font-size:16px;
  margin-bottom:6px;
}

.sensor-info h2{
  font-size:32px;
  font-weight:700;
  color:#111;
}

.sensor-info p{
  color:#4CAF50;
  font-weight:600;
  margin-top:6px;
}

/* BOTTOM */
.bottom-grid{
  display:grid;
  grid-template-columns:2fr 1fr;
  gap:20px;
}

/* CHART */
.chart-card{
  background:white;
  border-radius:28px;
  padding:24px;
  box-shadow:0 10px 25px rgba(0,0,0,0.05);
}

.chart-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}

.chart-header h3{
  font-size:24px;
  color:#111;
}

.chart-header p{
  color:#777;
  margin-top:4px;
}

.chart-header button{
  border:none;
  background:#E8F5E9;
  color:#2E7D32;
  padding:10px 16px;
  border-radius:12px;
  font-weight:600;
  cursor:pointer;
}

.chart-area{
  width:100%;
  height:350px;
  background:#F5FAF5;
  border-radius:20px;
  padding:20px;
}

.chart-svg{
  width:100%;
  height:100%;
}

/* STATUS */
.status-card{
  background:white;
  border-radius:28px;
  padding:28px;
  text-align:center;
  box-shadow:0 10px 25px rgba(0,0,0,0.05);
}

.status-circle{
  width:120px;
  height:120px;
  background:#4CAF50;
  border-radius:50%;
  margin:auto;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-size:60px;
  margin-bottom:20px;
}

.status-card h2{
  font-size:36px;
  margin-bottom:10px;
}

.status-desc{
  color:#666;
  line-height:1.6;
  margin-bottom:24px;
}

.recommend-box{
  background:#F7F7F7;
  padding:20px;
  border-radius:18px;
  text-align:left;
}

.recommend-box h4{
  margin-bottom:10px;
  font-size:18px;
}

.recommend-box p{
  color:#666;
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

  .topbar{
    flex-direction:column;
    align-items:flex-start;
    gap:15px;
  }

  .sensor-grid{
    grid-template-columns:1fr;
  }

  .topbar h1{
    font-size:34px;
  }

}

</style>