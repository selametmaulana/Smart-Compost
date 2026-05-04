<template>
    <div class="container">
      <div class="card">
        <div class="logo">🌱</div>
        <div class="title">Smart Compost</div>
        <div class="subtitle">IoT Monitoring System</div>
  
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
  
        <button @click="login" :disabled="loading">
          {{ loading ? 'Loading...' : 'Login' }}
        </button>
  
        <p class="footer-text" @click="goRegister">
          Belum punya akun? Register
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)

const router = useRouter()
const API = import.meta.env.VITE_API_URL

const login = async () => {
  if (!email.value || !password.value) {
    alert('Isi semua field!')
    return
  }

  loading.value = true

  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      alert('Login berhasil 🎉')
      router.push('/dashboard')
    } else {
      alert(data.message || 'Login gagal')
    }

  } catch (err) {
    console.error(err)
    alert('Server error! Pastikan backend jalan.')
  } finally {
    loading.value = false
  }
}

const goRegister = () => {
  router.push('/register')
}
</script>
  
  <style scoped>
  
  /* CONTAINER */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  
    background: linear-gradient(
      180deg,
      #2e7d32 0%,
      #43a047 40%,
      #a5d6a7 100%
    );
  }
  
  /* CARD */
  .card {
    background: #ffffff;
    padding: 35px 30px;
    border-radius: 15px;
    width: 320px;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  }
  
  /* TITLE */
  .title {
    font-size: 22px;
    font-weight: bold;
    color: #2e7d32;
    margin-bottom: 5px;
  }
  
  /* SUBTITLE */
  .subtitle {
    font-size: 12px;
    color: #66bb6a;
    margin-bottom: 20px;
  }
  
  /* INPUT */
  input {
    width: 100%;
    margin: 10px 0;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #c8e6c9;
    outline: none;
  }
  
  input:focus {
    border-color: #2e7d32;
    box-shadow: 0 0 5px rgba(46, 125, 50, 0.3);
  }
  
  /* BUTTON */
  button {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    background: linear-gradient(45deg, #2e7d32, #1b5e20);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
  }
  
  button:hover {
    transform: scale(1.03);
  }
  
  button:disabled {
    background: #9e9e9e;
    cursor: not-allowed;
  }
  
  /* FOOTER */
  .footer-text {
    margin-top: 15px;
    font-size: 12px;
    color: #2e7d32;
    cursor: pointer;
  }
  
  .footer-text:hover {
    text-decoration: underline;
  }
  
  /* LOGO */
  .logo {
    font-size: 30px;
    margin-bottom: 10px;
  }
  </style>