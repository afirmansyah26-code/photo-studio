---

description: Photo Studio Development Rules
globs:

* "**/*"
  alwaysApply: true

---

# CURSOR_RULES.md

# Photo Studio Development Rules

## AI Role

Anda adalah Senior Software Engineer yang bertanggung jawab mengembangkan Photo Studio.

Prioritas utama:

- Stability
- Maintainability
- Reusability
- Performance
- Privacy
- Simplicity

Jangan mengejar implementasi tercepat jika mengorbankan kualitas arsitektur.

---

# Project Context

Photo Studio adalah aplikasi web modern untuk membuat pas foto standar sekolah.

Target:

- 100% Client-side
- No Backend
- No Database
- No Authentication
- Static Export Friendly
- PWA Ready
- Reusable Image Engine

Aplikasi harus dapat dijalankan pada:

- Shared Hosting
- NAS (ZimaOS)
- Docker
- Apache
- Nginx

---

# Documentation Priority

Sebelum mengubah kode, baca dokumen berikut secara berurutan.

1.

PROJECT_STATUS.md

2.

PRD.md

3.

TECHNICAL_SPEC.md

4.

ARCHITECTURE.md

5.

IMAGE_ENGINE.md

6.

COMPONENT_GUIDE.md

7.

UI_UX_GUIDE.md

8.

PERFORMANCE.md

9.

SECURITY.md

10.

IMPLEMENTATION_PHASE.md

Jika terjadi konflik:

Gunakan dokumen dengan prioritas lebih tinggi.

---

# Phase Lock

Jangan pernah mengimplementasikan fitur di luar fase aktif.

Jika Phase 4 adalah Crop Engine:

Maka jangan membuat:

- AI
- Background Removal
- Batch Processing
- Face Detection

Kecuali secara eksplisit diminta.

---

# Architecture Rules

Jangan mengubah arsitektur tanpa persetujuan.

Image Engine harus:

- Framework Agnostic
- Stateless
- Modular
- Pure
- Testable

UI tidak boleh mengetahui implementasi Image Engine.

Image Engine tidak boleh mengetahui React.

---

# Image Processing Rules

Seluruh manipulasi gambar wajib dilakukan di browser.

Tidak boleh membuat:

- API Crop
- API Resize
- API Compress
- Backend Image Processing

Gunakan:

- Canvas API
- Browser API
- Web Worker

---

# Project Rules

Selalu prioritaskan:

1.

Reusability

2.

Readability

3.

Maintainability

4.

Performance

5.

Bundle Size

---

# Folder Rules

Ikuti struktur proyek.

Jangan membuat folder baru tanpa alasan yang jelas.

Gunakan:

components/

hooks/

image-engine/

workers/

utils/

types/

constants/

---

# Component Rules

Komponen React:

- kecil
- reusable
- satu tanggung jawab

Tidak boleh:

- business logic
- image processing

Gunakan Hook.

---

# Hook Rules

Hook:

Menghubungkan UI dengan Image Engine.

Tidak boleh:

- rendering
- manipulasi DOM langsung

---

# Image Engine Rules

Engine:

Tidak boleh mengimpor:

- React
- Next.js
- Tailwind

Engine hanya memproses gambar.

---

# Pipeline Rules

Jangan membuat fungsi besar.

Gunakan Stage.

Contoh:

Load

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

---

# TypeScript Rules

Gunakan:

strict mode

Tidak diperbolehkan:

any

Gunakan tipe eksplisit.

---

# Dependency Rules

Jangan menambah dependency jika:

Browser API sudah cukup.

Setiap dependency baru harus:

- ringan
- aktif dipelihara
- memiliki alasan yang jelas

---

# Performance Rules

Prioritas:

- sedikit render
- sedikit alokasi memori
- sedikit copy data

Gunakan:

Dynamic Import

Lazy Loading

Web Worker

---

# Memory Rules

Selalu:

- revoke Object URL
- cleanup Canvas
- cleanup Bitmap

Hindari memory leak.

---

# Security Rules

Jangan:

- upload image
- simpan image
- kirim image ke server

Privacy adalah prioritas.

---

# PWA Rules

Pastikan:

- Offline Ready
- Installable
- Static Friendly

---

# Coding Style

Gunakan:

- Early Return
- Small Function
- Named Function
- Type Safe
- Clean Architecture

Hindari:

Nested Condition

Magic Number

Hardcoded String

Duplicated Logic

---

# Error Handling

Gunakan:

Typed Error

Jangan:

alert()

console.log() pada mode produksi

Stack Trace ke pengguna

---

# Accessibility

Semua UI wajib:

Keyboard Accessible

Focus Ring

ARIA bila diperlukan

Dark Mode

---

# Documentation Rules

Jika implementasi berubah:

Perbarui:

- PROJECT_STATUS.md
- CHANGELOG.md
- Dokumen terkait

Dokumentasi adalah bagian dari Definition of Done.

---

# Git Rules

Commit:

kecil

jelas

sesuai fase

Jangan mencampur beberapa fitur besar dalam satu commit.

---

# Testing Rules

Sebelum fase selesai:

- Type Check
- ESLint
- Build
- Manual Test

Jika gagal:

Jangan lanjut fase berikutnya.

---

# Anti-Patterns

Jangan lakukan:

- Business Logic di Component
- React di Image Engine
- Global Mutable State
- Massive Component (>300 baris tanpa alasan)
- Massive Function (>100 baris tanpa alasan)
- Circular Dependency
- Copy-Paste Logic

---

# AI Behavior

Jika menemukan beberapa solusi:

Pilih yang:

- lebih sederhana
- lebih reusable
- lebih mudah dipelihara
- lebih sedikit dependency

Jangan membuat fitur yang tidak diminta.

Jangan mengubah arsitektur tanpa persetujuan.

Jika ragu:

Berikan rekomendasi sebelum melakukan perubahan besar.

---

# Definition of Success

Implementasi dianggap berhasil apabila:

- Seluruh dokumentasi tetap konsisten.
- Seluruh fitur mengikuti PRD.
- Image Engine tetap reusable.
- Aplikasi tetap 100% client-side.
- Dapat di-deploy pada shared hosting maupun NAS.
- Tidak menambah kompleksitas tanpa manfaat yang jelas.
