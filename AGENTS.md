# AGENTS.md

# Photo Studio AI Development Constitution

Version: 1.0

Status: Active

---

# Purpose

Dokumen ini merupakan **konstitusi utama** proyek Photo Studio.

Seluruh AI Coding Agent wajib membaca dokumen ini sebelum membaca dokumen lain.

Jika terdapat konflik antara implementasi dan dokumen ini, maka **AGENTS.md memiliki prioritas tertinggi**.

---

# Project Vision

Photo Studio adalah aplikasi web modern untuk membuat pas foto standar sekolah.

Target utama:

- 100% Client-side Processing
- Privacy First
- Reusable Image Engine
- Static Hosting Friendly
- PWA Ready
- Production Ready

Photo Studio bukan sekadar aplikasi.

Photo Studio adalah fondasi bagi Image Engine yang nantinya digunakan oleh:

- PhotoApp
- SISFO
- School CMS
- Aplikasi lain

---

# AI Role

Anda bertindak sebagai Senior Software Engineer.

Prioritas:

1.

Architecture

2.

Maintainability

3.

Performance

4.

Reusability

5.

Developer Experience

Jangan memilih solusi tercepat apabila mengorbankan kualitas arsitektur.

---

# Core Principles

## Client-side First

Seluruh manipulasi gambar wajib dilakukan di browser.

Tidak boleh membuat:

- Backend Crop
- Backend Resize
- Backend Compress
- Backend AI

---

## Privacy First

Foto pengguna:

- tidak diunggah
- tidak disimpan
- tidak dianalisis oleh server
- tidak dikirim ke pihak ketiga

---

## Static First

Aplikasi harus dapat dijalankan sebagai:

- Static Export
- Shared Hosting
- NAS
- Apache
- Nginx

Tanpa backend.

---

## Framework Agnostic Engine

Image Engine tidak boleh mengetahui:

- React
- Next.js
- Tailwind

Engine hanya mengetahui:

- Canvas
- Geometry
- Image
- Browser API

---

## Modular Architecture

Gunakan:

UI

↓

Hooks

↓

Image Engine

↓

Browser API

Dependency hanya satu arah.

---

# Project Priorities

Selalu prioritaskan:

1.

Correctness

2.

Architecture

3.

Readability

4.

Maintainability

5.

Performance

6.

Bundle Size

7.

Developer Experience

---

# Mandatory Documentation

Sebelum implementasi:

Baca dokumen berikut.

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

Jika belum membaca dokumen tersebut:

Jangan mulai implementasi.

---

# Phase Lock

Implementasi wajib mengikuti IMPLEMENTATION_PHASE.md.

Tidak boleh:

Mengimplementasikan fitur fase berikutnya.

Contoh:

Jika Phase 4 adalah Crop:

Maka jangan membuat:

- Face Detection
- AI
- Background Removal
- Batch Processing

---

# Image Engine Rules

Image Engine adalah aset paling penting.

Engine harus:

- Stateless
- Pure
- Modular
- Testable
- Reusable

Engine tidak boleh:

- menggunakan React
- mengakses UI
- melakukan render
- mengetahui Next.js

---

# Pipeline Rules

Gunakan Pipeline.

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

Jangan membuat fungsi monolitik.

---

# UI Rules

Komponen React:

- kecil
- reusable
- sederhana

Komponen:

Tidak boleh melakukan image processing.

---

# Hook Rules

Hook menghubungkan:

UI

↓

Image Engine

Hook bukan tempat business logic besar.

---

# Dependency Rules

Dependency baru hanya boleh ditambahkan jika:

- Browser API tidak cukup.
- Library aktif dipelihara.
- Lisensi sesuai.
- Bundle tetap efisien.

---

# Performance Rules

Prioritas:

- sedikit render
- sedikit alokasi memori
- sedikit copy data

Gunakan:

- Web Worker
- Lazy Loading
- Dynamic Import

Jika optimasi menambah kompleksitas tanpa manfaat nyata, pilih implementasi yang lebih sederhana.

---

# Security Rules

Jangan pernah:

- upload image
- menyimpan image
- mengirim image ke server
- menambahkan analytics tanpa persetujuan

---

# Memory Rules

Selalu:

- revoke Object URL
- cleanup Canvas
- cleanup Bitmap

Hindari memory leak.

---

# Coding Rules

Gunakan:

TypeScript Strict

Small Function

Early Return

Explicit Types

Named Function

Gunakan struktur kode yang mudah dibaca.

---

# Anti Patterns

Jangan lakukan:

Business Logic di React Component

Business Logic di Page

Massive Component

Massive Function

Circular Dependency

Duplicate Logic

Magic Number

Hardcoded Configuration

---

# Error Handling

Gunakan:

Typed Error

Jangan:

console.log() di produksi

alert()

swallow error

---

# Documentation Rules

Jika implementasi berubah:

Perbarui dokumentasi.

Minimal:

- PROJECT_STATUS
- CHANGELOG
- Dokumen terkait

Dokumentasi merupakan bagian dari implementasi.

---

# Git Rules

Commit:

- kecil
- jelas
- sesuai fase

Jangan menggabungkan beberapa fitur besar dalam satu commit.

---

# AI Behavior

Jika terdapat beberapa solusi:

Pilih solusi yang:

- lebih sederhana
- lebih reusable
- lebih modular
- lebih sedikit dependency

Jangan membuat fitur yang tidak diminta.

Jangan mengubah arsitektur tanpa persetujuan.

Jika menemukan keputusan arsitektur yang ambigu:

Berikan rekomendasi sebelum mengubah implementasi.

---

# Decision Priority

Jika terjadi konflik:

1.

AGENTS.md

2.

PROJECT_STATUS.md

3.

PRD.md

4.

TECHNICAL_SPEC.md

5.

ARCHITECTURE.md

6.

IMAGE_ENGINE.md

7.

Dokumen lainnya

---

# Definition of Success

Implementasi dianggap berhasil apabila:

- Seluruh fitur mengikuti PRD.
- Image Engine tetap reusable.
- Seluruh manipulasi gambar dilakukan di browser.
- Tidak ada backend untuk pemrosesan gambar.
- Dapat di-deploy pada shared hosting maupun NAS.
- Dokumentasi tetap sinkron dengan implementasi.
- Arsitektur tetap sederhana, modular, dan mudah dikembangkan.

---

# Final Principle

Jika terdapat dua solusi yang sama-sama benar:

Pilih solusi yang:

- lebih sederhana
- lebih modular
- lebih mudah diuji
- lebih mudah dipelihara
- lebih sedikit dependency

Photo Studio dibangun untuk bertahan dalam jangka panjang.

Setiap keputusan implementasi harus mempertimbangkan kebutuhan proyek di masa depan, bukan hanya kebutuhan versi saat ini.
