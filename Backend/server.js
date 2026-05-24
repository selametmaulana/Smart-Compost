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


// CACHE SENSOR TERAKHIR
let latestSensorData = null

// LOCK SAVE
let isSaving = false

// NOTIFICATION TIMER
let lastTempNotif = 0
let lastHumidityNotif = 0


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

client.on('message', async (topic, message) => {

  try {

    const data = JSON.parse(message.toString())

    // UPDATE RAM
    sensorData = {
      suhu_ruang: data.suhu_udara ?? 0,
      suhu_material: data.suhu_kompos ?? 0,
      kelembapan_udara: data.kelembapan_udara ?? 0,
      kelembapan_kompos: data.kelembapan_kompos ?? 0,
      status: data.status || 'AUTO',
      lastSensorTime: Date.now()
    }

    // WAJIB
    latestSensorData = sensorData

    console.log('📡 MQTT:', sensorData)

    await handleNotifications(sensorData)

  } catch (err) {
    console.log('MQTT ERROR:', err.message)
  }

})


const handleNotifications = async (data) => {

  const now = Date.now()

  try {

    // =========================
    // AMBIL SETTINGS DEVICE
    // =========================
    const result = await pool.query(`
      SELECT
        temp_min,
        temp_max,
        humidity_min,
        humidity_max
      FROM devices
      WHERE device_id = 'device1'
      LIMIT 1
    `)

    const settings = result.rows[0]

    // =========================
    // DEFAULT VALUE
    // =========================
    const tempMin =
      Number(settings?.temp_min || 20)

    const tempMax =
      Number(settings?.temp_max || 60)

    const humidityMin =
      Number(settings?.humidity_min || 30)

    const humidityMax =
      Number(settings?.humidity_max || 80)

    // =========================
    // SENSOR VALUE
    // =========================
    const suhuKompos =
      Number(data.suhu_material)

    const kelembapanKompos =
      Number(data.kelembapan_kompos)

    console.log({
      suhuKompos,
      tempMin,
      tempMax,
      kelembapanKompos,
      humidityMin,
      humidityMax
    })

    // =========================
    // 🔥 SUHU TERLALU TINGGI
    // =========================
    if (
      suhuKompos > tempMax &&
      now - lastTempNotif > 60000
    ) {

      console.log('🔥 NOTIF SUHU TINGGI')

      await pool.query(`
        INSERT INTO notifications
        (
          title,
          message,
          type,
          category
        )
        VALUES ($1,$2,$3,$4)
      `, [
        'Suhu Kompos Terlalu Tinggi',
        `Suhu kompos ${suhuKompos}°C`,
        'danger',
        'temperature'
      ])

      lastTempNotif = now
    }

    // =========================
    // 🧊 SUHU TERLALU RENDAH
    // =========================
    if (
      suhuKompos < tempMin &&
      now - lastTempNotif > 60000
    ) {

      console.log('🧊 NOTIF SUHU RENDAH')

      await pool.query(`
        INSERT INTO notifications
        (
          title,
          message,
          type,
          category
        )
        VALUES ($1,$2,$3,$4)
      `, [
        'Suhu Kompos Terlalu Rendah',
        `Suhu kompos ${suhuKompos}°C`,
        'warning',
        'temperature'
      ])

      lastTempNotif = now
    }

    // =========================
    // 💧 KELEMBAPAN RENDAH
    // =========================
    if (
      kelembapanKompos < humidityMin &&
      now - lastHumidityNotif > 60000
    ) {

      console.log('💧 NOTIF KELEMBAPAN RENDAH')

      await pool.query(`
        INSERT INTO notifications
        (
          title,
          message,
          type,
          category
        )
        VALUES ($1,$2,$3,$4)
      `, [
        'Kelembapan Kompos Rendah',
        `Kelembapan ${kelembapanKompos}%`,
        'warning',
        'humidity'
      ])

      lastHumidityNotif = now
    }

    // =========================
    // 💦 KELEMBAPAN TINGGI
    // =========================
    if (
      kelembapanKompos > humidityMax &&
      now - lastHumidityNotif > 60000
    ) {

      console.log('💦 NOTIF KELEMBAPAN TINGGI')

      await pool.query(`
        INSERT INTO notifications
        (
          title,
          message,
          type,
          category
        )
        VALUES ($1,$2,$3,$4)
      `, [
        'Kelembapan Kompos Terlalu Tinggi',
        `Kelembapan ${kelembapanKompos}%`,
        'danger',
        'humidity'
      ])

      lastHumidityNotif = now
    }

  } catch (err) {

    console.log(
      'NOTIFICATION ERROR:',
      err.message
    )

  }

}


setInterval(async () => {

  console.log('⏰ Interval running...')

  if (isSaving) return

  try {

    if (!latestSensorData) {
      console.log('⚠️ No sensor data yet')
      return
    }

    isSaving = true

    console.log('💾 Saving to database...', latestSensorData)

    await pool.query(`
      INSERT INTO history_sensor (
        suhu_ruang,
        suhu_material,
        kelembapan_udara,
        kelembapan_kompos,
        status
      ) VALUES ($1,$2,$3,$4,$5)
    `, [
      latestSensorData.suhu_ruang,
      latestSensorData.suhu_material,
      latestSensorData.kelembapan_udara,
      latestSensorData.kelembapan_kompos,
      latestSensorData.status
    ])

    console.log('✅ Saved every 1 minute')

  } catch (err) {

    console.log('❌ SAVE ERROR:', err.message)

  } finally {

    isSaving = false

  }

}, 60000)


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


app.get('/devices', async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM devices
      ORDER BY created_at DESC
    `)

    res.json(result.rows)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: 'Server error'
    })

  }

})

app.get('/devices/:id', async (req, res) => {

  const { id } = req.params

  try {

    const result = await pool.query(`
      SELECT *
      FROM devices
      WHERE device_id = $1
    `, [id])

    if (result.rows.length === 0) {

      return res.status(404).json({
        error: 'Device tidak ditemukan'
      })

    }

    res.json(result.rows[0])

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: 'Server error'
    })

  }

})

app.put('/devices/:id', async (req, res) => {

  const { id } = req.params

  const {
    device_name,
    location,
    is_active,
    wifi_ssid,
    send_interval,
    last_calibration,
  
    temp_min,
    temp_max,
  
    humidity_min,
    humidity_max
  
  } = req.body

  try {

    const result = await pool.query(`
      INSERT INTO devices (
        device_id,
        device_name,
        location,
        is_active,
        wifi_ssid,
        send_interval,
        temp_min,
        temp_max,
        humidity_min,
        humidity_max,
        last_calibration
      )
      VALUES (
        $1,$2,$3,$4,$5,
        $6,$7,$8,$9,$10,$11
      )
    
      ON CONFLICT (device_id)
    
      DO UPDATE SET
        device_name = EXCLUDED.device_name,
        location = EXCLUDED.location,
        is_active = EXCLUDED.is_active,
        wifi_ssid = EXCLUDED.wifi_ssid,
        send_interval = EXCLUDED.send_interval,
    
        temp_min = EXCLUDED.temp_min,
        temp_max = EXCLUDED.temp_max,
    
        humidity_min = EXCLUDED.humidity_min,
        humidity_max = EXCLUDED.humidity_max,
    
        last_calibration = EXCLUDED.last_calibration,
    
        updated_at = NOW()
    
      RETURNING *
    `, [
      id,
    
      device_name || 'ESP32 Smart Compost',
    
      location,
      is_active,
      wifi_ssid,
      send_interval,
    
      temp_min,
      temp_max,
    
      humidity_min,
      humidity_max,
    
      last_calibration
    ])

    res.json(result.rows[0])

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: 'Server error'
    })

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


/* ======================================
   GET ALL NOTIFICATIONS
====================================== */
app.get('/notifications', async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM notifications
      ORDER BY created_at DESC
    `)

    res.json(result.rows)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

})

/* ======================================
   GET SINGLE NOTIFICATION
====================================== */
app.get('/notifications/:id', async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM notifications
      WHERE id = $1
    `, [req.params.id])

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      })

    }

    res.json(result.rows[0])

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

})

/* ======================================
   CREATE NOTIFICATION
====================================== */
app.post('/notifications', async (req, res) => {

  try {

    const {
      title,
      message,
      type,
      category,
      device_id
    } = req.body

    if (!title || !message || !type) {

      return res.status(400).json({
        success: false,
        message: 'title, message, dan type wajib diisi'
      })

    }

    const result = await pool.query(`
      INSERT INTO notifications
      (
        title,
        message,
        type,
        category,
        device_id
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `, [
      title,
      message,
      type,
      category || null,
      device_id || null
    ])

    res.json({
      success: true,
      message: 'Notification created',
      data: result.rows[0]
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

})

/* ======================================
   MARK AS READ
====================================== */
app.put('/notifications/:id/read', async (req, res) => {

  try {

    const result = await pool.query(`
      UPDATE notifications
      SET
        is_read = TRUE,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [req.params.id])

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: result.rows[0]
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

})

/* ======================================
   MARK ALL AS READ
====================================== */
app.put('/notifications/read-all', async (req, res) => {

  try {

    await pool.query(`
      UPDATE notifications
      SET
        is_read = TRUE,
        updated_at = CURRENT_TIMESTAMP
    `)

    res.json({
      success: true,
      message: 'All notifications marked as read'
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

})

/* ======================================
   DELETE NOTIFICATION
====================================== */
app.delete('/notifications/:id', async (req, res) => {

  try {

    const result = await pool.query(`
      DELETE FROM notifications
      WHERE id = $1
      RETURNING *
    `, [req.params.id])

    if (result.rowCount === 0) {

      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      })

    }

    res.json({
      success: true,
      message: 'Notification deleted'
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

})

/* ======================================
   DELETE ALL NOTIFICATIONS
====================================== */
app.delete('/notifications', async (req, res) => {

  try {

    const result = await pool.query(`
      DELETE FROM notifications
    `)

    res.json({
      success: true,
      deleted: result.rowCount,
      message: 'All notifications deleted'
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

})

app.get('/latest-sensor', (req, res) => {

  const lastTime = sensorData?.lastSensorTime || 0
  const diff = Date.now() - lastTime

  res.json({
    ...sensorData,
    online: lastTime ? diff < 15000 : false,
    sensor_status: lastTime
      ? (diff < 15000 ? 'Aktif' : 'Offline')
      : 'Offline'
  })

})

app.get('/', (req, res) => {
  res.send('Backend Smart Compost aktif 🚀')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`)
})


