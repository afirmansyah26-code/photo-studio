# SECURITY.md

# Security Guidelines

## Photo Studio

Version: 1.0

Status: Draft

---

# 1. Purpose

Dokumen ini mendefinisikan kebijakan keamanan Photo Studio.

Tujuan utama:

- Melindungi privasi pengguna.
- Menjaga integritas aplikasi.
- Mengurangi risiko keamanan pada aplikasi client-side.
- Menjadi pedoman implementasi bagi developer dan AI Agent.

---

# 2. Security Philosophy

Photo Studio mengutamakan prinsip:

- Privacy First
- Client-side First
- Least Privilege
- Secure by Default
- Minimal Attack Surface

---

# 3. Security Goals

Target keamanan:

- Tidak mengirim foto pengguna ke server.
- Tidak menyimpan foto secara permanen.
- Tidak memerlukan akun.
- Tidak mengumpulkan data pribadi.
- Tidak bergantung pada layanan eksternal untuk pemrosesan gambar.

---

# 4. Threat Model

Ancaman yang dipertimbangkan:

- File dengan format tidak valid.
- File berukuran sangat besar yang dapat menghabiskan memori.
- Dependency yang rentan.
- Kebocoran memori akibat Blob atau Canvas.
- Penggunaan API browser yang tidak aman.
- Modifikasi kode oleh pihak ketiga setelah deployment.

Karena tidak ada backend, ancaman seperti SQL Injection atau autentikasi tidak menjadi ruang lingkup aplikasi ini.

---

# 5. Privacy Policy (Technical)

Foto pengguna:

- Diproses sepenuhnya di browser.
- Tidak dikirim ke server.
- Tidak disimpan setelah sesi berakhir kecuali pengguna mengunduh hasilnya.
- Tidak dipakai untuk pelatihan model AI.
- Tidak dibagikan ke pihak ketiga.

---

# 6. Client-side Processing Rules

Wajib:

- Crop di browser.
- Resize di browser.
- Compress di browser.
- Export di browser.

Tidak diperbolehkan:

- Upload foto untuk diproses.
- Memanggil API pihak ketiga untuk manipulasi gambar.

---

# 7. File Validation

Sebelum diproses:

- Validasi MIME Type.
- Validasi ekstensi.
- Validasi ukuran file.
- Validasi apakah file benar-benar dapat didekode sebagai gambar.

File yang gagal validasi harus ditolak dengan pesan yang jelas.

---

# 8. Supported File Types

V1:

- JPEG
- PNG
- WEBP

Format lain ditolak hingga ada dukungan resmi.

---

# 9. File Size Limits

Tetapkan batas ukuran masukan yang wajar untuk menjaga pengalaman pengguna.

Jika file melebihi batas:

- tampilkan pesan yang informatif
- jangan memulai proses

Nilai batas dapat disesuaikan berdasarkan hasil pengujian performa.

---

# 10. Dependency Security

Dependency baru harus:

- memiliki lisensi yang sesuai
- aktif dipelihara
- memiliki komunitas yang baik
- seminimal mungkin

Hindari dependency yang hanya menggantikan kemampuan Browser API.

---

# 11. Supply Chain Security

Sebelum menambahkan package:

- periksa kebutuhan sebenarnya
- periksa riwayat pemeliharaan
- periksa lisensi
- periksa ukuran paket

Lakukan pembaruan dependency secara berkala.

---

# 12. Memory Safety

Setelah selesai digunakan:

- panggil `URL.revokeObjectURL()` untuk Object URL
- lepaskan referensi ImageBitmap jika sudah tidak diperlukan
- bersihkan Canvas sementara
- hindari menyimpan Blob lebih lama dari yang diperlukan

---

# 13. Canvas Security

Canvas hanya digunakan untuk pemrosesan lokal.

Tidak digunakan untuk:

- fingerprinting
- tracking
- penyimpanan data tersembunyi

---

# 14. PWA Security

PWA harus:

- menggunakan HTTPS saat dipublikasikan
- memiliki Service Worker yang hanya menangani aset aplikasi
- tidak menyimpan foto pengguna di cache aplikasi

---

# 15. Content Security

Disarankan menggunakan Content Security Policy (CSP) yang ketat.

Contoh kebijakan:

- batasi sumber script
- batasi sumber style
- batasi koneksi jaringan hanya jika memang diperlukan

Kebijakan final disesuaikan dengan kebutuhan deployment.

---

# 16. Browser Permissions

Photo Studio tidak meminta izin yang tidak diperlukan.

Tidak menggunakan:

- Kamera (V1)
- Mikrofon
- Lokasi
- Bluetooth
- Clipboard tanpa aksi pengguna

---

# 17. Error Handling

Jangan menampilkan:

- stack trace
- informasi internal
- jalur file
- detail implementasi

Tampilkan pesan yang mudah dipahami pengguna.

---

# 18. Logging Policy

Mode produksi:

- tidak menggunakan `console.log`
- tidak mencatat data gambar pengguna

Jika diperlukan logging untuk debugging, gunakan mekanisme yang dapat dinonaktifkan sebelum rilis.

---

# 19. Secure Coding Rules

Tidak diperbolehkan:

- `eval`
- `new Function`
- eksekusi kode dinamis
- penyisipan HTML yang tidak tervalidasi
- penggunaan `dangerouslySetInnerHTML` tanpa alasan yang sangat kuat

---

# 20. Local Storage Policy

Hanya simpan data yang tidak sensitif.

Contoh:

- tema terang/gelap
- preferensi antarmuka

Jangan menyimpan:

- foto
- Blob
- data gambar

---

# 21. Third-party Services

Versi 1 tidak menggunakan:

- Analytics
- Telemetry
- Error Reporting
- Cloud Image Processing

Jika di masa depan ditambahkan, harus bersifat opsional dan didokumentasikan.

---

# 22. Release Checklist

Sebelum rilis:

- Periksa dependency.
- Jalankan lint dan type checking.
- Tinjau konfigurasi PWA.
- Pastikan tidak ada endpoint yang tidak digunakan.
- Pastikan seluruh proses tetap client-side.

---

# 23. Security Testing

Pengujian meliputi:

- File tidak valid.
- File rusak.
- File berukuran besar.
- Browser tanpa OffscreenCanvas.
- Browser dengan fitur terbatas.
- Penggunaan memori berulang.

---

# 24. Incident Response

Jika ditemukan masalah keamanan:

1. Identifikasi dampak.
2. Reproduksi masalah.
3. Perbaiki pada cabang terpisah.
4. Tinjau perubahan.
5. Perbarui dokumentasi.
6. Rilis versi perbaikan.

---

# 25. Future Security

Version 2

- Pemeriksaan kualitas gambar.
- Validasi batch.

Version 3

- Face Detection client-side.
- Pemeriksaan posisi wajah.

Version 4

- Background Replacement.
- Validasi hasil segmentasi.

Semua fitur tetap mengikuti prinsip **100% client-side processing**.

---

# 26. Security Checklist

Sebelum fitur dianggap selesai:

- Tidak mengirim data gambar ke server.
- Tidak menyimpan foto secara permanen.
- Validasi masukan dilakukan.
- Tidak menambah dependency tanpa evaluasi.
- Tidak menambah izin browser yang tidak diperlukan.
- Tidak memperluas attack surface aplikasi.

---

# 27. Definition of Security Success

Keamanan dianggap memenuhi target apabila:

- Seluruh manipulasi gambar dilakukan di browser.
- Privasi pengguna tetap terjaga.
- Tidak ada backend untuk pemrosesan gambar.
- Tidak ada kebocoran data melalui log, cache, atau penyimpanan lokal.
- Dependency tetap terkendali dan terawat.
