<template>
    <div class="settings-page">
  
  
      <!-- MAIN -->
      <main class="main-content">
  
        <!-- TOPBAR -->
        <div class="topbar">
  
          <div>
  
            <h1>Pengaturan</h1>
  
            <p>
              Kelola sistem dan perangkat IoT SmartCompost
            </p>
  
          </div>
  
          <div class="top-right">
  
            <span class="update-text">
              ● Terakhir diperbarui: 10:30 WIB
            </span>
  
            <div class="notif-icon">
  
              <Bell size="20" />
  
              <div class="notif-badge">
                3
              </div>
            </div>
        </div>
    </div>

        <!-- CONTENT -->
        <div class="settings-grid">
  
          <!-- SYSTEM -->
          <div class="settings-card">
  
            <div class="card-header">
  
              <div class="header-icon green-bg">
                <Settings2 size="28" />
              </div>
  
              <div>
  
                <h2>Pengaturan Sistem</h2>
  
                <p>
                  Atur preferensi sistem dan tampilan dashboard
                </p>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box blue-bg">
                  <Clock3 size="24" />
                </div>
  
                <div>
                  <h4>Zona Waktu</h4>
                  <p>Pilih zona waktu sistem</p>
                </div>
  
              </div>
  
              <select>
                <option>Asia/Jakarta (WIB)</option>
                <option>Asia/Makassar (WITA)</option>
                <option>Asia/Jayapura (WIT)</option>
              </select>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box cyan-bg">
                  <Globe size="24" />
                </div>
  
                <div>
                  <h4>Bahasa</h4>
                  <p>Pilih bahasa tampilan</p>
                </div>
  
              </div>
  
              <select>
                <option>Bahasa Indonesia</option>
                <option>English</option>
              </select>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box green-bg">
                  <RefreshCw size="24" />
                </div>
  
                <div>
                  <h4>Interval Refresh Data</h4>
                  <p>Interval pembaruan data sensor</p>
                </div>
  
              </div>
  
              <select>
                <option>10 detik</option>
                <option>30 detik</option>
                <option>1 menit</option>
              </select>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box gray-bg">
                  <Monitor size="24" />
                </div>
  
                <div>
                  <h4>Tema Tampilan</h4>
                  <p>Pilih tema dashboard</p>
                </div>
  
              </div>
  
              <div class="theme-group">
  
                <button class="theme-btn active-theme">
                  ☀ Terang
                </button>
  
                <button class="theme-btn">
                  🌙 Gelap
                </button>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box purple-bg">
                  <Thermometer size="24" />
                </div>
  
                <div>
                  <h4>Satuan Suhu</h4>
                  <p>Pilih satuan suhu</p>
                </div>
  
              </div>
  
              <div class="theme-group">
  
                <button class="theme-btn active-theme">
                  °C
                </button>
  
                <button class="theme-btn">
                  °F
                </button>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box purple-bg">
                  <Calendar size="24" />
                </div>
  
                <div>
                  <h4>Format Tanggal</h4>
                  <p>Pilih format tanggal</p>
                </div>
  
              </div>
  
              <select>
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
              </select>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box orange-bg">
                  <Clock size="24" />
                </div>
  
                <div>
                  <h4>Format Waktu</h4>
                  <p>Pilih format waktu</p>
                </div>
  
              </div>
  
              <select>
                <option>24 Jam</option>
                <option>12 Jam</option>
              </select>
  
            </div>
  
            <!-- BUTTON -->
            <button class="save-btn">
              Simpan Perubahan
            </button>
  
          </div>
  
          <!-- IOT -->
          <div class="settings-card">
  
            <div class="card-header">
  
              <div class="header-icon blue-bg">
                <Cpu size="28" />
              </div>
  
              <div>
  
                <h2>Pengaturan Perangkat IoT</h2>
  
                <p>
                  Kelola perangkat IoT dan konfigurasi sensor
                </p>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box blue-bg">
                  <BadgeInfo size="24" />
                </div>
  
                <div>
                  <h4>ID Perangkat</h4>
                  <p>Identitas unik perangkat</p>
                </div>
  
              </div>
  
              <input
                type="text"
                value="ESP32-SC-001"
              />
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box green-bg">
                  <CreditCard size="24" />
                </div>
  
                <div>
                  <h4>Nama Perangkat</h4>
                  <p>Nama untuk identifikasi</p>
                </div>
  
              </div>
  
              <input
                type="text"
                value="SmartCompost Unit 1"
              />
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box purple-bg">
                  <MapPin size="24" />
                </div>
  
                <div>
                  <h4>Lokasi Perangkat</h4>
                  <p>Lokasi penempatan perangkat</p>
                </div>
  
              </div>
  
              <input
                type="text"
                value="Komposter Utama"
              />
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box green-bg">
                  <Power size="24" />
                </div>
  
                <div>
                  <h4>Status Perangkat</h4>
                  <p>Aktifkan atau nonaktifkan perangkat</p>
                </div>
  
              </div>
  
              <label class="switch">
                <input type="checkbox" checked />
                <span class="slider"></span>
              </label>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box blue-bg">
                  <Wifi size="24" />
                </div>
  
                <div>
                  <h4>Koneksi WiFi</h4>
                  <p>SSID jaringan WiFi</p>
                </div>
  
              </div>
  
              <input
                type="text"
                value="SmartCompost_WiFi"
              />
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box orange-bg">
                  <CloudUpload size="24" />
                </div>
  
                <div>
                  <h4>Interval Kirim Data</h4>
                  <p>Interval pengiriman data ke server</p>
                </div>
  
              </div>
  
              <select>
                <option>10 detik</option>
                <option>30 detik</option>
                <option>1 menit</option>
              </select>
  
            </div>
  
            <!-- ITEM -->
            <div class="setting-item">
  
              <div class="setting-left">
  
                <div class="icon-box purple-bg">
                  <SlidersHorizontal size="24" />
                </div>
  
                <div>
                  <h4>Kalibrasi Sensor</h4>
                  <p>Terakhir kalibrasi sensor</p>
                </div>
  
              </div>
  
              <button class="calibration-btn">
                Kalibrasi Ulang
              </button>
  
            </div>
  
            <!-- BUTTON -->
            <button class="save-btn">
              Simpan Perubahan
            </button>
  
          </div>
  
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
    Settings2,
    Clock3,
    Globe,
    RefreshCw,
    Monitor,
    Thermometer,
    Calendar,
    Clock,
    BadgeInfo,
    CreditCard,
    MapPin,
    Power,
    Wifi,
    CloudUpload,
    SlidersHorizontal
  } from 'lucide-vue-next'
  </script>
  
  <style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  .settings-page{
    min-height:100vh;
    background:#f4f7f4;
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
    background:#fafafa;
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
  
  </style>