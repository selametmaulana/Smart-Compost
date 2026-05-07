import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
// REGISTER
// =====================
app.post('/register', async (req, res) => {
  try {

    console.log('📩 REGISTER BODY:', req.body)

    const { name, email, password } = req.body

    const check = await pool.query(
      'SELECT * FROM public.users WHERE email=$1',
      [email]
    )

    console.log('👤 CHECK USER:', check.rows)

    if (check.rows.length > 0) {
      return res.status(400).json({
        message: 'Email sudah terdaftar'
      })
    }

    const hash = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `INSERT INTO public.users
      (name,email,password)
      VALUES ($1,$2,$3)
      RETURNING id,name,email`,
      [name, email, hash]
    )

    res.json({
      message: 'Register success',
      user: result.rows[0]
    })

  } catch (err) {

    console.error('❌ REGISTER ERROR:', err)

    res.status(500).json({
      error: err.message
    })
  }
})

// =====================
// LOGIN
// =====================
app.post('/login', async (req, res) => {
  try {
    console.log('📩 LOGIN REQUEST:', req.body)

    const { email, password } = req.body

    const result = await pool.query(
      'SELECT * FROM public.users WHERE email=$1',
      [email]
    )

    console.log('👤 USER RESULT:', result.rows)

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: 'User tidak ditemukan'
      })
    }

    const user = result.rows[0]

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return res.status(400).json({
        message: 'Password salah'
      })
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token })

  } catch (err) {
    console.error('❌ LOGIN ERROR:', err)

    res.status(500).json({
      error: err.message
    })
  }
})

// =====================
// DASHBOARD
// =====================
app.get('/dashboard', async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const result = await pool.query(
      'SELECT id,name,email FROM public.users WHERE id=$1',
      [decoded.id]
    )

    res.json(result.rows[0])
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

// =====================
// START SERVER (RAILWAY SAFE)
// =====================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)

})


