<template>
  <div class="history-page">

    <!-- MAIN -->
    <main class="main-content">

      <!-- TOP -->
      <div class="topbar">

        <div>
          <h1>{{ t.title }}</h1>
          <p>
            {{ t.desc }}
          </p>
        </div>

        <div class="top-right">
  
  <span class="update-text">
    ● {{ t.updated }}
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

      <!-- STATS -->
      <div class="stats-grid">

        <div class="stat-card">

          <Database size="30" />

          <div>
            <h4>{{ t.total_data }}</h4>
            <h2>{{ totalData }}</h2>
            <p>{{ t.stored_data }}</p>
          </div>

        </div>

        <div class="stat-card">

          <Thermometer size="30" />

          <div>
            <h4>{{ t.avg_room_temp }}</h4>
            <h2>{{ avgSuhuRuang }} °C</h2>
            <p>{{ t.last_30_days }}</p>
          </div>

        </div>

        <div class="stat-card">

          <Droplets size="30" />

          <div>
            <h4>{{ t.avg_compost_temp }}</h4>
            <h2>{{ avgSuhuKompos }} °C</h2>
            <p>{{ t.last_30_days }}</p>
          </div>

        </div>

        <div class="stat-card">

          <FlaskConical size="30" />

          <div>
            <h4>{{ t.avg_compost_hum }}</h4>
            <h2>{{ avgHumKompos }} %</h2>
            <p>{{ t.last_30_days }}</p>
          </div>

        </div>

        <div class="stat-card">

          <Wind size="30" />

          <div>
            <h4>{{ t.avg_air_hum }}</h4>
            <h2>{{ avgHumUdara }} %</h2>
            <p>{{ t.last_30_days }}</p>
          </div>

        </div>

      </div>

      <!-- CHART + FILTER -->
      <div class="middle-grid">

        <!-- CHART -->
        <div class="chart-card">
          <div class="chart-header">
            <h3>
              {{ t.graph_title }}
            </h3>

            <button>
              {{ t.last_7_days }}
            </button>
          </div>

          <!-- LEGEND -->
          <div class="legend">

            <div>
              <span class="green"></span>
              {{ t.temp }} (°C)
            </div>

            <div>
              <span class="blue"></span>
              {{ t.humidity }} (%)
            </div>
          </div>

          <!-- FAKE GRAPH -->
          <div class="graph">
        <Line :data="chartData" :options="chartOptions" />
        </div>
        </div>

        <!-- FILTER -->
        <div class="filter-card">

          <h3>{{ t.filter_data }}</h3>

          <div class="input-group">

            <label>{{ t.choose_period }}</label>

            <select v-model="selectedPeriod">
              <option>{{ t.last_7_days }}</option>
              <option>30 Hari</option>
            </select>

          </div>

          <div class="input-group">

            <label>{{ t.from_date }}</label>

            <input type="date" v-model="startDate" />

          </div>

          <div class="input-group">

            <label>{{ t.until_date }}</label>

            <input type="date" v-model="endDate" />

          </div>

          <div class="input-group">

            <label>{{ t.choose_parameter }}</label>

            <select v-model="selectedParameter">
              <option>{{ t.all_parameter }}</option>
              <option>Suhu</option>
              <option>Kelembapan</option>
              <option>pH</option>
            </select>

          </div>

          <button class="filter-btn"
          @click="currentPage = 1">

            <Filter size="18" />
            {{ t.apply_filter }}
          </button>
        </div>
      </div>

      <!-- TABLE -->
      <div class="table-card">

        <div class="table-header">

<h3>{{ t.latest_history }}</h3>

<div class="table-actions">

  <!-- DOWNLOAD -->
  <button
  class="download-btn"
  @click="downloadExcel"
>
  📊 Unduh Dataset K-NN
</button>

  <!-- DELETE ALL -->
  <button
  class="delete-all-btn"
  @click="deleteAllHistory"
>
  {{ t.delete_all }}
</button>

</div>

</div>

        <table>

<thead>

  <tr>
    <th>No</th>
    <th>{{ t.time }}</th>
    <th>{{ t.room_temp }}</th>
    <th>{{ t.compost_temp }}</th>
    <th>{{ t.compost_hum }}</th>
    <th>{{ t.air_hum }}</th>
    <th>Usia Hari</th>
    <th>Label K-NN</th>
    <th>{{ t.status }}</th>
    <th>{{ t.action }}</th>
  </tr>

</thead>

<tbody>

  <tr
    v-for="(item, index) in paginatedData"
    :key="item.id"
  >

    <!-- NOMOR -->
    <td>
      {{ (currentPage - 1) * itemsPerPage + index + 1 }}
    </td>

    <!-- WAKTU -->
    <td>
      {{ formatDate(item.created_at) }}
    </td>

    <!-- SUHU RUANG -->
    <td class="green-text">
      {{ item.suhu_ruang }}°C
    </td>

    <!-- SUHU KOMPOS -->
    <td class="blue-text">
      {{ item.suhu_material }}°C
    </td>

    <!-- KELEMBAPAN KOMPOS -->
    <td class="orange-text">
      {{ item.kelembapan_kompos }}%
    </td>

    <!-- KELEMBAPAN UDARA -->
    <td class="purple-text">
      {{ item.kelembapan_udara }}%
    </td>

    <!-- USIA HARI -->
<td>
  {{ item.usia_hari }} Hari
</td>

<!-- LABEL KNN -->
<td>
  {{ item.label_knn }}
</td>

    <!-- STATUS -->
    <td class="status">
      ● {{ item.status }}
    </td>

    
    <!-- AKSI -->
    <td>

      <button
        class="delete-btn"
        @click="deleteHistory(item.id)"
      >
        {{ t.delete }}
      </button>

    </td>

  </tr>

</tbody>

</table>

<!-- PAGINATION -->
<div class="pagination">

<button
  @click="prevPage"
  :disabled="currentPage === 1"
>
  Prev
</button>

<span>
  {{ t.page }} {{ currentPage }}
</span>

<button
  @click="nextPage"
  :disabled="currentPage >= totalPages"
>
  Next
</button>

</div>

      </div>

    </main>

  </div>
</template>


<script setup>
import {
  Bell,
  Database,
  Thermometer,
  Droplets,
  FlaskConical,
  Wind,
  Filter,
  Download
} from 'lucide-vue-next'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

import { Line } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

import {
  ref,
  computed,
  onMounted
} from 'vue'


const selectedPeriod = ref('7 Hari Terakhir')
const startDate = ref('')
const endDate = ref('')
const selectedParameter = ref('Semua Parameter')
const notifications = ref([])

import * as XLSX from 'xlsx'

const downloadExcel = async () => {

  try {

    const res = await fetch(
      'https://smart-compost-production.up.railway.app/history'
    )

    const data = await res.json()

    // =====================
    // SHEET 1
    // =====================

    const trainingData = data.map((item, index) => ({

No: index + 1,

'Suhu Kompos':
  item.suhu_material,

'Kelembapan Kompos':
  item.kelembapan_kompos,

'Usia Hari':
  getUsiaHariByDate(item.created_at),

Label:
  getLabelKNN(
    getUsiaHariByDate(item.created_at)
  )

}))

    // =====================
    // SHEET 2
    // =====================
    const testingData = data.slice(-20).map((item, index) => ({

No: index + 1,

'Suhu Kompos':
  item.suhu_material,

'Kelembapan Kompos':
  item.kelembapan_kompos,

'Usia Hari':
  getUsiaHariByDate(item.created_at)

}))
    
    // =====================
    // SHEET 3
    // =====================
    const hasilKnn = data.slice(-20).map((item, index) => ({

No: index + 1,

'Suhu Kompos':
  item.suhu_material,

'Kelembapan Kompos':
  item.kelembapan_kompos,

'Usia Hari':
  getUsiaHariByDate(item.created_at),

K: 3,

'Hasil Prediksi':
  getLabelKNN(
    getUsiaHariByDate(item.created_at)
  )

}))

    const workbook =
      XLSX.utils.book_new()

    const ws1 =
      XLSX.utils.json_to_sheet(trainingData)

    const ws2 =
      XLSX.utils.json_to_sheet(testingData)

    const ws3 =
      XLSX.utils.json_to_sheet(hasilKnn)

    XLSX.utils.book_append_sheet(
      workbook,
      ws1,
      'Data Training'
    )

    XLSX.utils.book_append_sheet(
      workbook,
      ws2,
      'Data Testing'
    )

    XLSX.utils.book_append_sheet(
      workbook,
      ws3,
      'Hasil KNN'
    )

    XLSX.writeFile(
      workbook,
      'SmartCompost_KNN.xlsx'
    )

  } catch(err) {

    console.log(err)

    alert('Gagal mengunduh data')

  }

}

const translations = {
id: {

  title: 'Data & Riwayat',
  desc: 'Riwayat data sensor dan analisis kondisi kompos',
  updated: 'Terakhir diperbarui',
  total_data: 'Total Data',
  stored_data: 'Data tersimpan',
  avg_room_temp: 'Rata-rata Suhu Ruang Komposter',
  avg_compost_temp: 'Rata-rata Suhu Material Kompos',
  avg_compost_hum: 'Rata-rata Kelembapan Kompos',
  avg_air_hum: 'Rata-rata Kelembapan Udara',
  last_30_days: '30 hari terakhir',
  graph_title: 'Grafik Perubahan Kondisi Kompos',
  last_7_days: '7 Hari Terakhir',
  temp: 'Suhu (°C)',
  humidity: 'Kelembapan (%)',
  filter_data: 'Filter Data',
  choose_period: 'Pilih Periode',
  from_date: 'Dari Tanggal',
  until_date: 'Sampai Tanggal',
  choose_parameter: 'Pilih Parameter',
  all_parameter: 'Semua Parameter',
  apply_filter: 'Terapkan Filter',
  latest_history: 'Riwayat Data Terbaru',
  download_data: 'Unduh Data',
  delete_all: 'Hapus Semua',
  time: 'Waktu',
  room_temp: 'Suhu Ruang',
  compost_temp: 'Suhu Kompos',
  compost_hum: 'Kelembapan Kompos',
  air_hum: 'Kelembapan Udara',
  status: 'Status',
  description: 'Keterangan',
  action: 'Aksi',
  stable_condition: 'Kondisi kompos stabil',
  delete: 'Hapus',
  page: 'Halaman',
  no_data: 'Belum ada data'

},

en: {

  title: 'Data & History',
  desc: 'Sensor data history and compost condition analysis',
  updated: 'Last updated',
  total_data: 'Total Data',
  stored_data: 'Stored data',
  avg_room_temp: 'Average Compost Room Temperature',
  avg_compost_temp: 'Average Compost Material Temperature',
  avg_compost_hum: 'Average Compost Humidity',
  avg_air_hum: 'Average Air Humidity',
  last_30_days: 'Last 30 days',
  graph_title: 'Compost Condition Change Chart',
  last_7_days: 'Last 7 Days',
  temp: 'Temperature (°C)',
  humidity: 'Humidity (%)',
  filter_data: 'Filter Data',
  choose_period: 'Select Period',
  from_date: 'From Date',
  until_date: 'Until Date',
  choose_parameter: 'Select Parameter',
  all_parameter: 'All Parameters',
  apply_filter: 'Apply Filter',
  latest_history: 'Latest Data History',
  download_data: 'Download Data',
  delete_all: 'Delete All',
  time: 'Time',
  room_temp: 'Room Temperature',
  compost_temp: 'Compost Temperature',
  compost_hum: 'Compost Humidity',
  air_hum: 'Air Humidity',
  status: 'Status',
  description: 'Description',
  action: 'Action',
  stable_condition: 'Compost condition is stable',
  delete: 'Delete',
  page: 'Page',
  no_data: 'No data yet'

}

}

const currentLang = computed(() => {

const saved =
  JSON.parse(
    localStorage.getItem('system_settings')
  )

return saved?.language === 'English'
  ? 'en'
  : 'id'

})

const t = computed(() => {
return translations[currentLang.value]
})

const chartData = computed(() => {

const reversed =
  [...filteredHistories.value]
    .reverse()

return {

  labels: reversed.map(item =>
  new Date(item.created_at)
    .toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  ),

  datasets: [

    {
      label: 'Suhu Kompos',
      data: reversed.map(item =>
        item.suhu_material
      ),
      borderColor: '#4CAF50',
      backgroundColor: '#4CAF50',
      tension: 0.4
    },

    {
      label: 'Kelembapan Kompos',
      data: reversed.map(item =>
        item.kelembapan_kompos
      ),
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      tension: 0.4
    }

  ]

}

})

const chartOptions = {

responsive: true,

maintainAspectRatio: false,

plugins: {

  legend: {
    display: true
  }

}

}

const filteredHistories = computed(() => {

  let data = [...histories.value]

  // FILTER PERIODE
  if (selectedPeriod.value === '7 Hari Terakhir') {

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    data = data.filter(item => {
      return new Date(item.created_at) >= sevenDaysAgo
    })

  }

  if (selectedPeriod.value === '30 Hari') {

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    data = data.filter(item => {
      return new Date(item.created_at) >= thirtyDaysAgo
    })

  }


  // FILTER TANGGAL
  if (startDate.value) {

    data = data.filter(item => {
      return new Date(item.created_at) >= new Date(startDate.value)
    })

  }

  if (endDate.value) {

    const end = new Date(endDate.value)
    end.setHours(23,59,59,999)

    data = data.filter(item => {
      return new Date(item.created_at) <= end
    })

  }

  return data

})

const lastUpdate = computed(() => {

if (histories.value.length === 0)
  return 'Belum ada data'

const latest =
  histories.value[0]?.created_at

return new Date(latest)
  .toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) + ' WIB'

})



/* =========================
   HISTORY DATA
========================= */
const histories = ref([])

/* =========================
   HITUNG USIA KOMPOS
========================= */
const getUsiaHariByDate = (createdAt) => {

const startDate = new Date('2026-05-19')

const dataDate = new Date(createdAt)

const diff =
  Math.floor(
    (dataDate - startDate)
    / (1000 * 60 * 60 * 24)
  )

return diff

}

/* =========================
   LABEL KNN BERDASARKAN USIA
========================= */
const getLabelKNN = (usiaHari) => {

  if (usiaHari <= 19)
    return 'Belum Matang'

  if (usiaHari <= 29)
    return 'Hampir Matang'

  return 'Matang'

}

/* =========================
   PAGINATION
========================= */
const currentPage = ref(1)
const itemsPerPage = 10

/* =========================
   FETCH HISTORY DARI RAILWAY
========================= */
const fetchHistory = async () => {

  try {

    const res = await fetch(
      'https://smart-compost-production.up.railway.app/history'
    )

    const data = await res.json()

    histories.value = data

  } catch (err) {

    console.log('ERROR FETCH:', err)

  }

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

/* =========================
   LOAD DATA
========================= */
onMounted(() => {

  fetchHistory()
  fetchNotifications()

})

/* =========================
   TOTAL PAGE
========================= */
const totalPages = computed(() => {

return Math.ceil(
  filteredHistories.value.length / itemsPerPage
)

})

/* =========================
   DATA PER PAGE
========================= */
const paginatedData = computed(() => {

const start =
  (currentPage.value - 1) * itemsPerPage

const end =
  start + itemsPerPage

return filteredHistories.value.slice(start, end)

})

/* =========================
   NEXT PAGE
========================= */
const nextPage = () => {

  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }

}

/* =========================
   PREV PAGE
========================= */
const prevPage = () => {

  if (currentPage.value > 1) {
    currentPage.value--
  }

}

/* =========================
   DELETE HISTORY
========================= */
const deleteHistory = async (id) => {

  const confirmDelete =
    confirm('Hapus data ini?')

  if (!confirmDelete) return

  try {

    await fetch(
      `https://smart-compost-production.up.railway.app/history/${id}`,
      {
        method: 'DELETE'
      }
    )

    await fetchHistory()

  } catch (err) {

    console.log('DELETE ERROR:', err)

  }

}

/* =========================
   DELETE ALL HISTORY
========================= */
const deleteAllHistory = async () => {

const confirmDelete =
  confirm('Yakin ingin menghapus SEMUA data?')

if (!confirmDelete) return

try {

  await fetch(
    'https://smart-compost-production.up.railway.app/history',
    {
      method: 'DELETE'
    }
  )

  histories.value = []
  currentPage.value = 1

  alert('Semua data berhasil dihapus')

} catch (err) {

  console.log('DELETE ALL ERROR:', err)

}

}

/* =========================
   FORMAT TANGGAL
========================= */
const formatDate = (date) => {

  return new Date(date)
    .toLocaleString('id-ID')

}

/* =========================
   TOTAL DATA
========================= */
const totalData = computed(() => {

  return histories.value.length

})

/* =========================
   AVG SUHU RUANG
========================= */
const avgSuhuRuang = computed(() => {

  if (histories.value.length === 0)
    return 0

  const total =
    histories.value.reduce((sum, item) => {

      return sum + Number(item.suhu_ruang)

    }, 0)

  return (
    total / histories.value.length
  ).toFixed(1)

})

/* =========================
   AVG SUHU KOMPOS
========================= */
const avgSuhuKompos = computed(() => {

  if (histories.value.length === 0)
    return 0

  const total =
    histories.value.reduce((sum, item) => {

      return sum + Number(item.suhu_material)

    }, 0)

  return (
    total / histories.value.length
  ).toFixed(1)

})

/* =========================
   AVG HUM KOMPOS
========================= */
const avgHumKompos = computed(() => {

  if (histories.value.length === 0)
    return 0

  const total =
    histories.value.reduce((sum, item) => {

      return sum + Number(item.kelembapan_kompos)

    }, 0)

  return (
    total / histories.value.length
  ).toFixed(1)

})

/* =========================
   AVG HUM UDARA
========================= */
const avgHumUdara = computed(() => {

  if (histories.value.length === 0)
    return 0

  const total =
    histories.value.reduce((sum, item) => {

      return sum + Number(item.kelembapan_udara)

    }, 0)

  return (
    total / histories.value.length
  ).toFixed(1)

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

body{
  font-family:'Poppins',sans-serif;
}

.history-page{
  min-height:100vh;
  display:flex;
  padding:20px;
  gap:20px;
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
  opacity:.8;
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
  transition:0.3s;
}

.menu li:hover{
  background:rgba(255,255,255,0.08);
}

.active{
  background:#4CAF50;
}

/* BOTTOM CARD */

.sidebar-card{
  background:rgba(255,255,255,0.08);
  border-radius:24px;
  padding:24px;
  display:flex;
  gap:15px;
  align-items:center;
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
  margin-bottom:10px;
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
  color:#555;
  font-size:14px;
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
  top:-2px;
  right:-2px;
  width:24px;
  height:24px;
  border-radius:50%;
  background:#4CAF50;
  color:white;
  font-size:12px;
  font-weight:700;
  display:flex;
  align-items:center;
  justify-content:center;
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

/* STATS */

.stats-grid{
  margin-top:35px;

  display:grid;
  grid-template-columns:repeat(5,1fr);

  gap:18px;
}

.stat-card{
  background:#fafafa;

  border-radius:24px;

  padding:24px;

  display:flex;
  gap:18px;
}

.stat-card svg{
  color:#4CAF50;
}

.stat-card h2{
  margin:10px 0;
}

.stat-card p{
  color:#777;
  font-size:14px;
}

/* MIDDLE */

.middle-grid{
  margin-top:25px;

  display:grid;
  grid-template-columns:2fr 1fr;

  gap:20px;
}

/* CHART */

.chart-card{
  background:#fafafa;

  border-radius:30px;

  padding:28px;
}

.chart-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.chart-header button{
  border:none;
  background:white;

  padding:12px 18px;

  border-radius:14px;

  font-weight:600;
}

.legend{
  display:flex;
  gap:28px;

  margin-top:25px;
}

.legend div{
  display:flex;
  align-items:center;
  gap:10px;

  font-size:14px;
}

.legend span{
  width:18px;
  height:6px;
  border-radius:20px;
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

.graph{
  height:320px;
  margin-top:25px;
  border-radius:24px;
  background:white;
  padding:20px;

}

.line{
  position:absolute;
  width:90%;
  height:4px;
  left:5%;
  border-radius:30px;
}

.green-line{
  background:#4CAF50;
  top:35%;
}

.blue-line{
  background:#3b82f6;
  top:48%;
}

.orange-line{
  background:#f59e0b;
  top:70%;
}

.purple-line{
  background:#9333ea;
  top:60%;
}

/* FILTER */

.filter-card{
  background:#fafafa;

  border-radius:30px;

  padding:28px;
}

.filter-card h3{
  margin-bottom:24px;
}

.input-group{
  margin-bottom:20px;
}

.input-group label{
  display:block;
  margin-bottom:10px;
  font-size:14px;
}

.input-group input,
.input-group select{
  width:100%;

  padding:14px;

  border-radius:14px;

  border:1px solid #ddd;

  font-family:'Poppins',sans-serif;
}

.filter-btn{
  width:100%;

  margin-top:10px;

  border:none;

  background:#4CAF50;
  color:white;

  padding:16px;

  border-radius:16px;

  font-weight:700;

  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;

  cursor:pointer;
}

/* TABLE */

.table-card{
  margin-top:25px;

  background:#fafafa;

  border-radius:30px;

  padding:28px;
}

.table-header{
  display:flex;
  justify-content:space-between;
  align-items:center;

  margin-bottom:25px;
}

.table-header .download-btn{
  border:none;
  background:white;
  padding:12px 18px;
  border-radius:14px;
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:600;
}

table{
  width:100%;
  border-collapse:collapse;
}

thead{
  background:white;
}

th,
td{
  padding:18px;
  text-align:left;
}

tbody tr{
  border-bottom:1px solid #eee;
}

.green-text{
  color:#4CAF50;
  font-weight:700;
}

.blue-text{
  color:#3b82f6;
  font-weight:700;
}

.orange-text{
  color:#f59e0b;
  font-weight:700;
}

.purple-text{
  color:#9333ea;
  font-weight:700;
}

.status{
  color:#4CAF50;
}

/* RESPONSIVE */

@media(max-width:1400px){

  .stats-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .middle-grid{
    grid-template-columns:1fr;
  }

}

@media(max-width:1000px){

  .history-page{
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

  .stats-grid{
    grid-template-columns:1fr;
  }

  table{
    font-size:13px;
  }

  th,
  td{
    padding:12px;
  }

}

.delete-btn{
  border:none;
  background:#ef4444;
  color:white;
  padding:8px 14px;
  border-radius:10px;
  cursor:pointer;
  font-weight:600;
}

.pagination{
  margin-top:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:20px;
}

.pagination button{
  border:none;
  background:#4CAF50;
  color:white;
  padding:10px 18px;
  border-radius:10px;
  cursor:pointer;
}

.pagination button:disabled{
  opacity:.5;
  cursor:not-allowed;
}

.table-actions{
  display:flex;
  gap:12px;
}

.download-btn{
  border:none;
  background:rgb(193, 9, 9);
  padding:12px 18px;
  border-radius:14px;
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:600;
  cursor:pointer;
}

.delete-all-btn{
  border:none;
  background:#ef4444;
  color:white;
  padding:12px 18px;
  border-radius:14px;
  font-weight:700;
  cursor:pointer;
}

.delete-all-btn:hover{
  opacity:.9;
}

/* =========================
   DARK MODE HISTORY
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
body.dark-mode .stat-card,
body.dark-mode .chart-card,
body.dark-mode .filter-card,
body.dark-mode .table-card,
body.dark-mode .graph{

background:#0f172a;
color:white;

border:1px solid rgba(255,255,255,.06);

}

/* TABLE */
body.dark-mode table{

color:white;

}

body.dark-mode thead{

background:#111827;

}

body.dark-mode tbody tr{

border-bottom:
1px solid rgba(255,255,255,.06);

}

/* INPUT */
body.dark-mode input,
body.dark-mode select{

background:#020617;
color:white;
border:1px solid #334155;

}

/* BUTTON */
body.dark-mode .chart-header button,
body.dark-mode .download-btn{

background:#1e293b;
color:white;

}

/* TEXT */
body.dark-mode p,
body.dark-mode span,
body.dark-mode label,
body.dark-mode td{

color:#cbd5e1;

}

/* NOTIF */
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

/* TABLE HEADER */
body.dark-mode th{

color:white;

}

/* DOWNLOAD BUTTON */
body.dark-mode .filter-btn,
body.dark-mode .pagination button{

background:#16a34a;

}

</style>