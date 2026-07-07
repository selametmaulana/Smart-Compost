<template>
    <div class="device-page">
  
  
      <!-- MAIN -->
      <main class="main-content">
  
        <!-- TOPBAR -->
        <div class="topbar">
  
          <div>
            <h1>{{ t.pageTitle }}</h1>
  
            <p>
              {{ t.pageDesc }}
            </p>
          </div>
  
          <div class="top-right">
  
            <span class="update-text">
              ● {{ t.lastUpdated }}:
              {{ lastUpdated }}
            </span>
  
            <div class="notif">
              <Bell size="20" />
              <div class="notif-dot">
                {{ notifications.length }}
              </div>
            </div>
          </div>
        </div>
  
        <!-- DEVICE STATUS -->
        <div class="device-status-grid">
          <!-- CARD -->
          <div class="device-status-card">
            <div class="device-icon green">
              <Wifi size="26" />
            </div>
  
            <div>
              <h4>{{ t.internetConnection }}</h4>
              <h2>{{ internetStatus }}</h2>
              <p>{{ t.connected }}</p>
            </div>
  
          </div>
  
          <!-- CARD -->
          
          <!-- CARD -->
          <div class="device-status-card">

<div
  class="device-icon"
  :class="sensorStatus === 'Aktif' ? 'green' : 'orange'"
>

  <Cpu
    v-if="sensorStatus === 'Aktif'"
    :size="26"
  />

  <CircleOff
    v-else
    :size="26"
  />

</div>

<div>
  <h4>{{ t.sensorStatus }}</h4>
  <h2>{{ sensorStatus }}</h2>

  <p>
    {{ sensorStatus === 'Aktif'
      ? 'Semua sensor berjalan'
      : 'Sensor tidak terhubung' }}
  </p>
</div>

</div>
  
          <!-- CARD -->
          
        </div>
  
        <!-- DEVICE -->
        <div class="device-grid">
  
          <!-- LEFT -->
          <div class="device-preview">
  
            <div class="preview-header">
  
              <h3>{{ t.smartDevice }}</h3>
  
              <span :style="{color:internetStatus === 
              'Online'? '#4CAF50'
              : '#f59e0b'}">
              ● {{ internetStatus }}
            </span>
  
            </div>
  
            <!-- DEVICE BOX -->
            <div class="iot-device">
  
              <div class="device-antenna"></div>
  
              <div class="device-screen">
  
                <Leaf size="44" />
  
                <h2>SmartCompost</h2>
  
                <p>{{ t.monitoring }}</p>
  
              </div>
  
              <div
  class="device-light"
  :class="internetStatus === 'Online'
    ? 'light-online'
    : 'light-offline'"
></div>
  
            </div>
  
            <!-- INFO -->
            <div class="device-info-grid">
  
              <div class="info-card">
  
                <Cpu size="22" />
  
                <h4>{{ t.esp32 }}</h4>
  
                <p>
                  {{ t.esp32Desc }}
                </p>
  
              </div>
  
              <div class="info-card">
  
                <Database size="22" />
  
                <h4>PostgreSQL</h4>
  
                <p>
                  {{ t.databaseDesc }}
                </p>
  
              </div>
  
              <div class="info-card">
  
                <Cloud size="22" />
  
                <h4>{{ t.cloud }}</h4>
  
                <p>
                  {{ t.cloudDesc }}
                </p>
  
              </div>
  
              <div class="info-card">
  
                <ShieldCheck size="22" />
  
                <h4>{{ t.security }}</h4>
  
                <p>
                  {{ t.securityDesc }}
                </p>
  
              </div>
  
            </div>
  
          </div>
  
          <!-- RIGHT -->
          <div class="sensor-panel">
  
            <div class="panel-header">
  
              <h3>{{ t.sensorPanel }}</h3>
  
              <button @click="refreshData">
                {{ t.refresh }}
              </button>
  
            </div>
  
            <!-- SENSOR ITEM -->
            <div class="sensor-item">
              <div class="sensor-left">
                <div class="sensor-icon green-bg">
                  <Thermometer size="22" />
                </div>
                <div>
                  <h4>{{ t.roomTemp }}</h4>
                    <p>{{ suhuRuang }} °C</p>
                </div>
              </div>
              <div class="sensor-status"
              :class="internetStatus === 'Online'
              ? 'online'
              : 'warning'">{{ internetStatus }}
              </div>
            </div>
  
            <!-- SENSOR ITEM -->
            <div class="sensor-item">
  
              <div class="sensor-left">
  
                <div class="sensor-icon blue-bg">
                  <Droplets size="22" />
                </div>
  
                <div>
                  <h4>{{ t.compostTemp }}</h4>
                    <p>{{ suhuMaterial }} °C</p>
                </div>
              </div>
  
              <div class="sensor-status"
              :class="internetStatus === 'Online'
              ? 'online'
              : 'warning'">{{ internetStatus }}
              </div>
  
            </div>
  
            <!-- SENSOR ITEM -->
            <div class="sensor-item">
  
              <div class="sensor-left">
  
                <div class="sensor-icon orange-bg">
                  <FlaskConical size="22" />
                </div>
  
                <div>
                  <h4>{{ t.airHumidity }}</h4>
                <p>{{ kelembapanUdara }} %</p>
                </div>
  
              </div>
  
              <div class="sensor-status"
              :class="internetStatus === 'Online'
              ? 'online'
              : 'warning'">{{ internetStatus }}
              </div>
  
            </div>
  
            <!-- SENSOR ITEM -->
            <div class="sensor-item">
  
              <div class="sensor-left">
  
                <div class="sensor-icon purple-bg">
                  <Wind size="22" />
                </div>
  
                <div>
                  <h4>{{ t.compostHumidity }}</h4>
                <p>{{ kelembapanKompos }} %</p>
                </div>
  
              </div>
  
              <div class="sensor-status"
              :class="internetStatus === 'Online'
              ? 'online'
              : 'warning'">{{ internetStatus }}
              </div>
  
            </div>
  
            <!-- SYSTEM -->
            <div class="system-card">
  
              <h3>{{ t.systemStatus }}</h3>
  
              <div class="system-progress">
  
                <div class="progress-top">
                  <span>{{ t.systemPerformance }}</span>
                  <span>{{ systemPerformance }}%</span>
                </div>
  
                <div class="progress-bar">
                  <div class="progress-fill" 
                  :style="{width: systemPerformance + '%'}"></div>
                </div>
  
              </div>
  
              <div class="system-list">
  
                <div>
                  <CheckCircle2 size="18" />
                  {{ t.serverActive }}
                </div>
  
                <div>
                  <CheckCircle2 size="18" />
                  {{ t.dbOnline }}
                </div>
  
                <div>
                  <CheckCircle2 size="18" />
                  {{ t.sensorConnected }}
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </main>
  
    </div>
  </template>
  
  <script setup>

import {
  Leaf,
  Cpu,
  Bell,
  ShieldCheck,
  Wifi,
  BatteryCharging,
  Activity,
  Clock3,
  Database,
  Cloud,
  Thermometer,
  Droplets,
  FlaskConical,
  Wind,
  CheckCircle2,
  CircleOff
} from 'lucide-vue-next'

import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

/* =========================
   STATE
========================= */
const sensorData = ref({})
const notifications = ref([])
const lastUpdated = ref('-')
const loading = ref(false)

/* =========================
   LANGUAGE
========================= */



const translations = {

  id: {

    pageTitle: 'Perangkat IoT',
    pageDesc: 'Monitoring perangkat sensor SmartCompost',
    lastUpdated: 'Terakhir diperbarui',
    internetConnection: 'Koneksi Internet',
    connected: 'ESP32 Terhubung',
    devicePower: 'Daya Perangkat',
    optimalBattery: 'Baterai Optimal',
    sensorStatus: 'Status Sensor',
    sensorActive: 'Aktif',
    sensorRunning: 'Semua sensor berjalan',
    sensorDisconnected: 'Sensor tidak terhubung',
    uptime: 'Uptime Sistem',
    stableSystem: 'Stabil tanpa gangguan',
    smartDevice: 'Perangkat SmartCompost',
    monitoring: 'MONITORING',
    esp32: 'ESP32 Controller',
    esp32Desc: 'Mikrokontroler utama sistem monitoring',
    database: 'PostgreSQL',
    databaseDesc: 'Penyimpanan data sensor realtime',
    cloud: 'Cloud Monitoring',
    cloudDesc: 'Sinkronisasi data otomatis',
    security: 'Keamanan Sistem',
    securityDesc: 'Data monitoring terenkripsi aman',
    sensorPanel: 'Status Sensor',
    refresh: 'Refresh',
    roomTemp: 'Suhu Ruang Komposter',
    compostTemp: 'Suhu Material Kompos',
    airHumidity: 'Kelembapan Udara',
    compostHumidity: 'Kelembapan Kompos',
    systemStatus: 'Status Sistem',
    systemPerformance: 'Performa Sistem',
    serverActive: 'Server Aktif',
    dbOnline: 'Database Online',
    sensorConnected: 'Sensor Tersambung',
    online: 'Online',
    offline: 'Offline'
  },

  en: {

    pageTitle: 'IoT Device',
    pageDesc: 'SmartCompost sensor monitoring',
    lastUpdated: 'Last updated',
    internetConnection: 'Internet Connection',
    connected: 'ESP32 Connected',
    devicePower: 'Device Power',
    optimalBattery: 'Optimal Battery',
    sensorStatus: 'Sensor Status',
    sensorActive: 'Active',
    sensorRunning: 'All sensors running',
    sensorDisconnected: 'Sensor disconnected',
    uptime: 'System Uptime',
    stableSystem: 'Stable without interruption',
    smartDevice: 'SmartCompost Device',
    monitoring: 'MONITORING',
    esp32: 'ESP32 Controller',
    esp32Desc: 'Main monitoring microcontroller',
    database: 'PostgreSQL',
    databaseDesc: 'Realtime sensor data storage',
    cloud: 'Cloud Monitoring',
    cloudDesc: 'Automatic data synchronization',
    security: 'System Security',
    securityDesc: 'Monitoring data securely encrypted',
    sensorPanel: 'Sensor Status',
    refresh: 'Refresh',
    roomTemp: 'Room Temperature',
    compostTemp: 'Compost Material Temperature',
    airHumidity: 'Air Humidity',
    compostHumidity: 'Compost Humidity',
    systemStatus: 'System Status',
    systemPerformance: 'System Performance',
    serverActive: 'Server Active',
    dbOnline: 'Database Online',
    sensorConnected: 'Sensors Connected',
    online: 'Online',
    offline: 'Offline'
  }

}

const currentLang = ref('id')

const loadSettings = () => {

  const settings = JSON.parse(
    localStorage.getItem('system_settings')
  )

  currentLang.value =
    settings?.language === 'English'
      ? 'en'
      : 'id'

  // DARK MODE
  if(settings?.theme === 'dark'){

    document.body.classList.add('dark-mode')

  }else{

    document.body.classList.remove('dark-mode')

  }

}

const t = computed(() => {
  return translations[currentLang.value]
})


let intervalId = null

const isRealtimeOnline = computed(() => {

if (!sensorData.value?.lastSensorTime) {
  return false
}

const now = Date.now()

const diffSeconds =
  (now - sensorData.value.lastSensorTime) / 1000

return diffSeconds < 15

})


/* =========================
   DEVICE STATUS
========================= */

const internetStatus = computed(() => {
  return isRealtimeOnline.value
    ? 'Online'
    : 'Offline'
})

const batteryLevel = computed(() => {
  return sensorData.value?.battery || 0
})

const sensorStatus = computed(() => {

if (!isRealtimeOnline.value) {
  return 'Offline'
}

const hasSensorData =
  sensorData.value?.suhu_ruang != null &&
  sensorData.value?.suhu_material != null &&
  sensorData.value?.kelembapan_udara != null &&
  sensorData.value?.kelembapan_kompos != null

return hasSensorData
  ? 'Aktif'
  : 'Offline'

})

const uptime = computed(() => {
  return sensorData.value?.uptime || '0 Hari'
})


/* =========================
   SENSOR VALUE
========================= */

const suhuRuang = computed(() => {
  return internetStatus.value === 'Online'
    ? sensorData.value?.suhu_ruang || 0
    : '--'
})

const suhuMaterial = computed(() => {

return internetStatus.value === 'Online'
  ? sensorData.value?.suhu_material || 0
  : '--'

})

const kelembapanUdara = computed(() => {

return internetStatus.value === 'Online'
  ? sensorData.value?.kelembapan_udara || 0
  : '--'

})

const kelembapanKompos = computed(() => {

return internetStatus.value === 'Online'
  ? sensorData.value?.kelembapan_kompos || 0
  : '--'

})

/* =========================
   FETCH SENSOR
========================= */

const fetchSensor = async () => {

  try {

    loading.value = true

    const res = await fetch(
      'https://smart-compost-production.up.railway.app/latest-sensor'
    )

    const data = await res.json()

    console.log('SENSOR:', data)

    sensorData.value = data

    lastUpdated.value =
      new Date().toLocaleTimeString('id-ID')

  } catch (err) {

    console.log('ERROR SENSOR:', err)

  } finally {

    loading.value = false

  }

}

/* =========================
   FETCH NOTIFICATION
========================= */

const fetchNotifications = async () => {

  try {

    const res = await fetch(
      'https://smart-compost-production.up.railway.app/notifications'
    )

    const data = await res.json()

    notifications.value = data

  } catch (err) {

    console.log('ERROR NOTIF:', err)

  }

}

/* =========================
   SYSTEM PERFORMANCE
========================= */

const systemPerformance = computed(() => {

let score = 100

// offline
if (!sensorData.value?.online) {
  score -= 40
}

// battery rendah
if ((sensorData.value?.battery || 0) < 30) {
  score -= 20
}

// sensor warning
if (
  sensorData.value?.sensor_status === 'Warning'
) {
  score -= 20
}

// suhu terlalu tinggi
if (
  (sensorData.value?.suhu_material || 0) > 60
) {
  score -= 20
}

return score < 0 ? 0 : score

})

/* =========================
   REFRESH BUTTON
========================= */

const refreshData = () => {

  fetchSensor()
  fetchNotifications()

}

/* =========================
   AUTO REFRESH
========================= */

onMounted(() => {

  loadSettings()

  refreshData()

  intervalId = setInterval(() => {

    refreshData()

  }, 5000)

})

/* =========================
   CLEAR INTERVAL
========================= */

onBeforeUnmount(() => {

  clearInterval(intervalId)

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
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  .device-page{
    min-height:100vh;
    display:flex;
    gap:20px;
    padding:20px;
    font-family:'Poppins',sans-serif;
  }
  
  /* SIDEBAR */
  
  .sidebar{
    width:290px;
    background:linear-gradient(180deg,#08240d,#123c18);
    border-radius:35px;
    padding:30px 22px;
    color:white;
  
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  
  .logo{
    display:flex;
    align-items:center;
    gap:14px;
    margin-bottom:50px;
  }
  
  .logo-icon{
    width:58px;
    height:58px;
    border-radius:18px;
    background:#4CAF50;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .logo h2{
    font-size:34px;
    font-weight:800;
  }
  
  .logo span{
    color:#4CAF50;
  }
  
  .logo p{
    font-size:12px;
    letter-spacing:4px;
  }
  
  .menu{
    list-style:none;
  }
  
  .menu li{
    display:flex;
    align-items:center;
    gap:14px;
  
    padding:18px;
    border-radius:18px;
  
    margin-bottom:12px;
  
    cursor:pointer;
    transition:.3s;
  }
  
  .menu li:hover{
    background:rgba(255,255,255,.08);
  }
  
  .active{
    background:#4CAF50;
  }
  
  .sidebar-card{
    background:rgba(255,255,255,.08);
  
    padding:24px;
    border-radius:24px;
  
    display:flex;
    gap:14px;
  }
  
  /* MAIN */
  
  .main-content{
    flex:1;
    background:white;
    border-radius:35px;
    padding:35px;
  }
  
  /* TOPBAR */
  
  .topbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  
  .topbar h1{
    font-size:52px;
    margin-bottom:8px;
  }
  
  .topbar p{
    color:#777;
  }
  
  .top-right{
    display:flex;
    align-items:center;
    gap:22px;
  }
  
  .update-text{
    font-size:14px;
    color:#666;
  }
  
  .notif{
    width:52px;
    height:52px;
    border-radius:50%;
    background:#f5f5f5;
  
    display:flex;
    align-items:center;
    justify-content:center;
  
    position:relative;
  }
  
  .notif-dot{
    position:absolute;
    top:-3px;
    right:-3px;
  
    width:22px;
    height:22px;
  
    border-radius:50%;
    background:#4CAF50;
    color:white;
  
    display:flex;
    align-items:center;
    justify-content:center;
  
    font-size:12px;
  }
  
  .profile{
    display:flex;
    align-items:center;
    gap:10px;
  }
  
  .avatar{
    width:50px;
    height:50px;
    border-radius:50%;
    background:#4CAF50;
  }
  
  /* STATUS */
  
  .device-status-grid{
    margin-top:35px;
  
    display:grid;
    grid-template-columns:repeat(4,1fr);
  
    gap:20px;
  }
  
  .device-status-card{
    background:#fafafa;
  
    border-radius:28px;
    padding:25px;
  
    display:flex;
    gap:18px;
  }
  
  .device-icon{
    width:65px;
    height:65px;
  
    border-radius:18px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  
    color:white;
  }
  
  .green{
    background:#4CAF50;
  }
  
  .blue{
    background:#3b82f6;
  }
  
  .orange{
    background:#f59e0b;
  }
  
  .purple{
    background:#9333ea;
  }
  
  .device-status-card h2{
    margin:8px 0;
  }
  
  .device-status-card p{
    color:#777;
  }
  
  /* GRID */
  
  .device-grid{
    margin-top:25px;
  
    display:grid;
    grid-template-columns:1.3fr 1fr;
  
    gap:20px;
  }
  
  /* PREVIEW */
  
  .device-preview{
    background:#fafafa;
    border-radius:30px;
    padding:30px;
  }
  
  .preview-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  
  .preview-header span{
    color:#4CAF50;
    font-weight:600;
  }
  
  /* DEVICE */
  
  .iot-device{
    margin:40px auto;
    width:320px;
    height:230px;
    background:#ececec;
  
    border-radius:30px;
  
    position:relative;
  
    display:flex;
    align-items:center;
    justify-content:center;
  
    box-shadow:0 30px 50px rgba(0,0,0,.1);
  }
  
  .device-screen{
    width:180px;
    height:120px;
    background:#101010;
  
    border-radius:20px;
  
    color:white;
  
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }
  
  .device-screen svg{
    color:#4CAF50;
    margin-bottom:10px;
  }
  
  .device-screen p{
    font-size:12px;
    letter-spacing:3px;
  }
  
  .device-antenna{
    position:absolute;
    left:-12px;
    top:25px;
  
    width:10px;
    height:120px;
  
    background:#111;
    border-radius:20px;
  }
  
  .device-light{
    position:absolute;
    bottom:18px;
    right:18px;
  
    width:12px;
    height:12px;
  
    border-radius:50%;
    background:#4CAF50;
  
    box-shadow:0 0 20px #4CAF50;
  }
  
  /* INFO */
  
  .device-info-grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:18px;
  }
  
  .info-card{
    background:white;
    border-radius:22px;
    padding:22px;
  }
  
  .info-card svg{
    color:#4CAF50;
    margin-bottom:12px;
  }
  
  .info-card p{
    margin-top:10px;
    color:#777;
    font-size:14px;
  }
  
  /* PANEL */
  
  .sensor-panel{
    background:#fafafa;
    border-radius:30px;
    padding:28px;
  }
  
  .panel-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    margin-bottom:25px;
  }
  
  .panel-header button{
    border:none;
    background:#4CAF50;
    color:white;
  
    padding:10px 18px;
  
    border-radius:12px;
  
    font-weight:600;
  }
  
  .sensor-item{
    background:white;
    border-radius:22px;
    padding:18px;
  
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    margin-bottom:16px;
  }
  
  .sensor-left{
    display:flex;
    align-items:center;
    gap:16px;
  }
  
  .sensor-icon{
    width:55px;
    height:55px;
    border-radius:16px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .green-bg{
    background:#eaf8ea;
    color:#4CAF50;
  }
  
  .blue-bg{
    background:#eaf2ff;
    color:#3b82f6;
  }
  
  .orange-bg{
    background:#fff5e5;
    color:#f59e0b;
  }
  
  .purple-bg{
    background:#f3e8ff;
    color:#9333ea;
  }
  
  .sensor-status{
    padding:10px 16px;
    border-radius:14px;
    font-weight:600;
  }
  
  .online{
    background:#eaf8ea;
    color:#4CAF50;
  }
  
  .warning{
    background:#fff5e5;
    color:#f59e0b;
  }
  
  /* SYSTEM */
  
  .system-card{
    margin-top:20px;
    background:white;
    border-radius:24px;
    padding:24px;
  }
  
  .system-progress{
    margin-top:20px;
  }
  
  .progress-top{
    display:flex;
    justify-content:space-between;
    margin-bottom:10px;
  }
  
  .progress-bar{
    width:100%;
    height:12px;
    background:#eee;
    border-radius:30px;
    overflow:hidden;
  }
  
  .progress-fill{
    width:92%;
    height:100%;
    background:#4CAF50;
  }
  
  .system-list{
    margin-top:25px;
  }
  
  .system-list div{
    display:flex;
    align-items:center;
    gap:10px;
    margin-bottom:14px;
  }
  
  .system-list svg{
    color:#4CAF50;
  }
  
  /* RESPONSIVE */
  
  @media(max-width:1400px){
  
    .device-status-grid{
      grid-template-columns:repeat(2,1fr);
    }
  
    .device-grid{
      grid-template-columns:1fr;
    }
  
  }
  
  @media(max-width:1000px){
  
    .device-page{
      flex-direction:column;
    }
  
    .sidebar{
      width:100%;
    }
  
  }
  
  @media(max-width:768px){
  
    .main-content{
      padding:20px;
    }
  
    .topbar{
      flex-direction:column;
      align-items:flex-start;
      gap:20px;
    }
  
    .device-status-grid{
      grid-template-columns:1fr;
    }
  
    .device-info-grid{
      grid-template-columns:1fr;
    }
  
    .iot-device{
      width:100%;
    }
  
  }

  /* =========================
   DARK MODE DEVICE PAGE
========================= */

body.dark-mode{

background:
radial-gradient(circle at top left,#0f3d1d,#020617 45%);

color:white;

}

/* MAIN */
body.dark-mode .main-content{

background:
linear-gradient(
180deg,
rgba(15,23,42,.95),
rgba(2,6,23,.98)
);

border:1px solid rgba(255,255,255,.08);

}

/* CARD */
body.dark-mode .device-status-card,
body.dark-mode .device-preview,
body.dark-mode .sensor-panel,
body.dark-mode .info-card,
body.dark-mode .system-card{

background:#0f172a;
color:white;

border:1px solid rgba(255,255,255,.06);

}

/* SENSOR ITEM */
body.dark-mode .sensor-item{

background:#111827;
color:white;

}

/* DEVICE */
body.dark-mode .iot-device{

background:#1e293b;

box-shadow:
0 0 30px rgba(0,0,0,.35);

}

body.dark-mode .device-screen{

background:#020617;

}

/* TEXT */
body.dark-mode p,
body.dark-mode span{

color:#cbd5e1;

}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3,
body.dark-mode h4{

color:white;

}

/* TOPBAR */
body.dark-mode .notif{

background:#111827;

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
body.dark-mode .menu li:hover{

background:rgba(255,255,255,.05);

}

body.dark-mode .active{

background:
linear-gradient(
90deg,
#15803d,
#22c55e
);

}

/* INPUT */
body.dark-mode input,
body.dark-mode select{

background:#020617;
color:white;
border:1px solid #334155;

}

/* BUTTON */
body.dark-mode button{

background:#16a34a;
color:white;

}

/* PROGRESS */
body.dark-mode .progress-bar{

background:#1e293b;

}

body.dark-mode .progress-fill{

background:#22c55e;

}
  
  </style>