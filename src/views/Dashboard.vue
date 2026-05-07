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

    <div class="user">
      {{ user?.name || 'Loading...' }}
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
const user = ref(null)
const activeMenu = ref('dashboard')

const isTempOpen = ref(false)
const isHumOpen = ref(false)
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

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}

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
// AUTH USER
// =========================
const checkAuth = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    router.push('/')
    return
  }

  try {
    const res = await fetch(`${API}/dashboard`, {
      headers: { Authorization: token }
    })

    const data = await res.json()
    user.value = data
  } catch (error) {
    console.error('Auth gagal:', error)
    localStorage.removeItem('token')
    router.push('/')
  }
}

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

<style scoped>
.layout { display: flex; }

.topbar {
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  height: 60px;
  background: #1b5e20;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000; /* 🔥 penting */
}

.top-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* ICON */
.notif-wrapper {
  position: relative;
  cursor: pointer;
  font-size: 20px;
}

/* BADGE MERAH */
.badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background: red;
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 50%;
}

/* DROPDOWN */
.notif-dropdown {
  position: fixed;   /* 🔥 ganti absolute → fixed */
  right: 20px;
  top: 70px;
  width: 250px;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  z-index: 2000; /* 🔥 biar di atas semua */
}

.notif-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.notif-item.warning {
  color: red;
  font-weight: bold;
}

.menu-btn {
  display: none;
  font-size: 22px;
  cursor: pointer;
}

.sidebar {
  width: 220px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(#1b5e20, #66bb6a);
  color: white;
  padding: 20px;
  transition: 0.3s;
}

.sidebar li {
  display: flex;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
}

.submenu { padding-left: 20px; }

.main {
  margin-left: 1px; 
  margin-top: 0px;   
  padding: 20px;
  width: 200%;
  height: 100%;
  box-sizing: border-box;

  transition: all 0.3s ease; /* smooth saat sidebar toggle */
}

/* HEADER */
.monitoring-header {
  margin-bottom: 15px;
}

.monitoring-header h1 {
  font-size: 50px;
  margin-top: -20px;
}

.monitoring-header p {
  color: #666;
  font-size: 30px;
}

.status{
  font-size: 20px;
}

.charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
  gap: 20px;
}


.chart-box {
  background: white;
  padding: 25px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.chart-box p {
  margin-top: 10px;
  font-weight: 500;
  color: #444;
}

.sensor-card {
  background: white;
  padding: 40px;
  text-align: center;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
}

@media (max-width:768px){
  .topbar { left:0 }
  .menu-btn { display:block }
  .sidebar { left:-250px }
  .sidebar.show { left:0 }
  .main { margin-left:0 }
}

.btn-group {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.btn-group button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #1b5e20;
  color: white;
  font-size: 12px;
}



.btn-group button:hover {
  background: #2e7d32;
}

.aduk-card {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  margin-top: 20px;
}

.warning {
  color: red;
  font-weight: bold;
}

.notif-wrapper {
  position: relative;
}

.badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background: red;
  color: white;
}

</style>