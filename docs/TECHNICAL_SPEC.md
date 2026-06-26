# TECHNICAL_SPEC.md

# Technical Specification

## Photo Studio

Version: 1.0

Status: Draft

---

# 1. Purpose

Dokumen ini menjelaskan spesifikasi teknis Photo Studio sebagai acuan implementasi.

Tujuan utama dokumen ini adalah:

- Menentukan arsitektur aplikasi.
- Menentukan struktur proyek.
- Mendefinisikan modul.
- Mendefinisikan kontrak antar modul.
- Menjadi referensi utama bagi AI Agent dan developer.

---

# 2. Technical Principles

Seluruh implementasi wajib mengikuti prinsip berikut.

## Client-side Only

Semua proses dilakukan di browser.

Tidak diperbolehkan:

- Backend image processing
- API crop
- API resize
- API compress
- Upload image untuk diproses server

---

## Modular

Seluruh logika dipisahkan berdasarkan tanggung jawab.

Contoh:

- UI
- Image Engine
- Worker
- Utilities

---

## Reusable

Image Engine tidak boleh bergantung pada React.

Engine harus dapat digunakan oleh:

- React
- Next.js
- Vue
- Vanilla JavaScript
- Electron
- Tauri

---

## Stateless

Image Engine tidak menyimpan state global.

Semua fungsi menerima input dan menghasilkan output secara eksplisit.

---

## Type Safe

Seluruh kode menggunakan TypeScript strict mode.

---

# 3. Technology Stack

## Core

- Next.js 15
- React 19
- TypeScript

## Styling

- Tailwind CSS
- shadcn/ui

## Image Processing

- Canvas API
- OffscreenCanvas (jika tersedia)
- Web Worker
- Pica
- browser-image-compression

## PWA

- next-pwa (atau solusi yang sesuai dengan App Router)
- Service Worker
- Web App Manifest

---

# 4. Runtime Architecture

```text
Browser

↓

React UI

↓

Image Engine

↓

Canvas API

↓

Export JPEG
```

Tidak ada komunikasi dengan server untuk pemrosesan gambar.

---

# 5. Project Structure

```text
src/

app/

components/

hooks/

lib/

image-engine/

crop/

resize/

compress/

export/

canvas/

workers/

types/

constants/

utils/

styles/
```

---

# 6. Image Processing Pipeline

```text
Upload

↓

Decode Image

↓

Normalize Orientation

↓

Crop

↓

Rotate

↓

Resize

↓

Compress

↓

Export JPEG

↓

Download
```

Setiap tahap merupakan modul yang berdiri sendiri.

---

# 7. Module Responsibilities

## UI Layer

Bertanggung jawab terhadap:

- Layout
- Toolbar
- Cropper
- Preview
- Dialog
- Shortcut

Tidak boleh melakukan image processing.

---

## Image Engine

Bertanggung jawab terhadap:

- Crop
- Resize
- Compress
- Export
- Rotation
- Coordinate Mapping

Tidak mengetahui React.

---

## Worker Layer

Menjalankan proses berat agar UI tetap responsif.

Contoh:

- Resize
- Compress
- Face Detection (V3)

---

## Utilities

Berisi fungsi umum seperti:

- File helper
- Download helper
- Validation
- Math helper

---

# 8. Folder Responsibilities

## app/

Routing Next.js.

Tidak boleh menyimpan business logic.

---

## components/

Komponen React.

Harus bersifat reusable.

---

## image-engine/

Seluruh algoritma pengolahan gambar.

Tidak boleh mengimpor React.

---

## workers/

Kode Web Worker.

---

## hooks/

Custom React Hooks.

---

## types/

Seluruh tipe TypeScript.

---

## constants/

Nilai konstan aplikasi.

---

## utils/

Helper umum.

---

# 9. Image Engine Design

Image Engine dibangun sebagai pustaka independen.

Target struktur:

```text
image-engine/

canvas.ts

crop.ts

resize.ts

compress.ts

rotate.ts

export.ts

types.ts

constants.ts

index.ts
```

Seluruh fungsi harus bersifat murni (pure function) jika memungkinkan.

---

# 10. State Management

Versi 1 tidak menggunakan state management global.

Gunakan:

- React State
- React Context jika diperlukan

Tidak menggunakan Redux atau Zustand pada fase awal.

---

# 11. File Flow

```text
User Upload

↓

Browser File

↓

ImageBitmap / HTMLImageElement

↓

Canvas

↓

Transform

↓

JPEG Blob

↓

Download
```

Tidak ada penyimpanan permanen.

---

# 12. Performance Strategy

- Lazy Loading
- Dynamic Import
- Web Worker untuk proses berat
- OffscreenCanvas bila tersedia
- Hindari render ulang yang tidak perlu
- Gunakan memoization pada komponen yang tepat

---

# 13. Error Handling

Setiap modul wajib:

- Melempar error yang jelas.
- Tidak melakukan `console.log` pada mode produksi.
- Mengembalikan hasil yang dapat ditangani UI.

---

# 14. Browser Compatibility

Target browser modern yang mendukung:

- Canvas API
- File API
- Blob API
- Web Worker

Fitur seperti OffscreenCanvas harus memiliki fallback jika tidak tersedia.

---

# 15. PWA Requirements

Aplikasi harus:

- Installable
- Offline setelah aset utama tersimpan
- Mendukung ikon aplikasi
- Menggunakan Web App Manifest
- Menggunakan Service Worker untuk aset statis

Data gambar pengguna tidak disimpan di cache aplikasi.

---

# 16. Security Considerations

- Tidak mengirim gambar ke server.
- Validasi tipe file sebelum diproses.
- Batasi ukuran file masukan untuk menjaga performa.
- Bersihkan objek URL (`URL.revokeObjectURL`) setelah tidak digunakan.
- Hindari kebocoran memori akibat referensi Blob atau Canvas.

---

# 17. Coding Standards

- TypeScript strict mode
- ESLint
- Prettier
- Functional Programming bila sesuai
- Tidak menggunakan `any`
- Hindari fungsi yang terlalu panjang
- Satu tanggung jawab untuk setiap modul

---

# 18. Dependency Policy

Dependency baru hanya boleh ditambahkan apabila:

- Tidak dapat digantikan oleh Browser API.
- Memiliki lisensi yang sesuai.
- Terawat dengan baik.
- Memberikan manfaat yang jelas terhadap kualitas atau performa.

---

# 19. Testing Strategy

Target pengujian:

- Unit Test untuk Image Engine
- Component Test untuk UI utama
- Manual Test lintas browser
- Uji performa pada perangkat kelas menengah

---

# 20. Future Architecture

Arsitektur disiapkan agar Image Engine dapat dipisahkan menjadi package tersendiri.

Contoh:

```text
packages/

image-engine/

photo-ui/

face-detection/
```

Photo Studio tetap menjadi aplikasi utama yang menggunakan package tersebut.

---

# 21. Definition of Done

Suatu fitur dianggap selesai apabila:

- Seluruh acceptance criteria pada PRD terpenuhi.
- Lulus linting dan type checking.
- Tidak menurunkan performa aplikasi secara signifikan.
- Dokumentasi diperbarui.
- Tidak melanggar prinsip client-side only.
- Dapat digunakan kembali bila merupakan bagian dari Image Engine.

---

# 22. Related Documents

Dokumen ini terkait dengan:

- PROJECT_STATUS.md
- PRD.md
- ARCHITECTURE.md
- IMAGE_ENGINE.md
- UI_UX_GUIDE.md
- IMPLEMENTATION_PHASE.md
