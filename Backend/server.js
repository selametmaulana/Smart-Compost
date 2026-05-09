import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mqtt from 'mqtt'
import pool from './db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


const client = mqtt.connect({
  host: '405ddc32b5914dc29655d90f79fac3c4.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'Smart_Compost',
  password: 'Kompos123',
  clientId: 'node_backend_' + Math.random().toString(16).substr(2, 8),
  clean: true,
  reconnectPeriod: 1000
})

// =====================
// SENSOR STATE
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

client.on('connect', () => {

  console.log('✅ MQTT Connected')

  client.subscribe(
    'iot/kompos/ta/device1/data',
    (err) => {

      if (err) {
        console.log('❌ Subscribe gagal')
      } else {
        console.log('✅ Subscribe berhasil')
      }

    }
  )

})

client.on('error', (err) => {
  console.error('❌ MQTT Error:', err.message)
})

client.on('offline', () => {
  console.log('⚠️ MQTT Offline')
})

client.on('reconnect', () => {
  console.log('🔄 MQTT Reconnecting...')
})

/* =========================
   MQTT MESSAGE
========================= */
client.on('message', async (topic, message) => {

  try {

    const data = JSON.parse(
      message.toString()
    )

    console.log('📡 MQTT DATA:', data)

    // REALTIME CACHE
    sensorData = data

    // SIMPAN DATABASE
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
      data.status || 'AUTO'
    ])

    console.log('✅ Data masuk PostgreSQL')

  } catch (err) {

    console.log(
      '❌ ERROR MQTT:',
      err.message
    )

  }

})


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
// SENSOR DATA (REALTIME UPDATE + SAVE DB)
// =====================
app.post('/sensor-data', async (req, res) => {

  try {

    console.log('BODY:', req.body)

    const data = req.body || {}

    if (!data.suhu_udara) {
      return res.status(400).json({
        success: false,
        error: 'Payload kosong'
      })
    }

    sensorData = data

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
      data.status || 'AUTO'
    ])

    res.json({
      success: true,
      message: 'Data berhasil disimpan'
    })

  } catch (err) {

    console.error(err)

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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})


