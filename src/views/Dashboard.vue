<template>
  <div class="dashboard-layout">


    <!-- MOBILE MENU BUTTON -->
<button
  class="mobile-menu-btn"
  @click="showSidebar = true"
>
  <i class="ri-menu-line"></i>
</button>

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
        

        <!-- SUHU RUANG -->
        <div class="sensor-card">
          <div class="sensor-icon temp">
            <i class="ri-temp-hot-line"></i>
          </div>

          <div class="sensor-info">
            <h4>Suhu Ruang Komposter</h4>
            <h2>{{ sensor.suhu_udara }}°C</h2>
            <p>{{ sensor.status }}</p>
          </div>
        </div>

        <!-- SUHU KOMPOS -->
        <div class="sensor-card">
          <div class="sensor-icon compost">
            <i class="ri-fire-line"></i>
          </div>

          <div class="sensor-info">
            <h4>Suhu Material Kompos</h4>
            <h2>{{ sensor.suhu_kompos }}°C</h2>
            <p>{{ sensor.status }}</p>
          </div>
        </div>

        <!-- KELEMBAPAN UDARA -->
        <div class="sensor-card">
          <div class="sensor-icon humidity-air">
            <i class="ri-cloud-line"></i>
          </div>

          <div class="sensor-info">
            <h4>Kelembapan Udara</h4>
            <h2>{{ sensor.kelembapan_udara }}%</h2>
            <p>{{ sensor.status }}</p>
          </div>
        </div>

        <!-- KELEMBAPAN KOMPOS -->
        <div class="sensor-card">
          <div class="sensor-icon humidity-compost">
            <i class="ri-drop-line"></i>
          </div>

          <div class="sensor-info">
            <h4>Kelembapan Kompos</h4>
            <h2>{{ sensor.kelembapan_kompos }}%</h2>
            <p>{{ sensor.status }}</p>
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

import { ref } from 'vue'

const showSidebar = ref(false)

import { ref, onMounted, onUnmounted } from 'vue'
import mqtt from 'mqtt'

const sensor = ref({
  suhu_udara: 0,
  suhu_kompos: 0,
  kelembapan_udara: 0,
  kelembapan_kompos: 0,
  status: 'Waiting...'
})

let client = null

onMounted(() => {

  client = mqtt.connect(
    'wss://405ddc32b5914dc29655d90f79fac3c4.s1.eu.hivemq.cloud:8884/mqtt',
    {
      username: 'Smart_Compost',
      password: 'Kompos123'
    }
  )

  client.on('connect', () => {

    console.log('✅ MQTT Connected')

    client.subscribe('iot/kompos/ta/device1/data')

  })

  client.on('message', (topic, message) => {

    const data = JSON.parse(message.toString())

    sensor.value = data

    console.log('📡 DATA:', data)

  })

})

onUnmounted(() => {

  if (client) {
    client.end()
  }

})

onMounted(() => {

  fetchSensorData()

  interval = setInterval(() => {

    fetchSensorData()

  }, 2000)

})

onUnmounted(() => {

  clearInterval(interval)

})

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
  background:#E9ECE8;
}

/* LAYOUT */
.dashboard-layout{
  width:100%;
  min-height:100vh;
  display:flex;
  gap:20px;
  padding:18px;
  background:#E9ECE8;

  position:sticky;
  top:18px;
  height:calc(100vh - 36px);
}

/* SIDEBAR */
.sidebar{
  width:260px;
  background:linear-gradient(180deg,#012B07,#063A0D,#0A4A12);
  border-radius:38px;
  padding:36px 22px;
  display:flex;
  flex-direction:column;
  box-shadow:0 10px 30px rgba(0,0,0,0.08);

  position:sticky;
  top:18px;
  height:calc(100vh - 36px);
}

.logo{
  color:white;
  font-size:24px;
  font-weight:800;
  margin-bottom:42px;
}

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
  padding:16px 18px;
  border-radius:18px;
  cursor:pointer;
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
  align-items:flex-start;
  margin-bottom:24px;
}

.topbar h1{
  font-size:56px;
  font-weight:800;
  color:#000;
}

.topbar p{
  color:#777;
  font-size:16px;
  margin-top:12px;
}

/* SENSOR GRID */
.sensor-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-bottom:20px;
}

.sensor-card{
  background:#F1F1F1;
  border-radius:28px;
  padding:24px;
  min-height:210px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  transition:0.3s;
}

.sensor-card:hover{
  transform:translateY(-4px);
}

.sensor-card i{
  font-size:28px;
  color:#4CAF50;
  margin-bottom:20px;
}

.sensor-card h3{
  font-size:18px;
  color:#666;
  margin-bottom:14px;
}

.sensor-card h1{
  font-size:46px;
  font-weight:800;
  color:#000;
  margin-bottom:18px;
}

.status{
  color:#4CAF50;
  font-size:20px;
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
  background:#F1F1F1;
  border-radius:32px;
  padding:24px;
}

.chart-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:22px;
}

.chart-top h3{
  font-size:22px;
  font-weight:700;
}

.day-btn{
  background:#F7F7F7;
  padding:10px 18px;
  border-radius:14px;
  font-size:15px;
  font-weight:600;
}

.chart-area{
  width:100%;
  height:250px;
  background:#E9F2E8;
  border-radius:24px;
  padding:20px;
}

.chart-svg{
  width:100%;
  height:100%;
}

/* STATUS */
.status-card{
  background:#F1F1F1;
  border-radius:32px;
  padding:28px;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.status-circle{
  width:120px;
  height:120px;
  background:#52B84E;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-size:56px;
  margin-bottom:22px;
}

.status-card h2{
  font-size:36px;
  font-weight:800;
  margin-bottom:8px;
}

.status-text{
  text-align:center;
  font-size:18px;
  line-height:1.6;
  margin-bottom:26px;
  color:#222;
}

.recommend-box{
  width:100%;
  background:#FAFAFA;
  border-radius:22px;
  padding:20px;
}

.recommend-box h4{
  font-size:24px;
  margin-bottom:10px;
}

.recommend-box p{
  font-size:18px;
  line-height:1.7;
  color:#333;
}



/* =========================
   RESPONSIVE TABLET
========================= */
@media(max-width:1200px){

  .sensor-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .bottom-grid{
    grid-template-columns:1fr;
  }

}


/* =========================
   RESPONSIVE MOBILE
========================= */
@media(max-width:768px){

  /* LAYOUT */
  .dashboard-layout{
    flex-direction:column;
    padding:12px;
    gap:14px;
  }

  /* SIDEBAR */
  /* SIDEBAR MOBILE TOGGLE */
.sidebar{
  position:fixed;
  top:0;
  left:-100%;
  width:280px;
  height:100vh;

  background:linear-gradient(180deg,#012B07,#063A0D,#0A4A12);

  border-radius:0 28px 28px 0;
  padding:24px 18px;

  z-index:3000;
  overflow-y:auto;

  transition:0.35s ease;
}

/* SIDEBAR ACTIVE */
.sidebar.active{
  left:0;
}

  .logo{
    font-size:22px;
    margin-bottom:24px;
  }

  .menu{
    gap:10px;
  }

  .menu-item{
    padding:14px 16px;
    font-size:15px;
    border-radius:14px;
  }

  .menu-item i{
    font-size:20px;
  }

  /* MAIN */
  .main-content{
    width:100%;
    padding-top:70px;
}

  /* TOPBAR */
  .topbar{
    flex-direction:column;
    align-items:flex-start;
    gap:10px;
    margin-bottom:18px;
  }

  .topbar h1{
    font-size:34px;
    line-height:1.1;
  }

  .topbar p{
    font-size:14px;
    margin-top:4px;
  }

  /* SENSOR GRID */
  .sensor-grid{
    grid-template-columns:1fr;
    gap:14px;
  }

  .sensor-card{
    min-height:auto;
    padding:20px;
    border-radius:22px;
  }

  .sensor-card i{
    font-size:24px;
    margin-bottom:14px;
  }

  .sensor-card h3{
    font-size:16px;
    margin-bottom:8px;
  }

  .sensor-card h1{
    font-size:34px;
    margin-bottom:10px;
  }

  .status{
    font-size:16px;
  }

  /* BOTTOM */
  .bottom-grid{
    grid-template-columns:1fr;
    gap:14px;
  }

  /* CHART */
  .chart-card{
    padding:18px;
    border-radius:24px;
  }

  .chart-top{
    flex-direction:column;
    align-items:flex-start;
    gap:10px;
  }

  .chart-top h3{
    font-size:18px;
  }

  .day-btn{
    padding:8px 14px;
    font-size:13px;
  }

  .chart-area{
    height:220px;
    border-radius:18px;
    padding:12px;
  }

  /* STATUS */
  .status-card{
    padding:24px 18px;
    border-radius:24px;
  }

  .status-circle{
    width:90px;
    height:90px;
    font-size:42px;
    margin-bottom:16px;
  }

  .status-card h2{
    font-size:28px;
  }

  .status-text{
    font-size:15px;
    margin-bottom:20px;
  }

  .recommend-box{
    padding:16px;
    border-radius:18px;
  }

  .recommend-box h4{
    font-size:18px;
  }

  .recommend-box p{
    font-size:14px;
    line-height:1.6;
  }

}


/* =========================
   EXTRA SMALL MOBILE
========================= */
@media(max-width:480px){

  .dashboard-layout{
    padding:10px;
  }

  .sidebar{
    padding:20px 16px;
  }

  .topbar h1{
    font-size:28px;
  }

  .sensor-card h1{
    font-size:28px;
  }

  .chart-area{
    height:180px;
  }

}

/* OVERLAY */
.sidebar-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  z-index:2500;
}

/* BUTTON MENU */
.mobile-menu-btn{
  display:flex;
  align-items:center;
  justify-content:center;

  position:fixed;
  top:16px;
  left:16px;

  width:50px;
  height:50px;

  border:none;
  border-radius:14px;

  background:#1B5E20;
  color:white;

  font-size:28px;

  z-index:4000;
}
</style>