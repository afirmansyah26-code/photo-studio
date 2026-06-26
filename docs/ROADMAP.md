# ROADMAP.md

# Product Roadmap

## Photo Studio

Version: 1.0

Status: Planning

Last Updated: 2026-06-26

---

# Vision

Photo Studio tidak hanya dikembangkan sebagai aplikasi pembuat pas foto.

Target jangka panjang adalah menjadi **platform image processing client-side** yang ringan, modular, dan dapat digunakan kembali oleh berbagai aplikasi.

Image Engine akan menjadi aset utama yang dapat digunakan oleh:

- Photo Studio
- PhotoApp
- SISFO
- School CMS
- Aplikasi lain

---

# Product Strategy

Pengembangan dilakukan secara bertahap.

Prinsip utama:

1.

Bangun fondasi.

↓

2.

Bangun Image Engine.

↓

3.

Bangun AI.

↓

4.

Bangun Ecosystem.

---

# Version Strategy

## Planning

Version 0.x

Foundation

↓

Version 1.x

Core Product

↓

Version 2.x

Professional Features

↓

Version 3.x

AI Features

↓

Version 4.x

Studio Features

↓

Version 5.x

Image Platform

---

# Version 0.x

## Foundation

Status

Planning

Target

Menyiapkan fondasi proyek.

Deliverables

- Dokumentasi
- Architecture
- Design System
- Image Engine Design
- Pipeline Design
- PWA Foundation

Success Criteria

- Seluruh dokumentasi selesai.
- Arsitektur stabil.
- Siap memasuki implementasi.

---

# Version 1.0

## Core Photo Studio

Status

Planned

Target

Membuat aplikasi pas foto yang siap digunakan.

Features

- Upload
- Drag & Drop
- Crop
- Rotate
- Zoom
- Live Preview
- Resize
- Compress
- Download JPEG
- Responsive UI
- Dark Mode
- PWA
- Offline Support

Target User

Operator Sekolah

Guru

Tata Usaha

---

# Version 1.1

## Usability Improvement

Target

Meningkatkan kenyamanan penggunaan.

Features

- Keyboard Shortcut
- Better Error Messages
- Reset Tool
- Recent Settings
- Improved Preview
- File Information

---

# Version 2.0

## Productivity Features

Target

Memproses banyak foto lebih cepat.

Features

- Safe Face Guide
- Batch Processing
- Queue Manager
- Progress Indicator
- Multiple Export
- Preset Size

Target User

Sekolah

Studio Foto

Operator Data

---

# Version 2.1

## Advanced Workflow

Features

- History
- Undo
- Redo
- Crop Presets
- Export Presets

---

# Version 3.0

## AI Assisted Editing

Target

Mengurangi pekerjaan manual.

Features

- Face Detection
- Auto Crop Suggestion
- Auto Center Face
- Face Quality Validation

Semua AI tetap berjalan di browser.

---

# Version 3.1

## AI Quality

Features

- Blur Detection
- Eyes Detection
- Face Alignment
- Image Quality Score

---

# Version 4.0

## Studio Features

Target

Menghasilkan pas foto siap cetak.

Features

- Background Replacement
- Blue
- Red
- White
- Custom Background
- Studio Lighting Presets
- Edge Refinement

---

# Version 4.1

## Advanced Editing

Features

- Brightness
- Contrast
- Exposure
- White Balance
- Color Correction

Tetap fokus pada kebutuhan pas foto, bukan editor foto umum.

---

# Version 5.0

## Image Platform

Target

Memisahkan Image Engine menjadi package reusable.

Packages

```text id="pgr22z"
packages/

image-engine/

photo-ui/

face/

background/

shared/
```

Photo Studio menjadi consumer pertama.

---

# Ecosystem Roadmap

Image Engine

↓

Photo Studio

↓

PhotoApp

↓

SISFO

↓

School CMS

↓

Future Apps

---

# Long-term Goals

Target jangka panjang.

- Image Engine reusable.
- Framework Agnostic.
- Client-side AI.
- Cross Platform.
- Open Architecture.

---

# Out of Scope

Roadmap saat ini tidak mencakup:

- Cloud Storage
- User Management
- Social Features
- Online Collaboration
- SaaS Platform
- Server-side Image Processing

---

# Technical Evolution

## Current

```text id="9u3m8r"
Photo Studio

↓

Image Engine
```

---

## Future

```text id="vnj5ww"
Photo Studio

↓

Image Engine

↓

AI Engine

↓

Background Engine

↓

Plugin System
```

---

# Product Milestones

Milestone 1

Documentation Complete

Milestone 2

Image Engine

Milestone 3

Crop Tool

Milestone 4

Resize & Compression

Milestone 5

Release V1

Milestone 6

Batch Processing

Milestone 7

AI Face Detection

Milestone 8

Background Replacement

Milestone 9

Image Platform

---

# Success Metrics

Version 1

- Stable.
- Lightweight.
- Easy to use.

Version 2

- Faster workflow.
- Better productivity.

Version 3

- Less manual work.
- AI-assisted editing.

Version 4

- Studio-quality output.

Version 5

- Reusable Image Platform.

---

# Guiding Principles

Saat menentukan prioritas roadmap, gunakan urutan berikut:

1. Privacy
2. Client-side Processing
3. Reusability
4. Simplicity
5. Performance
6. Accessibility
7. Developer Experience

Fitur baru tidak boleh mengorbankan prinsip-prinsip tersebut.

---

# Roadmap Review Policy

Roadmap ditinjau secara berkala.

Perubahan roadmap harus:

- sesuai visi proyek
- terdokumentasi
- tidak bertentangan dengan arsitektur yang telah disepakati

Perubahan besar juga harus memperbarui:

- PROJECT_STATUS.md
- PRD.md
- CHANGELOG.md

---

# Definition of Roadmap Success

Roadmap dianggap berhasil apabila:

- Memberikan arah pengembangan jangka panjang.
- Menjaga konsistensi antara visi produk dan implementasi teknis.
- Membantu menentukan prioritas fitur tanpa mengorbankan kualitas arsitektur.
- Mendukung evolusi Photo Studio menjadi platform image processing yang reusable.
