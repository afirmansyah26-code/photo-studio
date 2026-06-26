# PROJECT_STATUS.md

# Photo Studio

> **Production Status Document**
>
> Dokumen ini merupakan sumber informasi utama (Single Source of Truth) mengenai status pengembangan Photo Studio. Seluruh perubahan proyek harus mengacu pada dokumen ini sebelum melakukan implementasi.

---

# Project Information

| Item             | Value                 |
| ---------------- | --------------------- |
| Project Name     | Photo Studio          |
| Version          | 0.1.0 (Planning)      |
| Status           | Planning              |
| Repository       | photo-studio          |
| License          | MIT                   |
| Primary Language | TypeScript            |
| Framework        | Next.js 15            |
| Styling          | Tailwind CSS          |
| Runtime          | Browser (Client-side) |
| Database         | None                  |
| Backend API      | None                  |
| Authentication   | None                  |
| PWA              | Planned               |

---

# Project Vision

Photo Studio adalah aplikasi web modern yang dirancang untuk menghasilkan pas foto standar sekolah secara **100% client-side** tanpa proses pengolahan gambar di server.

Aplikasi harus ringan, cepat, mudah digunakan, serta dapat dijalankan pada:

- Shared Hosting
- NAS (ZimaOS)
- Static Hosting
- Offline melalui PWA

Photo Studio juga menjadi fondasi bagi **Image Engine** yang nantinya dapat digunakan ulang oleh aplikasi lain seperti PhotoApp dan SISFO.

---

# Core Principles

Seluruh pengembangan harus mengikuti prinsip berikut.

## 1. Client-side First

Semua proses dilakukan di browser.

Tidak boleh ada:

- upload image untuk diproses server
- image processing backend
- API crop
- API resize
- API compress

Canvas API, Web Worker, OffscreenCanvas, dan Browser API menjadi fondasi utama.

---

## 2. Reusable

Seluruh logika image processing harus dapat digunakan kembali oleh proyek lain.

Target penggunaan:

- Photo Studio
- PhotoApp
- SISFO
- School CMS
- Future Applications

---

## 3. Production Ready

Kode harus memenuhi standar production.

Prioritas:

- maintainable
- scalable
- testable
- reusable
- documented

---

## 4. Performance First

Target:

- startup cepat
- bundle ringan
- penggunaan memori efisien
- tetap responsif pada perangkat kelas menengah

---

# Project Goals

## Primary Goal

Menghasilkan pas foto standar sekolah yang siap digunakan untuk:

- Rapor
- Buku Induk
- Kartu Pelajar
- Kartu Ujian
- Ijazah
- Dapodik

---

## Secondary Goal

Membangun Image Engine reusable yang dapat dipakai oleh aplikasi lain.

---

# Non Goals

Versi awal **tidak** mencakup:

- Backend
- Database
- Login
- Cloud Storage
- Sinkronisasi akun
- Kolaborasi multi-user
- AI generatif

---

# Technology Stack

## Framework

- Next.js 15
- React 19
- TypeScript

## UI

- Tailwind CSS
- shadcn/ui

## Image Processing

- Canvas API
- OffscreenCanvas
- Web Worker
- browser-image-compression
- Pica

## Deployment

- Static Export
- Shared Hosting
- NAS
- PWA

---

# Development Philosophy

Seluruh implementasi mengikuti urutan berikut.

Research

↓

Documentation

↓

Architecture

↓

Implementation

↓

Testing

↓

Optimization

↓

Release

Dokumentasi selalu diperbarui sebelum implementasi fitur baru.

---

# Current Development Phase

Current Phase

Planning & Documentation

Status

🟡 In Progress

---

# Current Milestone

Milestone 1

Project Foundation

Checklist

- [x] Repository dibuat
- [x] Struktur folder dibuat
- [x] Dokumentasi dasar dibuat
- [ ] PRD
- [ ] Technical Specification
- [ ] Architecture
- [ ] Image Engine Design
- [ ] UI/UX Guide
- [ ] Implementation Plan

---

# Roadmap

## V1

- Upload
- Drag & Drop
- Crop
- Zoom
- Rotate
- Preview
- Resize
- Compress
- Download JPEG

Status

Planning

---

## V2

- Face Guide
- Batch Processing
- Undo / Redo
- Keyboard Shortcut

Status

Not Started

---

## V3

- AI Face Detection
- Auto Center Face
- Auto Crop

Status

Not Started

---

## V4

- Background Replacement
- Merah
- Biru
- Putih

Status

Not Started

---

# Architecture Status

| Module             | Status   |
| ------------------ | -------- |
| UI                 | Planning |
| Image Engine       | Planning |
| Crop Engine        | Planning |
| Resize Engine      | Planning |
| Compression Engine | Planning |
| Export Engine      | Planning |
| PWA                | Planning |

---

# Performance Targets

| Target                 | Value               |
| ---------------------- | ------------------- |
| Client-side Processing | 100%                |
| Server Processing      | 0%                  |
| Database               | None                |
| Initial Load           | < 2 MB (compressed) |
| First Contentful Paint | < 2 s               |
| Lighthouse Performance | > 95                |
| Offline Support        | Yes                 |
| Responsive             | Yes                 |

---

# Coding Standards

Seluruh kode harus memenuhi aturan berikut.

- TypeScript strict mode
- Functional Components
- Reusable Components
- Modular Architecture
- No duplicated logic
- No hardcoded configuration
- Fully documented

---

# Documentation Status

| Document             | Status |
| -------------------- | ------ |
| PROJECT_STATUS       | ✅     |
| PRD                  | ⏳     |
| TECHNICAL_SPEC       | ⏳     |
| ARCHITECTURE         | ⏳     |
| IMAGE_ENGINE         | ⏳     |
| UI_UX_GUIDE          | ⏳     |
| COMPONENT_GUIDE      | ⏳     |
| PERFORMANCE          | ⏳     |
| SECURITY             | ⏳     |
| DEPLOYMENT           | ⏳     |
| IMPLEMENTATION_PHASE | ⏳     |
| CURSOR_RULES         | ⏳     |
| AGENTS               | ⏳     |

---

# Known Issues

Belum ada.

---

# Decision Log

## 2026-06-26

Project dimulai.

Keputusan awal:

- Menggunakan Next.js 15.
- Seluruh image processing dilakukan client-side.
- Tidak menggunakan database.
- Tidak menggunakan backend.
- Mendukung PWA.
- Arsitektur dirancang agar Image Engine dapat digunakan ulang oleh aplikasi lain.

---

# Next Action

Dokumen berikutnya yang harus diselesaikan:

1. PRD.md
2. TECHNICAL_SPEC.md
3. ARCHITECTURE.md

Implementasi kode **belum dimulai** hingga dokumentasi inti selesai.
