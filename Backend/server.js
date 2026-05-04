import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mqtt from 'mqtt'
import mysql from 'mysql2/promise'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// =========================
// 🔥 MYSQL CONNECTION
// =========================
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

// =========================
// 🔥 MQTT
// =========================
const client = mqtt.connect('mqtt://broker.hivemq.com:1883')

let sensorData = {
  suhu_kompos: 0,
  suhu_udara: 0,
  kelembapan_udara: 0,
  kelembapan_kompos: 0,
  status: 'Waiting...',
  pompa: false,
  fan: false
}

let lastSavedTime = 0

client.on('connect', () => {
  console.log('MQTT Connected')
  client.subscribe('nayla/kompos/data')
})

// =========================
// 🔥 MQTT RECEIVE
// =========================
client.on('message', async (topic, message) => {
  try {
    if (topic === 'nayla/kompos/data') {
      const data = JSON.parse(message.toString())

      sensorData = data
      console.log("MQTT Data:", data)

      const now = Date.now()

      // simpan tiap 1 menit
      if (now - lastSavedTime >= 60000) {
        await pool.query(`
          INSERT INTO history_sensor
          (suhu_ruang, suhu_material, kelembapan_udara, kelembapan_kompos, status)
          VALUES (?, ?, ?, ?, ?)
        `, [
          data.suhu_udara,
          data.suhu_kompos,
          data.kelembapan_udara,
          data.kelembapan_kompos,
          data.status
        ])

        lastSavedTime = now
        console.log("Data tersimpan ke MySQL")
      }
    }
  } catch (err) {
    console.error("MQTT Error:", err.message)
  }
})

// =========================
// 🔥 ADUK KOMPOS
// =========================
app.post('/aduk', async (req, res) => {
  const token = req.headers.authorization

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    await pool.query(
      'UPDATE users SET last_aduk = NOW() WHERE id=?',
      [decoded.id]
    )

    res.json({ message: 'Aduk kompos berhasil dicatat 🌱' })
  } catch (err) {
    res.status(401).json({ message: 'Token tidak valid' })
  }
})

app.get('/aduk-status', async (req, res) => {
  const token = req.headers.authorization

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const [rows] = await pool.query(
      'SELECT last_aduk FROM users WHERE id=?',
      [decoded.id]
    )

    const last = rows[0]?.last_aduk

    if (!last) {
      return res.json({ days: 0, needAduk: false })
    }

    const now = new Date()
    const lastDate = new Date(last)
    const diff = (now - lastDate) / (1000 * 60 * 60 * 24)

    res.json({
      days: Math.floor(diff),
      needAduk: diff >= 3
    })

  } catch (err) {
    res.status(401).json({ message: 'Token tidak valid' })
  }
})

// =========================
// 🔥 SENSOR API
// =========================
app.post('/sensor-data', (req, res) => {
  sensorData = req.body
  console.log("Data dari Node-RED:", sensorData)
  res.json({ message: 'Data diterima' })
})

app.get('/sensor-data', (req, res) => {
  res.json(sensorData)
})

// =========================
// 🔥 CONTROL DEVICE
// =========================
app.post('/control', async (req, res) => {
  const { device, state } = req.body

  try {
    await fetch('http://localhost:1880/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device, state })
    })

    console.log('Kirim ke Node-RED:', { device, state })

    res.json({ message: 'Perintah dikirim ke Node-RED' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal kirim' })
  }
})

// =========================
// 🔥 REGISTER
// =========================
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi' })
    }

    const [checkUser] = await pool.query(
      'SELECT * FROM users WHERE email=?',
      [email]
    )

    if (checkUser.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    res.json({ message: 'Register berhasil 🎉' })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// =========================
// 🔥 LOGIN
// =========================
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email=?',
      [email]
    )

    if (rows.length === 0) {
      return res.status(400).json({ message: 'User tidak ditemukan' })
    }

    const user = rows[0]
    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return res.status(400).json({ message: 'Password salah' })
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ message: 'Login berhasil 🎉', token })

  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// =========================
// 🔥 HISTORY
// =========================
app.get('/history', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM history_sensor
      ORDER BY created_at DESC
    `)

    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/history/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM history_sensor WHERE id=?',
      [req.params.id]
    )

    res.json({ message: 'Data berhasil dihapus' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.delete('/history', async (req, res) => {
  try {
    await pool.query('DELETE FROM history_sensor')
    res.json({ message: 'Semua data berhasil dihapus' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// =========================
// 🔥 DASHBOARD
// =========================
app.get('/dashboard', async (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const [rows] = await pool.query(
      'SELECT id, name, email FROM users WHERE id=?',
      [decoded.id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' })
    }

    res.json({
      message: 'Selamat datang 🎉',
      user: rows[0]
    })

  } catch (err) {
    res.status(401).json({ message: 'Token tidak valid' })
  }
})

// =========================
// 🚀 RUN SERVER
// =========================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`)
})