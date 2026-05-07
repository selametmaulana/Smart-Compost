<template>
  <div class="layout">

    <!-- TOPBAR -->
  <div class="topbar">
  <div class="menu-btn" @click="toggleSidebar">☰</div>
  <h3>🌱 Smart Compost</h3>

  <div class="top-right">
    
    <!-- 🔔 ICON NOTIF -->
    <div class="notif-wrapper" @click="toggleNotif">
  <Bell />
  <span v-if="needAduk" class="badge">!</span>
</div>

  </div>
</div>

<!-- NOTIFICATION DROPDOWN -->
<div v-if="showNotif" class="notif-dropdown">

<h4>Notifikasi</h4>

<div v-if="needAduk" class="notif-item warning">
  🚨 Saatnya aduk kompos!
  <br>
  <small>{{ adukDays }} hari sejak terakhir aduk</small>
</div>


<div v-else class="notif-item">
  ✅ Kompos masih aman
</div>

</div>

    <!-- SIDEBAR -->
    <div :class="['sidebar', { show: isOpen }]">
      <h2 class="logo">🌱 Smart Compost</h2>

      <ul>
        <li @click="activeMenu = 'dashboard'">
          <LayoutDashboard class="icon" />
          Dashboard
        </li>

        <li @click="goSettings">
          <Settings class="icon" />
          Settings
        </li>
        
        <li @click="goHistory">
        <History class="icon" />
          History
        </li>

        <li @click="logout">
          <LogOut class="icon" />
          Logout
        </li>
      </ul>
    </div>

    <!-- OVERLAY -->
    <div v-if="isOpen" class="overlay" @click="toggleSidebar"></div>

    <!-- MAIN -->
    <div class="main">

      <!-- DASHBOARD -->
      <div v-if="activeMenu === 'dashboard'">

        <div class="monitoring-header">
          <h1>Monitoring Kondisi Kompos</h1>
          <p> Waktu pembuatan kompos anda tinggal: <b>{{ countdown }}</b></p>
          <div class="status">
            Status: {{ compostStatus }}
          </div>
        </div>

        <div class="charts">

          <div class="chart-box">
            <apexchart
              type="radialBar"
              height="250"
              :options="createGauge('#42a5f5', '°C')"
              :series="[temperature]" />
            <p>Suhu Ruang Kompos</p>
          </div>

          <div class="chart-box">
            <apexchart
              type="radialBar"
              height="250"
              :options="createGauge('#ef5350', '°C')"
              :series="[materialTemp]" />
            <p>Suhu Material Kompos</p>
          </div>

          <div class="chart-box">
            <apexchart
              type="radialBar"
              height="250"
              :options="createGauge('#29b6f6', '%')"
              :series="[humidity]" />
            <p>Kelembapan Udara</p>
          </div>

          <div class="chart-box">
            <apexchart
              type="radialBar"
              height="250"
              :options="createGauge('#66bb6a', '%')"
              :series="[compostHumidity]" />
            <p>Kelembapan Kompos</p>
          </div>

        </div>
      </div>

      <!-- DETAIL -->
      <div v-if="activeMenu === 'suhu-ruang'" class="sensor-card">
        <h2>Suhu Ruang</h2>
        <h1>{{ temperature }}°C</h1>
      </div>

      <div v-if="activeMenu === 'suhu-material'" class="sensor-card">
        <h2>Suhu Material</h2>
        <h1>{{ materialTemp }}°C</h1>
      </div>

      <div v-if="activeMenu === 'kelembapan-udara'" class="sensor-card">
        <h2>Kelembapan Udara</h2>
        <h1>{{ humidity }}%</h1>
      </div>

      <div v-if="activeMenu === 'kelembapan-kompos'" class="sensor-card">
        <h2>Kelembapan Kompos</h2>
        <h1>{{ compostHumidity }}%</h1>
      </div>

      <div class="monitoring-header"></div>
      <div class="device-status">

      <div class="device-card">
        <h3 style="color: brown; margin-top: 0px;">Pompa Air</h3>

        <span :class="pompa ? 'on' : 'off'">
        {{ pompa ? 'ON 💧' : 'OFF' }}
        </span>

        <div class="btn-group">
        <button @click="controlDevice('pompa', true)">ON</button>
        <button @click="controlDevice('pompa', false)">OFF</button>
        </div>
      </div>

        <div class="device-kipas">
          <h3 style="color: blue; margin-top: -75px; margin-left: 150px; text-align: left;">
          Kipas
          </h3>

        <span :class="fan ? 'on' : 'off'" 
        style="color: black; 
        margin-top: 40px; 
        margin-left: 150px; 
        text-align: left; 
        ">
        {{ fan ? 'ON ' : 'OFF' }}
        </span>

        <div  class="btn-group-kipas" >
        <button @click="controlDevice('fan', true)" style="color: brown; 
        margin-top: 10px; 
        margin-left: 150px; 
        text-align: left; 
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        background: #1b5e20;
        color: white;
        font-size: 12px; ">ON</button>
        <button @click="controlDevice('fan', false)" style="color: brown; 
        margin-top: -75px; 
        margin-left: 10px; 
        text-align: left; 
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        background: #1b5e20;
        color: white;
        font-size: 12px; ">OFF</button>
        </div>
      </div>

      <div class="aduk-card">
        <h3>🌱 Aduk Kompos</h3>

        <p>Terakhir aduk: {{ adukDays }} hari lalu</p>

        <p v-if="needAduk" class="warning">
        🚨 Saatnya aduk kompos!
        </p>

        <button @click="submitAduk">
          ✅ Sudah Aduk
        </button>
      </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Bell, LayoutDashboard, Settings, History, LogOut } from 'lucide-vue-next'

// =========================
// ENV API
// =========================
const API = import.meta.env.VITE_API_URL

const router = useRouter()

// =========================
// STATE
// =========================

const activeMenu = ref('dashboard')

const isOpen = ref(false)

const temperature = ref(0)
const materialTemp = ref(0)
const humidity = ref(0)
const compostHumidity = ref(0)

const countdown = ref('1 hari lagi')
const compostStatus = ref('Menunggu data...')

const pompa = ref(false)
const fan = ref(false)

const adukDays = ref(0)
const needAduk = ref(false)

const showNotif = ref(false)

// =========================
// SIDEBAR
// =========================
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const goSettings = () => router.push('/setting')
const goHistory = () => router.push('/history')


const toggleNotif = () => {
  showNotif.value = !showNotif.value
}

// =========================
// NOTIFIKASI ADUK
// =========================
watch(needAduk, (val) => {
  if (val) {
    alert("🚨 Saatnya aduk kompos!")
  }
})

// =========================
// CONTROL DEVICE
// =========================
const controlDevice = async (device, value) => {
  try {
    await fetch(`${API}/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device,
        state: value
      })
    })

    console.log(`Kirim ${device}: ${value}`)
  } catch (err) {
    console.error('Gagal kirim kontrol:', err)
  }
}

// =========================
// GAUGE CHART
// =========================
const createGauge = (color, unit) => ({
  chart: { type: 'radialBar' },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: { size: '65%' },
      track: {
        background: '#eee',
        strokeWidth: '100%'
      },
      dataLabels: {
        name: { show: false },
        value: {
          fontSize: '28px',
          fontWeight: 'bold',
          offsetY: 5,
          formatter: (val) => val + unit
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: [color],
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  stroke: { lineCap: 'round' },
  colors: [color]
})

// =========================
// FETCH SENSOR DATA
// =========================
const fetchSensorData = async () => {
  try {
    const res = await fetch(`${API}/sensor-data`)
    const data = await res.json()

    temperature.value = data.suhu_udara || 0
    materialTemp.value = data.suhu_kompos || 0
    humidity.value = data.kelembapan_udara || 0
    compostHumidity.value = data.kelembapan_kompos || 0
    compostStatus.value = data.status || 'Tidak ada status'

    pompa.value = Boolean(data.pompa)
    fan.value = Boolean(data.fan)

  } catch (error) {
    console.error('Gagal mengambil data sensor:', error)
  }
}

// =========================
// FETCH STATUS ADUK
// =========================
const fetchAdukStatus = async () => {
  const token = localStorage.getItem('token')

  try {
    const res = await fetch(`${API}/aduk-status`, {
      headers: { Authorization: token }
    })

    const data = await res.json()

    adukDays.value = data.days
    needAduk.value = data.needAduk
  } catch (err) {
    console.error('Gagal ambil status aduk:', err)
  }
}

// =========================
// SUBMIT ADUK
// =========================
const submitAduk = async () => {
  const token = localStorage.getItem('token')

  try {
    await fetch(`${API}/aduk`, {
      method: 'POST',
      headers: { Authorization: token }
    })

    fetchAdukStatus()
  } catch (err) {
    console.error('Gagal submit aduk:', err)
  }
}

// =========================
// ON MOUNT
// =========================
onMounted(() => {
  checkAuth()

  // sensor realtime
  fetchSensorData()
  setInterval(fetchSensorData, 3000)

  // notifikasi aduk
  fetchAdukStatus()
  setInterval(fetchAdukStatus, 60000)
})
</script>
/* =========================
GLOBAL
========================= */

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Poppins',sans-serif;
}

body{
  background:#f5f9f4;
}

/* =========================
LAYOUT
========================= */

.layout{
  display:flex;
  min-height:100vh;
  background:
  radial-gradient(circle at top right,#b8ffb830,transparent 30%),
  radial-gradient(circle at bottom left,#7dff8c20,transparent 30%),
  #f7faf7;
}

/* =========================
TOPBAR
========================= */

.topbar{
  position:fixed;
  top:0;
  left:260px;
  right:0;
  height:85px;
  background:rgba(255,255,255,0.75);
  backdrop-filter:blur(12px);
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 35px;
  z-index:1000;
  border-bottom:1px solid rgba(0,0,0,0.05);
}

.topbar h3{
  font-size:28px;
  font-weight:700;
  color:#1b1b1b;
}

.top-right{
  display:flex;
  align-items:center;
  gap:20px;
}

/* =========================
NOTIFICATION
========================= */

.notif-wrapper{
  width:50px;
  height:50px;
  border-radius:16px;
  background:white;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  position:relative;
  box-shadow:0 10px 30px rgba(0,0,0,0.06);
  transition:0.3s;
}

.notif-wrapper:hover{
  transform:translateY(-3px);
}

.badge{
  position:absolute;
  top:-5px;
  right:-5px;
  width:20px;
  height:20px;
  border-radius:50%;
  background:red;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:11px;
  font-weight:bold;
}

.notif-dropdown{
  position:fixed;
  top:95px;
  right:30px;
  width:300px;
  background:white;
  border-radius:25px;
  padding:20px;
  box-shadow:0 20px 50px rgba(0,0,0,0.1);
  z-index:2000;
}

.notif-dropdown h4{
  margin-bottom:15px;
  font-size:20px;
}

.notif-item{
  padding:15px;
  border-radius:15px;
  background:#f7f7f7;
  line-height:1.6;
}

.notif-item.warning{
  background:#fff1f1;
  color:#e53935;
}

/* =========================
SIDEBAR
========================= */

.sidebar{
  width:260px;
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  background:
  linear-gradient(180deg,#0c220f,#183d1a);
  color:white;
  padding:30px 20px;
  z-index:1001;
}

.logo{
  font-size:30px;
  margin-bottom:50px;
  font-weight:700;
}

.sidebar ul{
  list-style:none;
}

.sidebar li{
  display:flex;
  align-items:center;
  gap:12px;
  padding:18px;
  border-radius:18px;
  margin-bottom:15px;
  cursor:pointer;
  font-weight:500;
  transition:0.3s;
}

.sidebar li:hover{
  background:#4CAF50;
  transform:translateX(5px);
}

.icon{
  width:20px;
  height:20px;
}

/* =========================
MAIN
========================= */

.main{
  margin-left:260px;
  width:100%;
  padding:120px 35px 40px;
}

/* =========================
HEADER
========================= */

.monitoring-header{
  margin-bottom:35px;
}

.monitoring-header h1{
  font-size:58px;
  line-height:1.1;
  color:#111;
  margin-bottom:15px;
}

.monitoring-header p{
  font-size:22px;
  color:#666;
}

.status{
  margin-top:15px;
  display:inline-block;
  background:#e9f7e9;
  color:#2e7d32;
  padding:12px 22px;
  border-radius:30px;
  font-weight:600;
}

/* =========================
CHARTS
========================= */

.charts{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(270px,1fr));
  gap:25px;
  margin-top:40px;
}

.chart-box{
  background:rgba(255,255,255,0.8);
  backdrop-filter:blur(12px);
  border-radius:30px;
  padding:30px;
  text-align:center;
  box-shadow:0 20px 40px rgba(0,0,0,0.06);
  transition:0.3s;
}

.chart-box:hover{
  transform:translateY(-6px);
}

.chart-box p{
  margin-top:15px;
  font-size:18px;
  font-weight:600;
  color:#333;
}

/* =========================
DEVICE STATUS
========================= */

.device-status{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:25px;
  margin-top:40px;
}

/* =========================
DEVICE CARD
========================= */

.device-card,
.device-kipas,
.aduk-card{
  background:white;
  border-radius:30px;
  padding:30px;
  box-shadow:0 20px 40px rgba(0,0,0,0.06);
}

.device-card h3,
.device-kipas h3,
.aduk-card h3{
  font-size:26px;
  margin-bottom:20px;
  color:#111 !important;
}

/* =========================
STATUS ON OFF
========================= */

.on{
  display:inline-block;
  background:#e8f5e9;
  color:#2e7d32;
  padding:10px 18px;
  border-radius:30px;
  font-weight:600;
}

.off{
  display:inline-block;
  background:#ffebee;
  color:#d32f2f;
  padding:10px 18px;
  border-radius:30px;
  font-weight:600;
}

/* =========================
BUTTONS
========================= */

.btn-group,
.btn-group-kipas{
  display:flex;
  gap:15px;
  margin-top:25px;
}

.btn-group button,
.btn-group-kipas button,
.aduk-card button{
  border:none !important;
  background:#4CAF50 !important;
  color:white !important;
  padding:12px 20px !important;
  border-radius:14px !important;
  cursor:pointer;
  font-size:15px !important;
  font-weight:600;
  transition:0.3s;
  margin:0 !important;
}

.btn-group button:hover,
.btn-group-kipas button:hover,
.aduk-card button:hover{
  background:#2e7d32 !important;
  transform:translateY(-2px);
}

/* =========================
ADUK
========================= */

.aduk-card p{
  margin-bottom:15px;
  color:#666;
  font-size:17px;
}

.warning{
  color:#e53935 !important;
  font-weight:700;
}

/* =========================
SENSOR DETAIL
========================= */

.sensor-card{
  background:white;
  border-radius:30px;
  padding:50px;
  text-align:center;
  box-shadow:0 20px 40px rgba(0,0,0,0.06);
}

.sensor-card h2{
  font-size:34px;
  margin-bottom:15px;
}

.sensor-card h1{
  font-size:70px;
  color:#4CAF50;
}

/* =========================
MENU BUTTON MOBILE
========================= */

.menu-btn{
  display:none;
  font-size:28px;
  cursor:pointer;
}

/* =========================
OVERLAY
========================= */

.overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.4);
  z-index:999;
}

/* =========================
RESPONSIVE
========================= */

@media(max-width:900px){

  .topbar{
    left:0;
    padding:0 20px;
  }

  .menu-btn{
    display:block;
  }

  .sidebar{
    left:-280px;
    transition:0.3s;
  }

  .sidebar.show{
    left:0;
  }

  .main{
    margin-left:0;
    padding:110px 20px 40px;
  }

  .monitoring-header h1{
    font-size:42px;
  }

  .monitoring-header p{
    font-size:18px;
  }

  .charts{
    grid-template-columns:1fr;
  }

  .device-status{
    grid-template-columns:1fr;
  }

}