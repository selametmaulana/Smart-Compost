<template>
  <div class="history-page">

    <!-- MAIN -->
    <main class="main-content">

      <!-- TOP -->
      <div class="topbar">

        <div>
          <h1>Data & Riwayat</h1>
          <p>
            Riwayat data sensor dan analisis kondisi kompos
          </p>
        </div>

        <div class="top-right">

          <span class="update-text">
            ● Terakhir diperbarui: 10:30 WIB
          </span>

          <div class="notif">

            <Bell size="20" />

            <div class="notif-dot">
              3
            </div>

          </div>
        </div>
      </div>

      <!-- STATS -->
      <div class="stats-grid">

        <div class="stat-card">

          <Database size="30" />

          <div>
            <h4>Total Data</h4>
            <h2>12.458</h2>
            <p>Data tersimpan</p>
          </div>

        </div>

        <div class="stat-card">

          <Thermometer size="30" />

          <div>
            <h4>Rata-rata Suhu</h4>
            <h2>45.2 °C</h2>
            <p>30 hari terakhir</p>
          </div>

        </div>

        <div class="stat-card">

          <Droplets size="30" />

          <div>
            <h4>Rata-rata Kelembapan</h4>
            <h2>56.8 %</h2>
            <p>30 hari terakhir</p>
          </div>

        </div>

        <div class="stat-card">

          <FlaskConical size="30" />

          <div>
            <h4>Rata-rata pH</h4>
            <h2>7.1</h2>
            <p>30 hari terakhir</p>
          </div>

        </div>

        <div class="stat-card">

          <Wind size="30" />

          <div>
            <h4>Rata-rata Oksigen</h4>
            <h2>18.2 %</h2>
            <p>30 hari terakhir</p>
          </div>

        </div>

      </div>

      <!-- CHART + FILTER -->
      <div class="middle-grid">

        <!-- CHART -->
        <div class="chart-card">

          <div class="chart-header">

            <h3>
              Grafik Perubahan Kondisi Kompos
            </h3>

            <button>
              7 Hari Terakhir
            </button>

          </div>

          <!-- LEGEND -->
          <div class="legend">

            <div>
              <span class="green"></span>
              Suhu (°C)
            </div>

            <div>
              <span class="blue"></span>
              Kelembapan (%)
            </div>

            <div>
              <span class="orange"></span>
              pH
            </div>

            <div>
              <span class="purple"></span>
              Oksigen (%)
            </div>

          </div>

          <!-- FAKE GRAPH -->
          <div class="graph">

            <div class="line green-line"></div>
            <div class="line blue-line"></div>
            <div class="line orange-line"></div>
            <div class="line purple-line"></div>

          </div>

        </div>

        <!-- FILTER -->
        <div class="filter-card">

          <h3>Filter Data</h3>

          <div class="input-group">

            <label>Pilih Periode</label>

            <select>
              <option>7 Hari Terakhir</option>
              <option>30 Hari</option>
            </select>

          </div>

          <div class="input-group">

            <label>Dari Tanggal</label>

            <input type="date" />

          </div>

          <div class="input-group">

            <label>Sampai Tanggal</label>

            <input type="date" />

          </div>

          <div class="input-group">

            <label>Pilih Parameter</label>

            <select>
              <option>Semua Parameter</option>
              <option>Suhu</option>
              <option>Kelembapan</option>
              <option>pH</option>
            </select>

          </div>

          <button class="filter-btn">

            <Filter size="18" />
            Terapkan Filter

          </button>

        </div>

      </div>

      <!-- TABLE -->
      <div class="table-card">

        <div class="table-header">

          <h3>Riwayat Data Terbaru</h3>

          <button>
            <Download size="18" />
            Unduh Data
          </button>

        </div>

        <table>

          <thead>

            <tr>
              <th>Waktu</th>
              <th>Suhu</th>
              <th>Kelembapan</th>
              <th>pH</th>
              <th>Oksigen</th>
              <th>Status</th>
              <th>Keterangan</th>
            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in histories"
              :key="item.id"
            >

              <td>{{ item.time }}</td>

              <td class="green-text">
                {{ item.temp }}
              </td>

              <td class="blue-text">
                {{ item.humidity }}
              </td>

              <td class="orange-text">
                {{ item.ph }}
              </td>

              <td class="purple-text">
                {{ item.oxygen }}
              </td>

              <td class="status">
                ● Optimal
              </td>

              <td>
                Kondisi kompos baik
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </main>

  </div>
</template>

<script setup>
import {
  Leaf,
  LayoutDashboard,
  Cpu,
  Files,
  Bell,
  Settings,
  Database,
  Thermometer,
  Droplets,
  FlaskConical,
  Wind,
  Filter,
  Download
} from 'lucide-vue-next'

const histories = [
  {
    id: 1,
    time: '20 Mei 2024, 10:30',
    temp: '48.6°C',
    humidity: '58%',
    ph: '7.2',
    oxygen: '18.6%'
  },
  {
    id: 2,
    time: '20 Mei 2024, 10:20',
    temp: '47.8°C',
    humidity: '57%',
    ph: '7.1',
    oxygen: '18.3%'
  },
  {
    id: 3,
    time: '20 Mei 2024, 10:10',
    temp: '46.9°C',
    humidity: '56%',
    ph: '7.2',
    oxygen: '18.1%'
  },
  {
    id: 4,
    time: '20 Mei 2024, 10:00',
    temp: '46.3°C',
    humidity: '55%',
    ph: '7.1',
    oxygen: '17.9%'
  }
]
</script>

<style scoped>

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

  background:linear-gradient(to top,#eef8ed,#ffffff);

  position:relative;
  overflow:hidden;
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

.table-header button{
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

</style>