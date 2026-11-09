import './style.css'

type Availability = 'available' | 'borrowed'
type BorrowStatus = 'borrowed' | 'overdue' | 'returned'
type BorrowerType = 'named' | 'anonymous'
type Page = 'overview' | 'borrowing' | 'inventory' | 'history'

interface Equipment {
  id: string
  name: string
  category: string
  location: string
  icon: string
  color: string
}

interface BorrowRecord {
  id: string
  itemId: string
  borrowerType: BorrowerType
  borrowerName?: string
  borrowDate: string
  dueDate: string
  returnedDate?: string
  notes?: string
}

const equipment: Equipment[] = [
  { id: 'proyektor-01', name: 'Proyektor Epson', category: 'Elektronik', location: 'Ruang Tata Usaha', icon: 'projector', color: 'violet' },
  { id: 'kamera-01', name: 'Kamera Canon EOS', category: 'Elektronik', location: 'Ruang Multimedia', icon: 'camera', color: 'blue' },
  { id: 'speaker-01', name: 'Speaker Portable', category: 'Elektronik', location: 'Ruang Tata Usaha', icon: 'speaker', color: 'orange' },
  { id: 'bola-basket-01', name: 'Bola Basket', category: 'Olahraga', location: 'Gudang Olahraga', icon: 'basketball', color: 'green' },
  { id: 'bola-voli-01', name: 'Bola Voli', category: 'Olahraga', location: 'Gudang Olahraga', icon: 'volleyball', color: 'pink' },
  { id: 'ruang-multimedia', name: 'Ruang Multimedia', category: 'Ruang', location: 'Gedung B · Lantai 2', icon: 'room', color: 'blue' },
  { id: 'lab-komputer', name: 'Lab Komputer', category: 'Ruang', location: 'Gedung A · Lantai 1', icon: 'computer', color: 'violet' },
  { id: 'mikroskop-01', name: 'Mikroskop', category: 'Laboratorium', location: 'Lab IPA', icon: 'microscope', color: 'green' },
]

const today = new Date()
const localDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const offsetDate = (offset: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + offset)
  return localDate(date)
}

const starterRecords: BorrowRecord[] = [
  { id: 'BR-2048', itemId: 'proyektor-01', borrowerType: 'named', borrowerName: 'Nadia Putri', borrowDate: offsetDate(-2), dueDate: offsetDate(2), notes: 'Presentasi kelas XII A' },
  { id: 'BR-2047', itemId: 'bola-basket-01', borrowerType: 'anonymous', borrowDate: offsetDate(-5), dueDate: offsetDate(-1), notes: 'Latihan ekstrakurikuler' },
  { id: 'BR-2046', itemId: 'kamera-01', borrowerType: 'named', borrowerName: 'Rafi Pratama', borrowDate: offsetDate(-1), dueDate: offsetDate(3), notes: 'Dokumentasi kegiatan sekolah' },
  { id: 'BR-2045', itemId: 'ruang-multimedia', borrowerType: 'named', borrowerName: 'Dewi Anggraini', borrowDate: offsetDate(-8), dueDate: offsetDate(-6), returnedDate: offsetDate(-6), notes: 'Rapat OSIS' },
  { id: 'BR-2044', itemId: 'speaker-01', borrowerType: 'anonymous', borrowDate: offsetDate(-9), dueDate: offsetDate(-7), returnedDate: offsetDate(-7) },
  { id: 'BR-2043', itemId: 'mikroskop-01', borrowerType: 'named', borrowerName: 'Bima Saputra', borrowDate: offsetDate(-3), dueDate: offsetDate(1), notes: 'Praktikum biologi' },
]

const iconPaths: Record<string, string> = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5h6a1.5 1.5 0 0 0-3 0H9Z"/><path d="M9 11h6M9 15h6"/>',
  boxes: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.3 7.7 7.7 4.4 7.7-4.4M12 12v9"/>',
  history: '<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>',
  projector: '<rect x="3" y="7" width="14" height="10" rx="2"/><path d="m17 10 4-2v8l-4-2M7 17l-1 4m8-4 1 4M7 11h6"/>',
  camera: '<path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11H3V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="4"/>',
  speaker: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="14" r="3"/><circle cx="12" cy="7" r="1"/>',
  basketball: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6c3 2.1 4.5 6.3 4.2 12.8M18.4 5.6c-3 2.1-4.5 6.3-4.2 12.8M3.3 10h17.4M3.3 14h17.4"/>',
  volleyball: '<circle cx="12" cy="12" r="9"/><path d="M12 3c-1.6 4.4.3 8.3 5.7 11.6M4.2 7.5c4.5-1.3 8.1.8 10.7 6.2M5 18c2.8-3.7 6.8-4.4 12-2.1"/>',
  room: '<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M9 21v-6h6v6"/><path d="M8 8h.01M16 8h.01M8 11h.01M16 11h.01"/>',
  computer: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  microscope: '<path d="m6 3 5 5m-3-7 5 5-3 3-5-5M10 10l-3 3a5 5 0 0 0 7 7l3-3M13 13l4-4m-2-2 4 4m-8 10h11"/>',
}

const icon = (name: string, className = '') => `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] ?? iconPaths.boxes}</svg>`
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char)
const formatDate = (value: string) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`))

function isBorrowRecord(value: unknown): value is BorrowRecord {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return typeof record.id === 'string'
    && typeof record.itemId === 'string'
    && (record.borrowerType === 'named' || record.borrowerType === 'anonymous')
    && typeof record.borrowDate === 'string'
    && typeof record.dueDate === 'string'
    && (record.borrowerName === undefined || typeof record.borrowerName === 'string')
    && (record.returnedDate === undefined || typeof record.returnedDate === 'string')
    && (record.notes === undefined || typeof record.notes === 'string')
}

function loadRecords(): BorrowRecord[] {
  const stored = localStorage.getItem('ruang-pinjam-records')
  if (!stored) return starterRecords
  try {
    const parsed: unknown = JSON.parse(stored)
    if (Array.isArray(parsed) && parsed.every(isBorrowRecord)) return parsed
    console.error('Data peminjaman tersimpan tidak sesuai format. Menggunakan data awal.')
  } catch (error) {
    console.error('Data peminjaman tidak dapat dibaca. Menggunakan data awal.', error)
  }
  return starterRecords
}

let records = loadRecords()
let activePage: Page = 'overview'
let searchQuery = ''
let activeFilter = 'Semua status'
let toastTimer = 0

function saveRecords() {
  try {
    localStorage.setItem('ruang-pinjam-records', JSON.stringify(records))
  } catch (error) {
    console.error('Data peminjaman gagal disimpan.', error)
    showToast('Perubahan gagal disimpan di perangkat ini.')
  }
}

function checkAvailability(itemId: string, borrowRecords: BorrowRecord[]): Availability {
  return borrowRecords.some((record) => record.itemId === itemId && !record.returnedDate) ? 'borrowed' : 'available'
}

function getBorrowStatus(record: BorrowRecord): BorrowStatus {
  if (record.returnedDate) return 'returned'
  return record.dueDate < localDate(new Date()) ? 'overdue' : 'borrowed'
}

function getEquipment(itemId: string) {
  return equipment.find((item) => item.id === itemId)
}

function getOpenRecords() {
  return records.filter((record) => !record.returnedDate)
}

function getStatusBadge(status: BorrowStatus) {
  const labels: Record<BorrowStatus, string> = { borrowed: 'Dipinjam', overdue: 'Terlambat', returned: 'Dikembalikan' }
  return `<span class="status-badge ${status}"><span></span>${labels[status]}</span>`
}

function renderRecordRows(list: BorrowRecord[]) {
  if (list.length === 0) {
    return `<tr><td colspan="6"><div class="empty-state">${icon('clipboard')}<strong>Belum ada data peminjaman</strong><span>Data yang sesuai akan muncul di sini.</span></div></td></tr>`
  }
  return list.map((record) => {
    const item = getEquipment(record.itemId)
    const borrower = record.borrowerType === 'anonymous' ? 'Peminjam samaran' : escapeHtml(record.borrowerName || 'Tanpa nama')
    const status = getBorrowStatus(record)
    return `<tr>
      <td><span class="record-id">${escapeHtml(record.id)}</span></td>
      <td><div class="table-item"><span class="mini-icon ${item?.color ?? 'violet'}">${icon(item?.icon ?? 'boxes')}</span><span><strong>${escapeHtml(item?.name ?? 'Barang tidak ditemukan')}</strong><small>${escapeHtml(item?.category ?? 'Inventaris')}</small></span></div></td>
      <td><div class="borrower-cell"><strong>${borrower}</strong><small>${record.borrowerType === 'anonymous' ? 'Identitas disamarkan' : 'Peminjam terdaftar'}</small></div></td>
      <td><span class="date-cell">${formatDate(record.borrowDate)}</span></td>
      <td><span class="date-cell ${status === 'overdue' ? 'date-overdue' : ''}">${formatDate(record.dueDate)}</span></td>
      <td>${status === 'returned' ? getStatusBadge(status) : `<div class="status-action">${getStatusBadge(status)}<button class="return-button" data-return="${escapeHtml(record.id)}" type="button" aria-label="Tandai ${escapeHtml(record.id)} sudah dikembalikan">${icon('check')}</button></div>`}</td>
    </tr>`
  }).join('')
}

function getVisibleRecords(source = getOpenRecords()) {
  const query = searchQuery.trim().toLocaleLowerCase('id')
  return source.filter((record) => {
    const item = getEquipment(record.itemId)
    const borrower = record.borrowerType === 'anonymous' ? 'Peminjam samaran' : record.borrowerName ?? ''
    const matchesQuery = !query || [record.id, item?.name ?? '', borrower].some((value) => value.toLocaleLowerCase('id').includes(query))
    const status = getBorrowStatus(record)
    const matchesFilter = activeFilter === 'Semua status'
      || (activeFilter === 'Terlambat' && status === 'overdue')
      || (activeFilter === 'Dipinjam' && status === 'borrowed')
    return matchesQuery && matchesFilter
  })
}

function renderTable(source = getOpenRecords()) {
  return `<div class="table-wrap"><table>
    <thead><tr><th>ID PEMINJAMAN</th><th>BARANG / RUANG</th><th>PEMINJAM</th><th>TANGGAL PINJAM</th><th>BATAS KEMBALI</th><th>STATUS</th></tr></thead>
    <tbody>${renderRecordRows(getVisibleRecords(source))}</tbody>
  </table></div>`
}

function renderDashboard() {
  const open = getOpenRecords()
  const overdue = open.filter((record) => getBorrowStatus(record) === 'overdue').length
  const available = equipment.filter((item) => checkAvailability(item.id, records) === 'available').length
  const recent = [...records].sort((a, b) => b.borrowDate.localeCompare(a.borrowDate)).slice(0, 5)
  return `<section class="welcome-row">
      <div><p class="eyebrow">SENIN, ${new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(today).toLocaleUpperCase('id')}</p><h1>Selamat pagi 👋</h1><p class="welcome-copy">Pantau peminjaman alat dan ruang sekolah dengan mudah.</p></div>
      <button class="primary-button" data-action="new-loan">${icon('plus')} Buat peminjaman</button>
    </section>
    <section class="stats-grid" aria-label="Ringkasan peminjaman">
      <article class="stat-card"><div class="stat-top"><span>Total inventaris</span><span class="stat-icon violet">${icon('boxes')}</span></div><strong>${equipment.length}<small> item</small></strong><p>Alat dan ruang terdaftar</p></article>
      <article class="stat-card"><div class="stat-top"><span>Sedang dipinjam</span><span class="stat-icon blue">${icon('clipboard')}</span></div><strong>${open.length}<small> peminjaman</small></strong><p>${available} barang siap dipinjam</p></article>
      <article class="stat-card"><div class="stat-top"><span>Perlu dikembalikan</span><span class="stat-icon orange">${icon('clock')}</span></div><strong>${overdue}<small> terlambat</small></strong><p>${overdue ? 'Periksa dan tindak lanjuti' : 'Tidak ada keterlambatan'}</p></article>
    </section>
    <section class="panel recent-panel"><div class="panel-heading"><div><h2>Peminjaman terbaru</h2><p>Aktivitas peminjaman alat dan ruang sekolah</p></div><button class="text-button" data-page="borrowing">Lihat semua ${icon('arrow')}</button></div>
      ${renderTable(recent)}
    </section>
    <section class="tip-banner"><span class="tip-icon">${icon('check')}</span><div><strong>Setiap barang hanya bisa dipinjam satu kali</strong><p>Peminjaman baru akan tersedia setelah barang sebelumnya dikembalikan.</p></div><button class="text-button" data-page="inventory">Lihat inventaris ${icon('arrow')}</button></section>`
}

function renderBorrowing() {
  return `<section class="page-heading"><div><p class="eyebrow">PENGELOLAAN</p><h1>Data peminjaman</h1><p class="welcome-copy">Kelola peminjaman aktif, tanggal kembali, dan keterlambatan.</p></div><button class="primary-button" data-action="new-loan">${icon('plus')} Buat peminjaman</button></section>
    <section class="panel data-panel"><div class="toolbar"><label class="search-box">${icon('search')}<input id="record-search" type="search" placeholder="Cari barang atau peminjam..." value="${escapeHtml(searchQuery)}"></label><label class="select-wrap"><span class="sr-only">Filter status</span><select id="status-filter"><option ${activeFilter === 'Semua status' ? 'selected' : ''}>Semua status</option><option ${activeFilter === 'Dipinjam' ? 'selected' : ''}>Dipinjam</option><option ${activeFilter === 'Terlambat' ? 'selected' : ''}>Terlambat</option></select></label></div>${renderTable()}</section>`
}

function renderInventory() {
  const categories = [...new Set(equipment.map((item) => item.category))]
  return `<section class="page-heading"><div><p class="eyebrow">DAFTAR BARANG</p><h1>Inventaris sekolah</h1><p class="welcome-copy">Ketersediaan alat dan ruang diperbarui setiap kali ada pengembalian.</p></div><button class="primary-button" data-action="new-loan">${icon('plus')} Buat peminjaman</button></section>
    ${categories.map((category) => `<section class="inventory-section"><div class="section-title"><h2>${escapeHtml(category)}</h2><span>${equipment.filter((item) => item.category === category).length} item</span></div><div class="inventory-grid">${equipment.filter((item) => item.category === category).map((item) => {
      const availability = checkAvailability(item.id, records)
      const currentLoan = records.find((record) => record.itemId === item.id && !record.returnedDate)
      return `<article class="inventory-card"><div class="inventory-card-top"><span class="equipment-icon ${item.color}">${icon(item.icon)}</span><span class="availability ${availability}"><span></span>${availability === 'available' ? 'Tersedia' : 'Sedang dipinjam'}</span></div><h3>${escapeHtml(item.name)}</h3><p>${icon('pin')} ${escapeHtml(item.location)}</p>${currentLoan ? `<small class="loan-note">Kembali ${formatDate(currentLoan.dueDate)}</small>` : `<button class="small-action" data-action="new-loan" data-item="${escapeHtml(item.id)}">Pinjam item ${icon('arrow')}</button>`}</article>`
    }).join('')}</div></section>`).join('')}`
}

function renderHistory() {
  const returned = records.filter((record) => record.returnedDate).sort((a, b) => (b.returnedDate ?? '').localeCompare(a.returnedDate ?? ''))
  return `<section class="page-heading"><div><p class="eyebrow">ARSIP</p><h1>Riwayat pengembalian</h1><p class="welcome-copy">Daftar barang dan ruang yang sudah dikembalikan.</p></div></section>
    <section class="panel data-panel"><div class="panel-heading history-heading"><div><h2>${returned.length} peminjaman selesai</h2><p>Riwayat tersimpan di perangkat ini</p></div></div>${renderTable(returned)}</section>`
}

function renderModal(preselectedItem = '') {
  const availableItems = equipment.filter((item) => checkAvailability(item.id, records) === 'available')
  if (availableItems.length === 0) {
    showToast('Semua barang sedang dipinjam.')
    return
  }
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return
  const options = availableItems.map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === preselectedItem ? 'selected' : ''}>${escapeHtml(item.name)} · ${escapeHtml(item.category)}</option>`).join('')
  const due = offsetDate(7)
  app.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" data-close-modal>
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-heading"><div><span class="modal-icon">${icon('clipboard')}</span><h2 id="modal-title">Buat peminjaman</h2><p>Isi detail peminjaman barang atau ruang.</p></div><button class="icon-button" data-close-modal type="button" aria-label="Tutup">${icon('close')}</button></div>
      <form id="borrow-form">
        <label class="form-field">Barang / ruang<select name="itemId" required>${options}</select></label>
        <fieldset class="borrower-field"><legend>Identitas peminjam</legend><div class="borrower-options"><label><input type="radio" name="borrowerType" value="named" checked><span>${icon('user')} Dengan nama</span></label><label><input type="radio" name="borrowerType" value="anonymous"><span>${icon('user')} Samaran</span></label></div></fieldset>
        <label class="form-field" id="borrower-name-field">Nama peminjam<input name="borrowerName" type="text" placeholder="Contoh: Nadia Putri" maxlength="80"></label>
        <div class="date-fields"><label class="form-field">Tanggal pinjam<input name="borrowDate" type="date" value="${localDate(new Date())}" required></label><label class="form-field">Tanggal kembali<input name="dueDate" type="date" value="${due}" required></label></div>
        <label class="form-field">Catatan <span class="optional">(opsional)</span><textarea name="notes" rows="2" maxlength="180" placeholder="Keperluan peminjaman..."></textarea></label>
        <p class="form-hint">${icon('check')} Barang yang belum dikembalikan tidak bisa dipinjam ulang.</p>
        <div class="modal-actions"><button class="secondary-button" data-close-modal type="button">Batal</button><button class="primary-button" type="submit">Simpan peminjaman</button></div>
      </form>
    </section>
  </div>`)
  app.querySelector<HTMLInputElement>('[name="borrowerName"]')?.focus()
}

function showToast(message: string) {
  const existing = document.querySelector<HTMLElement>('.toast')
  existing?.remove()
  document.body.insertAdjacentHTML('beforeend', `<div class="toast" role="status">${icon('check')}<span>${escapeHtml(message)}</span></div>`)
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => document.querySelector('.toast')?.remove(), 3200)
}

function render() {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) throw new Error('Elemen aplikasi #app tidak ditemukan.')
  const nav: { id: Page; label: string; icon: string }[] = [
    { id: 'overview', label: 'Ringkasan', icon: 'grid' },
    { id: 'borrowing', label: 'Peminjaman', icon: 'clipboard' },
    { id: 'inventory', label: 'Inventaris', icon: 'boxes' },
    { id: 'history', label: 'Riwayat', icon: 'history' },
  ]
  const pageContent = activePage === 'overview' ? renderDashboard()
    : activePage === 'borrowing' ? renderBorrowing()
      : activePage === 'inventory' ? renderInventory()
        : renderHistory()
  app.innerHTML = `<aside class="sidebar">
      <a class="brand" href="#" data-page="overview"><span class="brand-mark">${icon('boxes')}</span><span><strong>RuangPinjam</strong><small>PORTAL SEKOLAH</small></span></a>
      <div class="school-switch"><span class="school-avatar">S</span><span><strong>Sekolah Nusantara</strong></span><span class="switch-chevron"></span></div>
      <span class="nav-caption">MENU UTAMA</span><nav class="main-nav">${nav.map((item) => `<button class="nav-link ${activePage === item.id ? 'active' : ''}" data-page="${item.id}">${icon(item.icon)}<span>${item.label}</span>${item.id === 'borrowing' && getOpenRecords().length ? `<span class="nav-count">${getOpenRecords().length}</span>` : ''}</button>`).join('')}</nav>
      <div class="sidebar-bottom"><div class="help-card"><span class="help-mark">?</span><strong>Butuh bantuan?</strong><p>Hubungi administrator sekolah untuk bantuan.</p><a href="mailto:admin@sekolahnusantara.sch.id">Hubungi kami ${icon('arrow')}</a></div><div class="profile"><span class="profile-avatar">AD</span><span><strong>Admin Sekolah</strong><small>admin@sekolah.sch.id</small></span><button class="profile-menu" aria-label="Menu profil">···</button></div></div>
    </aside>
    <main class="main-area"><header class="topbar"><div class="breadcrumb">Portal sekolah <span>/</span> <strong>${nav.find((item) => item.id === activePage)?.label}</strong></div><div class="topbar-actions"><span class="today-chip">${icon('calendar')} ${formatDate(localDate(new Date()))}</span><button class="notification-button" aria-label="Notifikasi">${icon('clock')}<i></i></button><span class="topbar-avatar">AD</span></div></header><div class="content">${pageContent}<footer>© 2025 RuangPinjam <span>•</span> Membantu sekolah mengelola fasilitas dengan lebih baik.</footer></div></main>`
}

function refreshRecordTable() {
  const tbody = document.querySelector<HTMLTableSectionElement>('tbody')
  if (tbody) tbody.innerHTML = renderRecordRows(getVisibleRecords(activePage === 'history' ? records.filter((record) => record.returnedDate) : getOpenRecords()))
}

document.querySelector<HTMLDivElement>('#app')?.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const pageButton = target.closest<HTMLElement>('[data-page]')
  if (pageButton) {
    event.preventDefault()
    activePage = pageButton.dataset.page as Page
    searchQuery = ''
    activeFilter = 'Semua status'
    render()
    return
  }
  const returnButton = target.closest<HTMLButtonElement>('[data-return]')
  if (returnButton) {
    const record = records.find((item) => item.id === returnButton.dataset.return)
    if (!record || record.returnedDate) return
    record.returnedDate = localDate(new Date())
    saveRecords()
    render()
    showToast('Barang berhasil ditandai sudah dikembalikan.')
    return
  }
  const action = target.closest<HTMLElement>('[data-action="new-loan"]')
  if (action) {
    renderModal(action.dataset.item ?? '')
    return
  }
  const closeButton = target.closest<HTMLElement>('.modal [data-close-modal]')
  const backdrop = target.matches('.modal-backdrop') ? target : null
  if (closeButton || backdrop) (closeButton ?? backdrop)?.closest('.modal-backdrop')?.remove()
})

document.querySelector<HTMLDivElement>('#app')?.addEventListener('input', (event) => {
  const target = event.target
  if (target instanceof HTMLInputElement && target.id === 'record-search') {
    searchQuery = target.value
    refreshRecordTable()
  }
})

document.querySelector<HTMLDivElement>('#app')?.addEventListener('change', (event) => {
  const target = event.target
  if (target instanceof HTMLSelectElement && target.id === 'status-filter') {
    activeFilter = target.value
    refreshRecordTable()
  }
  if (target instanceof HTMLInputElement && target.name === 'borrowerType') {
    const nameField = document.querySelector<HTMLElement>('#borrower-name-field')
    const input = document.querySelector<HTMLInputElement>('[name="borrowerName"]')
    const anonymous = target.value === 'anonymous'
    if (nameField) nameField.hidden = anonymous
    if (input) input.required = !anonymous
  }
})

document.querySelector<HTMLDivElement>('#app')?.addEventListener('submit', (event) => {
  const target = event.target
  if (!(target instanceof HTMLFormElement) || target.id !== 'borrow-form') return
  event.preventDefault()
  const formData = new FormData(target)
  const itemId = String(formData.get('itemId') ?? '')
  const borrowerType = String(formData.get('borrowerType') ?? '') as BorrowerType
  const borrowerName = String(formData.get('borrowerName') ?? '').trim()
  const borrowDate = String(formData.get('borrowDate') ?? '')
  const dueDate = String(formData.get('dueDate') ?? '')
  if (checkAvailability(itemId, records) !== 'available') {
    showToast('Barang sedang dipinjam. Pilih barang lain.')
    target.closest('.modal-backdrop')?.remove()
    return
  }
  if (borrowerType !== 'named' && borrowerType !== 'anonymous') {
    showToast('Pilih jenis identitas peminjam.')
    return
  }
  if (borrowerType === 'named' && !borrowerName) {
    showToast('Nama peminjam wajib diisi.')
    return
  }
  if (!borrowDate || !dueDate || dueDate < borrowDate) {
    showToast('Tanggal kembali harus sama atau setelah tanggal pinjam.')
    return
  }
  const record: BorrowRecord = {
    id: `BR-${String(Date.now()).slice(-6)}`,
    itemId,
    borrowerType,
    ...(borrowerType === 'named' ? { borrowerName } : {}),
    borrowDate,
    dueDate,
    ...(String(formData.get('notes') ?? '').trim() ? { notes: String(formData.get('notes')).trim() } : {}),
  }
  records = [record, ...records]
  saveRecords()
  target.closest('.modal-backdrop')?.remove()
  activePage = 'borrowing'
  render()
  showToast('Peminjaman berhasil dicatat.')
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') document.querySelector('.modal-backdrop')?.remove()
})

render()
