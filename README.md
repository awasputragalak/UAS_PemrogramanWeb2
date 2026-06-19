# E-Inventory SPA (Single Page Application)

Proyek ini adalah sistem manajemen inventaris berbasis **Single Page Application (SPA)** yang mengimplementasikan pemisahan arsitektur secara penuh antara *Backend* (REST API) dan *Frontend* (Antarmuka Pengguna).

Dikembangkan sebagai pemenuhan Tugas Akhir Semester (UAS).

**Nama:** Abdi Putra Perdana

**NIM:** 312410426

**Kelas:** I241C

---

## Tech Stack & Architecture

Aplikasi ini dibangun menggunakan arsitektur modern yang memisahkan *logic* server dengan antarmuka klien:

* **Backend (REST API):** CodeIgniter 4 (PHP)
* **Database:** MySQL (Relasional dengan minimal 3 tabel: `barang`, `kategori`, `supplier`)
* **Frontend SPA:** VueJS 3 & Vue Router
* **HTTP Client:** Axios (Dilengkapi Request/Response Interceptors)
* **UI/UX Framework:** TailwindCSS (Utility-First Design)

---

## Fitur Utama

1.  **Keamanan API (Otentikasi Token):** Melindungi rute data menggunakan token yang di-generate oleh CodeIgniter dan disimpan di `localStorage` pada sisi klien.
2.  **Navigation Guards:** Vue Router mencegat akses ilegal ke halaman dasbor (Panel Admin) jika pengguna belum melakukan login.
3.  **Axios Interceptors:** Otomatis menyuntikkan *Header Authorization* pada setiap *request* dan menangkap *Error 401 Unauthorized* secara global untuk menendang pengguna kembali ke halaman login.
4.  **Operasi CRUD Asynchronous:** Pembaruan data inventaris secara *real-time* tanpa perlu memuat ulang (*refresh*) browser.
5.  **Desain Responsif:** Antarmuka modern dan interaktif (termasuk *Modal Box*) yang dibangun murni menggunakan TailwindCSS.

---

## Lampiran Bukti Eksekusi (Screenshots)

Berikut adalah bukti dokumentasi bahwa sistem berjalan sesuai dengan spesifikasi yang diminta:

### 1. Relasi Database (Minimal 3 Tabel)
<img width="1534" height="879" alt="relasi tabel" src="https://github.com/user-attachments/assets/dd01ec24-7912-4e4c-95ea-dfdd6633d7b3" />


### 2. Bukti Keamanan API (Error 401 di Postman)
<img width="1919" height="1005" alt="err401auth" src="https://github.com/user-attachments/assets/06d0afeb-df22-452f-8965-26a820279e5f" />


### 3. Antarmuka SPA & CRUD (TailwindCSS)
<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/2de35274-6616-4eb1-83e0-04cc6e88ca7c" />


---

## Cara Instalasi & Menjalankan Aplikasi

1.  *Clone* atau salin direktori proyek ini ke dalam folder `htdocs` pada XAMPP Anda.
2.  Import file database `uas_inventory.sql` ke dalam MySQL melalui phpMyAdmin.
3.  Pastikan modul Apache dan MySQL sudah berjalan di XAMPP Control Panel.
4.  Buka web browser dan akses *Frontend* melalui: `http://localhost/UAS_WEB2_312410426/frontend_spa/`
5.  Gunakan kredensial berikut untuk masuk ke panel admin:
    * **Email:** admin@email.com
    * **Password:** admin123

---

**Link Demo:**

**Link Video Presentasi:**
