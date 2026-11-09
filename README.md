# RuangPinjam

Aplikasi web untuk mengelola peminjaman alat dan ruang sekolah. Dibuat dengan TypeScript dan Vite.

## Fitur

- Ringkasan inventaris, peminjaman aktif, dan keterlambatan.
- Pencatatan peminjaman dengan nama atau secara samaran.
- Tanggal pinjam dan tanggal kembali.
- Pencegahan peminjaman ganda selama barang belum dikembalikan.
- Deteksi keterlambatan berdasarkan tanggal kembali.
- Pencatatan pengembalian, riwayat, pencarian, dan filter status.
- Data peminjaman tersimpan di `localStorage` browser.

## Persyaratan

- Node.js versi 20.19+ atau 22.12+.
- npm.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal.

## Build produksi

```bash
npm run build
npm run preview
```

Hasil build tersedia di folder `dist`.

## Penggunaan

1. Pilih **Buat peminjaman**.
2. Pilih barang atau ruang yang tersedia.
3. Pilih identitas dengan nama atau **Samaran**.
4. Isi tanggal pinjam dan tanggal kembali, lalu simpan.
5. Di halaman **Peminjaman**, gunakan tombol centang untuk menandai barang telah dikembalikan.

Status berubah menjadi **Terlambat** jika tanggal kembali telah lewat dan barang belum dikembalikan. Barang yang masih dipinjam tidak tersedia untuk peminjaman baru.

## Penyimpanan data

Data disimpan secara lokal di browser pada key `ruang-pinjam-records`. Data tidak disinkronkan antarperangkat atau antarbrowser. Menghapus data situs/browser akan menghapus catatan peminjaman tersebut.
