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

<img width="1365" height="680" alt="Screenshot 2026-06-13 100308" src="https://github.com/user-attachments/assets/27d50a94-bcfc-47a9-b214-c22e08b4fd18" />


**Tabel:**
- `users` — data akun administrator
- `kategori` — data genre/kategori buku
- `buku` — data koleksi buku (berelasi dengan kategori)
- `peminjaman` — data peminjaman buku (berelasi dengan buku)

---

## Screenshot Aplikasi

### Halaman Beranda Publik
<img width="1365" height="679" alt="Screenshot 2026-06-13 095523" src="https://github.com/user-attachments/assets/b3eb27d6-246b-4062-8463-62a6a90c907e" />

### Halaman Login Admin
<img width="1365" height="680" alt="Screenshot 2026-06-13 095236" src="https://github.com/user-attachments/assets/bb64978a-dee7-4da7-8b80-09ea5d8cb6e0" />

### Dashboard Admin
<img width="1364" height="680" alt="Screenshot 2026-06-13 095306" src="https://github.com/user-attachments/assets/db896f09-d999-4ed8-afd6-1f7838b598af" />

### Halaman Buku
<img width="1365" height="681" alt="Screenshot 2026-06-13 095326" src="https://github.com/user-attachments/assets/438f3a32-f524-4443-b441-3e0b26f61821" />

### Form Modal Tambah/Edit Buku
<img width="1362" height="677" alt="Screenshot 2026-06-13 095343" src="https://github.com/user-attachments/assets/3d4dedab-f1ce-45ce-9c0b-7a98daf3ef89" />
<img width="1360" height="678" alt="Screenshot 2026-06-13 095355" src="https://github.com/user-attachments/assets/5865073f-d32d-449c-beaf-31c20ccda2ef" />

### Halaman Kategori
<img width="1363" height="679" alt="Screenshot 2026-06-13 095441" src="https://github.com/user-attachments/assets/f167677d-6b77-40fe-b34e-d2d19e84bb1c" />

### Halaman Peminjaman
<img width="1364" height="680" alt="Screenshot 2026-06-13 095453" src="https://github.com/user-attachments/assets/d0e8575d-bf98-47fa-be52-c73a7719d7e5" />

### Halaman Hapua Buku
<img width="1355" height="680" alt="Screenshot 2026-06-13 095428" src="https://github.com/user-attachments/assets/756b22d4-cf5b-4d03-a7fe-ae327e48e415" />

### Detail Buku (Halaman Publik)
<img width="1365" height="685" alt="Screenshot 2026-06-13 095535" src="https://github.com/user-attachments/assets/80001db3-da90-4b5a-97ea-fcff964fb73e" />

---

## Uji Coba Proteksi Token (Error 401)

> Endpoint DELETE tanpa Authorization Bearer Token menghasilkan Error 401 Unauthorized

<img width="1365" height="719" alt="Screenshot 2026-06-13 100513" src="https://github.com/user-attachments/assets/2573b1ae-5885-4611-a8ad-a13c85aa613d" />


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
- **Demo Aplikasi:**  [http://elibrary-amelia.site.je/frontend-spa](http://elibrary-amelia.site.je/frontend-spa)

### Akun Login Demo (Administrator)
| Username | Password |
|----------|----------|
| `admin`  | `password` |

### Cara Mencoba Demo
1. Buka link demo di atas — akan langsung tampil halaman **Beranda** publik berisi koleksi buku perpustakaan tanpa perlu login.
2. Klik salah satu cover buku untuk melihat **halaman detail buku** (judul, penulis, penerbit, deskripsi, status stok).
3. Klik tombol **Login Admin** di pojok kanan atas, lalu masuk menggunakan akun demo di atas untuk mengakses panel administrator.
4. Setelah login, akan otomatis masuk ke halaman **Dashboard** dan dapat mengakses menu **Buku**, **Kategori**, dan **Peminjaman** untuk mencoba fitur tambah, edit, dan hapus data.
5. Klik tombol **Keluar** di sidebar untuk logout dan kembali ke halaman Beranda publik.

> **Catatan:** Karena menggunakan hosting gratis, kecepatan server bisa sedikit lebih lambat dibanding hosting berbayar. Jika halaman terasa lambat saat pertama kali dibuka, tunggu beberapa detik atau refresh halaman.

---

© 2026 E-Library — Amelia Nurmala Dewi
