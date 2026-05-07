import pg from 'pg'
const { Client } = pg

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
})

client.connect()
  .then(() => {
    console.log('✅ Connected Railway PostgreSQL')
  })
  .catch(err => {
    console.error(err)
  })