<template>
    <div class="home">
  
      <!-- BLUR -->
      <div class="bg-blur blur-1"></div>
      <div class="bg-blur blur-2"></div>
  
      <!-- NAVBAR -->
      <nav class="navbar">
  
        <!-- LOGO -->
        <div class="logo-section">
  
          <div class="logo-icon">
            <Leaf class="leaf-icon" />
          </div>
  
          <div class="logo-text">
            <h2>
              Smart<span>Compost</span>
            </h2>
  
            <p>MONITORING</p>
          </div>
  
        </div>
  
        <!-- MENU -->
        <ul class="nav-menu">
  
          <li class="active">
            <House size="18" />
            Beranda
          </li>
  
          <li>
            <LayoutDashboard size="18" />
            Dashboard
          </li>
  
          <li>
            <Cpu size="18" />
            Perangkat
          </li>
  
          <li>
            <BarChart3 size="18" />
            Data & Riwayat
          </li>
  
          <li>
            <Bell size="18" />
            Notifikasi
          </li>
  
          <li>
            <Info size="18" />
            Tentang
          </li>
  
        </ul>
  
        <!-- BUTTON -->
        <router-link to="/dashboard" class="dashboard-btn">
  
          <LayoutDashboard size="18" />
  
          Masuk Dashboard
  
        </router-link>
  
      </nav>
  
      <!-- HERO -->
      <section class="hero">
  
        <!-- LEFT -->
        <div class="hero-left">
  
          <div class="badge">
  
            <Activity size="16" />
  
            Monitoring Real-time • Data Akurat • Kompos Berkualitas
  
          </div>
  
          <h1>
            Pantau Proses Kompos
            Secara <span>Real-time,</span>
            Hasil Lebih Optimal
          </h1>
  
          <p>
            Smart Compost Monitoring membantu Anda memantau kondisi
            kompos secara real-time melalui sensor pintar dan dashboard
            modern yang mudah digunakan.
          </p>
  
          <!-- BUTTONS -->
          <div class="hero-buttons">
  
            <router-link to="/dashboard" class="btn-primary">
  
              <LayoutDashboard size="20" />
  
              Lihat Dashboard
  
            </router-link>
  
            <button class="btn-secondary">
  
              <PlayCircle size="20" />
  
              Cara Kerja Sistem
  
            </button>
  
          </div>
  
          <!-- FEATURES -->
          <div class="mini-features">
  
            <div class="feature">
  
              <div class="feature-icon">
                <Wifi size="24" />
              </div>
  
              <div>
                <h4>Monitoring Real-time</h4>
                <p>Pantau kondisi kompos kapan saja</p>
              </div>
  
            </div>
  
            <div class="feature">
  
              <div class="feature-icon">
                <BarChart3 size="24" />
              </div>
  
              <div>
                <h4>Data Akurat</h4>
                <p>Sensor pintar terpercaya</p>
              </div>
  
            </div>
  
            <div class="feature">
  
              <div class="feature-icon">
                <BellRing size="24" />
              </div>
  
              <div>
                <h4>Notifikasi Cerdas</h4>
                <p>Peringatan otomatis</p>
              </div>
  
            </div>
  
            <div class="feature">
  
              <div class="feature-icon">
                <Leaf size="24" />
              </div>
  
              <div>
                <h4>Kualitas Terjaga</h4>
                <p>Kontrol proses kompos</p>
              </div>
  
            </div>
  
          </div>
  
        </div>
  
        <!-- RIGHT -->
        <div class="hero-right">
  
          <!-- DASHBOARD -->
          <div class="dashboard-preview">
  
            <!-- SIDEBAR -->
            <div class="dashboard-sidebar">
  
              <div class="sidebar-logo">
  
                <Leaf size="22" />
  
                SmartCompost
  
              </div>
  
              <ul>
  
                <li class="active-menu">
                  <LayoutDashboard size="18" />
                  Dashboard
                </li>
  
                <li>
                  <Cpu size="18" />
                  Perangkat
                </li>
  
                <li>
                  <BarChart3 size="18" />
                  Data & Riwayat
                </li>
  
                <li>
                  <Bell size="18" />
                  Notifikasi
                </li>
  
                <li>
                  <Settings size="18" />
                  Pengaturan
                </li>
  
              </ul>
  
            </div>
  
            <!-- CONTENT -->
            <div class="dashboard-content">
  
              <div class="dashboard-top">
  
                <h2>Dashboard</h2>
  
                <span>
                  ● Terakhir diperbarui: 10:30 WIB
                </span>
  
              </div>
  
              <!-- SENSOR -->
              <div class="sensor-grid">
  
                <div class="sensor-card">
  
                  <Thermometer size="22" />
  
                  <h4>Suhu</h4>
  
                  <h2>48.6°C</h2>
  
                  <p>● Optimal</p>
  
                </div>
  
                <div class="sensor-card">
  
                  <Droplets size="22" />
  
                  <h4>Kelembapan</h4>
  
                  <h2>58%</h2>
  
                  <p>● Optimal</p>
  
                </div>
  
                <div class="sensor-card">
  
                  <FlaskConical size="22" />
  
                  <h4>pH</h4>
  
                  <h2>7.2</h2>
  
                  <p>● Optimal</p>
  
                </div>
  
                <div class="sensor-card">
  
                  <Wind size="22" />
  
                  <h4>Oksigen</h4>
  
                  <h2>18.6%</h2>
  
                  <p>● Optimal</p>
  
                </div>
  
              </div>
  
              <!-- GRAPH -->
              <div class="graph-section">
  
                <div class="graph-card">
  
                  <div class="graph-header">
  
                    <h4>
                      Grafik Suhu (7 Hari)
                    </h4>
  
                    <button>
                      7 Hari
                    </button>
  
                  </div>
  
                  <div class="graph">
                    <div class="line"></div>
                  </div>
  
                </div>
  
                <!-- STATUS -->
                <div class="status-card">
  
                  <div class="status-circle">
                    <Check size="38" />
                  </div>
  
                  <h3>Optimal</h3>
  
                  <p>
                    Proses berjalan dengan baik
                  </p>
  
                  <div class="recommendation">
  
                    <h4>Rekomendasi</h4>
  
                    <p>
                      Pertahankan kelembapan dan aerasi
                      untuk hasil optimal.
                    </p>
  
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
  
    </div>
  </template>
  
  <script setup>
  import {
    Leaf,
    House,
    LayoutDashboard,
    Cpu,
    BarChart3,
    Bell,
    Info,
    Activity,
    PlayCircle,
    Wifi,
    BellRing,
    Settings,
    Thermometer,
    Droplets,
    FlaskConical,
    Wind,
    Check
  } from 'lucide-vue-next'
  </script>
  
  <style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  .home{
    min-height:100vh;
    background:#f7faf7;
    font-family:'Poppins',sans-serif;
    overflow:hidden;
    position:relative;
    padding:30px 70px;
  }
  
  /* BLUR */
  
  .bg-blur{
    position:absolute;
    border-radius:50%;
    filter:blur(100px);
    z-index:0;
  }
  
  .blur-1{
    width:350px;
    height:350px;
    background:#72ff7a40;
    top:-120px;
    right:-120px;
  }
  
  .blur-2{
    width:280px;
    height:280px;
    background:#6eff8540;
    bottom:-120px;
    left:-120px;
  }
  
  /* NAVBAR */
  
  .navbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    position:relative;
    z-index:10;
  }
  
  .logo-section{
    display:flex;
    align-items:center;
    gap:15px;
  }
  
  .logo-icon{
    width:65px;
    height:65px;
    border-radius:20px;
    background:#4CAF50;
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
  }
  
  .leaf-icon{
    width:30px;
    height:30px;
  }
  
  .logo-text h2{
    font-size:42px;
    font-weight:800;
    line-height:1;
  }
  
  .logo-text span{
    color:#4CAF50;
  }
  
  .logo-text p{
    font-size:12px;
    letter-spacing:5px;
    color:#666;
    margin-top:6px;
  }
  
  .nav-menu{
    display:flex;
    gap:38px;
    list-style:none;
    align-items:center;
  }
  
  .nav-menu li{
    display:flex;
    align-items:center;
    gap:8px;
    font-weight:600;
    cursor:pointer;
    transition:0.3s;
  }
  
  .nav-menu li:hover{
    color:#4CAF50;
  }
  
  .active{
    color:#4CAF50;
    position:relative;
  }
  
  .active::after{
    content:'';
    position:absolute;
    bottom:-14px;
    left:0;
    width:100%;
    height:4px;
    background:#4CAF50;
    border-radius:20px;
  }
  
  .dashboard-btn{
    display:flex;
    align-items:center;
    gap:10px;
    background:#4CAF50;
    color:white;
    text-decoration:none;
    padding:18px 28px;
    border-radius:20px;
    font-weight:600;
    transition:0.3s;
  }
  
  .dashboard-btn:hover{
    transform:translateY(-3px);
    box-shadow:0 15px 35px rgba(76,175,80,0.3);
  }
  
  /* HERO */
  
  .hero{
    margin-top:70px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:50px;
    position:relative;
    z-index:2;
  }
  
  /* LEFT */
  
  .hero-left{
    width:50%;
  }
  
  .badge{
    display:inline-flex;
    align-items:center;
    gap:10px;
    background:#edf7eb;
    color:#4CAF50;
    padding:14px 26px;
    border-radius:40px;
    font-weight:600;
    margin-bottom:35px;
  }
  
  .hero-left h1{
    font-size:82px;
    line-height:1.05;
    font-weight:800;
    color:#111;
  }
  
  .hero-left h1 span{
    color:#4CAF50;
  }
  
  .hero-left p{
    font-size:22px;
    color:#666;
    line-height:1.8;
    margin-top:30px;
  }
  
  .hero-buttons{
    display:flex;
    gap:20px;
    margin-top:45px;
  }
  
  .btn-primary,
  .btn-secondary{
    display:flex;
    align-items:center;
    gap:10px;
    padding:20px 32px;
    border-radius:18px;
    font-weight:600;
    transition:0.3s;
  }
  
  .btn-primary{
    background:#4CAF50;
    color:white;
    text-decoration:none;
  }
  
  .btn-primary:hover{
    transform:translateY(-3px);
  }
  
  .btn-secondary{
    background:white;
    border:2px solid #4CAF50;
    color:#4CAF50;
    cursor:pointer;
  }
  
  .btn-secondary:hover{
    background:#4CAF50;
    color:white;
  }
  
  /* FEATURES */
  
  .mini-features{
    margin-top:60px;
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:28px;
  }
  
  .feature{
    display:flex;
    gap:16px;
  }
  
  .feature-icon{
    width:60px;
    height:60px;
    border-radius:18px;
    background:#edf7eb;
    color:#4CAF50;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .feature h4{
    margin-bottom:6px;
  }
  
  .feature p{
    margin:0;
    font-size:15px;
  }
  
  /* RIGHT */
  
  .hero-right{
    width:50%;
    position:relative;
  }
  
  .dashboard-preview{
    background:white;
    border-radius:50px;
    padding:24px;
    display:flex;
    gap:20px;
    box-shadow:0 30px 80px rgba(0,0,0,0.08);
  }
  
  /* SIDEBAR */
  
  .dashboard-sidebar{
    width:240px;
    background:linear-gradient(180deg,#09250d,#173d1a);
    border-radius:32px;
    color:white;
    padding:30px 20px;
  }
  
  .sidebar-logo{
    display:flex;
    align-items:center;
    gap:10px;
    font-size:24px;
    font-weight:700;
    margin-bottom:40px;
  }
  
  .dashboard-sidebar ul{
    list-style:none;
  }
  
  .dashboard-sidebar li{
    display:flex;
    align-items:center;
    gap:10px;
    padding:16px;
    border-radius:16px;
    margin-bottom:12px;
    cursor:pointer;
  }
  
  .active-menu{
    background:#4CAF50;
  }
  
  /* CONTENT */
  
  .dashboard-content{
    flex:1;
  }
  
  .dashboard-top{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:25px;
  }
  
  .dashboard-top h2{
    font-size:38px;
  }
  
  .dashboard-top span{
    font-size:13px;
    color:#777;
  }
  
  /* SENSOR */
  
  .sensor-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:15px;
  }
  
  .sensor-card{
    background:#fafafa;
    border-radius:24px;
    padding:22px;
  }
  
  .sensor-card svg{
    color:#4CAF50;
    margin-bottom:10px;
  }
  
  .sensor-card h4{
    color:#666;
    margin-bottom:12px;
  }
  
  .sensor-card h2{
    font-size:38px;
  }
  
  .sensor-card p{
    color:#4CAF50;
    margin-top:12px;
  }
  
  /* GRAPH */
  
  .graph-section{
    display:flex;
    gap:20px;
    margin-top:22px;
  }
  
  .graph-card{
    flex:1;
    background:#fafafa;
    border-radius:24px;
    padding:24px;
  }
  
  .graph-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:25px;
  }
  
  .graph-header button{
    border:none;
    background:white;
    padding:10px 16px;
    border-radius:12px;
    font-weight:600;
  }
  
  .graph{
    width:100%;
    height:250px;
    background:linear-gradient(to top,#e9f9e8,#ffffff);
    border-radius:22px;
    position:relative;
    overflow:hidden;
  }
  
  .line{
    position:absolute;
    width:90%;
    height:5px;
    background:#4CAF50;
    top:50%;
    left:5%;
    border-radius:30px;
    transform:rotate(-5deg);
  }
  
  /* STATUS */
  
  .status-card{
    width:260px;
    background:#fafafa;
    border-radius:24px;
    padding:28px;
    text-align:center;
  }
  
  .status-circle{
    width:95px;
    height:95px;
    border-radius:50%;
    background:#4CAF50;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:auto;
    margin-bottom:20px;
  }
  
  .recommendation{
    margin-top:20px;
    background:white;
    padding:18px;
    border-radius:18px;
    text-align:left;
  }
  
  /* RESPONSIVE */
  
  @media(max-width:1400px){
  
    .hero{
      flex-direction:column;
    }
  
    .hero-left,
    .hero-right{
      width:100%;
    }
  
    .hero-left h1{
      font-size:62px;
    }
  
  }
  
  @media(max-width:900px){
  
    .home{
      padding:20px;
    }
  
    .nav-menu{
      display:none;
    }
  
    .hero-left h1{
      font-size:46px;
    }
  
    .dashboard-preview{
      flex-direction:column;
    }
  
    .dashboard-sidebar{
      width:100%;
    }
  
    .sensor-grid{
      grid-template-columns:repeat(2,1fr);
    }
  
    .graph-section{
      flex-direction:column;
    }
  
    .status-card{
      width:100%;
    }
  
    .mini-features{
      grid-template-columns:1fr;
    }
  
  }
  
  </style>