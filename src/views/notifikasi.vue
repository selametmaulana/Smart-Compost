<template>
    <div class="notification-page">


    <!-- MAIN -->
    <main class="main-content">

        <!-- TOPBAR -->
        <div class="topbar">

        <div>
            <h1>Notifikasi</h1>
            <p>Pusat notifikasi dan peringatan sistem</p>
        </div>

        <div class="top-right">

            <span class="update-text">
              ● Terakhir diperbarui: 10:30 WIB
            </span>
  
            <div class="notif-icon">
  
              <Bell size="22" />
  
              <div class="notif-badge">
                3
              </div>
  
            </div>
          </div>
  
        </div>
  
        <!-- SUMMARY -->
        <div class="summary-grid">
  
          <div class="summary-card">
  
            <div class="summary-icon red">
              <BellRing size="28" />
            </div>
  
            <div>
              <h4>Total Notifikasi</h4>
              <h2>128</h2>
              <p>Semua waktu</p>
            </div>
  
          </div>
  
          <div class="summary-card">
  
            <div class="summary-icon orange">
              <TriangleAlert size="28" />
            </div>
  
            <div>
              <h4>Peringatan</h4>
              <h2>8</h2>
              <p>Perlu perhatian</p>
            </div>
  
          </div>
  
          <div class="summary-card">
  
            <div class="summary-icon green">
              <BadgeCheck size="28" />
            </div>
  
            <div>
              <h4>Informasi</h4>
              <h2>112</h2>
              <p>Informasi sistem</p>
            </div>
  
          </div>
  
          <div class="summary-card">
  
            <div class="summary-icon blue">
              <Eye size="28" />
            </div>
  
            <div>
              <h4>Belum Dibaca</h4>
              <h2>3</h2>
              <p>Notifikasi baru</p>
            </div>
  
          </div>
  
        </div>
  
        <!-- CONTENT -->
        <div class="content-grid">
  
          <!-- LEFT -->
          <div class="notification-box">
  
            <!-- HEADER -->
            <div class="box-header">
  
              <h3>Daftar Notifikasi</h3>
  
              <div class="filters">
  
                <button class="active-filter">
                  Semua
                </button>
  
                <button>
                  Belum Dibaca
                </button>
  
                <button>
                  Terbaru
                </button>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="notification-item">
  
              <div class="notif-left">
  
                <div class="notif-icon-box red-bg">
                  <TriangleAlert size="24" />
                </div>
  
                <div>
                  <h4 class="red-text">
                    Suhu Tinggi Terdeteksi
                  </h4>
  
                  <p>
                    Suhu kompos mencapai 52.6°C,
                    melebihi batas optimal (50°C)
                  </p>
                </div>
  
              </div>
  
              <div class="notif-right">
  
                <span>10:30 WIB</span>
  
                <label class="danger-label">
                  Peringatan
                </label>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="notification-item">
  
              <div class="notif-left">
  
                <div class="notif-icon-box orange-bg">
                  <Droplets size="24" />
                </div>
  
                <div>
                  <h4 class="orange-text">
                    Kelembapan Rendah
                  </h4>
  
                  <p>
                    Kelembapan kompos turun menjadi 40%
                  </p>
                </div>
  
              </div>
  
              <div class="notif-right">
  
                <span>10:25 WIB</span>
  
                <label class="warning-label">
                  Peringatan
                </label>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="notification-item">
  
              <div class="notif-left">
  
                <div class="notif-icon-box green-bg">
                  <BadgeCheck size="24" />
                </div>
  
                <div>
                  <h4 class="green-text">
                    Kondisi Kompos Optimal
                  </h4>
  
                  <p>
                    Semua parameter dalam kondisi optimal
                  </p>
                </div>
  
              </div>
  
              <div class="notif-right">
  
                <span>10:20 WIB</span>
  
                <label class="success-label">
                  Informasi
                </label>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="notification-item">
  
              <div class="notif-left">
  
                <div class="notif-icon-box blue-bg">
                  <Wifi size="24" />
                </div>
  
                <div>
                  <h4 class="blue-text">
                    Perangkat Terhubung
                  </h4>
  
                  <p>
                    ESP32 berhasil terhubung ke server
                  </p>
                </div>
  
              </div>
  
              <div class="notif-right">
  
                <span>10:15 WIB</span>
  
                <label class="info-label">
                  Informasi
                </label>
  
              </div>
  
            </div>
  
            <!-- ITEM -->
            <div class="notification-item">
  
              <div class="notif-left">
  
                <div class="notif-icon-box green-bg">
                  <Database size="24" />
                </div>
  
                <div>
                  <h4 class="green-text">
                    Data Berhasil Disimpan
                  </h4>
  
                  <p>
                    Data sensor berhasil disimpan ke database
                  </p>
                </div>
  
              </div>
  
              <div class="notif-right">
  
                <span>10:10 WIB</span>
  
                <label class="success-label">
                  Informasi
                </label>
  
              </div>
  
            </div>
  
          </div>
  
          <!-- RIGHT -->
          <div class="right-panel">
  
            <!-- FILTER -->
            <div class="filter-card">
  
              <h3>Filter Notifikasi</h3>
  
              <div class="form-group">
  
                <label>Pilih Jenis</label>
  
                <select>
                  <option>Semua Jenis</option>
                  <option>Peringatan</option>
                  <option>Informasi</option>
                </select>
  
              </div>
  
              <div class="form-group">
  
                <label>Pilih Status</label>
  
                <select>
                  <option>Semua Status</option>
                  <option>Belum Dibaca</option>
                  <option>Sudah Dibaca</option>
                </select>
  
              </div>
  
              <div class="form-group">
  
                <label>Dari Tanggal</label>
  
                <input type="date" />
              </div>
  
              <div class="form-group">
  
                <label>Sampai Tanggal</label>
  
                <input type="date" />
              </div>
  
              <button class="filter-btn">
                Terapkan Filter
              </button>
  
            </div>
  
            <!-- SETTINGS -->
            <div class="settings-card">
  
              <h3>Pengaturan Notifikasi</h3>
  
              <div class="setting-item">
  
                <div class="setting-left">
  
                  <div class="setting-icon green-bg">
                    <Bell size="20" />
                  </div>
  
                  <span>Notifikasi Email</span>
  
                </div>
  
                <span class="active-status">
                  Aktif
                </span>
  
              </div>
  
              <div class="setting-item">
  
                <div class="setting-left">
  
                  <div class="setting-icon orange-bg">
                    <Smartphone size="20" />
                  </div>
  
                  <span>Notifikasi WhatsApp</span>
  
                </div>
  
                <span class="active-status">
                  Aktif
                </span>
  
              </div>
  
              <div class="setting-item">
  
                <div class="setting-left">
  
                  <div class="setting-icon blue-bg">
                    <Monitor size="20" />
                  </div>
  
                  <span>Notifikasi Browser</span>
  
                </div>
  
                <span class="active-status">
                  Aktif
                </span>
  
              </div>
  
            </div>
  
            <!-- INFO -->
            <div class="info-card">
  
              <div class="info-top">
  
                <Info size="24" />
  
                <h4>Informasi</h4>
  
              </div>
  
              <p>
                Anda akan menerima notifikasi otomatis
                ketika terjadi perubahan kondisi kompos
                yang memerlukan perhatian.
              </p>
  
            </div>
  
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
    BellRing,
    TriangleAlert,
    BadgeCheck,
    Eye,
    Droplets,
    Wifi,
    Database,
    Smartphone,
    Monitor,
    Info
  } from 'lucide-vue-next'
  </script>
  
  <style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  .notification-page{
    min-height:100vh;
    display:flex;
    gap:20px;
    padding:20px;
    font-family:'Poppins',sans-serif;
  }
  
  /* SIDEBAR */
  
  .sidebar{
    width:290px;
    background:linear-gradient(180deg,#07220c,#0f3517);
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
    width:60px;
    height:60px;
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
    font-size:52px;
  }
  
  .topbar p{
    color:#777;
    margin-top:6px;
  }
  
  .top-right{
    display:flex;
    align-items:center;
    gap:22px;
  }
  
  .update-text{
    color:#666;
    font-size:14px;
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
    top:-3px;
    right:-3px;
  
    width:24px;
    height:24px;
  
    border-radius:50%;
    background:red;
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
    width:50px;
    height:50px;
    border-radius:50%;
    background:#4CAF50;
  }
  
  /* SUMMARY */
  
  .summary-grid{
    margin-top:35px;
  
    display:grid;
    grid-template-columns:repeat(4,1fr);
  
    gap:20px;
  }
  
  .summary-card{
    background:#fafafa;
    border-radius:28px;
    padding:25px;
  
    display:flex;
    gap:18px;
  }
  
  .summary-icon{
    width:70px;
    height:70px;
    border-radius:20px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .red{
    background:#ffe9e9;
    color:#ef4444;
  }
  
  .orange{
    background:#fff4e4;
    color:#f59e0b;
  }
  
  .green{
    background:#e9f9eb;
    color:#4CAF50;
  }
  
  .blue{
    background:#eaf2ff;
    color:#3b82f6;
  }
  
  .summary-card h2{
    margin:8px 0;
  }
  
  .summary-card p{
    color:#777;
  }
  
  /* CONTENT */
  
  .content-grid{
    margin-top:25px;
  
    display:grid;
    grid-template-columns:1.6fr .8fr;
  
    gap:20px;
  }
  
  /* NOTIFICATION */
  
  .notification-box{
    background:#fafafa;
    border-radius:30px;
    padding:28px;
  }
  
  .box-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    margin-bottom:25px;
  }
  
  .filters{
    display:flex;
    gap:10px;
  }
  
  .filters button{
    border:none;
    background:white;
    padding:12px 18px;
    border-radius:12px;
    cursor:pointer;
    font-weight:600;
  }
  
  .active-filter{
    background:#4CAF50 !important;
    color:white;
  }
  
  .notification-item{
    background:white;
    border-radius:24px;
    padding:22px;
  
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    margin-bottom:18px;
  }
  
  .notif-left{
    display:flex;
    gap:18px;
  }
  
  .notif-icon-box{
    width:60px;
    height:60px;
    border-radius:18px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .red-bg{
    background:#ffe9e9;
    color:#ef4444;
  }
  
  .orange-bg{
    background:#fff4e4;
    color:#f59e0b;
  }
  
  .green-bg{
    background:#e9f9eb;
    color:#4CAF50;
  }
  
  .blue-bg{
    background:#eaf2ff;
    color:#3b82f6;
  }
  
  .notification-item p{
    color:#777;
    margin-top:8px;
  }
  
  .notif-right{
    text-align:right;
  }
  
  .notif-right span{
    font-size:14px;
    color:#777;
  }
  
  .notif-right label{
    display:inline-block;
    margin-top:12px;
    padding:8px 14px;
    border-radius:12px;
    font-size:13px;
    font-weight:600;
  }
  
  .danger-label{
    background:#ffe9e9;
    color:#ef4444;
  }
  
  .warning-label{
    background:#fff4e4;
    color:#f59e0b;
  }
  
  .success-label{
    background:#e9f9eb;
    color:#4CAF50;
  }
  
  .info-label{
    background:#eaf2ff;
    color:#3b82f6;
  }
  
  .red-text{
    color:#ef4444;
  }
  
  .orange-text{
    color:#f59e0b;
  }
  
  .green-text{
    color:#4CAF50;
  }
  
  .blue-text{
    color:#3b82f6;
  }
  
  /* RIGHT */
  
  .right-panel{
    display:flex;
    flex-direction:column;
    gap:20px;
  }
  
  .filter-card,
  .settings-card,
  .info-card{
    background:#fafafa;
    border-radius:28px;
    padding:25px;
  }
  
  .form-group{
    margin-top:18px;
  }
  
  .form-group label{
    display:block;
    margin-bottom:10px;
    font-weight:600;
  }
  
  .form-group input,
  .form-group select{
    width:100%;
    padding:14px;
    border-radius:14px;
    border:1px solid #ddd;
    outline:none;
  }
  
  .filter-btn{
    width:100%;
    margin-top:20px;
  
    border:none;
    background:#4CAF50;
    color:white;
  
    padding:16px;
    border-radius:16px;
  
    font-weight:600;
    cursor:pointer;
  }
  
  .setting-item{
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    margin-top:22px;
  }
  
  .setting-left{
    display:flex;
    align-items:center;
    gap:14px;
  }
  
  .setting-icon{
    width:48px;
    height:48px;
    border-radius:14px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .active-status{
    color:#4CAF50;
    font-weight:700;
  }
  
  .info-top{
    display:flex;
    align-items:center;
    gap:10px;
  
    color:#4CAF50;
  
    margin-bottom:14px;
  }
  
  .info-card p{
    color:#666;
    line-height:1.7;
  }
  
  /* RESPONSIVE */
  
  @media(max-width:1400px){
  
    .summary-grid{
      grid-template-columns:repeat(2,1fr);
    }
  
    .content-grid{
      grid-template-columns:1fr;
    }
  
  }
  
  @media(max-width:1000px){
  
    .notification-page{
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
  
    .summary-grid{
      grid-template-columns:1fr;
    }
  
    .notification-item{
      flex-direction:column;
      align-items:flex-start;
      gap:18px;
    }
  
    .notif-right{
      text-align:left;
    }
  
    .box-header{
      flex-direction:column;
      align-items:flex-start;
      gap:18px;
    }
  
  }
  
  </style>