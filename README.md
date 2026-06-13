# E-Library — Sistem Informasi Rental Buku Digital

Proyek UAS Mata Kuliah Pemrograman Web 2  
**Nama:** Amelia Nurmala Dewi  
**NIM:** 312410199

---

## Deskripsi Proyek

E-Library adalah sistem informasi perpustakaan digital berbasis web yang dibangun menggunakan arsitektur **Decoupled (Terpisah)** antara Backend dan Frontend. Sistem ini memungkinkan administrator untuk mengelola data buku, kategori, dan peminjaman secara efisien, serta menyediakan halaman publik bagi pengunjung untuk melihat koleksi buku yang tersedia.

---

## Teknologi yang Digunakan

| Komponen | Teknologi |
|---|---|
| Backend | PHP Framework CodeIgniter 4 (RESTful API) |
| Frontend | VueJS 3 + Vue Router (CDN) |
| UI Framework | TailwindCSS (CDN) |
| HTTP Request | Axios |
| Database | MySQL |

---

## Fitur Aplikasi

### Pengunjung (Tanpa Login)
- Melihat halaman beranda dengan statistik total buku, kategori, dan peminjaman aktif
- Melihat seluruh koleksi buku beserta cover, judul, penulis, dan status ketersediaan
- Melihat halaman detail buku (deskripsi, penerbit, tahun terbit, stok, kategori)

### Administrator (Wajib Login)
- Login & Logout dengan autentikasi token
- Dashboard ringkasan data sistem
- CRUD data Buku (termasuk upload cover)
- CRUD data Kategori
- CRUD data Peminjaman (catat dan pantau status peminjaman)

---

## Struktur Folder

```
UAS_Web2_312410199_AmeliaNurmalaDewi/
├── backend-api/        # Framework CodeIgniter 4 (REST API Server)
│   ├── app/
│   │   ├── Controllers/Api/
│   │   │   ├── Auth.php
│   │   │   ├── Buku.php
│   │   │   ├── Kategori.php
│   │   │   └── Peminjaman.php
│   │   ├── Models/
│   │   ├── Filters/
│   │   └── Config/
│   └── public/uploads/  # Folder upload cover buku
└── frontend-spa/        # Single Page Application VueJS
    ├── index.html
    └── assets/js/components/
        ├── Home.js
        ├── Login.js
        ├── Dashboard.js
        ├── Buku.js
        ├── Kategori.js
        ├── Peminjaman.js
        └── DetailBuku.js
```

---

## Skema Relasi Database

> Screenshot skema relasi tabel dari phpMyAdmin Designer

![Skema Relasi Database](docs/skema-relasi.png)

**Tabel:**
- `users` — data akun administrator
- `kategori` — data genre/kategori buku
- `buku` — data koleksi buku (berelasi dengan kategori)
- `peminjaman` — data peminjaman buku (berelasi dengan buku)

---

## Screenshot Aplikasi

### Halaman Beranda Publik
![Beranda](docs/beranda.png)

### Halaman Login Admin
![Login](docs/login.png)

### Dashboard Admin
![Dashboard](docs/dashboard.png)

### Halaman Buku
![Buku](docs/buku.png)

### Form Modal Tambah/Edit Buku
![Modal Buku](docs/modal-buku.png)

### Halaman Kategori
![Kategori](docs/kategori.png)

### Halaman Peminjaman
![Peminjaman](docs/peminjaman.png)

### Detail Buku (Halaman Publik)
![Detail Buku](docs/detail-buku.png)

---

## Uji Coba Proteksi Token (Error 401)

> Endpoint DELETE tanpa Authorization Bearer Token menghasilkan Error 401 Unauthorized

![Error 401 Postman](docs/error-401.png)

```json
{
  "status": 401,
  "error": 401,
  "messages": "Akses Ditolak. Token tidak ditemukan pada request!"
}
```

---

## Cara Menjalankan Proyek

### Prasyarat
- XAMPP (PHP 8.x + MySQL)
- Browser modern

### Backend (CodeIgniter 4)

1. Clone repositori ini
2. Masuk ke folder `backend-api`
3. Copy file `.env.example` menjadi `.env`, sesuaikan konfigurasi database:
   ```
   database.default.hostname = localhost
   database.default.database = uas_elibrary
   database.default.username = root
   database.default.password = 
   ```
4. Import database — buat database `uas_elibrary` di phpMyAdmin, lalu import file SQL yang tersedia
5. Jalankan server CI4:
   ```
   php spark serve --port 8081
   ```

### Frontend (VueJS SPA)

1. Masuk ke folder `frontend-spa`
2. Pastikan file `assets/js/app.js` menggunakan `apiUrl` yang sesuai:
   ```javascript
   const apiUrl = 'http://localhost:8081';
   ```
3. Buka browser dan akses:
   ```
   http://localhost/UAS_elibrary/frontend-spa
   ```

### Akun Admin Default
| Field | Value |
|---|---|
| Username | admin |
| Password | password |

---

## Link Demo & Presentasi

- **Repository GitHub:** https://github.com/amelianurmala/UAS_Web2_312410199_AmeliaNurmalaDewi
- **Video Presentasi YouTube:** *(tambahkan link setelah upload)*

---

© 2026 E-Library — Amelia Nurmala Dewi
