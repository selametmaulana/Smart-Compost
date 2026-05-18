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

        <li @click="showAboutAlert = true">
        <Info size="18" />
        Tentang Website Kami
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
            <button
            class="btn-secondary"
            @click="showHowItWorks = true">
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


          <!-- HOW IT WORKS MODAL -->

<div
  v-if="showHowItWorks"
  class="alert-overlay"
  @click="showHowItWorks = false"
>

  <div
    class="how-modal"
    @click.stop
  >

    <!-- CLOSE -->
    <button
      class="close-btn"
      @click="showHowItWorks = false"
    >
      <X size="20" />
    </button>

    <!-- HEADER -->
    <div class="how-header">

      <div class="how-icon">
        <PlayCircle size="34" />
      </div>

      <h2>Panduan Penggunaan Dashboard</h2>

    </div>

    <!-- STEPS -->
<div class="steps-container">

<!-- STEP -->
<div class="step-card">

  <div class="step-number">
    1
  </div>

  <div class="step-content">

    <h3>Masuk ke Dashboard</h3>

    <p>
      Klik tombol <strong>Masuk Dashboard</strong>
      untuk membuka halaman monitoring utama
      SmartCompost Monitoring.
    </p>

  </div>

</div>

<!-- STEP -->
<div class="step-card">

  <div class="step-number">
    2
  </div>

  <div class="step-content">

    <h3>Monitoring Sensor Real-time</h3>

    <p>
      Dashboard akan menampilkan data sensor
      seperti suhu ruang komposter, suhu material kompos , 
      kelembapan udara, dan kelembapan kompos
      secara realtime dari perangkat IoT.
    </p>

  </div>

</div>

<!-- STEP -->
<div class="step-card">

  <div class="step-number">
    3
  </div>

  <div class="step-content">

    <h3>Melihat Grafik Monitoring</h3>

    <p>
      Pengguna dapat melihat grafik perubahan
      kondisi kompos harian, mingguan,
      maupun bulanan untuk analisis proses kompos.
    </p>

  </div>

</div>

<!-- STEP -->
<div class="step-card">

  <div class="step-number">
    4
  </div>

  <div class="step-content">

    <h3>Riwayat Data Sensor</h3>

    <p>
      Semua data monitoring tersimpan otomatis
      di tabel history sehingga pengguna
      dapat melihat riwayat monitoring sebelumnya.
    </p>

  </div>

</div>

<!-- STEP -->
<div class="step-card">

  <div class="step-number">
    5
  </div>

  <div class="step-content">

    <h3>Notifikasi Kondisi Kompos</h3>

    <p>
      Sistem akan memberikan notifikasi otomatis
      apabila suhu, kelembapan, atau pH berada
      di luar kondisi optimal.
    </p>

  </div>

</div>

<!-- STEP -->
<div class="step-card">

  <div class="step-number">
    6
  </div>

  <div class="step-content">

    <h3>Status Proses Kompos</h3>

    <p>
      Dashboard menampilkan status proses kompos
      seperti optimal, warning, atau tidak stabil
      berdasarkan hasil pembacaan sensor.
    </p>

  </div>

</div>

<!-- STEP -->
<div class="step-card">

  <div class="step-number">
    7
  </div>

  <div class="step-content">

    <h3>Akses dari Mana Saja</h3>

    <p>
      Website dapat diakses melalui laptop,
      tablet, maupun smartphone selama
      terhubung ke internet.
    </p>

  </div>

</div>

</div>

    <!-- BUTTON -->
    <button
      class="how-btn"
      @click="showHowItWorks = false"
    >
      Saya Mengerti
    </button>

  </div>

</div>
  
        </div>
  
      </section>

    <!-- ALERT MODAL -->
<div
  v-if="showAboutAlert"
  class="alert-overlay"
  @click="showAboutAlert = false"
>

  <div
    class="alert-modal"
    @click.stop
  >

    <!-- CLOSE -->
    <button
      class="close-btn"
      @click="showAboutAlert = false"
    >
      <X size="20" />
    </button>

    <!-- TITLE -->
    <div class="alert-title">

      <TriangleAlert size="34" />

      <h2>TENTANG WEBSITE</h2>

    </div>

    <!-- CONTENT -->
    <div class="alert-content">

      <p>
        <strong>SmartCompost Monitoring</strong>
        merupakan sistem monitoring kompos berbasis IoT
        yang membantu pengguna memantau kondisi kompos
        secara real-time menggunakan sensor pintar.
      </p>

      <p>
        Website ini menyediakan fitur monitoring suhu,
        kelembapan, pH, oksigen, notifikasi otomatis,
        serta dashboard modern untuk analisis data kompos.
      </p>

      <p>
        Sistem dibuat untuk membantu rumah tangga,
        komunitas, UMKM, dan industri dalam menghasilkan
        kompos berkualitas secara efisien dan modern.
      </p>

      <div class="alert-box">

        <h4>Fitur Utama</h4>

        <ul>
          <li>✔ Monitoring real-time</li>
          <li>✔ Dashboard interaktif</li>
          <li>✔ Sensor IoT pintar</li>
          <li>✔ Data & riwayat monitoring</li>
          <li>✔ Notifikasi otomatis</li>
        </ul>

      </div>

      <button
        class="alert-confirm"
        @click="showAboutAlert = false"
      >
        Ya, Saya Mengerti
      </button>

    </div>

  </div>

</div>
  
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue'

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
  Check,
  TriangleAlert,
  X
} from 'lucide-vue-next'

const showAboutAlert = ref(false)
const showHowItWorks = ref(false)

import { onMounted } from 'vue'

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
    color:#000000;
  }
  
  .active{
  position: relative;
  background: transparent !important;
  color: #000;
  padding: 0 !important;
}
  
  .active::after{
    content:'';
    display: none;
    position:absolute;
    bottom:-14px;
    left:0;
    width:100%;
    height:4px;
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

.navbar{
  flex-direction:column;
  align-items:flex-start;
  gap:20px;
}

.nav-menu{
  display:flex;
  flex-wrap:wrap;
  gap:16px;
}

.nav-menu li{
  font-size:14px;
}

.dashboard-btn{
  width:100%;
  justify-content:center;
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
  /* ALERT OVERLAY */
  /* OVERLAY */

.alert-overlay{
  position: fixed;
  inset: 0;

  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(5px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  z-index: 9999;
}

/* MODAL */

.alert-modal{
  width: min(680px, 92vw);
  max-height: 88vh;
  overflow-y: auto;
  background: white;
  border-radius: 26px;
  padding: 32px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  animation: popup 0.3s ease;
}

/* TITLE */

.alert-title{
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  color: #4CAF50;
}

.alert-title h2{
  font-size: clamp(26px, 2vw, 34px);
  font-weight: 800;
}

/* CONTENT */

.alert-content{
  background: #fff5f5;
  border-radius: 22px;
  padding: 24px;
}

.alert-content p{
  font-size: clamp(15px, 1vw, 18px);
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
}

/* FEATURE BOX */

.alert-box{
  background: white;
  border-radius: 18px;
  padding: 20px;
  margin-top: 20px;
}

.alert-box h4{
  margin-bottom: 14px;
  color: #4CAF50;
  font-size: 22px;
}

.alert-box ul{
  list-style: none;
}

.alert-box li{
  margin-bottom: 12px;
  color: #555;
  font-size: 16px;
}

/* BUTTON */

.alert-confirm{
  width: 100%;
  border: none;
  margin-top: 26px;
  padding: 16px;
  border-radius: 16px;
  background: #1f6fff;
  color: white;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.alert-confirm:hover{
  transform: translateY(-2px);
}

/* CLOSE BUTTON */

.close-btn{
  position: absolute;

  top: 16px;
  right: 16px;

  width: 40px;
  height: 40px;

  border: none;

  border-radius: 50%;

  background: #f2f2f2;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: 0.3s;
}

.close-btn:hover{
  background: #e7e7e7;
}

/* SCROLLBAR */

.alert-modal::-webkit-scrollbar{
  width: 8px;
}

.alert-modal::-webkit-scrollbar-thumb{
  background: #d6d6d6;
  border-radius: 20px;
}

/* ANIMATION */

@keyframes popup{
  from{
    opacity: 0;
    transform: scale(.92) translateY(20px);
  }

  to{
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* HOW MODAL */

.how-modal{
  width: min(760px, 94vw);

  max-height: 88vh;
  overflow-y: auto;

  background: white;

  border-radius: 30px;

  padding: 32px;

  position: relative;

  animation: popup 0.3s ease;

  box-shadow: 0 25px 70px rgba(0,0,0,0.18);
}

/* HEADER */

.how-header{
  display: flex;
  align-items: center;
  gap: 18px;

  margin-bottom: 35px;
}

.how-icon{
  width: 75px;
  height: 75px;

  border-radius: 22px;

  background: #4CAF50;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
}

.how-header h2{
  font-size: 34px;
  font-weight: 800;
}

.how-header p{
  color: #777;
  margin-top: 5px;
}

/* STEPS */

.steps-container{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-card{
  display: flex;
  gap: 20px;

  background: #f7faf7;

  border-radius: 22px;

  padding: 22px;

  transition: 0.3s;
}

.step-card:hover{
  transform: translateY(-3px);

  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}

.step-number{
  min-width: 60px;
  height: 60px;

  border-radius: 18px;

  background: #4CAF50;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: 700;
}

.step-content h3{
  margin-bottom: 10px;

  font-size: 22px;
}

.step-content p{
  color: #666;

  line-height: 1.8;
}

/* BUTTON */

.how-btn{
  width: 100%;

  margin-top: 30px;

  border: none;

  background: #4CAF50;
  color: white;

  padding: 18px;

  border-radius: 18px;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.3s;
}

.how-btn:hover{
  transform: translateY(-2px);

  box-shadow: 0 15px 35px rgba(76,175,80,0.3);
}

/* MOBILE */

@media(max-width:768px){

  .how-modal{
    padding: 22px;
  }

  .how-header{
    flex-direction: column;
    text-align: center;
  }

  .how-header h2{
    font-size: 28px;
  }

  .step-card{
    flex-direction: column;
  }

  .step-number{
    width: 60px;
  }

}

/* =========================
   DARK MODE HOMEPAGE
========================= */

body.dark-mode{

background:
radial-gradient(circle at top left,#0f3d1d,#020617 45%);

color:white;

}

/* MAIN PAGE */
body.dark-mode .home{

background:
linear-gradient(
180deg,
#020617,
#071426,
#020617
);

color:white;

}

/* BLUR */
body.dark-mode .blur-1,
body.dark-mode .blur-2{

display:none;

}

/* NAVBAR */
body.dark-mode .logo-text h2,
body.dark-mode .nav-menu li{

color:white;

}

body.dark-mode .logo-text p{

color:#94a3b8;

}

body.dark-mode .nav-menu li:hover{

color:#4ade80;

}

/* HERO */
body.dark-mode .hero-left h1{

color:white;

}

body.dark-mode .hero-left p{

color:#cbd5e1;

}

/* BADGE */
body.dark-mode .badge{

background:rgba(34,197,94,.12);
color:#4ade80;

}

/* BUTTON */
body.dark-mode .btn-secondary{

background:#0f172a;
border:1px solid #22c55e;
color:#4ade80;

}

body.dark-mode .btn-secondary:hover{

background:#22c55e;
color:white;

}

/* FEATURES */
body.dark-mode .feature-icon{

background:rgba(34,197,94,.12);
color:#4ade80;

}

body.dark-mode .feature h4{

color:white;

}

body.dark-mode .feature p{

color:#94a3b8;

}

/* DASHBOARD PREVIEW */
body.dark-mode .dashboard-preview{

background:
rgba(15,23,42,.92);

border:1px solid rgba(255,255,255,.06);

backdrop-filter:blur(16px);

box-shadow:
0 0 40px rgba(0,255,120,.08);

}

/* DASHBOARD SIDEBAR */
body.dark-mode .dashboard-sidebar{

background:
linear-gradient(
180deg,
#03120a,
#020617
);

border:1px solid rgba(0,255,120,.08);

}

/* DASHBOARD */
body.dark-mode .dashboard-top h2{

color:white;

}

body.dark-mode .dashboard-top span{

color:#94a3b8;

}

/* SENSOR CARD */
body.dark-mode .sensor-card{

background:#0f172a;
border:1px solid rgba(255,255,255,.06);

}

body.dark-mode .sensor-card h2,
body.dark-mode .sensor-card h4{

color:white;

}

body.dark-mode .sensor-card p{

color:#4ade80;

}

/* GRAPH */
body.dark-mode .graph-card{

background:#0f172a;
border:1px solid rgba(255,255,255,.06);

}

body.dark-mode .graph{

background:
linear-gradient(
180deg,
#0f172a,
#020617
);

}

body.dark-mode .graph-header h3{

color:white;

}

body.dark-mode .graph-header button{

background:#1e293b;
color:white;

}

/* STATUS */
body.dark-mode .status-card{

background:#0f172a;
border:1px solid rgba(255,255,255,.06);

color:white;

}

body.dark-mode .recommendation{

background:#111827;
color:#cbd5e1;

}

/* ALERT MODAL */
body.dark-mode .alert-modal,
body.dark-mode .how-modal{

background:#0f172a;
color:white;

}

/* ALERT CONTENT */
body.dark-mode .alert-content{

background:#111827;

}

body.dark-mode .alert-content p,
body.dark-mode .step-content p,
body.dark-mode .how-header p{

color:#cbd5e1;

}

/* ALERT BOX */
body.dark-mode .alert-box,
body.dark-mode .step-card{

background:#111827;
border:1px solid rgba(255,255,255,.06);

}

body.dark-mode .alert-box li{

color:#cbd5e1;

}

/* CLOSE BUTTON */
body.dark-mode .close-btn{

background:#1e293b;
color:white;

}

body.dark-mode .close-btn:hover{

background:#334155;

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

  </style>