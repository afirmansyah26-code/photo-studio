# IMPLEMENTATION_PHASE.md

# Photo Studio

## Implementation Roadmap

Version: 1.0

Status: Draft

---

# 1. Purpose

Dokumen ini mendefinisikan tahapan implementasi Photo Studio.

Tujuan:

- Memberikan roadmap pengembangan.
- Menentukan prioritas pekerjaan.
- Menentukan Definition of Done setiap fase.
- Menjadi acuan utama AI Agent selama implementasi.

Implementasi **harus mengikuti urutan fase**. Fase berikutnya tidak boleh dimulai sebelum fase saat ini dinyatakan selesai.

---

# 2. Development Workflow

```text
Documentation

↓

Architecture Review

↓

Phase Implementation

↓

Testing

↓

Documentation Update

↓

Git Commit

↓

Next Phase
```

Setiap fase wajib menghasilkan kode yang dapat dijalankan dan terdokumentasi.

---

# 3. Phase Lock Rules

Selama sebuah fase aktif:

- Tidak boleh mengerjakan fitur fase berikutnya.
- Tidak boleh melakukan refactor besar di luar ruang lingkup fase.
- Tidak boleh menambahkan dependency tanpa evaluasi.
- Dokumentasi harus diperbarui sebelum fase ditutup.

---

# Phase 0 — Project Foundation

## Goal

Menyiapkan fondasi proyek.

## Deliverables

- Struktur folder
- Dokumentasi
- Konfigurasi Next.js
- Tailwind CSS
- ESLint
- TypeScript
- PWA Foundation

## Acceptance Criteria

- Proyek berhasil dijalankan.
- Dokumentasi inti selesai.
- Tidak ada business logic.

## Status

Completed (Documentation)

---

# Phase 1 — UI Foundation

## Goal

Membangun kerangka antarmuka.

## Scope

- App Layout
- Header
- Toolbar
- Workspace
- Preview Panel
- Footer
- Theme (Light/Dark)

## Deliverables

- Layout responsif.
- Design System diterapkan.
- Komponen dasar tersedia.

## Out of Scope

- Upload
- Crop
- Image Processing

## Definition of Done

- Seluruh halaman tampil dengan benar.
- Mendukung desktop dan mobile.
- Dark mode berfungsi.

---

# Phase 2 — Upload System

## Goal

Memuat gambar ke aplikasi.

## Scope

- Upload Button
- Drag & Drop
- File Validation
- Image Decode
- Preview Awal

## Deliverables

- Pengguna dapat memilih atau menyeret file.
- Validasi format dan ukuran dilakukan.
- Gambar berhasil ditampilkan.

## Out of Scope

- Crop
- Resize
- Compress

## Definition of Done

- Upload berjalan tanpa backend.
- Penanganan error jelas.
- Preview awal tampil.

---

# Phase 3 — Image Engine Foundation

## Goal

Membangun fondasi Image Engine.

## Scope

- Pipeline
- Stage Interface
- Validation Stage
- Decode Stage
- Normalize Stage

## Deliverables

- Pipeline dapat dijalankan.
- Stage bersifat modular.
- Belum ada manipulasi gambar.

## Definition of Done

- Pipeline siap menerima stage baru.
- Image Engine tidak bergantung pada React.

---

# Phase 4 — Crop Engine

## Goal

Mengimplementasikan crop.

## Scope

- Crop Area
- Aspect Ratio 3×4
- Drag
- Zoom
- Rotate
- Live Preview

## Deliverables

- Crop real-time.
- Zoom dan rotasi bekerja.
- Preview mengikuti perubahan.

## Out of Scope

- Compress
- Export

## Definition of Done

- Crop stabil.
- Tidak ada distorsi gambar.

---

# Phase 5 — Resize & Compression

## Goal

Menghasilkan foto sesuai standar.

## Scope

- Resize
- JPEG Export
- Compression
- File Size Validation

## Deliverables

- Output 600 × 800 px.
- JPEG.
- Target ukuran file sesuai spesifikasi.

## Definition of Done

- Kualitas visual sesuai.
- Ukuran file konsisten.

---

# Phase 6 — Export

## Goal

Mengunduh hasil.

## Scope

- Download JPEG
- File Naming
- Blob Cleanup

## Deliverables

- Hasil dapat diunduh.
- Tidak ada kebocoran memori.

## Definition of Done

- Download berhasil.
- Object URL dibersihkan.

---

# Phase 7 — Performance Optimization

## Goal

Mengoptimalkan aplikasi.

## Scope

- Web Worker
- Lazy Loading
- Bundle Optimization
- Memory Optimization

## Deliverables

- UI tetap responsif.
- Bundle efisien.

## Definition of Done

- Performa memenuhi target pada PERFORMANCE.md.

---

# Phase 8 — PWA

## Goal

Menjadikan aplikasi dapat dipasang.

## Scope

- Manifest
- Service Worker
- Offline Assets
- Install Prompt

## Deliverables

- Installable.
- Offline untuk aset aplikasi.

## Definition of Done

- Audit PWA berhasil.
- Offline mode berjalan sesuai desain.

---

# Phase 9 — Testing & Stabilization

## Goal

Menjamin kualitas V1.

## Scope

- Unit Test
- Manual Test
- Browser Compatibility
- Accessibility
- Bug Fix

## Deliverables

- Semua fitur utama stabil.
- Dokumentasi diperbarui.

## Definition of Done

- V1 siap dirilis.

---

# Future Phases

## Phase 10 — Safe Face Guide

- Overlay
- Alignment Guide
- Head Position Indicator

---

## Phase 11 — Batch Processing

- Queue
- Progress
- Multiple Download

---

## Phase 12 — AI Face Detection

- Face Detection
- Auto Crop Suggestion
- Auto Center

---

## Phase 13 — Background Replacement

- Background Segmentation
- Blue
- Red
- White
- Custom Background

---

# Testing Gate

Setiap fase harus lulus:

- Type Check
- ESLint
- Manual Test
- Build Test

Fase tidak boleh ditutup sebelum seluruh pengujian selesai.

---

# Documentation Gate

Setiap fase wajib memperbarui:

- PROJECT_STATUS.md
- CHANGELOG.md
- Dokumentasi terkait

---

# Git Workflow

Setiap fase menghasilkan:

- Commit yang jelas.
- Dokumentasi diperbarui.
- Tidak menggabungkan beberapa fase dalam satu commit.

---

# Phase Completion Checklist

Sebelum fase dinyatakan selesai:

- Scope terpenuhi.
- Acceptance Criteria terpenuhi.
- Definition of Done terpenuhi.
- Dokumentasi diperbarui.
- Build berhasil.
- Tidak ada error lint.
- Tidak ada error TypeScript.
- Tidak menambah technical debt yang diketahui.

---

# Implementation Rules

Selama implementasi:

- Ikuti PRD.
- Ikuti TECHNICAL_SPEC.
- Ikuti ARCHITECTURE.
- Ikuti IMAGE_ENGINE.
- Ikuti COMPONENT_GUIDE.
- Ikuti PERFORMANCE.
- Ikuti SECURITY.

Jika terjadi konflik, urutan prioritas adalah:

1. PROJECT_STATUS.md
2. PRD.md
3. TECHNICAL_SPEC.md
4. ARCHITECTURE.md
5. Dokumen lainnya.

---

# Release Milestones

## MVP

- Upload
- Crop
- Resize
- Compress
- Download

## V1.0

- MVP
- PWA
- Optimasi performa
- Dokumentasi lengkap

## V2.0

- Face Guide
- Batch Processing

## V3.0

- AI Face Detection

## V4.0

- Background Replacement

---

# Definition of Project Success

Photo Studio dianggap berhasil apabila:

- Seluruh fitur V1 selesai sesuai PRD.
- Seluruh pengolahan gambar berlangsung 100% di browser.
- Dapat di-host pada shared hosting, NAS, maupun web server statis.
- Image Engine dapat digunakan kembali oleh aplikasi lain tanpa ketergantungan pada UI.
- Seluruh dokumentasi tetap sinkron dengan implementasi.
