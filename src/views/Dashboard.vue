<template>
  <div class="dashboard-layout">


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
            <h2>{{ sensor.suhu_ruang }}°C</h2>
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
            <h2>{{ sensor.suhu_material }}°C</h2>
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
      <!-- =========================
     BOTTOM GRID
========================= -->
<div class="bottom-grid">

<!-- CHART -->
<div class="chart-card">

  <div class="chart-header">

    <div>
      <h3>Grafik Suhu</h3>
      <p>Data 7 hari terakhir</p>
    </div>

    <button class="chart-btn">
      <i class="ri-time-line"></i>
      7 Hari
    </button>

  </div>

  <!-- LABEL -->
  <div class="chart-wrapper">

    <div class="y-labels">
      <span v-for="(label,index) in yLabels" :key="index">
  {{ label }}°C
</span>

</div>

    <!-- SVG -->
    <svg
      viewBox="0 0 700 260"
      class="chart-svg"
    >

      <!-- GRID -->
      <line
  v-for="(label,index) in yLabels"
  :key="index"
  x1="70"
  :y1="30 + (index * 40)"
  x2="650"
  :y2="30 + (index * 40)"
  class="grid-line"
/>

      <!-- AREA -->
      <defs>
        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4CAF50" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#4CAF50" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <path
        :d="chartArea"
        fill="url(#tempGradient)"
      />

      <!-- LINE -->
      <polyline
        :points="chartPoints"
        fill="none"
        stroke="#43A047"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- POINT -->
      <template
        v-for="(temp,index) in temperatureHistory"
        :key="index"
      >

        <circle
          :cx="80 + index * 90"
          :cy="230 - (temp * 4)"
          r="6"
          fill="#43A047"
        />

        <!-- VALUE -->
        <text
          :x="80 + index * 90"
          :y="220 - (temp * 4)"
          text-anchor="middle"
          class="temp-text"
        >
          {{ temp }}
        </text>

      </template>

    </svg>

    <!-- X LABEL -->
    <div class="x-labels">

<span
  v-for="(label,index) in chartLabels"
  :key="index"
>
  {{ label }}
</span>

</div>

  </div>

</div>

<!-- STATUS -->
<div class="status-card">

  <div
    class="status-circle"
    :class="statusClass"
  >
    <i :class="statusIcon"></i>
  </div>

  <h2 :class="statusTextClass">
    {{ compostCondition.title }}
  </h2>

  <p class="status-desc">
    {{ compostCondition.desc }}
  </p>

  <!-- RECOMMEND -->
  <div class="recommend-card">

    <div class="recommend-left">

      <div class="recommend-icon">
        <i class="ri-lightbulb-flash-line"></i>
      </div>

      <div>

        <h4>Rekomendasi</h4>

        <p>
          {{ compostCondition.recommendation }}
        </p>

      </div>

    </div>

  </div>

</div>

</div>

      <!-- =========================
     AKTUATOR MQTT
========================= -->
<div class="mode-layout">

<!-- =========================
     LEFT SIDE
========================== -->
<div class="mode-left">

  <!-- HEADER -->
  <div class="section-header">

    <div class="header-icon green">
      <i class="ri-settings-3-line"></i>
    </div>

    <div>
      <h1>Atur Mode</h1>
      <p>
        Pilih mode kontrol sistem komposter
      </p>
    </div>

  </div>

  <!-- MODE CARD -->
  <div class="mode-card-wrapper">

    <!-- MANUAL -->
    <div
      class="mode-card"
      :class="{ active: manualMode }"
      @click="setManual"
    >

      <div class="mode-card-icon">
        <i class="ri-hand-heart-line"></i>
      </div>

      <h3>Manual</h3>

      <p>
        Kontrol penuh oleh pengguna
      </p>

    </div>

    <!-- AUTO -->
    <div
      class="mode-card"
      :class="{ active: !manualMode }"
      @click="setAuto"
    >

      <div class="mode-card-icon">
        <i class="ri-robot-2-line"></i>
      </div>

      <h3>Otomatis</h3>

      <p>
        Sistem kontrol otomatis
      </p>

    </div>

  </div>

  <!-- CURRENT MODE -->
  <div class="current-mode-box">

    <div class="current-icon">
      <i class="ri-checkbox-circle-line"></i>
    </div>

    <div>

      <h3>
        Mode saat ini:
        <span>
          {{
            manualMode
              ? 'Manual'
              : 'Otomatis'
          }}
        </span>
      </h3>

      <p>
        {{
          manualMode
            ? 'Anda memiliki kontrol penuh terhadap perangkat'
            : 'Sistem bekerja otomatis berdasarkan sensor'
        }}
      </p>

    </div>

  </div>

  <!-- MANUAL CONTROL -->
  <div class="manual-control">

    <h2>Kontrol Manual Perangkat</h2>

    <!-- POMPA -->
    <div class="device-card">

      <div class="device-left">

        <div class="actuator-icon">
  <img
    src="/pompa.png"
    alt="Pompa"
    class="actuator-img"
  >
</div>

        <div>

          <h3>Pompa Air</h3>

          <p>
            Penyiraman otomatis kompos
          </p>

          <span>
            Status:
            <strong>
              {{ pumpStatus ? 'ON' : 'OFF' }}
            </strong>
          </span>

        </div>

      </div>

      <label class="switch">

        <input
          type="checkbox"
          v-model="pumpStatus"
          :disabled="!manualMode"
        >

        <span class="slider"></span>

      </label>

    </div>

    <!-- FAN -->
    <div class="device-card">

      <div class="device-left">

        <div class="actuator-icon fan">
          <img
  src="/kipas.png"
  alt="Kipas"
  :class="[
    'actuator-img',
    { 'fan-spin': fanStatus }
  ]"
/>
      </div>

        <div>

          <h3>Kipas Aerasi</h3>

          <p>
            Sirkulasi udara komposter
          </p>

          <span>
            Status:
            <strong>
              {{ fanStatus ? 'ON' : 'OFF' }}
            </strong>
          </span>

        </div>

      </div>

      <label class="switch">

        <input
          type="checkbox"
          v-model="fanStatus"
          :disabled="!manualMode"
        >

        <span class="slider"></span>

      </label>

    </div>

  </div>

  <!-- SECURITY -->
  <div class="security-box">

    <div class="security-icon">
      <i class="ri-shield-check-line"></i>
    </div>

    <div>

      <h3>Keamanan Aktif</h3>

      <p>
        Perangkat akan otomatis mati jika kondisi tidak aman
      </p>

    </div>

  </div>

</div>

<!-- =========================
     RIGHT SIDE
========================== -->
<div class="mode-right">

  <!-- HEADER -->
  <div class="section-header">

    <div class="header-icon blue">
      <i class="ri-information-line"></i>
    </div>

    <div>
      <h1>Info Mode</h1>
      <p>
        Penjelasan cara kerja setiap mode
      </p>
    </div>

  </div>

  <!-- MANUAL INFO -->
  <div class="info-card green-border">

    <div class="info-top">

      <div class="info-icon green-light">
        <i class="ri-hand-heart-line"></i>
      </div>

      <div class="info-content">

        <div class="info-title">

          <h2>Mode Manual</h2>

          <span
  :class="
    manualMode
      ? 'active-badge'
      : 'inactive-badge'
  "
>
  {{
    manualMode
      ? 'Aktif'
      : 'Nonaktif'
  }}
</span>

        </div>

        <p>
          Anda dapat mengontrol perangkat secara langsung.
        </p>

      </div>

    </div>

    <ul>
      <li>Pompa dan kipas dikontrol oleh Anda</li>
      <li>Sistem tidak akan mengubah status perangkat</li>
      <li>Cocok untuk pengujian atau kondisi khusus</li>
      <li>Notifikasi tetap aktif</li>
    </ul>

  </div>

  <!-- AUTO INFO -->
  <div class="info-card blue-border">

    <div class="info-top">

      <div class="info-icon blue-light">
        <i class="ri-robot-2-line"></i>
      </div>

      <div class="info-content">

        <div class="info-title">

          <h2>Mode Otomatis</h2>

          <span
  :class="
    !manualMode
      ? 'active-badge'
      : 'inactive-badge'
  "
>
  {{
    !manualMode
      ? 'Aktif'
      : 'Nonaktif'
  }}
</span>

        </div>

        <p>
          Sistem akan mengontrol perangkat otomatis.
        </p>

      </div>

    </div>

    <ul>
      <li>Pompa dan kipas bekerja otomatis</li>
      <li>Berdasarkan suhu dan kelembapan</li>
      <li>Menghemat waktu dan tenaga</li>
      <li>Sistem akan menyesuaikan kondisi optimal</li>
    </ul>

  </div>

  <!-- RECOMMEND -->
  <div class="recommend-box">

    <div class="recommend-icon">
      <i class="ri-lightbulb-line"></i>
    </div>

    <div>

      <h3>Rekomendasi</h3>

      <p>
        Gunakan mode otomatis untuk hasil pengomposan terbaik.
      </p>

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
  computed,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

import { Bell } from 'lucide-vue-next'

import mqtt from 'mqtt'

// =========================
// STATE
// =========================
const showSidebar = ref(false)
const pumpStatus = ref(false)
const fanStatus = ref(false)
const manualMode = ref(false)
const isUpdatingFromMqtt = ref(false)
const notifications = ref([])
const temperatureHistory = ref([])
const historyLabels = ref([])
const lastUpdated = ref('-')

const sensor = ref({
  suhu_udara: 0,
  suhu_kompos: 0,
  kelembapan_udara: 0,
  kelembapan_kompos: 0,
  status: 'Waiting...'
})

let client = null

const chartPoints = computed(() => {

if (temperatureHistory.value.length === 0) {
  return ''
}

return temperatureHistory.value
  .map((temp, index) => {

    const x = 40 + index * 80

    // semakin panas semakin naik
    const y = 220 - (temp * 2)

    return `${x},${y}`

  })
  .join(' ')

})


// =========================
// SET MODE
// =========================
const setManual = () => {

manualMode.value = true

if(client){

  client.publish(
    'iot/kompos/ta/device1/control',
    'MANUAL'
  )

}

}

const setAuto = () => {

manualMode.value = false

if(client){

  client.publish(
    'iot/kompos/ta/device1/control',
    'AUTO'
  )

}

}



watch(pumpStatus, (val) => {

if (isUpdatingFromMqtt.value) return
if (!manualMode.value) return
if (!client) return

client.publish(
  'iot/kompos/ta/device1/control',
  val
    ? 'POMPA_ON'
    : 'POMPA_OFF'
)

})

watch(fanStatus, (val) => {

if (isUpdatingFromMqtt.value) return
if (!manualMode.value) return
if (!client) return

client.publish(
  'iot/kompos/ta/device1/control',
  val
    ? 'KIPAS_ON'
    : 'KIPAS_OFF'
)

})

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
// FETCH HISTORY
// =========================
const fetchHistory = async () => {

try {

  const res = await fetch(
    'https://smart-compost-production.up.railway.app/history'
  )

  const data = await res.json()

  console.log('HISTORY:', data)

  // =========================
  // TANGGAL HARI INI
  // =========================
  const today = new Date()

  // =========================
  // 7 HARI KE BELAKANG
  // =========================
  const last7Days = []

  for (let i = 6; i >= 0; i--) {

    const d = new Date()

    d.setDate(today.getDate() - i)

    last7Days.push(
      d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short'
      })
    )

  }

  // =========================
  // GROUP DATA PER TANGGAL
  // =========================
  const grouped = {}

  data.forEach(item => {

    const label =
      new Date(item.created_at)
        .toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short'
        })

    if (!grouped[label]) {
      grouped[label] = []
    }

    grouped[label].push(
      Number(item.suhu_material || 0)
    )

  })

  // =========================
  // LABEL GRAFIK
  // =========================
  historyLabels.value = last7Days

  // =========================
  // AMBIL RATA2 SUHU
  // =========================
  temperatureHistory.value =
    last7Days.map(day => {

      if (!grouped[day]) return 0

      const total =
        grouped[day].reduce(
          (a, b) => a + b,
          0
        )

      return Math.round(
        total / grouped[day].length
      )

    })

  console.log(
    historyLabels.value,
    temperatureHistory.value
  )

} catch (err) {

  console.log(
    'ERROR HISTORY:',
    err
  )

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

  fetchHistory()  

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

suhu_ruang:
  data.suhu_udara ?? 0,

suhu_material:
  data.suhu_kompos ?? 0,

kelembapan_udara:
  data.kelembapan_udara ?? 0,

kelembapan_kompos:
  data.kelembapan_kompos ?? 0,

status:
  data.status || 'Normal'

}

// waktu update
lastUpdated.value =
  new Date().toLocaleTimeString('id-ID')

  isUpdatingFromMqtt.value = true
  pumpStatus.value = Boolean(data.pompa)
  fanStatus.value = Boolean(data.kipas)

manualMode.value =
  data.mode === 'MANUAL'

  setTimeout(() => {
  isUpdatingFromMqtt.value = false
}, 100)

console.log('📡 SENSOR:', data)

} catch (err) {

console.log('❌ MQTT ERROR:', err)

}

})

}) // <-- INI YANG KURANG


const compostCondition = computed(() => {

const temp = sensor.value.suhu_material
const humidity = sensor.value.kelembapan_kompos

if (
  temp >= 40 &&
  temp <= 60 &&
  humidity >= 40 &&
  humidity <= 70
) {
  return {
    title: 'Optimal',
    desc:
      'Proses pengomposan berjalan dengan baik dan stabil.',
    recommendation:
      'Pertahankan kelembapan dan aerasi untuk menjaga kualitas kompos.'
  }
}

if (temp < 40) {
  return {
    title: 'Suhu Rendah',
    desc:
      'Proses pengomposan lambat, tingkatkan aktivitas mikroba.',
    recommendation:
      'Tambahkan bahan hijau atau tingkatkan aerasi untuk menaikkan suhu.'
  }
}

if (temp > 60) {
  return {
    title: 'Terlalu Panas',
    desc:
      'Kurangi panas dengan menambah aerasi atau membalik kompos.',
    recommendation:
      'Aduk kompos dan kurangi penumpukan panas berlebih.'
  }
}

if (humidity < 40) {
  return {
    title: 'Terlalu Kering',
    desc:
      'Tambahkan air agar kelembapan tetap stabil.',
    recommendation:
      'Siram kompos secukupnya agar mikroba tetap aktif.'
  }
}

if (humidity > 70) {
  return {
    title: 'Terlalu Basah',
    desc:
      'Kurangi kadar air dan tingkatkan aerasi kompos.',
    recommendation:
      'Tambahkan bahan kering seperti daun atau sekam.'
  }
}

return {
  title: 'Perlu Monitoring',
  desc:
    'Kondisi kompos belum stabil.',
  recommendation:
    'Pantau kondisi kompos secara berkala.'
}

})


const statusClass = computed(() => {

const temp = sensor.value.suhu_material

if (temp < 40) return 'green'
if (temp > 60) return 'red'

return 'green'

})

const statusTextClass = computed(() => {

const temp = sensor.value.suhu_material

if (temp < 40) return 'green-text'
if (temp > 60) return 'red-text'

return 'green-text'

})

const statusIcon = computed(() => {

const temp = sensor.value.suhu_material

if (temp > 60) {
  return 'ri-error-warning-line'
}

return 'ri-check-line'

})

const chartArea = computed(() => {

if (temperatureHistory.value.length === 0) {
  return ''
}

let path = ''

temperatureHistory.value.forEach((temp, index) => {

  const x = 80 + index * 90
  const y = 230 - (temp * 4)

  if (index === 0) {
    path += `M ${x} ${y}`
  } else {
    path += ` L ${x} ${y}`
  }

})

const lastX =
  80 + ((temperatureHistory.value.length - 1) * 90)

path += ` L ${lastX} 230`
path += ` L 80 230 Z`

return path

})

const chartLabels = computed(() => {
  return historyLabels.value
})


const yLabels = computed(() => {

// ambil suhu tertinggi
const maxTemp = Math.max(
  ...temperatureHistory.value,
  40
)

// pembulatan ke atas kelipatan 10
const roundedMax =
  Math.ceil(maxTemp / 10) * 10

const labels = []

for (
  let i = roundedMax + 20;
  i >= 20;
  i -= 10
) {
  labels.push(i)
}

return labels

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


/* =========================
   CHART STYLE
========================= */

.chart-card{
  background:#F5F5F5;
  border-radius:30px;
  padding:28px;
}

.chart-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:25px;
}

.chart-header h3{
  font-size:34px;
  font-weight:800;
}

.chart-header p{
  color:#666;
  margin-top:4px;
}

.chart-btn{
  border:none;
  background:white;
  padding:12px 18px;
  border-radius:14px;
  font-weight:600;
  display:flex;
  gap:10px;
  align-items:center;
  cursor:pointer;
}

.chart-wrapper{
  position:relative;
}

.chart-svg{
  width:100%;
  height:300px;
}

.grid-line{
  stroke:#d7d7d7;
  stroke-dasharray:6;
}

.y-labels{
  position:absolute;
  left:0;
  top:10px;
  display:flex;
  flex-direction:column;
  gap:18px;
  color:#666;
  font-size:14px;
}

.x-labels{
  width:580px;
  margin-left:70px;

  display:flex;
  justify-content:space-between;

  font-size:14px;
  color:#666;

  overflow:visible;
}

.x-labels span{
  min-width:70px;
  text-align:center;
  flex-shrink:0;
}

.temp-text{
  fill:#43A047;
  font-size:14px;
  font-weight:700;
}

/* =========================
   STATUS
========================= */

.status-card{
  background:#F5F5F5;
  border-radius:30px;
  padding:30px;
  text-align:center;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
}

.status-circle{
  width:120px;
  height:120px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin:auto;
  margin-bottom:24px;
  font-size:60px;
  color:white;
}

.status-circle.green{
  background:#4CAF50;
}

.status-circle.red{
  background:#ef4444;
}

.green-text{
  color:#2e7d32;
}

.red-text{
  color:#ef4444;
}

.status-card h2{
  font-size:22px;
  font-weight:800;
  margin-bottom:14px;
  line-height:1.3;
}

.status-desc{
  font-size:15px;
  line-height:1.7;
  color:#555;
  margin-bottom:24px;
}

/* =========================
   RECOMMEND
========================= */

.recommend-card{
  border:2px dashed #b8dfb9;
  border-radius:24px;
  padding:24px 18px;
  background:#fbfffb;
  margin-top:auto;
  width:100%;
}

.recommend-left{
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  gap:14px;
}

.recommend-icon{
  min-width:52px;
  width:52px;
  height:52px;
  border-radius:50%;
  background:#e7f7e7;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#43A047;
  font-size:24px;
}

.recommend-card h4{
  font-size:18px;
  color:#2e7d32;
  margin-bottom:10px;
  font-weight:700;
}

.recommend-card p{
  font-size:15px;
  line-height:1.7;
  color:#444;
  margin:0;
}

.dashboard-bottom{
  display:grid;
  grid-template-columns: 2fr 1fr;
  gap:24px;
  align-items:stretch;
}

body{
  background:#E9ECE8;
}

.mode-layout{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:30px;
  padding:25px;
  background:#f8f8f8;
  border-radius:35px;
  font-family:'Poppins',sans-serif;
}

.mode-left,
.mode-right{
  background:white;
  border-radius:30px;
  padding:30px;
}

.section-header{
  display:flex;
  align-items:flex-start;
  gap:16px;
  margin-bottom:30px;
}

.header-icon{
  width:60px;
  height:60px;
  border-radius:18px;

  display:flex;
  align-items:center;
  justify-content:center;

  color:white;
  font-size:28px;
}

.green{
  background:#1db954;
}

.blue{
  background:#2563eb;
}

.section-header h1{
  font-size:40px;
  margin-bottom:6px;
}

.section-header p{
  color:#666;
}

/* MODE CARD */

.mode-card-wrapper{
  display:flex;
  gap:20px;
}

.mode-card{
  flex:1;
  padding:30px;
  border-radius:25px;
  background:#fafafa;
  border:2px solid #eee;

  cursor:pointer;
  transition:.3s;
}

.mode-card:hover{
  transform:translateY(-5px);
}

.mode-card.active{
  background:#1db954;
  color:white;
}

.mode-card-icon{
  font-size:40px;
  margin-bottom:15px;
}

.mode-card p{
  margin-top:10px;
}

/* CURRENT MODE */

.current-mode-box{
  margin-top:25px;
  background:#f7fff7;
  border:2px solid #d7f5d7;
  border-radius:25px;
  padding:25px;

  display:flex;
  gap:18px;
}

.current-icon{
  font-size:40px;
  color:#1db954;
}

.current-mode-box span{
  color:#1db954;
}

/* MANUAL CONTROL */

.manual-control{
  margin-top:35px;
}

.manual-control h2{
  margin-bottom:20px;
}

.device-card{
  background:#fafafa;
  border-radius:25px;
  padding:25px;

  display:flex;
  justify-content:space-between;
  align-items:center;

  margin-bottom:18px;
}

.device-left{
  display:flex;
  gap:18px;
}

.device-icon{
  width:65px;
  height:65px;
  border-radius:20px;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:34px;
}

.green-light{
  background:#eaffea;
  color:#1db954;
}

/* SWITCH */

.switch{
  position:relative;
  width:75px;
  height:40px;
}

.switch input{
  display:none;
}

.slider{
  position:absolute;
  inset:0;
  background:#ddd;
  border-radius:40px;
  transition:.3s;
}

.slider::before{
  content:'';
  position:absolute;
  width:32px;
  height:32px;
  border-radius:50%;
  background:white;
  top:4px;
  left:4px;
  transition:.3s;
}

input:checked + .slider{
  background:#1db954;
}

input:checked + .slider::before{
  transform:translateX(35px);
}

/* SECURITY */

.security-box{
  margin-top:25px;
  background:#f8fff8;
  border-radius:25px;
  padding:25px;

  display:flex;
  gap:18px;
}

.security-icon{
  font-size:40px;
  color:#1db954;
}

/* INFO CARD */

.info-card{
  border-radius:28px;
  padding:30px;
  margin-bottom:25px;
}

.green-border{
  background:#f8fff8;
  border:2px solid #d7f5d7;
}

.blue-border{
  background:#f8fbff;
  border:2px solid #d9e7ff;
}

.info-top{
  display:flex;
  gap:20px;
}

.info-icon{
  width:70px;
  height:70px;
  border-radius:22px;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:35px;
}

.blue-light{
  background:#e9f1ff;
  color:#2563eb;
}

.info-title{
  display:flex;
  align-items:center;
  gap:15px;
}

.active-badge,
.inactive-badge{
  padding:8px 16px;
  border-radius:30px;
  font-size:14px;
  font-weight:600;
}

.active-badge{
  background:#1db954;
  color:white;
}

.inactive-badge{
  background:#dbeafe;
  color:#2563eb;
}

.info-card ul{
  margin-top:25px;
  padding-left:20px;
}

.info-card li{
  margin-bottom:14px;
}

/* RECOMMEND */
.recommend-box{
  background:#fff8e8;
  border-radius:25px;
  padding:25px;

  display:flex;
  gap:18px;
}


/* RESPONSIVE */

@media(max-width:1000px){

  .mode-layout{
    grid-template-columns:1fr;
  }

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

  padding:0; /* HAPUS 18px */
  background:transparent;
}

.main-content{
  flex:1;
  padding:24px;
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

width:80px;
height:80px;

border-radius:12px;
display:flex;
align-items:center;
justify-content:center;

}

.actuator-img{

width:150px;
height:100px;
object-fit:contain;
}

.fan-spin{

animation:fanRotate 1.2s linear infinite;

}

/* ANIMASI PUTAR */
@keyframes fanRotate{

from{
  transform:rotate(0deg);
}

to{
  transform:rotate(360deg);
}

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

/* =========================
   DARK MODE COMPLETE
========================= */

/* BODY */
body.dark-mode{

background:
radial-gradient(circle at top left,#0f3d1d,#020617 45%);

color:white;

}

/* LAYOUT */
body.dark-mode .dashboard-layout,
body.dark-mode .main-content{

background:transparent;

}

/* =========================
   GLOBAL CARD
========================= */

body.dark-mode .sensor-card,
body.dark-mode .chart-card,
body.dark-mode .status-card,
body.dark-mode .recommend-box,
body.dark-mode .mode-left,
body.dark-mode .mode-right,
body.dark-mode .popup-box,
body.dark-mode .actuator-wrapper,
body.dark-mode .actuator-card,
body.dark-mode .device-card,
body.dark-mode .mode-card,
body.dark-mode .info-card{

background:
rgba(15,23,42,.85);

border:1px solid rgba(255,255,255,.05);

color:white;

backdrop-filter:blur(16px);

}

/* =========================
   SIDEBAR
========================= */

body.dark-mode .sidebar{

background:
linear-gradient(
180deg,
#03120a,
#020617
);

border:1px solid rgba(0,255,120,.08);

}

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

/* =========================
   TOPBAR
========================= */

body.dark-mode .topbar h1{
color:white;
}

body.dark-mode .topbar p,
body.dark-mode .chart-header p,
body.dark-mode .section-header p{
color:#94a3b8;
}

/* =========================
   SENSOR
========================= */

body.dark-mode .sensor-info h4,
body.dark-mode .sensor-card h3{
color:#cbd5e1;
}

body.dark-mode .sensor-info p{
color:#22c55e;
}

body.dark-mode .sensor-card h1,
body.dark-mode .sensor-card h2{
color:white;
}

/* =========================
   CHART
========================= */

body.dark-mode .chart-btn,
body.dark-mode .day-btn{

background:#1e293b;
color:white;

}

body.dark-mode .grid-line{
stroke:#334155;
}

body.dark-mode .y-labels,
body.dark-mode .x-labels{
color:#94a3b8;
}

body.dark-mode .temp-text{
fill:#4ade80;
}

/* =========================
   STATUS
========================= */

body.dark-mode .status-card h2{
color:white;
}

body.dark-mode .status-desc{
color:#cbd5e1;
}

/* RECOMMEND CARD */
body.dark-mode .recommend-card{

background:#07130c;

border:2px dashed rgba(34,197,94,.25);

}

body.dark-mode .recommend-card h4{
color:#4ade80;
}

body.dark-mode .recommend-card p{
color:#cbd5e1;
}

/* =========================
   MODE CARD
========================= */

body.dark-mode .mode-card p{
color:#94a3b8;
}

body.dark-mode .mode-card.active{

background:
linear-gradient(
135deg,
#15803d,
#22c55e
);

color:white;

}

body.dark-mode .mode-card.active p{
color:white;
}

/* =========================
   CURRENT MODE
========================= */

body.dark-mode .current-mode-box{

background:#07130c;

border:1px solid rgba(34,197,94,.15);

}

body.dark-mode .current-mode-box p{
color:#94a3b8;
}

/* =========================
   DEVICE CARD
========================= */

body.dark-mode .device-card h3{
color:white;
}

body.dark-mode .device-card p,
body.dark-mode .device-card span{
color:#94a3b8;
}

/* =========================
   SECURITY
========================= */

body.dark-mode .security-box{

background:#07130c;

border:1px solid rgba(34,197,94,.15);

}

body.dark-mode .security-box h3{
color:white;
}

body.dark-mode .security-box p{
color:#94a3b8;
}

/* =========================
   INFO CARD
========================= */

body.dark-mode .info-card p,
body.dark-mode .info-card li{
color:#cbd5e1;
}

body.dark-mode .info-title h2{
color:white;
}

/* =========================
   RECOMMEND BOX
========================= */

body.dark-mode .recommend-box{

background:#1e293b;

border:1px solid rgba(255,255,255,.05);

}

body.dark-mode .recommend-box h3,
body.dark-mode .recommend-box h4{
color:white;
}

body.dark-mode .recommend-box p{
color:#cbd5e1;
}

/* =========================
   POPUP
========================= */

body.dark-mode .popup-box{
background:#0f172a;
color:white;
}

body.dark-mode .popup-box p{
color:#cbd5e1;
}

/* =========================
   ACTUATOR
========================= */

body.dark-mode .actuator-left h4{
color:white;
}

body.dark-mode .actuator-left p,
body.dark-mode .actuator-header p{
color:#94a3b8;
}

/* =========================
   SWITCH
========================= */

body.dark-mode .slider{
background:#334155;
}

body.dark-mode input:checked + .slider{
background:#22c55e;
}

/* MODE LAYOUT DARK */
body.dark-mode .mode-layout{

background:
rgba(15,23,42,.55);

border:1px solid rgba(255,255,255,.05);

backdrop-filter:blur(14px);

}

</style>