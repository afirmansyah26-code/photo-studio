# CONTRIBUTING.md

# Contributing Guide

## Photo Studio

Version: 1.0

Status: Active

---

# Welcome

Terima kasih telah berkontribusi pada Photo Studio.

Photo Studio dikembangkan dengan pendekatan **Documentation First** dan **Architecture First**.

Sebelum menulis kode, pastikan Anda memahami dokumentasi proyek.

---

# Before You Start

Baca dokumen berikut secara berurutan:

1. AGENTS.md
2. PROJECT_STATUS.md
3. PRD.md
4. TECHNICAL_SPEC.md
5. ARCHITECTURE.md
6. IMAGE_ENGINE.md
7. IMPLEMENTATION_PHASE.md

Jangan mulai implementasi sebelum memahami dokumen-dokumen tersebut.

---

# Project Philosophy

Kontribusi harus mengikuti prinsip berikut:

- Simplicity
- Readability
- Reusability
- Performance
- Privacy
- Maintainability

---

# Development Workflow

Seluruh pekerjaan mengikuti alur berikut:

```text
Read Documentation

↓

Select Current Phase

↓

Implement

↓

Test

↓

Update Documentation

↓

Commit

↓

Review
```

Dokumentasi merupakan bagian dari implementasi.

---

# Phase Rules

Ikuti IMPLEMENTATION_PHASE.md.

Jangan mengimplementasikan fitur di luar fase aktif.

Contoh:

Jika proyek berada pada Phase 2:

Jangan mengimplementasikan:

- Face Detection
- Background Removal
- Batch Processing

---

# Branch Strategy

Disarankan menggunakan branch terpisah.

Contoh:

```text
feature/upload

feature/crop

feature/resize

fix/compression

docs/update-prd
```

Satu branch hanya untuk satu tujuan.

---

# Commit Guidelines

Gunakan commit yang kecil dan jelas.

Contoh:

```text
feat: implement upload system

feat: add crop workspace

fix: correct resize calculation

docs: update architecture

refactor: simplify crop pipeline
```

Hindari commit yang mencampur banyak perubahan.

---

# Pull Request Checklist

Sebelum membuat Pull Request:

- Build berhasil.
- TypeScript lulus.
- ESLint lulus.
- Dokumentasi diperbarui.
- Tidak ada fitur di luar fase aktif.
- Tidak menambah dependency tanpa alasan.

---

# Documentation Rules

Jika implementasi berubah:

Perbarui dokumentasi terkait.

Minimal:

- PROJECT_STATUS.md
- CHANGELOG.md

Jika perubahan menyentuh arsitektur:

Perbarui:

- ARCHITECTURE.md
- TECHNICAL_SPEC.md
- IMAGE_ENGINE.md

---

# Coding Standards

Gunakan:

- TypeScript Strict
- Functional Components
- Small Functions
- Early Return
- Explicit Types

Hindari:

- any
- duplicated logic
- magic numbers
- hardcoded configuration

---

# Image Engine Rules

Image Engine merupakan inti proyek.

Engine harus:

- Framework Agnostic
- Stateless
- Pure
- Testable

Engine tidak boleh:

- mengimpor React
- mengimpor Next.js
- mengandung logika UI

---

# Component Rules

Komponen React harus:

- reusable
- kecil
- mudah diuji

Komponen tidak boleh:

- melakukan image processing
- berisi business logic yang kompleks

---

# Performance Guidelines

Kontribusi tidak boleh:

- meningkatkan ukuran bundle tanpa alasan
- menyebabkan render ulang yang tidak perlu
- menambah penggunaan memori secara signifikan

Gunakan Browser API sebelum mempertimbangkan dependency baru.

---

# Security Guidelines

Jangan:

- mengirim foto ke server
- menyimpan foto secara permanen
- menambahkan analytics tanpa persetujuan
- memperluas attack surface aplikasi

Seluruh proses gambar tetap berjalan di browser.

---

# Dependency Policy

Dependency baru hanya boleh ditambahkan jika:

- benar-benar diperlukan
- aktif dipelihara
- lisensi sesuai
- memberikan manfaat yang jelas

Semua dependency baru harus dijelaskan pada Pull Request.

---

# Testing Requirements

Sebelum perubahan dianggap selesai:

- Build berhasil.
- Type check berhasil.
- ESLint berhasil.
- Manual test dilakukan.
- Fitur tidak merusak fungsi lain.

---

# Accessibility

Kontribusi harus mempertahankan:

- Keyboard Navigation
- Focus Indicator
- Dark Mode
- Semantic HTML
- Kontras warna yang baik

---

# Documentation Checklist

Setelah implementasi:

- [ ] PROJECT_STATUS diperbarui.
- [ ] CHANGELOG diperbarui.
- [ ] Dokumentasi terkait diperbarui.
- [ ] Fase implementasi diperbarui jika diperlukan.

---

# Code Review Checklist

Saat meninjau kontribusi:

- Apakah sesuai PRD?
- Apakah sesuai Architecture?
- Apakah reusable?
- Apakah mudah dipelihara?
- Apakah menambah dependency?
- Apakah memenuhi target performa?
- Apakah tetap 100% client-side?

---

# AI Contribution

Jika menggunakan AI Coding Agent:

- Pastikan AI membaca AGENTS.md terlebih dahulu.
- Ikuti IMPLEMENTATION_PHASE.md.
- Jangan menerima kode tanpa ditinjau.
- Verifikasi hasil build dan dokumentasi.

AI adalah alat bantu, bukan pengganti proses review.

---

# Definition of Good Contribution

Kontribusi dianggap baik apabila:

- Menyelesaikan satu masalah dengan jelas.
- Tidak menambah kompleksitas yang tidak perlu.
- Mempertahankan arsitektur proyek.
- Disertai dokumentasi yang sesuai.
- Tidak melanggar prinsip inti Photo Studio.

---

# Contact Between Documentation and Code

Kode dan dokumentasi harus selalu berkembang bersama.

Tidak boleh ada implementasi yang tidak terdokumentasi.

Tidak boleh ada dokumentasi yang tidak lagi mencerminkan implementasi.

---

# Thank You

Terima kasih telah membantu mengembangkan Photo Studio.

Tujuan proyek ini bukan hanya membangun aplikasi pas foto, tetapi juga menciptakan fondasi Image Engine yang ringan, modular, dan dapat digunakan kembali oleh berbagai aplikasi di masa depan.
