# 🕐 Portal Kehadiran — HR Attendance System

Aplikasi absensi karyawan berbasis web dengan fitur selfie kamera, dashboard admin, dan laporan cetak.

---

## 🚀 Cara Deploy (5 Menit)

### 1. Upload ke GitHub

```bash
# Buat folder project
cd portal-kehadiran

# Inisialisasi git
git init
git add .
git commit -m "Initial commit"

# Buat repo baru di github.com, lalu:
git remote add origin https://github.com/USERNAME/portal-kehadiran.git
git branch -M main
git push -u origin main
```

### 2. Deploy ke Vercel (Gratis)

1. Buka [vercel.com](https://vercel.com) → Login dengan GitHub
2. Klik **"Add New Project"**
3. Pilih repo `portal-kehadiran`
4. Klik **Deploy** → selesai, dapat URL publik!

### 3. Deploy ke Netlify (Alternatif)

1. Buka [netlify.com](https://netlify.com) → Login
2. Drag & drop folder `/build` ke dashboard, ATAU
3. Connect ke GitHub repo → auto deploy

---

## 💻 Jalankan Lokal

```bash
# Install dependencies
npm install

# Jalankan development server
npm start

# Build untuk production
npm run build
```

---

## 🔑 Kredensial Login

| Role     | ID Login      |
|----------|---------------|
| Admin    | `admin456231` |
| Karyawan | `KRY-001`     |
| Karyawan | `KRY-002`     |
| Karyawan | `KRY-003`     |

> **Catatan:** Untuk menambah karyawan, login sebagai admin → menu "Data Karyawan" → "Tambah Karyawan"

---

## 📁 Struktur Project

```
portal-kehadiran/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LoginScreen.jsx       # Halaman login
│   │   ├── AdminDashboard.jsx    # Layout dashboard admin
│   │   ├── AdminKaryawan.jsx     # Manajemen karyawan
│   │   ├── AdminLaporan.jsx      # Laporan & filter absensi
│   │   └── EmployeeDashboard.jsx # Dashboard karyawan + kamera
│   ├── data/
│   │   └── initialData.js        # Data awal karyawan & records
│   ├── App.js                    # Root component & routing state
│   ├── index.js                  # Entry point
│   └── index.css                 # Tailwind + custom styles
├── package.json
├── tailwind.config.js
└── .gitignore
```

---

## ✨ Fitur

- **Login satu pintu** — karyawan & admin pakai ID masing-masing
- **Absen selfie** — kamera langsung dari browser, foto tersimpan sebagai bukti
- **Dashboard admin** — lihat semua absensi, filter periode & lokasi, ekspor PDF
- **Manajemen karyawan** — tambah karyawan baru, auto-generate ID
- **Riwayat personal** — karyawan bisa lihat histori absensi sendiri
- **Responsive** — bekerja di desktop dan mobile

---

## ⚙️ Teknologi

- React 18
- Tailwind CSS
- Lucide React (icons)
- React Scripts (CRA)

