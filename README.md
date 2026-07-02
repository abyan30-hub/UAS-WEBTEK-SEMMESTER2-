# 📇 KontakKu - Aplikasi Manajemen Kontak Modern

Proyek ini dibangun untuk memenuhi komponen penilaian **Final Project** mata kuliah **Teknologi Web** di **Universitas Ary Ginanjar**.

---

## 👤 Identitas Mahasiswa
* **Nama:** Fatih El Rayyan
* **NIM:** 2510120005
* **Studi Kasus:** Aplikasi Manajemen Kontak Modern (Full-Stack)

---

## ✨ Fitur Utama Aplikasi
1. **CRUD Data Kontak Komplit:** Menambah, melihat daftar, memperbarui (edit), dan menghapus kontak secara langsung ke database.
2. **Dashboard & Info Real-time:** Menampilkan total jumlah kontak terdaftar secara dinamis pada bagian *badge header*.
3. **Pencarian Pintar (Real-time Search):** Menyaring daftar nama atau nomor HP kontak secara instan saat mengetik di kolom pencarian tanpa perlu me-*refresh* halaman.
4. **Avatar Generator Dinamis:** Secara cerdas menghasilkan inisial profil bulat dengan warna latar belakang estetis unik berdasarkan nama kontak yang didaftarkan.
5. **Layout Responsif (Mobile-First Ready):** Desain modern menggunakan CSS Grid fleksibel yang mendukung tampilan layar desktop, tablet, hingga layar HP/Mobile secara proporsional.

---

## 📂 Struktur Folder Proyek
Struktur folder diorganisir secara rapi dan modular agar mudah dikembangkan:
```text
kontak-app/
├── backend/
│   ├── server.js          # Logika server Express.js & REST API Endpoint
│   ├── database.js        # Konfigurasi, koneksi, & inisialisasi tabel SQLite
│   └── kontak.db          # Berkas database SQLite (Local Storage)
├── frontend/
│   ├── index.html         # Struktur tampilan utama aplikasi
│   ├── style.css          # Desain modern glassmorphism & aturan responsif mobile
│   └── script.js          # Logika Client-Side, Fetch API, & Fitur Search
├── package.json           # Dependensi proyek Node.js
└── README.md              # Dokumentasi proyek
