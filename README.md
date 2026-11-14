# Manajemen Produk (React)

Tugas 3 Pemrograman Web: antarmuka React untuk mengelola produk (lihat, cari, tambah, ubah, hapus) yang terhubung ke API CRUD produk dari Tugas 2.

- Nama: Dian Piramidiana Rachmatika
- NRP: 5027251031

## Tech Stack

- React + TypeScript
- Vite
- Backend: [pweb-minggu10-products-prisma](https://github.com/Piramidiana/pweb-minggu10-products-prisma) (Express 5, Prisma 7, Neon PostgreSQL)

## Fitur

- Daftar produk berbentuk kartu (ID, nama, harga berformat Rupiah)
- Pencarian produk berdasarkan nama, tanpa membedakan huruf besar dan kecil
- Pop-up Tambah Produk dengan validasi (nama wajib diisi, harga bilangan bulat lebih dari 0)
- Pop-up Edit Produk dengan data terisi dari produk yang dipilih
- Pop-up Hapus Produk dengan konfirmasi sebelum data dihapus
- Pesan error dari backend ditampilkan di dalam pop-up

## Cara Menjalankan

Frontend memanggil `/products`, lalu Vite meneruskannya ke backend di `http://localhost:3000` (pengaturan `server.proxy` pada `vite.config.ts`). Karena itu backend harus berjalan lebih dulu.

1. Jalankan backend Tugas 2 pada port 3000:

```bash
git clone https://github.com/Piramidiana/pweb-minggu10-products-prisma.git
cd pweb-minggu10-products-prisma
npm install
cp .env.example .env
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
npm run dev
```

Isi `DATABASE_URL` dan `DATABASE_URL_UNPOOLED` pada `.env` dengan connection string Neon milik sendiri.

2. Jalankan frontend di terminal lain:

```bash
git clone https://github.com/Piramidiana/pweb-minggu11-products-react.git
cd pweb-minggu11-products-react
npm install
npm run dev
```

3. Buka `http://localhost:5173`.

## Struktur Folder

```
src/
  api/
    products.ts
  components/
    ConfirmDeleteModal.tsx
    Modal.tsx
    ProductCard.tsx
    ProductFormModal.tsx
    ProductList.tsx
    SearchBar.tsx
  types/
    product.ts
  utils/
    format-price.ts
  App.tsx
  App.css
  index.css
  main.tsx
```

## Hubungan dengan API Tugas 2

| Aksi di antarmuka | Request ke backend |
|---|---|
| Membuka halaman | `GET /products` |
| Simpan Produk | `POST /products` dengan body `{ name, price }` |
| Simpan Perubahan | `PUT /products` dengan body `{ id, name, price }` |
| Hapus Produk | `DELETE /products/:id` |

## Pengujian

Pengujian manual di browser dengan backend Tugas 2 yang terhubung ke database Neon.

| No | Skenario | Hasil yang Diharapkan | Hasil Aktual | Bukti |
|---|---|---|---|---|
| 1 | Membuka halaman | Semua produk dari database tampil sebagai kartu dengan harga berformat Rupiah | Sesuai | ![Daftar produk](docs/images/01-daftar-produk.png) |
| 2 | Mengetik `pul` pada kolom cari | Hanya produk yang namanya mengandung "pul" tampil, footer menyesuaikan | Sesuai | ![Pencarian](docs/images/02-pencarian.png) |
| 3 | Menyimpan form tambah dengan harga tidak valid | Pesan validasi muncul, data tidak dikirim | Sesuai | ![Validasi tambah](docs/images/03-validasi-tambah.png) |
| 4 | Menyimpan form tambah dengan data valid | Pop-up tertutup, kartu produk baru muncul | Sesuai | ![Tambah sukses](docs/images/04-tambah-sukses.png) |
| 5 | Menekan Edit pada sebuah produk | Pop-up terbuka dengan ID dan data produk terisi | Sesuai | ![Modal edit](docs/images/05-modal-edit.png) |
| 6 | Menyimpan perubahan | Kartu produk menampilkan data terbaru | Sesuai | ![Edit sukses](docs/images/06-edit-sukses.png) |
| 7 | Menekan Hapus pada sebuah produk | Pop-up konfirmasi menampilkan produk yang akan dihapus | Sesuai | ![Modal hapus](docs/images/07-modal-hapus.png) |
| 8 | Mengonfirmasi hapus lalu memuat ulang halaman | Produk hilang dan tetap hilang setelah halaman dimuat ulang | Sesuai | ![Hapus sukses](docs/images/08-hapus-sukses.png) |

## Format Commit

Commit mengikuti format `type(tugas-3): deskripsi` dan dibuat atomic, satu fitur untuk satu commit.
