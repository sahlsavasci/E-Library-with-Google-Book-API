# E-Library

E-Library adalah aplikasi web manajemen katalog buku yang dibangun dengan Laravel, React, Inertia.js, dan Tailwind CSS. Aplikasi ini membantu pengguna mengelola koleksi buku digital melalui dashboard yang rapi, fitur CRUD, pencarian, pagination, serta integrasi Google Books untuk mempercepat input data.

## Gambaran Singkat

Project ini berfokus pada kebutuhan **Library Management System**, yaitu pengelolaan data buku dalam satu sistem web. Pengguna dapat:

- masuk ke aplikasi melalui sistem autentikasi Laravel
- melihat ringkasan katalog di dashboard
- menambahkan, mengedit, melihat, dan menghapus buku
- mencari buku dari database
- mengimpor metadata buku dari Google Books API
- menampilkan cover buku di katalog dan halaman detail

Project ini cocok untuk:

- pembelajaran fullstack Laravel + React
- portfolio web development
- demo aplikasi katalog perpustakaan digital

## Fitur Utama

- **Autentikasi pengguna**
  Login, register, verifikasi email, lupa password, dan pengelolaan sesi.

- **Dashboard ringkas**
  Menampilkan total buku, jumlah buku dari Google Books, buku yang ditambahkan tahun ini, dan daftar buku terbaru.

- **Manajemen buku (CRUD)**
  Pengguna dapat membuat, membaca, memperbarui, dan menghapus data buku.

- **Pencarian buku**
  Pencarian katalog dilakukan dari database dan terintegrasi dengan pagination.

- **Integrasi Google Books API**
  Pengguna dapat mencari buku dari Google Books lalu mengisi form secara otomatis.

- **Tampilan cover buku**
  Cover buku ditampilkan di card katalog dan halaman detail, lengkap dengan fallback jika cover tidak tersedia.

- **Demo data realistis**
  Tersedia command untuk mengimpor beberapa buku demo nyata dari Google Books.

## Teknologi yang Digunakan

### Backend

- PHP 8.3+
- Laravel 13
- Laravel Fortify
- Inertia Laravel

### Frontend

- React 19
- TypeScript
- Inertia.js
- Tailwind CSS
- Lucide React

### Database

- MySQL atau SQLite

### Tooling

- Vite
- Laravel Pint
- ESLint
- Prettier
- TypeScript Check
- Pest / Laravel Test Tools

## Struktur Fitur Utama

Beberapa bagian penting project:

- [`app/Http/Controllers`](/Users/mm/Herd/E-Library/app/Http/Controllers)
  Controller untuk dashboard, buku, dan alur request utama.

- [`app/Services/GoogleBooksService.php`](/Users/mm/Herd/E-Library/app/Services/GoogleBooksService.php)
  Service untuk komunikasi dengan Google Books API.

- [`resources/js/pages`](/Users/mm/Herd/E-Library/resources/js/pages)
  Halaman React untuk welcome, auth, dashboard, dan modul buku.

- [`resources/js/components`](/Users/mm/Herd/E-Library/resources/js/components)
  Komponen UI seperti sidebar, form buku, book card, dan search bar.

- [`database/seeders`](/Users/mm/Herd/E-Library/database/seeders)
  Seeder untuk development.

- [`routes/web.php`](/Users/mm/Herd/E-Library/routes/web.php)
  Route web utama aplikasi.

- [`routes/console.php`](/Users/mm/Herd/E-Library/routes/console.php)
  Command console, termasuk import demo dari Google Books.

## Cara Menjalankan Project

### 1. Clone dan install dependency

```bash
composer install
npm install
```

### 2. Siapkan environment

```bash
cp .env.example .env
php artisan key:generate
```

Isi koneksi database di file `.env`, lalu jalankan migration:

```bash
php artisan migrate
```

### 3. Jalankan project

Backend:

```bash
php artisan serve
```

Frontend:

```bash
npm run dev
```

Atau gunakan script composer jika kamu ingin menjalankan workflow bawaan project:

```bash
composer run dev
```

## Konfigurasi Google Books API

Tambahkan API key Google Books ke file `.env`:

```env
GOOGLE_BOOKS_BASE_URL=https://www.googleapis.com/books/v1
GOOGLE_BOOKS_API_KEY=your_api_key_here
```

Lalu bersihkan config cache:

```bash
php artisan config:clear
```

## Import Data Demo dari Google Books

Untuk mengisi katalog demo dengan data buku yang lebih realistis:

```bash
php artisan books:demo-google
```

Untuk membersihkan data buku aktif lalu mengisi ulang:

```bash
php artisan books:demo-google --fresh
```

Untuk memilih user tertentu sebagai pemilik data demo:

```bash
php artisan books:demo-google --user=test@example.com
```

## Seeder Development

Seeder sample books tidak lagi aktif otomatis.

Jika ingin mengaktifkan sample books dari seeder, tambahkan ke `.env`:

```env
SEED_SAMPLE_BOOKS=true
SEED_SAMPLE_BOOKS_COUNT=15
```

Jika tidak dibutuhkan, biarkan:

```env
SEED_SAMPLE_BOOKS=false
```

## Quality Check

Beberapa command yang berguna sebelum demo atau push ke repository:

```bash
npm run types:check
npm run lint:check
npm run format:check
php artisan test
```

## Status Project

Saat ini project sudah mencakup MVP yang kuat untuk demo:

- autentikasi
- dashboard
- CRUD buku
- pencarian dan pagination
- integrasi Google Books
- empty state yang rapi
- UI yang lebih konsisten untuk presentasi

## Pengembangan Selanjutnya

Beberapa fitur yang bisa menjadi tahap berikutnya:

- kategori / genre buku
- peminjaman dan pengembalian buku
- role user (admin, staff, member)
- upload cover lokal
- filter lanjutan
- export data
- review dan penguatan test
- deployment production

## Lisensi

Project ini dikembangkan sebagai project pembelajaran dan portfolio berbasis Laravel.
