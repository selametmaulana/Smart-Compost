import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false
  }
})

pool.connect()
  .then(() => {
    console.log('✅ PostgreSQL Railway Connected')
  })
  .catch(err => {
    console.error('❌ PostgreSQL Error:', err.message)
  })

export default pool