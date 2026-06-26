# PRD.md

# Product Requirements Document

## Photo Studio

Version: 1.0 (Draft)

Status: Planning

---

# 1. Executive Summary

Photo Studio adalah aplikasi web berbasis browser yang dirancang untuk menghasilkan pas foto standar sekolah secara cepat, konsisten, dan sepenuhnya berjalan di sisi klien (100% client-side processing).

Aplikasi ini dikembangkan untuk menghilangkan ketergantungan terhadap aplikasi desktop maupun layanan online yang mengharuskan pengguna mengunggah foto ke server. Seluruh proses dilakukan langsung di browser sehingga lebih cepat, lebih aman, dan lebih mudah di-deploy pada berbagai lingkungan seperti NAS, shared hosting, maupun static hosting.

Selain sebagai aplikasi mandiri, Photo Studio juga menjadi fondasi dari sebuah **Image Engine** yang dapat digunakan kembali oleh aplikasi lain seperti PhotoApp, SISFO, maupun proyek-proyek berikutnya.

---

# 2. Background

Di lingkungan sekolah, pas foto digunakan pada banyak dokumen resmi seperti rapor, buku induk, kartu pelajar, kartu ujian, ijazah, hingga kebutuhan sinkronisasi data pendidikan.

Proses pembuatan pas foto sering kali dilakukan menggunakan aplikasi desktop yang memerlukan instalasi, memiliki ukuran besar, atau membutuhkan keterampilan desain grafis.

Sementara itu, aplikasi berbasis web yang tersedia umumnya mengunggah foto ke server untuk diproses, sehingga menimbulkan beberapa kendala:

- Ketergantungan pada koneksi internet.
- Waktu unggah yang lebih lama.
- Risiko privasi karena foto dikirim ke server.
- Beban komputasi pada server.
- Sulit dijalankan pada shared hosting atau NAS dengan spesifikasi rendah.

Photo Studio hadir untuk mengatasi kendala tersebut dengan memanfaatkan kemampuan browser modern.

---

# 3. Vision

Menyediakan aplikasi pas foto modern yang ringan, cepat, aman, dan mudah digunakan, sekaligus membangun fondasi Image Engine reusable yang dapat digunakan oleh berbagai aplikasi dalam ekosistem sekolah.

---

# 4. Mission

- Menghasilkan pas foto standar sekolah dengan kualitas konsisten.
- Menghilangkan kebutuhan image processing di server.
- Memaksimalkan kemampuan browser modern.
- Menyediakan pengalaman pengguna yang sederhana dan intuitif.
- Menjadi library image processing reusable untuk proyek lain.

---

# 5. Product Goals

## Primary Goals

- Membuat pas foto siap cetak dan siap administrasi sekolah.
- Menjamin seluruh proses dilakukan secara lokal di browser.
- Menghasilkan file JPEG berukuran kecil dengan kualitas yang tetap baik.
- Mendukung berbagai perangkat modern.

## Secondary Goals

- Menjadi fondasi Image Engine.
- Mudah diintegrasikan ke aplikasi lain.
- Mendukung PWA dan penggunaan offline.

---

# 6. Target Users

## Operator Sekolah

Mengolah pas foto siswa untuk kebutuhan administrasi.

## Guru

Membuat pas foto siswa secara mandiri.

## Tata Usaha

Menyiapkan foto untuk rapor, ijazah, dan arsip.

## Orang Tua

Menyiapkan pas foto anak sesuai standar sekolah.

## Pengembang

Menggunakan Image Engine sebagai pustaka reusable pada aplikasi lain.

---

# 7. User Problems

Masalah yang ingin diselesaikan:

- Sulit melakukan crop sesuai standar pas foto.
- Ukuran file terlalu besar.
- Latar belakang tidak seragam.
- Tidak ada panduan posisi wajah.
- Membutuhkan aplikasi desktop.
- Koneksi internet menjadi syarat utama pada aplikasi berbasis server.

---

# 8. Success Metrics

Keberhasilan proyek diukur berdasarkan:

- Seluruh proses berjalan di browser.
- Tidak ada upload foto ke server.
- Foto hasil sesuai ukuran standar.
- Waktu pemrosesan cepat.
- Dapat dijalankan pada perangkat kelas menengah.
- Mudah dipakai oleh pengguna non-teknis.

---

# 9. Product Scope

## Included

- Upload foto
- Drag & Drop
- Crop 3×4
- Zoom
- Rotate
- Live Preview
- Resize otomatis
- Compress otomatis
- Download JPEG
- PWA

## Excluded

- Login
- Database
- Cloud Storage
- Sinkronisasi akun
- Pengolahan gambar di server
- AI generatif

---

# 10. Functional Requirements

## Upload Image

Pengguna dapat memilih atau menyeret file gambar ke area kerja.

Format awal yang didukung:

- JPG
- JPEG
- PNG
- WEBP

---

## Crop

- Aspect ratio terkunci.
- Area crop dapat dipindahkan.
- Mendukung zoom.
- Mendukung rotasi.

---

## Preview

Perubahan terlihat secara langsung tanpa perlu menekan tombol proses.

---

## Resize

Seluruh hasil diekspor menjadi:

600 × 800 piksel.

---

## Compression

Foto otomatis dikompresi dengan target ukuran kurang dari 200 KB, sambil mempertahankan kualitas visual yang layak untuk dokumen sekolah.

---

## Export

Format:

JPEG

---

# 11. Non Functional Requirements

- 100% client-side processing
- Tanpa backend
- Tanpa database
- Responsif
- Offline melalui PWA
- Mudah dipelihara
- Reusable
- Modular

---

# 12. Browser Support

- Chrome
- Edge
- Firefox
- Safari

Versi yang mendukung API browser modern.

---

# 13. Accessibility

- Navigasi keyboard
- Focus indicator yang jelas
- Kontras warna memadai
- Dukungan pembaca layar untuk elemen penting
- Pesan kesalahan yang mudah dipahami

---

# 14. Security

- Tidak mengunggah foto ke server.
- Semua file diproses di browser.
- Tidak menyimpan foto setelah sesi berakhir kecuali pengguna mengunduhnya.
- Tidak menggunakan layanan pihak ketiga untuk pemrosesan gambar.

---

# 15. Future Roadmap

## Version 1

- Upload
- Crop
- Resize
- Compress
- Download

## Version 2

- Safe Face Guide
- Batch Processing
- Undo / Redo
- Keyboard Shortcut

## Version 3

- Face Detection
- Auto Center Face
- Auto Crop

## Version 4

- Background Replacement
- Merah
- Biru
- Putih

---

# 16. Reusable Library Vision

Photo Studio dikembangkan dengan pendekatan modular sehingga seluruh logika pengolahan gambar dipisahkan dari antarmuka pengguna.

Target akhir:

- Image Engine dapat dipublikasikan sebagai package internal.
- UI dapat digunakan secara independen.
- Komponen dapat diintegrasikan ke PhotoApp, SISFO, maupun aplikasi lain tanpa perubahan besar.

---

# 17. Out of Scope

Fitur berikut tidak termasuk dalam ruang lingkup awal:

- Penyimpanan cloud
- Manajemen pengguna
- Sinkronisasi multi-perangkat
- Editor foto umum
- Filter artistik
- AI generatif
- Manajemen album

---

# 18. Acceptance Criteria

Versi 1 dianggap selesai apabila:

- Pengguna dapat mengunggah foto.
- Pengguna dapat melakukan crop dengan rasio tetap.
- Hasil dapat diputar dan diperbesar.
- Preview diperbarui secara langsung.
- Foto diekspor ke JPEG berukuran 600 × 800 piksel.
- Ukuran file hasil berada di bawah target kompresi untuk sebagian besar foto yang sesuai.
- Seluruh proses berjalan tanpa backend.
- Aplikasi dapat dijalankan sebagai PWA.
- Aplikasi dapat di-host pada shared hosting maupun NAS.

---

# 19. Open Questions

- Perlukah preset ukuran lain selain 3×4 (misalnya 2×3 atau 4×6)?
- Apakah kualitas JPEG perlu dapat diatur oleh pengguna?
- Apakah hasil unduhan sebaiknya diberi nama otomatis berdasarkan waktu atau nama file asli?
- Apakah metadata EXIF perlu dipertahankan atau dihapus saat ekspor?
- Bagaimana strategi penanganan foto dengan resolusi sangat besar agar penggunaan memori tetap efisien?

---

# 20. References

Dokumen yang menjadi acuan lanjutan:

- PROJECT_STATUS.md
- TECHNICAL_SPEC.md
- ARCHITECTURE.md
- IMAGE_ENGINE.md
- UI_UX_GUIDE.md
- IMPLEMENTATION_PHASE.md
