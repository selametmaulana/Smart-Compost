<template>
    <div class="settings-container">
  
      <h1>⚙️ Pengaturan Batas Sensor</h1>
  
      <div class="grid">
  
        <!-- SUHU RUANG -->
        <div class="card">
          <h3>🌡️ Suhu Ruang Kompos</h3>
  
          <p class="desc">
            Digunakan untuk memantau suhu lingkungan sekitar kompos.
            Suhu normal berada di kisaran <b>25°C - 35°C</b>.
          </p>
  
          <div class="form-group">
            <label>Min (°C)</label>
            <input type="number" v-model="tempMin" />
          </div>
  
          <div class="form-group">
            <label>Max (°C)</label>
            <input type="number" v-model="tempMax" />
          </div>
        </div>
  
        <!-- SUHU MATERIAL -->
        <div class="card">
          <h3>🔥 Suhu Material Kompos</h3>
  
          <p class="desc">
            Menentukan aktivitas pengomposan:
            <br>• &lt; 35°C → Normal 🌿
            <br>• 35°C - 50°C → Aktif ♻️
            <br>• &gt; 50°C → Terlalu Panas 🔥 (perlu dibalik)
          </p>
  
          <div class="form-group">
            <label>Min (°C)</label>
            <input type="number" v-model="matMin" />
          </div>
  
          <div class="form-group">
            <label>Max (°C)</label>
            <input type="number" v-model="matMax" />
          </div>
        </div>
  
        <!-- KELEMBAPAN UDARA -->
        <div class="card">
          <h3>💧 Kelembapan Udara</h3>
  
          <p class="desc">
            Kelembapan udara mempengaruhi proses pengeringan.
            Ideal di kisaran <b>60% - 80%</b>.
          </p>
  
          <div class="form-group">
            <label>Min (%)</label>
            <input type="number" v-model="humMin" />
          </div>
  
          <div class="form-group">
            <label>Max (%)</label>
            <input type="number" v-model="humMax" />
          </div>
        </div>
  
        <!-- KELEMBAPAN KOMPOS -->
        <div class="card">
          <h3>🌿 Kelembapan Kompos</h3>
  
          <p class="desc">
            Menentukan kualitas kompos:
            <br>• &lt; 40% → Terlalu Kering ⚠️
            <br>• 40% - 70% → Ideal ✅
            <br>• &gt; 70% → Terlalu Basah 💧
          </p>
  
          <div class="form-group">
            <label>Min (%)</label>
            <input type="number" v-model="compMin" />
          </div>
  
          <div class="form-group">
            <label>Max (%)</label>
            <input type="number" v-model="compMax" />
          </div>
        </div>
  
      </div>
  
      <!-- BUTTON -->
      <button @click="saveSettings" :disabled="loading">
        {{ loading ? 'Menyimpan...' : 'Simpan Pengaturan' }}
      </button>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // STATE
  const tempMin = ref(25)
  const tempMax = ref(35)
  
  const matMin = ref(35)
  const matMax = ref(50)
  
  const humMin = ref(60)
  const humMax = ref(80)
  
  const compMin = ref(40)
  const compMax = ref(70)
  
  const loading = ref(false)
  
  // LOAD DATA
  onMounted(() => {
    const saved = localStorage.getItem('sensorSettings')
  
    if (saved) {
      const data = JSON.parse(saved)
  
      tempMin.value = data.tempMin
      tempMax.value = data.tempMax
  
      matMin.value = data.matMin
      matMax.value = data.matMax
  
      humMin.value = data.humMin
      humMax.value = data.humMax
  
      compMin.value = data.compMin
      compMax.value = data.compMax
    }
  })
  
  // SAVE DATA
  const saveSettings = () => {
  
    if (tempMin.value >= tempMax.value) {
      alert('❌ Suhu ruang tidak valid!')
      return
    }
  
    if (matMin.value >= matMax.value) {
      alert('❌ Suhu material tidak valid!')
      return
    }
  
    if (humMin.value >= humMax.value) {
      alert('❌ Kelembapan udara tidak valid!')
      return
    }
  
    if (compMin.value >= compMax.value) {
      alert('❌ Kelembapan kompos tidak valid!')
      return
    }
  
    loading.value = true
  
    const data = {
      tempMin: tempMin.value,
      tempMax: tempMax.value,
      matMin: matMin.value,
      matMax: matMax.value,
      humMin: humMin.value,
      humMax: humMax.value,
      compMin: compMin.value,
      compMax: compMax.value
    }
  
    localStorage.setItem('sensorSettings', JSON.stringify(data))
  
    setTimeout(() => {
      loading.value = false
      alert('✅ Pengaturan berhasil disimpan')
    }, 500)
  }
  </script>
  
  <style scoped>
  
  .settings-container {
    padding: 20px;
    margin-left: 20px;
    margin-top: 70px;
  }
  
  /* GRID */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  /* CARD */
  .card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }
  
  /* DESC */
  .desc {
    font-size: 13px;
    color: #555;
    margin-bottom: 10px;
  }
  
  /* FORM */
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    font-size: 13px;
    display: block;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  /* BUTTON */
  button {
    margin-top: 20px;
    width: 100%;
    padding: 12px;
    background: #2e7d32;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button:hover {
    background: #1b5e20;
  }
  
  button:disabled {
    background: gray;
  }
  
  </style>