<template>
    <div class="home">
  
      <!-- BACKGROUND DECOR -->
      <div class="bg-blur blur-1"></div>
      <div class="bg-blur blur-2"></div>
  
      <!-- NAVBAR -->
      <nav class="navbar">
  
        <div class="logo-section">
          <div class="logo-icon">
            🌱
          </div>
  
          <div class="logo-text">
            <h2>Smart<span>Compost</span></h2>
            <p>MONITORING</p>
          </div>
        </div>
  
        <ul class="nav-menu">
          <li class="active">Beranda</li>
          <li>Dashboard</li>
          <li>Perangkat</li>
          <li>Data & Riwayat</li>
          <li>Notifikasi</li>
          <li>Tentang</li>
        </ul>
  
        <router-link to="/dashboard" class="dashboard-btn">
          ⬛ Masuk ke Dashboard
        </router-link>
  
      </nav>
  
      <!-- HERO -->
      <section class="hero">
  
        <!-- LEFT -->
        <div class="hero-left">
  
          <div class="badge">
            ● Monitoring Real-time • Data Akurat • Kompos Berkualitas
          </div>
  
          <h1>
            Pantau Proses Kompos
            Secara <span>Real-time,</span>
            Hasil Lebih Optimal
          </h1>
  
          <p>
            Smart Compost Monitoring membantu Anda memantau kondisi
            kompos secara real-time melalui sensor pintar dan dashboard
            yang mudah digunakan.
          </p>
  
          <div class="hero-buttons">
  
            <router-link to="/dashboard" class="btn-primary">
              📊 Lihat Dashboard
            </router-link>
  
            <button class="btn-secondary">
              ▶ Cara Kerja Sistem
            </button>
  
          </div>
  
          <!-- FEATURES -->
          <div class="mini-features">
  
            <div class="feature">
              <div class="feature-icon">📡</div>
  
              <div>
                <h4>Monitoring Real-time</h4>
                <p>Pantau kondisi kompos kapan saja</p>
              </div>
            </div>
  
            <div class="feature">
              <div class="feature-icon">📈</div>
  
              <div>
                <h4>Data Akurat</h4>
                <p>Sensor pintar terpercaya</p>
              </div>
            </div>
  
            <div class="feature">
              <div class="feature-icon">🔔</div>
  
              <div>
                <h4>Notifikasi Cerdas</h4>
                <p>Peringatan otomatis</p>
              </div>
            </div>
  
            <div class="feature">
              <div class="feature-icon">🍃</div>
  
              <div>
                <h4>Kualitas Terjaga</h4>
                <p>Kontrol proses kompos</p>
              </div>
            </div>
  
          </div>
  
        </div>
  
        <!-- RIGHT -->
        <div class="hero-right">
  
          <div class="dashboard-preview">
  
            <!-- SIDEBAR -->
            <div class="dashboard-sidebar">
  
              <div class="sidebar-logo">
                🌱 SmartCompost
              </div>
  
              <ul>
                <li class="active-menu">🏠 Dashboard</li>
                <li>📦 Perangkat</li>
                <li>📄 Data & Riwayat</li>
                <li>🔔 Notifikasi</li>
                <li>⚙ Pengaturan</li>
              </ul>
  
            </div>
  
            <!-- CONTENT -->
            <div class="dashboard-content">
  
              <div class="dashboard-top">
  
                <h2>Dashboard</h2>
  
                <span>● Terakhir diperbarui: 10:30 WIB</span>
  
              </div>
  
              <!-- SENSOR -->
              <div class="sensor-grid">
  
                <div class="sensor-card">
                  <h4>Suhu</h4>
                  <h2>48.6°C</h2>
                  <p>● Optimal</p>
                </div>
  
                <div class="sensor-card">
                  <h4>Kelembapan</h4>
                  <h2>58%</h2>
                  <p>● Optimal</p>
                </div>
  
                <div class="sensor-card">
                  <h4>pH</h4>
                  <h2>7.2</h2>
                  <p>● Optimal</p>
                </div>
  
                <div class="sensor-card">
                  <h4>Oksigen</h4>
                  <h2>18.6%</h2>
                  <p>● Optimal</p>
                </div>
  
              </div>
  
              <!-- GRAPH -->
              <div class="graph-section">
  
                <div class="graph-card">
  
                  <div class="graph-header">
                    <h4>Grafik Suhu (7 Hari Terakhir)</h4>
  
                    <button>7 Hari Terakhir</button>
                  </div>
  
                  <div class="graph">
                    <div class="line"></div>
                  </div>
  
                </div>
  
                <div class="status-card">
  
                  <div class="status-circle">
                    ✔
                  </div>
  
                  <h3>Optimal</h3>
  
                  <p>
                    Proses berjalan dengan baik.
                  </p>
  
                  <div class="recommendation">
                    <h4>Rekomendasi</h4>
  
                    <p>
                      Pertahankan kelembapan dan aerasi untuk hasil optimal.
                    </p>
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
          <!-- DEVICE -->
          <div class="device-box">
  
            <div class="device-screen">
              <h3>SmartCompost</h3>
              <p>MONITORING</p>
            </div>
  
            <div class="antenna"></div>
  
          </div>
  
          <!-- FLOATING -->
          <div class="floating-card">
            🍃 Kompos Berkualitas <br>
            Lingkungan Terjaga
          </div>
  
        </div>
  
      </section>
  
      <!-- BOTTOM INFO -->
      <section class="bottom-info">
  
        <div class="info-box">
          <div class="circle">✔</div>
  
          <div>
            <h3>Aman & Andal</h3>
            <p>Sistem stabil dan data terlindungi</p>
          </div>
        </div>
  
        <div class="info-box">
          <div class="circle">☁</div>
  
          <div>
            <h3>Akses Mudah</h3>
            <p>Dashboard dari perangkat apa saja</p>
          </div>
        </div>
  
        <div class="info-box">
          <div class="circle">🔋</div>
  
          <div>
            <h3>Hemat Energi</h3>
            <p>Low power dan tahan lama</p>
          </div>
        </div>
  
        <div class="info-box">
          <div class="circle">👥</div>
  
          <div>
            <h3>Untuk Semua</h3>
            <p>Cocok untuk rumah & industri</p>
          </div>
        </div>
  
      </section>
  
    </div>
  </template>
  
  <style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  .home{
    min-height:100vh;
    background:#f8faf7;
    font-family:'Poppins', sans-serif;
    overflow:hidden;
    position:relative;
    padding:30px 60px;
  }
  
  /* BLUR */
  
  .bg-blur{
    position:absolute;
    border-radius:50%;
    filter:blur(100px);
    z-index:0;
  }
  
  .blur-1{
    width:300px;
    height:300px;
    background:#73ff7a50;
    top:-100px;
    right:-100px;
  }
  
  .blur-2{
    width:250px;
    height:250px;
    background:#8eff9850;
    bottom:-100px;
    left:-100px;
  }
  
  /* NAVBAR */
  
  .navbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    position:relative;
    z-index:2;
  }
  
  .logo-section{
    display:flex;
    align-items:center;
    gap:12px;
  }
  
  .logo-icon{
    width:55px;
    height:55px;
    border-radius:16px;
    background:#4CAF50;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:28px;
    color:white;
  }
  
  .logo-text h2{
    font-size:38px;
    font-weight:700;
  }
  
  .logo-text span{
    color:#4CAF50;
  }
  
  .logo-text p{
    font-size:12px;
    letter-spacing:4px;
    color:#666;
  }
  
  .nav-menu{
    display:flex;
    gap:40px;
    list-style:none;
    font-weight:500;
    color:#222;
  }
  
  .nav-menu li{
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
    width:100%;
    height:4px;
    background:#4CAF50;
    bottom:-10px;
    left:0;
    border-radius:10px;
  }
  
  .dashboard-btn{
    background:#4CAF50;
    color:white;
    text-decoration:none;
    padding:18px 28px;
    border-radius:18px;
    font-weight:600;
    transition:0.3s;
  }
  
  .dashboard-btn:hover{
    transform:translateY(-3px);
    box-shadow:0 10px 30px rgba(76,175,80,0.4);
  }
  
  /* HERO */
  
  .hero{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:70px;
    position:relative;
    z-index:2;
  }
  
  /* LEFT */
  
  .hero-left{
    width:48%;
  }
  
  .badge{
    display:inline-block;
    background:#edf7eb;
    color:#4CAF50;
    padding:12px 25px;
    border-radius:40px;
    font-weight:500;
    margin-bottom:30px;
  }
  
  .hero-left h1{
    font-size:78px;
    line-height:1.08;
    font-weight:800;
    color:#111;
  }
  
  .hero-left h1 span{
    color:#4CAF50;
  }
  
  .hero-left p{
    font-size:23px;
    color:#666;
    margin-top:25px;
    line-height:1.7;
  }
  
  .hero-buttons{
    display:flex;
    gap:20px;
    margin-top:40px;
  }
  
  .btn-primary{
    background:#4CAF50;
    color:white;
    text-decoration:none;
    padding:20px 34px;
    border-radius:18px;
    font-weight:600;
    transition:0.3s;
  }
  
  .btn-primary:hover{
    transform:translateY(-3px);
  }
  
  .btn-secondary{
    border:2px solid #4CAF50;
    background:white;
    color:#4CAF50;
    padding:20px 34px;
    border-radius:18px;
    font-weight:600;
    cursor:pointer;
    transition:0.3s;
  }
  
  .btn-secondary:hover{
    background:#4CAF50;
    color:white;
  }
  
  /* FEATURES */
  
  .mini-features{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:25px;
    margin-top:60px;
  }
  
  .feature{
    display:flex;
    gap:15px;
    align-items:flex-start;
  }
  
  .feature-icon{
    width:55px;
    height:55px;
    background:#edf7eb;
    border-radius:18px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:25px;
  }
  
  .feature h4{
    margin-bottom:5px;
  }
  
  .feature p{
    font-size:15px;
    margin:0;
  }
  
  /* RIGHT */
  
  .hero-right{
    width:48%;
    position:relative;
  }
  
  /* DASHBOARD */
  
  .dashboard-preview{
    width:100%;
    height:640px;
    background:rgba(255,255,255,0.8);
    border-radius:50px;
    backdrop-filter:blur(15px);
    padding:25px;
    display:flex;
    box-shadow:0 30px 80px rgba(0,0,0,0.08);
  }
  
  .dashboard-sidebar{
    width:220px;
    background:linear-gradient(180deg,#0f2410,#183d19);
    border-radius:30px;
    color:white;
    padding:30px 20px;
  }
  
  .sidebar-logo{
    font-size:24px;
    font-weight:700;
    margin-bottom:40px;
  }
  
  .dashboard-sidebar ul{
    list-style:none;
  }
  
  .dashboard-sidebar li{
    padding:16px;
    border-radius:14px;
    margin-bottom:10px;
    cursor:pointer;
  }
  
  .active-menu{
    background:#4CAF50;
  }
  
  /* CONTENT */
  
  .dashboard-content{
    flex:1;
    padding:10px 25px;
  }
  
  .dashboard-top{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:25px;
  }
  
  .dashboard-top span{
    color:#777;
    font-size:14px;
  }
  
  /* SENSOR */
  
  .sensor-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:15px;
  }
  
  .sensor-card{
    background:white;
    border-radius:22px;
    padding:20px;
    box-shadow:0 10px 30px rgba(0,0,0,0.04);
  }
  
  .sensor-card h4{
    color:#666;
    margin-bottom:15px;
  }
  
  .sensor-card h2{
    font-size:32px;
  }
  
  .sensor-card p{
    color:#4CAF50;
    margin-top:15px;
  }
  
  /* GRAPH */
  
  .graph-section{
    display:flex;
    gap:20px;
    margin-top:25px;
  }
  
  .graph-card{
    flex:1;
    background:white;
    border-radius:25px;
    padding:25px;
  }
  
  .graph-header{
    display:flex;
    justify-content:space-between;
    margin-bottom:20px;
  }
  
  .graph-header button{
    border:none;
    background:#f3f3f3;
    padding:10px 16px;
    border-radius:10px;
  }
  
  .graph{
    width:100%;
    height:250px;
    background:linear-gradient(to top,#e8f7e8,#ffffff);
    border-radius:20px;
    position:relative;
    overflow:hidden;
  }
  
  .line{
    position:absolute;
    width:90%;
    height:4px;
    background:#4CAF50;
    top:50%;
    left:5%;
    border-radius:20px;
    transform:rotate(-5deg);
  }
  
  /* STATUS */
  
  .status-card{
    width:250px;
    background:white;
    border-radius:25px;
    padding:30px;
    text-align:center;
  }
  
  .status-circle{
    width:90px;
    height:90px;
    background:#4CAF50;
    color:white;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:40px;
    margin:auto;
    margin-bottom:20px;
  }
  
  .recommendation{
    background:#f7f7f7;
    padding:20px;
    border-radius:20px;
    margin-top:20px;
    text-align:left;
  }
  
  /* DEVICE */
  
  .device-box{
    width:360px;
    height:220px;
    background:#e9e9e9;
    border-radius:30px;
    position:absolute;
    bottom:-40px;
    left:120px;
    box-shadow:0 30px 60px rgba(0,0,0,0.2);
  }
  
  .device-screen{
    width:180px;
    height:120px;
    background:#111;
    border-radius:15px;
    position:absolute;
    top:45px;
    left:90px;
    color:white;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  
  .antenna{
    width:12px;
    height:140px;
    background:#111;
    position:absolute;
    left:-15px;
    top:20px;
    border-radius:20px;
  }
  
  /* FLOATING */
  
  .floating-card{
    position:absolute;
    right:-20px;
    bottom:10px;
    background:#2e7d32;
    color:white;
    padding:25px 30px;
    border-radius:25px;
    font-weight:600;
    box-shadow:0 15px 40px rgba(0,0,0,0.15);
  }
  
  /* BOTTOM */
  
  .bottom-info{
    margin-top:100px;
    background:white;
    border-radius:35px;
    padding:40px;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:30px;
    box-shadow:0 20px 50px rgba(0,0,0,0.05);
  }
  
  .info-box{
    display:flex;
    gap:18px;
  }
  
  .circle{
    width:60px;
    height:60px;
    background:#4CAF50;
    border-radius:50%;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:24px;
  }
  
  .info-box p{
    color:#666;
    margin-top:5px;
  }
  
  /* RESPONSIVE */
  
  @media(max-width:1400px){
  
    .hero{
      flex-direction:column;
      gap:80px;
    }
  
    .hero-left,
    .hero-right{
      width:100%;
    }
  
    .hero-left h1{
      font-size:58px;
    }
  
    .bottom-info{
      grid-template-columns:repeat(2,1fr);
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
      font-size:42px;
    }
  
    .hero-left p{
      font-size:18px;
    }
  
    .dashboard-preview{
      flex-direction:column;
      height:auto;
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
  
    .bottom-info{
      grid-template-columns:1fr;
    }
  
    .mini-features{
      grid-template-columns:1fr;
    }
  
    .device-box{
      display:none;
    }
  
    .floating-card{
      display:none;
    }
  
  }
  
  </style>