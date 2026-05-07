import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


// =====================
// ROOT / HEALTH CHECK
// =====================
app.get('/', (req, res) => {
  res.json({
    message: "🚀 Smart Compost API is running",
    status: "OK"
  });
})

// =====================
// SENSOR STATE (REALTIME CACHE)
// =====================
let sensorData = {
  suhu_kompos: 0,
  suhu_udara: 0,
  kelembapan_udara: 0,
  kelembapan_kompos: 0,
  status: 'Waiting...',
  pompa: false,
  fan: false
}

// =====================
// SENSOR DATA (REALTIME UPDATE + SAVE DB)
// =====================
app.post('/sensor-data', async (req, res) => {
  try {
    const data = req.body
    console.log('📩 SENSOR MASUK:', data)

    // update realtime cache
    sensorData = data

    // simpan ke database langsung (tanpa delay ribet dulu)
    await pool.query(`
      INSERT INTO history_sensor (
        suhu_ruang,
        suhu_material,
        kelembapan_udara,
        kelembapan_kompos,
        status
      ) VALUES ($1,$2,$3,$4,$5)
    `, [
      data.suhu_udara,
      data.suhu_kompos,
      data.kelembapan_udara,
      data.kelembapan_kompos,
      data.mode || 'AUTO'
    ])

    res.json({
      success: true,
      message: 'Data berhasil disimpan'
    })

  } catch (err) {
    console.error('❌ SENSOR ERROR:', err.message)

    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// =====================
// GET REALTIME SENSOR
// =====================
app.get('/sensor-data', (req, res) => {
  res.json(sensorData)
})

// =====================
// HISTORY
// =====================
app.get('/history', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM history_sensor
      ORDER BY created_at DESC
    `)

    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// =====================
// DELETE HISTORY
// =====================
app.delete('/history/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM history_sensor WHERE id=$1',
      [req.params.id]
    )

    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/history', async (req, res) => {
  try {
    await pool.query('DELETE FROM history_sensor')
    res.json({ message: 'All deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// =====================
// DASHBOARD (FIXED)
// =====================
app.get('/dashboard', async (req, res) => {
  try {

    // =====================
    // DATA DASHBOARD
    // =====================

    res.json({
      message: 'Dashboard Smart Compost aktif',
      status: 'success',

      app: 'Smart Compost Monitoring',

      developer: 'Selamet Maulana'
    })

  } catch (err) {

    console.error('❌ DASHBOARD ERROR:', err.message)

    res.status(500).json({
      message: 'Server error'
    })

  }
})

let token = req.headers.authorization

if (!token) {
  return res.status(401).json({ message: 'Unauthorized' })
}

if (token.startsWith('Bearer ')) {
  token = token.slice(7)
}

// =====================
// START SERVER (RAILWAY SAFE)
// =====================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)

})


