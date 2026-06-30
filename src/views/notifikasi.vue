<template>
    <div class="notification-page">


    <!-- MAIN -->
    <main class="main-content">

        <!-- TOPBAR -->
        <div class="topbar">

        <div>
            <h1>{{ t.notifications }}</h1>
            <p>{{ t.notification_center }}</p>
        </div>
        <div class="top-right">
  
  <span class="update-text">
    ● Terakhir diperbarui:
    {{ lastUpdated }}
  </span>

  <div class="notif">
    <Bell size="20" />
    <div class="notif-dot">
      {{ notifications.length }}
    </div>
  </div>
</div>
  
        </div>
  
        <!-- SUMMARY -->
        <div class="summary-grid">
          <div class="summary-card">
            <div class="summary-icon red">
              <BellRing size="28" />
            </div>
  
            <div>
              <h4>{{ t.total_notifications }}</h4>
              <h2>{{ totalNotifications }}</h2>
              <p>{{ t.all_time }}</p>
            </div>
  
          </div>
  
          <div class="summary-card">
  
            <div class="summary-icon orange">
              <TriangleAlert size="28" />
            </div>
  
            <div>
              <h4>{{ t.warning }}</h4>
              <h2>{{ totalDanger }}</h2>
              <p>{{ t.need_attention }}</p>
            </div>
  
          </div>
  
          <div class="summary-card">
  
            <div class="summary-icon green">
              <BadgeCheck size="28" />
            </div>
  
            <div>
              <h4>{{ t.information }}</h4>
              <h2>{{ totalInfo }}</h2>
              <p>{{ t.system_info }}</p>
            </div>
  
          </div>
  
          <div class="summary-card">
  
            <div class="summary-icon blue">
              <Eye size="28" />
            </div>
  
            <div>
              <h4>{{ t.unread }}</h4>
              <h2>{{ totalUnread }}</h2>
              <p>{{ t.new_notifications }}</p>
            </div>
          </div>
        </div>
  
        <!-- CONTENT -->
        <div class="content-grid">
  
          <!-- LEFT -->
          <div class="notification-box">
            <!-- HEADER -->
            <div class="box-header">
              <h3>{{ t.notification_list }}</h3>

              <button
      class="delete-all-btn"
      @click="deleteAllNotifications"
    >
      Hapus Semua
    </button>
              <div class="filters">

<button
  :class="{ 'active-filter': activeFilter === 'all' }"
  @click="activeFilter = 'all'"
>
  {{ t.all }}
</button>

<button
  :class="{ 'active-filter': activeFilter === 'unread' }"
  @click="activeFilter = 'unread'"
>
  {{ t.unread_status }}
</button>

<button
  :class="{ 'active-filter': activeFilter === 'latest' }"
  @click="activeFilter = 'latest'"
>
  {{ t.latest }}
</button>

</div>
  
            </div>
  
            <!-- ITEM -->
            <div
  class="notification-item"
  v-for="item in paginatedNotifications"
  :key="item.id"
>

  <div class="notif-left">

    <div class="notif-icon-box red-bg">
      <Bell size="24" />
    </div>

    <div>
      <h4>{{ item.title }}</h4>
      <p>{{ item.message }}</p>
    </div>

  </div>

  <div class="notif-right">

    <span>
      {{
        new Date(item.created_at)
        .toLocaleTimeString('id-ID')
      }}
    </span>

    <label class="danger-label">
      {{ item.type }}
    </label>

    <button
      class="read-btn"
      @click="markAsRead(item.id)"
    >
      Dibaca
    </button>

    <button
      class="delete-btn"
      @click="deleteNotification(item.id)"
    >
      Hapus
    </button>


  </div>

</div>

<div class="pagination">

<button
  @click="prevPage"
  :disabled="currentPage === 1"
>
  {{ t.prev }}
</button>

<span>
  {{ t.page }} {{ currentPage }}
  {{ t.of }} {{ totalPages }}
</span>

<button
  @click="nextPage"
  :disabled="currentPage >= totalPages"
>
  {{ t.next }}
</button>

</div>
          </div>

        
  
          <!-- RIGHT -->
          <div class="right-panel">
            <!-- FILTER -->
            <div class="filter-card">

<h3>{{ t.filter_notifications }}</h3>

<!-- JENIS -->
<div class="form-group">

  <label>{{ t.choose_status }}</label>

  <select v-model="selectedType">

    <option value="">
      {{ t.all_types }}
    </option>

    <option value="danger">
      {{ t.warning }}
    </option>

    <option value="success">
      {{ t.information }}
    </option>

  </select>

</div>

<!-- STATUS -->
<div class="form-group">

  <label>{{ t.choose_status }}</label>

  <select v-model="selectedStatus">

    <option value="">
      {{ t.all_status }}
    </option>

    <option value="false">
      {{ t.unread_status }}
    </option>

    <option value="true">
      {{ t.read_status }}
    </option>

  </select>

</div>

<!-- START DATE -->
<div class="form-group">

  <label>{{ t.from_date }}</label>

  <input
    type="date"
    v-model="startDate"
  />

</div>

<!-- END DATE -->
<div class="form-group">

  <label>{{ t.until_date }}</label>

  <input
    type="date"
    v-model="endDate"
  />

</div>

<button
  class="filter-btn"
>
  {{ t.apply_filter }}
</button>

</div>
            
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import {
    Leaf,
    LayoutDashboard,
    Cpu,
    Files,
    Bell,
    Settings,
    BellRing,
    TriangleAlert,
    BadgeCheck,
    Eye,
    Droplets,
    Wifi,
    Database,
    Smartphone,
    Monitor,
    Info
  } from 'lucide-vue-next'

  import {
  ref,
  computed,
  onMounted
} from 'vue'

const notifications = ref([])
const selectedType = ref('')
const currentPage = ref(1)
const itemsPerPage = 5
const selectedStatus = ref('')
const activeFilter = ref('all')
const startDate = ref('')
const endDate = ref('')

const translations = {

id: {

  notifications: 'Notifikasi',
  notification_center: 'Pusat notifikasi dan peringatan sistem',
  total_notifications: 'Total Notifikasi',
  all_time: 'Semua waktu',
  warning: 'Peringatan',
  need_attention: 'Perlu perhatian',
  information: 'Informasi',
  system_info: 'Informasi sistem',
  unread: 'Belum Dibaca',
  new_notifications: 'Notifikasi baru',
  notification_list: 'Daftar Notifikasi',
  all: 'Semua',
  latest: 'Terbaru',
  page: 'Halaman',
  of: 'dari',
  prev: 'Prev',
  next: 'Next',
  filter_notifications: 'Filter Notifikasi',
  choose_type: 'Pilih Jenis',
  all_types: 'Semua Jenis',
  choose_status: 'Pilih Status',
  all_status: 'Semua Status',
  unread_status: 'Belum Dibaca',
  read_status: 'Sudah Dibaca',
  from_date: 'Dari Tanggal',
  until_date: 'Sampai Tanggal',
  apply_filter: 'Terapkan Filter',
  notification_settings: 'Pengaturan Notifikasi',
  email_notifications: 'Notifikasi Email',
  whatsapp_notifications: 'Notifikasi WhatsApp',
  browser_notifications: 'Notifikasi Browser',
  active: 'Aktif',
  info: 'Informasi',
  info_text:
    'Anda akan menerima notifikasi otomatis ketika terjadi perubahan kondisi kompos yang memerlukan perhatian.',
  updated: 'Terakhir diperbarui'

},

en: {

  notifications: 'Notifications',
  notification_center: 'Notification center and system alerts',
  total_notifications: 'Total Notifications',
  all_time: 'All time',
  warning: 'Warnings',
  need_attention: 'Needs attention',
  information: 'Information',
  system_info: 'System information',
  unread: 'Unread',
  new_notifications: 'New notifications',
  notification_list: 'Notification List',
  all: 'All',
  latest: 'Latest',
  page: 'Page',
  of: 'of',
  prev: 'Prev',
  next: 'Next',
  filter_notifications: 'Notification Filter',
  choose_type: 'Select Type',
  all_types: 'All Types',
  choose_status: 'Select Status',
  all_status: 'All Status',
  unread_status: 'Unread',
  read_status: 'Read',
  from_date: 'From Date',
  until_date: 'Until Date',
  apply_filter: 'Apply Filter',
  notification_settings: 'Notification Settings',
  email_notifications: 'Email Notifications',
  whatsapp_notifications: 'WhatsApp Notifications',
  browser_notifications: 'Browser Notifications',
  active: 'Active',
  info: 'Information',
  info_text:
    'You will receive automatic notifications when compost conditions require attention.',

  updated: 'Last updated'

}

}

const deleteNotification = async (id) => {

try {

  await fetch(
    `https://smart-compost-production.up.railway.app/notifications/${id}`,
    {
      method: 'DELETE'
    }
  )

  notifications.value =
    notifications.value.filter(
      item => item.id !== id
    )

} catch (err) {

  console.log(err)

}

}

const deleteAllNotifications = async () => {

const confirmDelete =
  confirm('Hapus semua notifikasi?')

if (!confirmDelete) return

try {

  await fetch(
    'https://smart-compost-production.up.railway.app/notifications',
    {
      method: 'DELETE'
    }
  )

  notifications.value = []

} catch (err) {

  console.log(err)

}

}

const systemSettings =
  JSON.parse(
    localStorage.getItem('system_settings')
  )

const currentLang = computed(() => {

  return systemSettings?.language === 'English'
    ? 'en'
    : 'id'

})

const t = computed(() => {
  return translations[currentLang.value]
})

const fetchNotifications = async () => {

try {

  const res = await fetch(
    'https://smart-compost-production.up.railway.app/notifications'
  )
  const data = await res.json()
  notifications.value = data
} catch (err) {
  console.log(err)
}

}

onMounted(() => {
fetchNotifications()})

const filteredNotifications = computed(() => {

let data = [...notifications.value]

// TOP FILTER
if (activeFilter.value === 'unread') {

  data = data.filter(item =>
    item.is_read === false
  )

}

if (activeFilter.value === 'latest') {

  data = data.sort((a, b) =>
    new Date(b.created_at) -
    new Date(a.created_at)
  )

}

// FILTER TYPE
if (selectedType.value) {

  data = data.filter(item =>
    item.type === selectedType.value
  )

}

// FILTER STATUS
if (selectedStatus.value) {

  data = data.filter(item =>
    String(item.is_read) === selectedStatus.value
  )

}

// START DATE
if (startDate.value) {

  data = data.filter(item =>
    new Date(item.created_at)
    >= new Date(startDate.value)
  )

}

// END DATE
if (endDate.value) {

  const end = new Date(endDate.value)
  end.setHours(23,59,59,999)
  data = data.filter(item =>
    new Date(item.created_at) <= end
  )

}

return data

})

const totalPages = computed(() => {

return Math.ceil(
  filteredNotifications.value.length /
  itemsPerPage
)

})

const paginatedNotifications = computed(() => {

const start =
  (currentPage.value - 1) * itemsPerPage

const end =
  start + itemsPerPage

return filteredNotifications.value.slice(start, end)

})

const nextPage = () => {

if (currentPage.value < totalPages.value) {
  currentPage.value++
}

}

const prevPage = () => {

if (currentPage.value > 1) {
  currentPage.value--
}

}

const markAsRead = async (id) => {

try {

  await fetch(
    `https://smart-compost-production.up.railway.app/notifications/${id}/read`,
    {
      method: 'PUT'
    }
  )

  // UPDATE LOCAL STATE
  notifications.value =
    notifications.value.map(item => {

      if (item.id === id) {
        return {
          ...item,
          is_read: true
        }
      }

      return item

    })

} catch (err) {

  console.log(err)

}

}

const lastUpdate = computed(() => {

if (notifications.value.length === 0) {
  return 'Belum ada data'
}

return new Date(
  notifications.value[0].created_at
).toLocaleTimeString('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}) + ' WIB'

})

const totalNotifications = computed(() => {

return notifications.value.length

})

const totalDanger = computed(() => {

return notifications.value.filter(item =>
  item.type === 'danger'
).length

})

const totalInfo = computed(() => {

return notifications.value.filter(item =>
  item.type === 'success' ||
  item.type === 'info'
).length

})

const totalUnread = computed(() => {

return notifications.value.filter(item =>
  item.is_read === false
).length

})

onMounted(() => {

const saved =
  JSON.parse(
    localStorage.getItem('system_settings')
  )

if(saved?.theme === 'dark'){

  document.body.classList.add('dark-mode')

}else{

  document.body.classList.remove('dark-mode')

}

})


  </script>
  
  <style>
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  .header-actions{
  display:flex;
  align-items:center;
  gap:14px;
}

.delete-all-btn{
  border:none;
  background:#ef4444;
  color:white;

  padding:12px 18px;
  border-radius:12px;

  cursor:pointer;
  font-weight:600;
}

.delete-all-btn:hover{
  opacity:.9;
}

.notif-actions{
  margin-top:14px;

  display:flex;
  gap:10px;
  justify-content:flex-end;
}

.read-btn{
  border:none;
  background:#4CAF50;
  color:white;

  padding:8px 14px;
  border-radius:10px;

  cursor:pointer;
  font-size:13px;
}

.delete-btn{
  border:none;
  background:#ef4444;
  color:white;

  padding:8px 14px;
  border-radius:10px;

  cursor:pointer;
  font-size:13px;
}

.read-btn:hover,
.delete-btn:hover{
  opacity:.9;
}

  .pagination{
  margin-top:25px;

  display:flex;
  justify-content:center;
  align-items:center;
  gap:18px;
}

.pagination button{
  border:none;
  background:#4CAF50;
  color:white;

  padding:10px 18px;

  border-radius:10px;

  cursor:pointer;
  font-weight:600;
}

.pagination button:disabled{
  opacity:.5;
  cursor:not-allowed;
}

  .readed-text{
  color:#4CAF50;
  font-weight:700;
  font-size:14px;
}
  
  .notification-page{
    min-height:100vh;
    display:flex;
    gap:20px;
    padding:20px;
    font-family:'Poppins',sans-serif;
  }
  
  /* SIDEBAR */
  
  .sidebar{
    width:290px;
    background:linear-gradient(180deg,#07220c,#0f3517);
    border-radius:35px;
    padding:30px 22px;
    color:white;
  
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  
  .logo{
    display:flex;
    align-items:center;
    gap:14px;
    margin-bottom:50px;
  }
  
  .logo-icon{
    width:60px;
    height:60px;
    border-radius:18px;
    background:#4CAF50;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .logo h2{
    font-size:34px;
    font-weight:800;
  }
  
  .logo span{
    color:#4CAF50;
  }
  
  .logo p{
    font-size:12px;
    letter-spacing:4px;
  }
  
  .menu{
    list-style:none;
  }
  
  .menu li{
    display:flex;
    align-items:center;
    gap:14px;
  
    padding:18px;
    border-radius:18px;
  
    margin-bottom:12px;
  
    cursor:pointer;
    transition:.3s;
  }
  
  .menu li:hover{
    background:rgba(255,255,255,.08);
  }
  
  .active{
    background:#4CAF50;
  }
  
  .sidebar-card{
    background:rgba(255,255,255,.08);
    border-radius:24px;
    padding:24px;
  
    display:flex;
    gap:14px;
  }
  
  /* MAIN */
  
  .main-content{
    flex:1;
    background:white;
    border-radius:35px;
    padding:35px;
  }
  
  /* TOPBAR */
  
  .topbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  
  .topbar h1{
    font-size:52px;
  }
  
  .topbar p{
    color:#777;
    margin-top:6px;
  }
  
  .top-right{
    display:flex;
    align-items:center;
    gap:22px;
  }
  
  .update-text{
    color:#666;
    font-size:14px;
  }
  
  .notif-icon{
    width:55px;
    height:55px;
    border-radius:50%;
    background:#fafafa;
  
    display:flex;
    align-items:center;
    justify-content:center;
  
    position:relative;
  }
  
  .notif-badge{
    position:absolute;
    top:-3px;
    right:-3px;
  
    width:24px;
    height:24px;
  
    border-radius:50%;
    background:red;
    color:white;
  
    font-size:12px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .profile{
    display:flex;
    align-items:center;
    gap:12px;
  }
  
  .avatar{
    width:50px;
    height:50px;
    border-radius:50%;
    background:#4CAF50;
  }
  
  /* SUMMARY */
  
  .summary-grid{
    margin-top:35px;
  
    display:grid;
    grid-template-columns:repeat(4,1fr);
  
    gap:20px;
  }
  
  .summary-card{
    background:#fafafa;
    border-radius:28px;
    padding:25px;
  
    display:flex;
    gap:18px;
  }
  
  .summary-icon{
    width:70px;
    height:70px;
    border-radius:20px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .red{
    background:#ffe9e9;
    color:#ef4444;
  }
  
  .orange{
    background:#fff4e4;
    color:#f59e0b;
  }
  
  .green{
    background:#e9f9eb;
    color:#4CAF50;
  }
  
  .blue{
    background:#eaf2ff;
    color:#3b82f6;
  }
  
  .summary-card h2{
    margin:8px 0;
  }
  
  .summary-card p{
    color:#777;
  }
  
  /* CONTENT */
  
  .content-grid{
    margin-top:25px;
  
    display:grid;
    grid-template-columns:1.6fr .8fr;
  
    gap:20px;
  }
  
  /* NOTIFICATION */
  
  .notification-box{
    background:#fafafa;
    border-radius:30px;
    padding:28px;
  }
  
  .box-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    margin-bottom:25px;
  }
  
  .filters{
    display:flex;
    gap:10px;
  }
  
  .filters button{
    border:none;
    background:white;
    padding:12px 18px;
    border-radius:12px;
    cursor:pointer;
    font-weight:600;
  }
  
  .active-filter{
    background:#4CAF50 !important;
    color:white;
  }
  
  .notification-item{
    background:white;
    border-radius:24px;
    padding:22px;
  
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    margin-bottom:18px;
  }
  
  .notif-left{
    display:flex;
    gap:18px;
  }
  
  .notif-icon-box{
    width:60px;
    height:60px;
    border-radius:18px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .red-bg{
    background:#ffe9e9;
    color:#ef4444;
  }
  
  .orange-bg{
    background:#fff4e4;
    color:#f59e0b;
  }
  
  .green-bg{
    background:#e9f9eb;
    color:#4CAF50;
  }
  
  .blue-bg{
    background:#eaf2ff;
    color:#3b82f6;
  }
  
  .notification-item p{
    color:#777;
    margin-top:8px;
  }
  
  .notif-right{
    text-align:right;
  }
  
  .notif-right span{
    font-size:14px;
    color:#777;
  }
  
  .notif-right label{
    display:inline-block;
    margin-top:12px;
    padding:8px 14px;
    border-radius:12px;
    font-size:13px;
    font-weight:600;
  }
  
  .danger-label{
    background:#ffe9e9;
    color:#ef4444;
  }
  
  .warning-label{
    background:#fff4e4;
    color:#f59e0b;
  }
  
  .success-label{
    background:#e9f9eb;
    color:#4CAF50;
  }
  
  .info-label{
    background:#eaf2ff;
    color:#3b82f6;
  }
  
  .red-text{
    color:#ef4444;
  }
  
  .orange-text{
    color:#f59e0b;
  }
  
  .green-text{
    color:#4CAF50;
  }
  
  .blue-text{
    color:#3b82f6;
  }
  
  /* RIGHT */
  
  .right-panel{
    display:flex;
    flex-direction:column;
    gap:20px;
  }
  
  .filter-card,
  .settings-card,
  .info-card{
    background:#fafafa;
    border-radius:28px;
    padding:25px;
  }
  
  .form-group{
    margin-top:18px;
  }
  
  .form-group label{
    display:block;
    margin-bottom:10px;
    font-weight:600;
  }
  
  .form-group input,
  .form-group select{
    width:100%;
    padding:14px;
    border-radius:14px;
    border:1px solid #ddd;
    outline:none;
  }
  
  .filter-btn{
    width:100%;
    margin-top:20px;
  
    border:none;
    background:#4CAF50;
    color:white;
  
    padding:16px;
    border-radius:16px;
  
    font-weight:600;
    cursor:pointer;
  }
  
  .setting-item{
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    margin-top:22px;
  }
  
  .setting-left{
    display:flex;
    align-items:center;
    gap:14px;
  }
  
  .setting-icon{
    width:48px;
    height:48px;
    border-radius:14px;
  
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .active-status{
    color:#4CAF50;
    font-weight:700;
  }
  
  .info-top{
    display:flex;
    align-items:center;
    gap:10px;
  
    color:#4CAF50;
  
    margin-bottom:14px;
  }
  
  .info-card p{
    color:#666;
    line-height:1.7;
  }
  
  /* RESPONSIVE */
  
  @media(max-width:1400px){
  
    .summary-grid{
      grid-template-columns:repeat(2,1fr);
    }
  
    .content-grid{
      grid-template-columns:1fr;
    }
  
  }
  
  @media(max-width:1000px){
  
    .notification-page{
      flex-direction:column;
    }
  
    .sidebar{
      width:100%;
    }
  
  }
  
  @media(max-width:768px){
  
    .main-content{
      padding:20px;
    }
  
    .topbar{
      flex-direction:column;
      align-items:flex-start;
      gap:20px;
    }
  
    .summary-grid{
      grid-template-columns:1fr;
    }
  
    .notification-item{
      flex-direction:column;
      align-items:flex-start;
      gap:18px;
    }
  
    .notif-right{
      text-align:left;
    }
  
    .box-header{
      flex-direction:column;
      align-items:flex-start;
      gap:18px;
    }
  
  }

  /* =========================
   DARK MODE
========================= */

body.dark-mode{

background:
radial-gradient(circle at top left,#0f3d1d,#020617 45%);

color:white;

}

body.dark-mode .main-content,
body.dark-mode .notification-box,
body.dark-mode .filter-card,
body.dark-mode .settings-card,
body.dark-mode .info-card,
body.dark-mode .summary-card{

background:#0f172a;
color:white;

border:1px solid rgba(255,255,255,.06);

}

body.dark-mode .notification-item{

background:#111827;
color:white;

}

body.dark-mode p,
body.dark-mode span{

color:#94a3b8;

}

body.dark-mode input,
body.dark-mode select{

background:#020617;
color:white;
border:1px solid #334155;

}

body.dark-mode .filters button{

background:#1e293b;
color:white;

}

body.dark-mode .active-filter{

background:#22c55e !important;

}
  
  </style>