# DEPLOYMENT.md

# Deployment Guide

## Photo Studio

Version: 1.0

Status: Draft

---

# 1. Purpose

Dokumen ini menjelaskan strategi deployment Photo Studio.

Target utama:

- Mudah di-deploy
- Tidak memerlukan backend
- Tidak memerlukan database
- Dapat berjalan pada berbagai lingkungan hosting

---

# 2. Deployment Philosophy

Photo Studio dirancang sebagai aplikasi **Static First**.

Seluruh proses dilakukan di browser.

Server hanya bertugas:

- menyajikan file HTML
- menyajikan JavaScript
- menyajikan CSS
- menyajikan aset statis

Server **tidak** memproses gambar pengguna.

---

# 3. Supported Deployment Targets

Photo Studio harus dapat dijalankan pada:

- Shared Hosting
- NAS (ZimaOS)
- Nginx
- Apache
- Static Hosting
- Docker
- VPS
- CDN

Deployment tidak bergantung pada platform tertentu.

---

# 4. Runtime Requirements

Server hanya membutuhkan kemampuan untuk menyajikan file statis.

Tidak diperlukan:

- Database
- Redis
- PHP
- Node.js saat runtime (jika menggunakan static export)
- Image Processing Server

---

# 5. Build Strategy

Mode produksi menggunakan **Static Export** apabila seluruh fitur tetap client-side.

Hasil build berupa:

- HTML
- CSS
- JavaScript
- Manifest
- Service Worker
- Static Assets

---

# 6. Directory Structure

Contoh hasil build:

```text
out/

index.html

assets/

manifest.json

icons/

sw.js
```

Direktori dapat disalin langsung ke document root web server.

---

# 7. Shared Hosting Deployment

Langkah umum:

1. Build aplikasi.
2. Hasilkan static export.
3. Unggah isi folder hasil build ke public_html atau direktori tujuan.
4. Pastikan HTTPS aktif.
5. Verifikasi PWA dan fungsi offline.

Tidak diperlukan proses build di server.

---

# 8. NAS Deployment (ZimaOS)

Target:

- RAM sekitar 2 GB
- CPU hemat daya
- Penyimpanan SSD

Strategi:

- Jalankan aplikasi sebagai situs statis.
- Gunakan reverse proxy bila diperlukan.
- Aktifkan kompresi HTTP (gzip atau Brotli jika tersedia).
- Pastikan cache aset statis dikonfigurasi dengan benar.

---

# 9. Docker Deployment

Gunakan image ringan yang hanya menyajikan file statis.

Contoh alur:

```text
Build

↓

Static Files

↓

Web Server Container

↓

Browser
```

Container tidak memerlukan proses image processing.

---

# 10. Apache Configuration

Pastikan:

- HTTPS aktif.
- MIME type benar.
- Kompresi HTTP aktif bila tersedia.
- Cache-Control untuk aset statis dikonfigurasi.

---

# 11. Nginx Configuration

Disarankan:

- gzip atau Brotli
- Cache-Control
- HTTPS
- HTTP/2 atau HTTP/3 bila tersedia

---

# 12. HTTPS

Produksi wajib menggunakan HTTPS.

Alasan:

- PWA membutuhkan HTTPS.
- Service Worker memerlukan HTTPS (kecuali localhost).
- Meningkatkan keamanan pengguna.

---

# 13. Caching Strategy

Cache jangka panjang untuk:

- JavaScript
- CSS
- Font
- Icon

HTML menggunakan strategi cache yang lebih konservatif agar pembaruan aplikasi cepat diterima.

---

# 14. PWA Deployment

Pastikan tersedia:

- manifest.webmanifest
- Service Worker
- Ikon aplikasi
- Halaman offline (bila diterapkan)

Service Worker hanya meng-cache aset aplikasi, bukan foto pengguna.

---

# 15. Environment Variables

Versi 1 tidak memerlukan environment variable untuk fitur inti.

Jika suatu saat diperlukan (misalnya analytics opsional), dokumentasikan secara terpisah.

---

# 16. Update Strategy

Versi baru:

1. Build ulang.
2. Ganti aset statis.
3. Biarkan Service Worker memperbarui cache sesuai strategi yang dipilih.
4. Verifikasi versi aplikasi.

---

# 17. Rollback Strategy

Simpan minimal satu versi build sebelumnya.

Jika terjadi masalah:

- kembalikan folder build sebelumnya
- bersihkan cache aplikasi bila diperlukan
- verifikasi Service Worker

---

# 18. Browser Cache

Gunakan penamaan aset berbasis hash agar perubahan file dikenali browser.

HTML tidak disarankan menggunakan cache jangka panjang.

---

# 19. Build Verification

Sebelum deployment:

- Build berhasil tanpa error.
- Type checking lulus.
- Lint lulus.
- PWA tervalidasi.
- Seluruh fungsi utama berjalan tanpa backend.

---

# 20. Monitoring

Yang dipantau:

- ukuran bundle
- waktu build
- ukuran hasil build
- kompatibilitas browser
- status PWA

Tidak ada pemantauan terhadap data gambar pengguna.

---

# 21. Backup Strategy

Karena tidak ada database:

Backup hanya mencakup:

- source code
- dokumentasi
- hasil build (opsional)

Tidak ada data pengguna yang perlu dicadangkan.

---

# 22. Disaster Recovery

Jika server gagal:

1. Siapkan server baru.
2. Salin hasil build atau lakukan build ulang.
3. Aktifkan HTTPS.
4. Verifikasi fungsi aplikasi.

Tidak diperlukan proses migrasi database.

---

# 23. Security Checklist

Sebelum produksi:

- HTTPS aktif.
- Header keamanan dikonfigurasi bila memungkinkan.
- Dependency telah ditinjau.
- Tidak ada endpoint backend yang tidak digunakan.
- Service Worker hanya meng-cache aset aplikasi.

---

# 24. Deployment Checklist

Sebelum rilis:

- Build sukses.
- Type checking sukses.
- Lint sukses.
- Static export berhasil.
- PWA berfungsi.
- Dark mode berfungsi.
- Offline mode diverifikasi.
- Semua proses tetap client-side.

---

# 25. Future Deployment

Version 2

- Batch Processing

Version 3

- AI Face Detection

Version 4

- Background Replacement

Semua fitur baru harus tetap dapat dijalankan pada deployment statis tanpa memerlukan backend untuk pemrosesan gambar.

---

# 26. Definition of Deployment Success

Deployment dianggap berhasil apabila:

- Aplikasi dapat dijalankan pada shared hosting, NAS, atau web server statis tanpa konfigurasi khusus.
- Tidak memerlukan database maupun layanan backend.
- Seluruh fitur utama tetap berjalan setelah deployment.
- PWA dapat diinstal dan berfungsi sesuai rancangan.
- Seluruh proses pengolahan gambar tetap berlangsung di browser pengguna.
