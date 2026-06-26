# COMPONENT_GUIDE.md

# Component Guide

## Photo Studio

Version: 1.0

Status: Draft

---

# 1. Purpose

Dokumen ini mendefinisikan standar seluruh komponen React pada Photo Studio.

Tujuan utama:

- Konsistensi
- Reusability
- Maintainability
- Accessibility
- Testability

Setiap komponen harus mengikuti pedoman ini.

---

# 2. Component Philosophy

Komponen harus:

- kecil
- fokus
- reusable
- mudah diuji
- mudah dipahami

Komponen **tidak boleh** menjadi tempat business logic.

---

# 3. Component Rules

Setiap komponen memiliki satu tanggung jawab.

Contoh:

UploadButton

↓

Hanya menangani interaksi upload.

Tidak melakukan decode gambar.

---

# 4. Component Categories

Komponen dibagi menjadi lima kategori.

## Layout

Mengatur tata letak.

Contoh:

- AppLayout
- Sidebar
- Header
- Footer
- Workspace

---

## UI

Komponen dasar.

Contoh:

- Button
- Card
- Slider
- Dialog
- Tooltip
- Toast
- Badge

---

## Feature

Komponen spesifik fitur.

Contoh:

- CropWorkspace
- PreviewPanel
- UploadDropzone
- Toolbar
- FaceGuideOverlay

---

## Shared

Komponen yang digunakan di banyak tempat.

Contoh:

- Loading
- EmptyState
- ErrorState
- Spinner

---

## Overlay

Komponen yang berada di atas workspace.

Contoh:

- Grid
- SafeFaceGuide
- CropFrame
- Selection

---

# 5. Folder Structure

```text
components/

layout/

ui/

feature/

shared/

overlay/
```

---

# 6. Naming Convention

Gunakan PascalCase.

Contoh:

UploadDropzone.tsx

CropWorkspace.tsx

PreviewPanel.tsx

Toolbar.tsx

---

# 7. Component Hierarchy

```text
App

↓

Workspace

↓

CropWorkspace

↓

Overlay

↓

Toolbar

↓

PreviewPanel
```

Hierarchy harus sederhana.

---

# 8. Smart vs Presentational Components

## Presentational

Hanya menerima props.

Tidak mengetahui business logic.

Contoh:

Button

Slider

Card

Panel

---

## Smart

Menghubungkan UI dengan Hook.

Contoh:

CropWorkspace

PreviewPanel

UploadDropzone

Jumlah Smart Component harus seminimal mungkin.

---

# 9. Props Guidelines

Props harus:

- eksplisit
- bertipe kuat (TypeScript)
- memiliki nama yang jelas
- tidak terlalu banyak

Gunakan object jika parameter mulai kompleks.

---

# 10. Event Guidelines

Komponen mengirim event.

Contoh:

onUpload

onCropChange

onRotate

onZoom

onDownload

Komponen tidak langsung memanggil Image Engine.

---

# 11. State Guidelines

Komponen hanya menyimpan state lokal.

Contoh:

Hover

Open

Selected

Expanded

State bisnis dikelola melalui Hook atau Application Layer.

---

# 12. Hook Usage

Komponen hanya menggunakan Hook.

Contoh:

```text
Component

↓

useCrop()

↓

Image Engine
```

Komponen tidak mengimpor Engine secara langsung.

---

# 13. Layout Components

## AppLayout

Menyusun halaman utama.

## Workspace

Area kerja utama.

## Sidebar

Kontrol.

## PreviewPanel

Preview hasil akhir.

---

# 14. Feature Components

## UploadDropzone

Tugas:

- Drag & Drop
- File Picker
- Validasi awal

---

## CropWorkspace

Tugas:

- Menampilkan gambar
- Menampilkan area crop
- Menangani interaksi pengguna

Tidak melakukan proses crop.

---

## PreviewPanel

Tugas:

- Menampilkan hasil akhir
- Menampilkan ukuran keluaran
- Menampilkan status ekspor

---

## Toolbar

Berisi:

- Upload
- Zoom
- Rotate
- Reset
- Download

---

# 15. Overlay Components

## Crop Grid

Grid bantu.

## Safe Face Guide

V2.

## Selection Border

Area crop.

## Alignment Guide

Garis bantu posisi.

---

# 16. Shared Components

Loading

ErrorState

EmptyState

ProgressBar

Spinner

Notification

---

# 17. UI Components

Gunakan komponen dasar yang konsisten.

Button

Input

Slider

Card

Tooltip

Dialog

Badge

Separator

Switch

Dropdown

---

# 18. Accessibility Rules

Seluruh komponen wajib:

- Keyboard Accessible
- Focus Ring
- ARIA Label bila diperlukan
- Kontras warna memadai
- Target sentuh minimal 44 × 44 px

---

# 19. Performance Rules

Komponen harus:

- menghindari render ulang yang tidak perlu
- menggunakan memoisasi bila terbukti bermanfaat
- tidak membuat objek baru di setiap render tanpa alasan
- memuat fitur berat secara dinamis bila memungkinkan

Optimasi dilakukan berdasarkan kebutuhan nyata, bukan asumsi.

---

# 20. Styling Rules

Gunakan:

Tailwind CSS

Design Token

Semantic Color

Tidak menggunakan inline style kecuali benar-benar diperlukan.

---

# 21. Component Communication

```text
Button

↓

Event

↓

Hook

↓

Engine

↓

Result

↓

Preview
```

Komponen tidak boleh saling memanggil secara langsung.

---

# 22. Error Handling

Komponen hanya menampilkan error.

Engine menghasilkan error.

Hook menerjemahkan error menjadi state UI.

---

# 23. Testing

Komponen harus dapat diuji secara terpisah.

Target:

- Render
- Props
- Event
- Accessibility
- Keyboard Navigation

---

# 24. Future Components

Version 2

Face Guide

Batch Queue

Preset Panel

Version 3

Face Detection Overlay

AI Suggestion Panel

Version 4

Background Selector

Background Preview

---

# 25. Component Dependency Rules

Diizinkan:

```text
Component

↓

Hook

↓

Engine
```

Tidak diizinkan:

```text
Component

↓

Engine
```

Tidak diizinkan:

```text
Component

↓

Worker
```

Seluruh komunikasi melalui Hook atau Application Layer.

---

# 26. Component Checklist

Sebelum komponen dianggap selesai:

- Memiliki satu tanggung jawab.
- Menggunakan TypeScript.
- Mendukung keyboard.
- Mendukung dark mode.
- Mengikuti design system.
- Tidak mengandung business logic.
- Tidak mengimpor Image Engine secara langsung.
- Mudah digunakan kembali.

---

# 27. Component Inventory (V1)

## Layout

- AppLayout
- Header
- Footer
- Workspace
- Sidebar
- PreviewPanel

## Feature

- UploadDropzone
- CropWorkspace
- Toolbar
- CropControls
- DownloadButton

## Overlay

- CropGrid
- CropFrame

## Shared

- Loading
- EmptyState
- ErrorState
- ProgressBar

## UI

- Button
- Card
- Slider
- Dialog
- Tooltip
- Badge
- Separator

---

# 28. Component Evolution

Semua komponen harus dirancang agar dapat dipindahkan ke package terpisah.

Target struktur jangka panjang:

```text
packages/

photo-ui/

button/

card/

slider/

toolbar/

workspace/

preview/

overlay/
```

Photo Studio menjadi aplikasi pertama yang menggunakan package tersebut.

---

# 29. Definition of Done

Sebuah komponen dianggap selesai apabila:

- Hanya memiliki satu tanggung jawab.
- Mengikuti pedoman design system.
- Tidak berisi business logic.
- Mudah digunakan kembali.
- Mudah diuji.
- Mendukung aksesibilitas.
- Konsisten dengan arsitektur proyek.
