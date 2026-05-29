<template>
    <div class="settings-page">
      <!-- MAIN -->
      <main class="main-content">
        <!-- TOPBAR -->
        <div class="topbar">
          <div>
            <h1>{{ t.settings }}</h1>
            <p>{{ t.system_desc }}</p>
          </div>
          <div class="top-right">
            <span class="update-text">
              ● Terakhir diperbarui:
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
        <!-- CONTENT -->
        <div class="settings-grid">
          <!-- IOT -->
          <div class="settings-card">
            <div class="card-header">
              <div class="header-icon blue-bg">
                <Cpu size="28" />
              </div>
              <div>
                <h2>{{ t.iot_settings }}</h2>
                <p>
                  {{ t.system_desc }}
                </p>
              </div>
            </div>
            <!-- ITEM -->
            <div class="setting-item">
              <div class="setting-left">
                <div class="icon-box orange-bg">
                  <Thermometer size="24" />
                </div>
                <div>
                  <h4>Settings Suhu</h4>
                  <p>Atur batas minimum dan maksimum suhu kompos</p>
                </div>
              </div>
              <div class="threshold-group">
                <input
                type="number"
                placeholder="Min °C"
                v-model="device.temp_min"/>
                <input
                type="number"
                placeholder="Max °C"
                v-model="device.temp_max"/>
              </div>
            </div>
            <!-- ITEM -->
            <div class="setting-item">
              <div class="setting-left">
                <div class="icon-box blue-bg">
                  <Droplets size="24" />
                </div>
                <div>
                  <h4>Settings Kelembapan</h4>
                  <p>Atur batas minimum dan maksimum kelembapan kompos</p>
                </div>
              </div>
              <div class="threshold-group">
                <input
                type="number"
                placeholder="Min %"
                v-model="device.humidity_min"/>
                <input
                type="number"
                placeholder="Max %"
                v-model="device.humidity_max"/>
              </div>
            </div>
            <!-- ITEM -->
            <div class="setting-item">
              <div class="setting-left">
                <div class="icon-box purple-bg">
                  <MapPin size="24" />
                </div>
                <div>
                  <h4>{{ t.device_location }}</h4>
                  <p>{{ t.name_location }}</p>
                </div>
              </div>
              <input type="text" v-model="device.location"/>
            </div>
            <!-- ITEM -->
            <div class="setting-item">
              <div class="setting-left">
                <div class="icon-box green-bg">
                  <Power size="24" />
                </div>
                <div>
                  <h4>{{ t.device_status }}</h4>
                  <p>{{ t.enable_device }}</p>
                </div>
              </div>
            </div>
            <!-- ITEM WIFI-->
            <div class="setting-item">
              <div class="setting-left">
                <div class="icon-box blue-bg">
                  <Wifi size="24" />
                </div>
                <div>
                  <h4>{{ t.wifi }}</h4>
                  <p>{{ t.ssid_wifi }}</p>
                </div>
              </div>
              <input type="text"
              v-model="device.wifi_ssid"/>
            </div>
            <!-- ITEM -->
            <div class="setting-item">
              <div class="setting-left">
                <div class="icon-box orange-bg">
                  <CloudUpload size="24" />
                </div>
                <div>
                  <h4>{{ t.send_interval }}</h4>
                  <p>{{ t.interval }}</p>
                </div>
              </div>
              <select v-model="device.send_interval">
                <option :value="10">10 detik</option>
                <option :value="30">30 detik</option>
                <option :value="60">1 menit</option>
              </select>
            </div>
            <!-- BUTTON -->
            <button
            class="save-btn"
            @click="saveDevice"
            :disabled="loading">
            {{ loading ? t.saving : t.save }}
          </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, computed } from 'vue'

import {
    Cpu,
    Bell,
    Thermometer,
    MapPin,
    Power,
    Wifi,
    CloudUpload,
    Droplets
  } from 'lucide-vue-next'

const loading = ref(false)
const notifications = ref([])

const device = ref({
  device_id: 'device1',
  temp_min: 30,
  temp_max: 60,
  humidity_min: 30,
  humidity_max: 80,
  location: '',
  is_active: true,
  wifi_ssid: '',
  send_interval: '10',
  last_calibration: ''
})

const lastUpdated = ref(
  new Date().toLocaleString('id-ID')
)

const applyTheme = (theme) => {
if (theme === 'dark') {
  document.body.classList.add('dark-mode')
} else {
  document.body.classList.remove('dark-mode')
}
}

onMounted(() => {

  const saved =
    localStorage.getItem('system_settings')
  if (saved) {
    systemSettings.value =
      JSON.parse(saved)
    // APPLY THEME SAAT PAGE LOAD
    applyTheme(systemSettings.value.theme)
  }
  loadDevice()
})

const currentDeviceId = ref('device1')

const loadDevice = async () => {
  try {
    const res = await fetch(
      `https://smart-compost-production.up.railway.app/devices/${currentDeviceId.value}`
    )
    const data = await res.json()
    if (data) {
      device.value = {
        ...device.value,
        ...data
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const saveDevice = async () => {
loading.value = true
try {
  const payload = {
temp_min: Number(device.value.temp_min),
temp_max: Number(device.value.temp_max),
humidity_min: Number(device.value.humidity_min),
humidity_max: Number(device.value.humidity_max),
location: device.value.location,
is_active: device.value.is_active,
wifi_ssid: device.value.wifi_ssid,
send_interval: Number(device.value.send_interval),
last_calibration: device.value.last_calibration
}
  const res = await fetch(
    `https://smart-compost-production.up.railway.app/devices/${device.value.device_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  )
  const data = await res.json()
  console.log(data)
  if (!res.ok) {
    alert('❌ Gagal menyimpan')
    return
  }

  alert('✅ Device berhasil disimpan')
  // =========================
  // REDIRECT KE DASHBOARD
  // =========================
  window.location.href = '/dashboard'

} catch (err) {
  console.log(err)
  alert('❌ Server error')
} finally {
  loading.value = false
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

onMounted(() => {
loadDevice()
fetchNotifications()
})
  </script>
  
  <style>
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

  html,
body{
  margin:0;
  padding:0;
  background:#f1f5f9;
}

.threshold-group{
  display:flex;
  gap:10px;
  width:260px;
}

.threshold-group input{
  width:120px;
}

body.dark-mode{
  background:#020617 !important;
}
  
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  body,
.main-content,
.settings-card,
input,
select,
.theme-btn{

  transition:.3s ease;

}
  .settings-page{
    min-height:100vh;
    display:flex;
    gap:20px;
    padding:20px;
    font-family:'Poppins',sans-serif;
  }
  
  /* SIDEBAR */
  
  .sidebar{
    width:290px;
    background:linear-gradient(180deg,#041f0a,#0d3518);
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
    width:65px;
    height:65px;
    border-radius:20px;
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
    border-radius:24px;
    padding:24px;
  
    display:flex;
    gap:14px;
  }
  
  /* MAIN */
  
  .main-content{
    flex:1;
    background: white;
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
    font-size:56px;
  }
  
  .topbar p{
    color:#777;
    margin-top:8px;
  }
  
  .top-right{
    display:flex;
    align-items:center;
    gap:20px;
  }
  
  .update-text{
    color:#666;
  }
  
  .notif-icon{
    width:55px;
    height:55px;
    border-radius:50%;
    background:#fafafa;
  
    display:flex;
    align-items:center;
    justify-content:center;
  
    position:relative;
  }
  
  .notif-badge{
    position:absolute;
    top:-4px;
    right:-4px;
  
    width:24px;
    height:24px;
  
    border-radius:50%;
    background:#4CAF50;
    color:white;
  
    font-size:12px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .profile{
    display:flex;
    align-items:center;
    gap:12px;
  }
  
  .avatar{
    width:52px;
    height:52px;
    border-radius:50%;
    background:#4CAF50;
  }
  
  /* GRID */
  
  .settings-grid{
    margin-top:30px;
  
    display:grid;
    grid-template-columns:repeat(2,1fr);
  
    gap:25px;
  }
  
  /* CARD */
  
  .settings-card{
    background:rgba(255,255,255,.9);
    border-radius:30px;
    padding:28px;
  }
  
  .card-header{
    display:flex;
    align-items:center;
    gap:16px;
  
    margin-bottom:30px;
  }
  
  .card-header h2{
    font-size:30px;
  }
  
  .card-header p{
    color:#777;
    margin-top:6px;
  }
  
  .header-icon{
    width:70px;
    height:70px;
    border-radius:22px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }


  
  /* ITEM */
  
  .setting-item{
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    gap:20px;
  
    padding:22px 0;
    border-top:1px solid #ececec;
  }
  
  .setting-left{
    display:flex;
    gap:16px;
  }
  
  .setting-left h4{
    margin-bottom:6px;
  }
  
  .setting-left p{
    color:#777;
    font-size:14px;
  }
  
  .icon-box{
    width:58px;
    height:58px;
    border-radius:18px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  /* COLORS */
  
  .green-bg{
    background:#e9f9eb;
    color:#4CAF50;
  }
  
  .blue-bg{
    background:#eaf2ff;
    color:#3b82f6;
  }
  
  .cyan-bg{
    background:#e8f8ff;
    color:#06b6d4;
  }
  
  .orange-bg{
    background:#fff4e4;
    color:#f59e0b;
  }
  
  .purple-bg{
    background:#f3e8ff;
    color:#9333ea;
  }
  
  .gray-bg{
    background:#f1f5f9;
    color:#475569;
  }
  
  /* INPUT */
  
  input,
  select{
    width:240px;
    padding:14px 16px;
  
    border:1px solid #ddd;
    border-radius:14px;
  
    background:white;
  
    font-size:15px;
    outline:none;
  }
  
  /* BUTTON */
  
  .theme-group{
    display:flex;
    gap:10px;
  }
  
  .theme-btn{
    border:none;
    padding:12px 18px;
    border-radius:14px;
  
    background:white;
    cursor:pointer;
  
    font-weight:600;
  }
  
  .active-theme{
    background:#4CAF50;
    color:white;
  }
  
  .save-btn{
    width:100%;
    margin-top:30px;
  
    border:none;
    background:#2f9b33;
    color:white;
  
    padding:18px;
    border-radius:18px;
  
    font-size:16px;
    font-weight:700;
  
    cursor:pointer;
  }
  
  .calibration-btn{
    border:none;
    background:#4CAF50;
    color:white;
  
    padding:12px 18px;
    border-radius:14px;
  
    cursor:pointer;
    font-weight:600;
  }
  
  /* SWITCH */
  
  .switch{
    position:relative;
    display:inline-block;
    width:60px;
    height:32px;
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
  
    background:#ccc;
    border-radius:34px;
  
    transition:.4s;
  }
  
  .slider::before{
    position:absolute;
    content:"";
  
    height:24px;
    width:24px;
  
    left:4px;
    bottom:4px;
  
    background:white;
    border-radius:50%;
  
    transition:.4s;
  }
  
  .switch input:checked + .slider{
    background:#4CAF50;
  }
  
  .switch input:checked + .slider::before{
    transform:translateX(28px);
  }
  
  /* RESPONSIVE */
  
  @media(max-width:1400px){
  
    .settings-grid{
      grid-template-columns:1fr;
    }
  
  }
  
  @media(max-width:1000px){
  
    .settings-page{
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
  
    .setting-item{
      flex-direction:column;
      align-items:flex-start;
    }
  
    input,
    select{
      width:100%;
    }
  
    .theme-group{
      width:100%;
    }
  
    .theme-btn{
      flex:1;
    }
  
  }

  /* =========================
   DARK MODE FULL
========================= */

body.dark-mode{

background:
radial-gradient(circle at top left,#0f3d1d,#020617 45%);

color:white;

}

/* PAGE */
body.dark-mode .settings-page{

background:transparent;

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

box-shadow:
0 0 40px rgba(0,255,120,.08);

}

/* CARD */
body.dark-mode .settings-card{

background:
rgba(15,23,42,.75);

border:1px solid rgba(255,255,255,.06);

backdrop-filter:blur(14px);

color:white;

box-shadow:
0 0 20px rgba(0,255,120,.04);

}

/* TEXT */
body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h4{

color:white;

}

body.dark-mode p,
body.dark-mode .update-text{

color:#94a3b8;

}

/* ITEM */
body.dark-mode .setting-item{

border-top:1px solid rgba(255,255,255,.08);

}

/* INPUT */
body.dark-mode input,
body.dark-mode select{

background:#0f172a;

color:white;

border:1px solid #334155;

}

/* TOPBAR */
body.dark-mode .notif-icon{

background:#111827;
border:1px solid rgba(255,255,255,.08);

}

/* BUTTON */
body.dark-mode .theme-btn{

background:#1e293b;
color:white;
border:1px solid rgba(255,255,255,.08);

}

body.dark-mode .active-theme{

background:#16a34a;
color:white;

}

/* SAVE BUTTON */
body.dark-mode .save-btn{

background:
linear-gradient(
  90deg,
  #15803d,
  #22c55e
);

box-shadow:
0 0 25px rgba(34,197,94,.35);

}


/* =========================
   DARK MODE SIDEBAR
========================= */

body.dark-mode .sidebar{

background:
linear-gradient(
180deg,
#03120a,
#020617
);

border:1px solid rgba(0,255,120,.08);

box-shadow:
0 0 30px rgba(0,255,120,.08);

}

/* MENU */
body.dark-mode .menu li{

color:#e2e8f0;

}

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

/* INPUT PLACEHOLDER */
body.dark-mode input::placeholder{

color:#94a3b8;

}

/* SELECT OPTION */
body.dark-mode option{

background:#0f172a;
color:white;

}

/* NOTIF BADGE */
body.dark-mode .notif-badge{

background:#22c55e;
color:white;

}

/* ICON BOX */
body.dark-mode .green-bg{

background:rgba(34,197,94,.12);
color:#4ade80;

}

body.dark-mode .blue-bg{

background:rgba(59,130,246,.12);
color:#60a5fa;

}

body.dark-mode .purple-bg{

background:rgba(168,85,247,.12);
color:#c084fc;

}

body.dark-mode .orange-bg{

background:rgba(249,115,22,.12);
color:#fb923c;

}

body.dark-mode .cyan-bg{

background:rgba(6,182,212,.12);
color:#22d3ee;

}

body.dark-mode .gray-bg{

background:rgba(148,163,184,.12);
color:#cbd5e1;

}

/* BUTTON HOVER */
body.dark-mode .save-btn:hover{

transform:translateY(-2px);

box-shadow:
0 0 35px rgba(34,197,94,.45);

}

/* CALIBRATION BUTTON */
body.dark-mode .calibration-btn{

background:#16a34a;

}

body.dark-mode .calibration-btn:hover{

background:#22c55e;

}

/* SWITCH */
body.dark-mode .slider{

background:#334155;

}

body.dark-mode .switch input:checked + .slider{

background:#22c55e;

}

/* SCROLLBAR */
body.dark-mode ::-webkit-scrollbar{

width:10px;

}

body.dark-mode ::-webkit-scrollbar-track{

background:#020617;

}

body.dark-mode ::-webkit-scrollbar-thumb{

background:#14532d;
border-radius:20px;

}

/* GLASS EFFECT */
body.dark-mode .settings-card,
body.dark-mode .main-content{

backdrop-filter:blur(20px);

}

/* TOPBAR TITLE GLOW */
body.dark-mode .topbar h1{

text-shadow:
0 0 15px rgba(34,197,94,.15);

}
  </style>