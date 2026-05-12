<template>
  <div class="dashboard-layout">

    <!-- POPUP -->
<div
  v-if="showPopup"
  class="popup-overlay"
>
  <div class="popup-box">

    <div class="popup-icon">
      <i class="ri-settings-3-line"></i>
    </div>

    <h2>Pengaturan Diperlukan</h2>

    <p>
      Sebelum menggunakan dashboard monitoring,
      silakan lakukan pengaturan sistem terlebih dahulu.
    </p>

    <button
      class="popup-btn"
      @click="goToSettings"
    >
      Ke Pengaturan
    </button>

  </div>
</div>
    <!-- MAIN -->
    <main class="main-content">

      <!-- TOPBAR -->
      <div class="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Monitoring kondisi kompos secara realtime terbaik</p>
        </div>

        <div class="top-right">
          <span class="update-text">
            ● Terakhir diperbarui:{{ lastUpdated }}
          </span>
          <div class="notif">
            <Bell size="20" />
            <div class="notif-dot">
              {{ notifications.length }}
            </div>
          </div>
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

      <!-- =========================
     AKTUATOR MQTT
========================= -->
<div class="actuator-wrapper">

<div class="actuator-header">

  <div>
    <h3>Aktuator Perangkat</h3>
    <p>Kontrol perangkat realtime via MQTT</p>
  </div>

  <div class="mqtt-status">
    <span class="dot"></span>
    MQTT Connected
  </div>

</div>

<div class="actuator-grid">

  <!-- POMPA -->
  <div class="actuator-card">

    <div class="actuator-left">

      <div class="actuator-icon">
        <i class="ri-water-flash-line"></i>
      </div>

      <div>
        <h4>Pompa Air</h4>
        <p>Penyiraman otomatis kompos</p>
      </div>

    </div>

    <div class="switch-wrapper">

      <label class="switch">

        <input
          type="checkbox"
          v-model="pumpOn"
          @change="togglePump"
        >

        <span class="slider"></span>

      </label>

      <span
        :class="pumpOn ? 'on-text' : 'off-text'"
      >
        {{ pumpOn ? 'ON' : 'OFF' }}
      </span>

    </div>

  </div>

  <!-- KIPAS -->
  <div class="actuator-card">

    <div class="actuator-left">

      <div class="actuator-icon fan">
        <i class="ri-fan-line"></i>
      </div>

      <div>
        <h4>Kipas Aerasi</h4>
        <p>Sirkulasi udara komposter</p>
      </div>

    </div>

    <div class="switch-wrapper">

      <label class="switch">

        <input
          type="checkbox"
          v-model="fanOn"
          @change="toggleFan"
        >

        <span class="slider"></span>

      </label>

      <span
        :class="fanOn ? 'on-text' : 'off-text'"
      >
        {{ fanOn ? 'ON' : 'OFF' }}
      </span>

    </div>

  </div>

</div>

</div>

    </main>
  </div>
</template>

<script setup>

import {
  ref,
  onMounted,
  onUnmounted
} from 'vue'

import { Bell } from 'lucide-vue-next'

import mqtt from 'mqtt'

// =========================
// STATE
// =========================
const showSidebar = ref(false)
const showPopup = ref(false)
const pumpOn = ref(false)
const fanOn = ref(false)
const notifications = ref([])

const sensor = ref({
  suhu_udara: 0,
  suhu_kompos: 0,
  kelembapan_udara: 0,
  kelembapan_kompos: 0,
  status: 'Waiting...'
})

let client = null

// =========================
// GO TO SETTINGS
// =========================
const goToSettings = () => {

  window.location.href =
    '/dashboard/pengaturan'

}

// =========================
// MQTT AKTUATOR
// =========================

const togglePump = () => {

if(!client) return

const payload = JSON.stringify({
  device: 'pump',
  status: pumpOn.value ? 'ON' : 'OFF'
})

client.publish(
  'iot/kompos/ta/device1/pump',
  payload
)

console.log('PUMP:', payload)

}

const toggleFan = () => {

if(!client) return

const payload = JSON.stringify({
  device: 'fan',
  status: fanOn.value ? 'ON' : 'OFF'
})

client.publish(
  'iot/kompos/ta/device1/fan',
  payload
)

console.log('FAN:', payload)

}

const fetchNotifications = async () => {
  try {
    const res = await fetch(
      'https://smart-compost-production.up.railway.app/notifications'
    )

    const data = await res.json()

    notifications.value = data || []

  } catch (err) {
    console.log('ERROR NOTIF:', err)
    notifications.value = []
  }
}

// =========================
// ON MOUNTED
// =========================
onMounted(async () => {

  // =========================
  // CHECK DEVICE
  // =========================
  fetchNotifications()

  try {

    const res = await fetch(
      'https://smart-compost-production.up.railway.app/devices'
    )

    const devices = await res.json()

    console.log('DEVICES:', devices)

    // CARI DEVICE YANG VALID
    const validDevice = devices.find(device =>
      device.device_name &&
      device.location &&
      device.wifi_ssid
    )

    // JIKA BELUM ADA DEVICE VALID
    if (!validDevice) {

      showPopup.value = true

      console.log('❌ DEVICE BELUM LENGKAP')

    } else {

      showPopup.value = false

      console.log('✅ DEVICE VALID:', validDevice)

    }

  } catch (err) {

    console.log('❌ ERROR DEVICE:', err)

    showPopup.value = true

  }

  // =========================
  // MQTT CONNECT
  // =========================
  client = mqtt.connect(
    'wss://405ddc32b5914dc29655d90f79fac3c4.s1.eu.hivemq.cloud:8884/mqtt',
    {
      username: 'Smart_Compost',
      password: 'Kompos123'
    }
  )

  client.on('connect', () => {

    console.log('✅ MQTT Connected')

    client.subscribe(
      'iot/kompos/ta/device1/data'
    )

  })

  // =========================
  // MQTT MESSAGE
  // =========================
  client.on('message', (topic, message) => {

    try {

      const data = JSON.parse(
        message.toString()
      )

      sensor.value = {
        suhu_udara:
          data.suhu_udara ?? 0,

        suhu_kompos:
          data.suhu_kompos ?? 0,

        kelembapan_udara:
          data.kelembapan_udara ?? 0,

        kelembapan_kompos:
          data.kelembapan_kompos ?? 0,

        status:
          data.status || 'Normal'
      }

      console.log('📡 SENSOR:', data)

    } catch (err) {

      console.log('❌ MQTT ERROR:', err)

    }

  })

})

// =========================
// ON UNMOUNTED
// =========================
onUnmounted(() => {

  if (client) {

    client.end()

    console.log('🔌 MQTT Disconnected')

  }

})


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


<style>

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

/* POPUP */
.popup-overlay{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;

  background:rgba(0,0,0,0.45);

  display:flex;
  align-items:center;
  justify-content:center;

  z-index:9999;

  backdrop-filter:blur(6px);
}

.popup-box{
  width:420px;
  background:white;

  border-radius:30px;
  padding:40px;

  text-align:center;

  animation:popupShow .3s ease;
}

.popup-icon{
  width:90px;
  height:90px;

  margin:auto;
  margin-bottom:22px;

  border-radius:50%;
  background:#E8F7EA;

  display:flex;
  align-items:center;
  justify-content:center;

  color:#4CAF50;
  font-size:42px;
}

.popup-box h2{
  font-size:30px;
  margin-bottom:14px;
}

.popup-box p{
  color:#666;
  line-height:1.7;
  margin-bottom:28px;
}

.popup-btn{
  width:100%;

  border:none;
  background:#4CAF50;
  color:white;

  padding:16px;
  border-radius:16px;

  font-size:16px;
  font-weight:700;

  cursor:pointer;
}

.popup-btn:hover{
  opacity:.9;
}

@keyframes popupShow{
  from{
    transform:scale(.8);
    opacity:0;
  }

  to{
    transform:scale(1);
    opacity:1;
  }
}

/* LAYOUT */
.dashboard-layout{
  width:100%;
  min-height:100vh;
  display:flex;
  gap:20px;
  padding:18px;
  background:#E9ECE8;
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
    gap:10px;
  }

  .topbar h1{
    font-size:40px;
  }

}

/* =========================
   DARK MODE
========================= */

body.dark-mode{

background:
radial-gradient(circle at top left,#0f3d1d,#020617 45%);

color:white;

}

/* LAYOUT */
body.dark-mode .dashboard-layout{

background:transparent;

}

/* MAIN */
body.dark-mode .main-content{

background:transparent;

}

/* CARD */
body.dark-mode .sensor-card,
body.dark-mode .chart-card,
body.dark-mode .status-card,
body.dark-mode .recommend-box{

background:
rgba(15,23,42,.85);

border:1px solid rgba(255,255,255,.06);

color:white;

backdrop-filter:blur(16px);

}

/* CHART AREA */
body.dark-mode .chart-area{

background:#0f172a;

}

/* TOPBAR */
body.dark-mode .topbar h1{

color:white;

}

body.dark-mode .topbar p{

color:#94a3b8;

}

/* TEXT */
body.dark-mode .sensor-card h1,
body.dark-mode .sensor-card h3,
body.dark-mode .status-card h2,
body.dark-mode .recommend-box h4{

color:white;

}

body.dark-mode .recommend-box p,
body.dark-mode .status-text{

color:#cbd5e1;

}

/* BUTTON */
body.dark-mode .day-btn{

background:#1e293b;
color:white;

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

}

/* MENU */
body.dark-mode .menu-item:hover{

background:rgba(255,255,255,.06);

}

body.dark-mode .menu-item.active{

background:
linear-gradient(
90deg,
#15803d,
#22c55e
);

}

/* POPUP */
body.dark-mode .popup-box{

background:#0f172a;
color:white;

}

body.dark-mode .popup-box p{

color:#cbd5e1;

}

/* =========================
   AKTUATOR
========================= */

.actuator-wrapper{

margin-top:20px;

background:#F1F1F1;

border-radius:32px;

padding:24px;

}

.actuator-header{

display:flex;
justify-content:space-between;
align-items:center;

margin-bottom:24px;

}

.actuator-header h3{

font-size:28px;
font-weight:800;

}

.actuator-header p{

color:#666;
margin-top:4px;

}

.mqtt-status{

display:flex;
align-items:center;
gap:10px;

font-weight:600;
color:#22c55e;

}

.dot{

width:10px;
height:10px;

background:#22c55e;
border-radius:50%;

}

.actuator-grid{

display:grid;
grid-template-columns:1fr 1fr;
gap:20px;

}

.actuator-card{

background:white;

border-radius:24px;

padding:24px;

display:flex;
justify-content:space-between;
align-items:center;

transition:.3s;

}

.actuator-card:hover{

transform:translateY(-3px);

}

.actuator-left{

display:flex;
align-items:center;
gap:18px;

}

.actuator-icon{

width:70px;
height:70px;

border-radius:22px;

background:#E8F7EA;

display:flex;
align-items:center;
justify-content:center;

font-size:34px;
color:#4CAF50;

}

.actuator-icon.fan{

background:#EEF4FF;
color:#3B82F6;

}

.actuator-left h4{

font-size:24px;
margin-bottom:4px;

}

.actuator-left p{

color:#666;

}

/* SWITCH */

.switch-wrapper{

display:flex;
flex-direction:column;
align-items:center;
gap:10px;

}

.switch{

position:relative;
display:inline-block;

width:74px;
height:40px;

}

.switch input{

opacity:0;
width:0;
height:0;

}

.slider{

position:absolute;
cursor:pointer;

top:0;
left:0;
right:0;
bottom:0;

background:#ddd;

transition:.4s;

border-radius:50px;

}

.slider:before{

position:absolute;
content:"";

height:30px;
width:30px;

left:5px;
bottom:5px;

background:white;

transition:.4s;

border-radius:50%;

}

input:checked + .slider{

background:#4CAF50;

}

input:checked + .slider:before{

transform:translateX(34px);

}

.on-text{

color:#22c55e;
font-weight:700;

}

.off-text{

color:#999;
font-weight:700;

}

/* DARK MODE */

body.dark-mode .actuator-wrapper{

background:
rgba(15,23,42,.85);

border:1px solid rgba(255,255,255,.05);

}

body.dark-mode .actuator-card{

background:#0f172a;

border:1px solid rgba(255,255,255,.05);

}

body.dark-mode .actuator-left h4{

color:white;

}

body.dark-mode .actuator-left p,
body.dark-mode .actuator-header p{

color:#94a3b8;

}

/* MOBILE */

@media(max-width:900px){

.actuator-grid{

grid-template-columns:1fr;

}

}

@media(max-width:600px){

.actuator-card{

flex-direction:column;
align-items:flex-start;
gap:20px;

}

.switch-wrapper{

width:100%;
flex-direction:row;
justify-content:space-between;

}

}

</style>