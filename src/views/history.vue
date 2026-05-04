<template>
  <div class="history-container">
    <h1>Riwayat Monitoring Kompos</h1>

    <!-- Search + Delete All -->
    <div class="top-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari hari / status / tanggal..."
        class="search-input"
      />
      <button class="delete-all-btn" @click="deleteAllHistory">
        Hapus Semua
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Hari</th>
          <th>Tanggal</th>
          <th>Waktu</th>
          <th>Suhu Ruang</th>
          <th>Suhu Material</th>
          <th>Kelembapan Udara</th>
          <th>Kelembapan Kompos</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in paginatedHistory" :key="item.id">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ formatDay(item.created_at) }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
          <td>{{ formatTime(item.created_at) }}</td>
          <td>{{ item.suhu_ruang }} °C</td>
          <td>{{ item.suhu_material }} °C</td>
          <td>{{ item.kelembapan_udara }} %</td>
          <td>{{ item.kelembapan_kompos }} %</td>
          <td>{{ item.status }}</td>
          <td>
            <button class="delete-btn" @click="deleteHistory(item.id)">
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="currentPage--" :disabled="currentPage === 1">
        Prev
      </button>

      <span>Halaman {{ currentPage }} / {{ totalPages }}</span>

      <button @click="currentPage++" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const API = import.meta.env.VITE_API_URL

const historyData = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

// =========================
// FETCH DATA
// =========================
const fetchHistory = async () => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(`${API}/history`, {
      headers: { Authorization: token }
    })

    historyData.value = await res.json()
  } catch (err) {
    console.error(err)
  }
}

// =========================
// DELETE ONE
// =========================
const deleteHistory = async (id) => {
  if (!confirm('Yakin ingin menghapus data ini?')) return

  try {
    const token = localStorage.getItem('token')

    await fetch(`${API}/history/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token }
    })

    historyData.value = historyData.value.filter(item => item.id !== id)
  } catch (err) {
    console.error(err)
  }
}

// =========================
// DELETE ALL
// =========================
const deleteAllHistory = async () => {
  if (!confirm('Yakin ingin menghapus semua data?')) return

  try {
    const token = localStorage.getItem('token')

    await fetch(`${API}/history`, {
      method: 'DELETE',
      headers: { Authorization: token }
    })

    historyData.value = []
  } catch (err) {
    console.error(err)
  }
}

// =========================
// FORMAT
// =========================
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID')
}

const formatDay = (date) => {
  return new Date(date).toLocaleDateString('id-ID', { weekday: 'long' })
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// =========================
// SEARCH
// =========================
const filteredHistory = computed(() => {
  return historyData.value.filter(item => {
    const day = formatDay(item.created_at).toLowerCase()
    const date = formatDate(item.created_at).toLowerCase()
    const status = (item.status || '').toLowerCase()
    const query = searchQuery.value.toLowerCase()

    return (
      day.includes(query) ||
      date.includes(query) ||
      status.includes(query)
    )
  })
})

// =========================
// PAGINATION
// =========================
const totalPages = computed(() => {
  return Math.ceil(filteredHistory.value.length / itemsPerPage) || 1
})

const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredHistory.value.slice(start, start + itemsPerPage)
})

// =========================
// INIT
// =========================
onMounted(() => {
  fetchHistory()
})
</script>

<style scoped>
.history-container {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.delete-all-btn {
  background: #b71c1c;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.delete-all-btn:hover {
  background: #8e0000;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background: #1b5e20;
  color: white;
}

tr:nth-child(even) {
  background: #f5f5f5;
}

.delete-btn {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #b71c1c;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
}

.pagination button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #2e7d32;
  color: white;
  cursor: pointer;
}

.pagination button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
</style>