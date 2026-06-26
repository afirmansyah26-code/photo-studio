# PERFORMANCE.md

# Performance Guidelines

## Photo Studio

Version: 1.0

Status: Draft

---

# 1. Purpose

Dokumen ini mendefinisikan target performa dan strategi optimasi Photo Studio.

Seluruh implementasi harus mempertimbangkan:

- kecepatan
- efisiensi memori
- responsivitas
- ukuran bundle
- pengalaman pengguna

---

# 2. Performance Philosophy

Prioritas utama:

1. Responsif saat digunakan.
2. Pemrosesan gambar efisien.
3. Penggunaan memori terkendali.
4. Bundle aplikasi tetap ringan.
5. Seluruh proses tetap client-side.

---

# 3. Performance Goals

## Startup

Aplikasi harus dapat digunakan segera setelah halaman selesai dimuat.

---

## Responsiveness

Interaksi pengguna seperti drag, zoom, dan rotasi harus terasa mulus tanpa jeda yang mengganggu.

---

## Memory Efficiency

Penggunaan memori harus dijaga agar tidak terus meningkat selama sesi penggunaan.

---

## CPU Usage

Operasi berat dipindahkan ke Web Worker bila memungkinkan.

---

# 4. Target Metrics

| Target                   | Value                                |
| ------------------------ | ------------------------------------ |
| Client-side Processing   | 100%                                 |
| Backend Processing       | 0%                                   |
| Database                 | None                                 |
| First Contentful Paint   | < 2 s (koneksi dan perangkat modern) |
| Lighthouse Performance   | > 95                                 |
| Cumulative Layout Shift  | < 0.1                                |
| Largest Contentful Paint | < 2.5 s                              |
| Offline Support          | Yes                                  |

Target diukur pada kondisi yang wajar dan dapat berubah sesuai kebutuhan proyek.

---

# 5. Bundle Strategy

Target:

- Bundle awal sekecil mungkin.
- Fitur berat dimuat secara dinamis.
- Hindari dependency yang tidak diperlukan.

Gunakan:

- Code Splitting
- Dynamic Import
- Tree Shaking

---

# 6. Rendering Strategy

Komponen hanya dirender ulang apabila diperlukan.

Gunakan:

- React memo bila memberikan manfaat nyata.
- Memoization untuk perhitungan mahal.
- Pemisahan komponen berdasarkan tanggung jawab.

Optimasi dilakukan berdasarkan hasil pengukuran, bukan sekadar asumsi.

---

# 7. Image Loading

Strategi:

- Decode sekali.
- Hindari decode ulang.
- Gunakan representasi gambar yang paling sesuai untuk tahap pemrosesan.

---

# 8. Image Pipeline Performance

Pipeline:

```text
Decode

↓

Normalize

↓

Crop

↓

Rotate

↓

Resize

↓

Compress

↓

Export
```

Setiap tahap hanya bekerja pada data yang diperlukan.

---

# 9. Canvas Performance

Gunakan:

- Reuse Canvas bila memungkinkan.
- Hindari membuat Canvas baru tanpa alasan.
- Bersihkan Canvas setelah selesai.

Gunakan OffscreenCanvas bila browser mendukung.

---

# 10. Memory Management

Setiap modul wajib:

- menghapus Object URL
- membebaskan ImageBitmap
- membersihkan Canvas sementara
- menghindari salinan gambar yang tidak perlu

Target:

Tidak ada kebocoran memori yang terus meningkat selama penggunaan normal.

---

# 11. Web Worker Strategy

Worker digunakan untuk:

- Resize
- Compression
- Face Detection (V3)
- Background Processing (V4)

UI tetap berjalan di Main Thread.

---

# 12. Lazy Loading

Komponen yang tidak dibutuhkan saat awal dimuat harus diimpor secara dinamis.

Contoh:

- Batch Processing
- AI Module
- Background Replacement

---

# 13. React Performance

Hindari:

- Props yang berubah tanpa kebutuhan.
- State yang terlalu besar.
- Render berantai.

Pisahkan state UI dan state pemrosesan gambar.

---

# 14. Resize Strategy

Urutan yang direkomendasikan:

1. Crop
2. Rotate
3. Resize
4. Compress

Hal ini mengurangi jumlah piksel yang diproses pada tahap kompresi.

---

# 15. Compression Strategy

Target:

- Kualitas visual tetap baik.
- Ukuran file efisien.

Strategi:

- Resize terlebih dahulu.
- Baru melakukan kompresi.

---

# 16. File Size Guidelines

Ukuran masukan yang besar harus diproses secara bertahap.

Jika memungkinkan:

- tampilkan indikator proses
- jangan membekukan antarmuka pengguna

---

# 17. DOM Performance

Hindari:

- DOM yang terlalu dalam
- Render elemen yang tidak terlihat
- Reflow yang tidak diperlukan

---

# 18. Animation Performance

Gunakan animasi sederhana.

Target:

- terasa halus
- tidak mengganggu pekerjaan
- tidak memengaruhi manipulasi gambar

Gunakan transform dan opacity bila sesuai.

---

# 19. Accessibility Performance

Animasi harus menghormati preferensi pengguna yang mengurangi gerakan (reduced motion).

---

# 20. Browser Compatibility

Optimasi harus tetap bekerja pada browser modern.

Jika suatu API tidak tersedia:

- gunakan fallback
- jangan menyebabkan aplikasi gagal dijalankan

---

# 21. Future Performance Strategy

Version 2

- Batch Queue Optimization
- Thumbnail Cache

Version 3

- Worker Pool
- Face Detection Worker

Version 4

- Background Segmentation Worker
- Progressive Processing

---

# 22. Performance Monitoring

Selama pengembangan lakukan pengukuran berkala terhadap:

- ukuran bundle
- waktu build
- waktu render
- waktu pemrosesan gambar
- penggunaan memori
- waktu ekspor

Hasil pengukuran menjadi dasar optimasi berikutnya.

---

# 23. Dependency Policy

Dependency baru hanya boleh ditambahkan apabila:

- memberikan manfaat nyata
- tidak memperbesar bundle secara signifikan
- tidak dapat digantikan Browser API

---

# 24. Performance Anti-Patterns

Tidak diperbolehkan:

- memproses gambar di React Component
- decode gambar berulang
- membuat banyak Canvas tanpa kebutuhan
- menyimpan Blob yang tidak digunakan
- render ulang seluruh workspace karena perubahan kecil

---

# 25. Performance Checklist

Sebelum fitur dianggap selesai:

- Tidak menyebabkan kebocoran memori.
- Tidak menurunkan responsivitas antarmuka.
- Tidak menambah dependency tanpa alasan.
- Bundle tetap efisien.
- Proses berat berjalan di Worker bila sesuai.
- Pipeline tetap 100% client-side.

---

# 26. Definition of Performance Success

Performa dianggap memenuhi target apabila:

- Aplikasi terasa responsif selama penggunaan normal.
- Pemrosesan gambar tidak membekukan antarmuka untuk waktu yang lama.
- Penggunaan memori tetap stabil sepanjang sesi.
- Bundle tetap terkendali.
- Seluruh proses berlangsung di browser tanpa ketergantungan pada backend.
