# ARCHITECTURE.md

# Photo Studio Architecture

Version: 1.0

Status: Draft

---

# 1. Architecture Vision

Photo Studio dibangun menggunakan pendekatan **Layered Modular Architecture** dengan prinsip **Separation of Concerns**.

Tujuan utama arsitektur adalah:

- mudah dipelihara
- mudah diuji
- reusable
- scalable
- dapat berkembang menjadi library independen
- tidak bergantung pada backend

---

# 2. High Level Architecture

```text
┌─────────────────────────────────────────────┐
│                  Browser                    │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                Next.js App                  │
│               (Presentation)                │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                 UI Components               │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│              Application Layer              │
│      (Hooks, Controllers, Commands)         │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│               Image Engine                  │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ Canvas API / Browser API / Workers          │
└─────────────────────────────────────────────┘
```

Seluruh proses image processing berhenti pada Browser API.

Tidak ada komunikasi dengan server untuk memproses gambar.

---

# 3. Architectural Principles

## Separation of Concerns

UI tidak mengetahui cara crop dilakukan.

Image Engine tidak mengetahui React.

Hooks tidak mengetahui Canvas.

Worker tidak mengetahui UI.

Setiap layer hanya mengetahui layer di bawahnya.

---

## Dependency Direction

Arah dependency hanya satu.

```text
UI

↓

Hooks

↓

Image Engine

↓

Browser API
```

Layer bawah tidak boleh mengimpor layer atas.

---

## Single Responsibility

Satu module hanya memiliki satu tanggung jawab.

Contoh:

crop.ts

Hanya melakukan crop.

Tidak boleh:

- download
- compress
- resize

---

## Pure Functions

Seluruh algoritma image processing diusahakan berupa pure function.

Input

↓

Process

↓

Output

Tanpa efek samping yang tidak perlu.

---

# 4. Layer Responsibilities

## Presentation Layer

Berisi:

- Next.js App Router
- Layout
- Page
- UI Components

Tugas:

- Rendering
- Event Handling
- Accessibility

Tidak boleh:

- Crop
- Resize
- Compress

---

## Application Layer

Berisi:

- Hooks
- Controller
- Commands

Tugas:

Menghubungkan UI dengan Image Engine.

Contoh:

```text
Button

↓

useCrop()

↓

crop.ts
```

---

## Image Engine

Merupakan inti aplikasi.

Berisi:

- Crop
- Resize
- Rotate
- Compress
- Export
- Coordinate Transform

Tidak mengetahui:

- React
- Next.js
- Tailwind

---

## Browser Layer

Menggunakan:

- Canvas API
- ImageBitmap
- Blob
- URL API
- Web Worker
- OffscreenCanvas

---

# 5. Module Architecture

```text
Image Engine

├── Crop Module
├── Resize Module
├── Rotate Module
├── Compress Module
├── Export Module
├── Validation Module
├── Geometry Module
└── Utilities
```

Setiap module dapat diuji secara terpisah.

---

# 6. Folder Architecture

```text
src/

app/

components/

hooks/

lib/

image-engine/

workers/

types/

constants/

utils/

styles/
```

---

# 7. Component Architecture

Komponen UI hanya bertanggung jawab terhadap tampilan.

Contoh:

Toolbar

↓

CropButton

↓

Event

↓

Hook

↓

Engine

↓

Canvas

↓

Preview

Komponen tidak boleh memanggil Canvas API secara langsung.

---

# 8. Image Engine Architecture

```text
crop.ts

↓

resize.ts

↓

compress.ts

↓

export.ts
```

Setiap tahap berdiri sendiri.

Tidak boleh saling mengetahui implementasi internal.

---

# 9. Processing Pipeline

```text
File

↓

Validation

↓

Decode

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

Encode JPEG

↓

Blob

↓

Download
```

Setiap tahap menghasilkan output yang dapat digunakan tahap berikutnya.

---

# 10. Data Flow

```text
User

↓

Upload

↓

Hook

↓

Engine

↓

Canvas

↓

Blob

↓

Preview

↓

Download
```

Tidak ada penyimpanan permanen.

---

# 11. State Flow

State dibagi menjadi dua kategori.

## UI State

Contoh:

- Dialog
- Zoom
- Crop Position
- Loading

Menggunakan React State.

---

## Image State

Berisi:

- File
- Blob
- Canvas
- Bitmap

Dikelola melalui pipeline, bukan state global.

---

# 12. Worker Architecture

Worker digunakan hanya untuk proses berat.

Contoh:

```text
Resize

↓

Worker

↓

Compress

↓

Return Blob
```

UI tetap responsif.

---

# 13. Future AI Layer

Versi 3 akan menambahkan layer baru.

```text
Image Engine

↓

Face Detection

↓

Crop Suggestion
```

Layer AI tidak boleh mengubah Engine.

AI hanya memberikan rekomendasi koordinat.

---

# 14. Future Background Layer

Versi 4 menambahkan:

```text
Image

↓

Segmentation

↓

Background Replace

↓

Engine

↓

Export
```

Background Module berdiri sendiri.

---

# 15. Dependency Rules

Diizinkan:

```text
UI

↓

Hook

↓

Engine
```

Tidak diizinkan:

```text
Engine

↓

React
```

atau

```text
Engine

↓

Next.js
```

---

# 16. Extension Points

Arsitektur harus memungkinkan penambahan modul baru tanpa mengubah modul lama.

Contoh:

- Face Detection
- OCR
- Barcode
- QR Reader
- Image Enhancement

Semuanya menjadi modul independen.

---

# 17. Reusable Package Vision

Target jangka panjang.

```text
packages/

image-engine/

photo-ui/

face/

shared/
```

Photo Studio menjadi consumer pertama.

PhotoApp menjadi consumer kedua.

SISFO menjadi consumer ketiga.

---

# 18. Error Flow

```text
Engine

↓

Typed Error

↓

Hook

↓

Toast/Dialog
```

Engine tidak boleh menampilkan alert.

---

# 19. Memory Management

Setiap modul wajib:

- membersihkan object URL
- menghapus canvas sementara
- membebaskan bitmap yang tidak lagi digunakan
- menghindari salinan gambar yang tidak perlu
- memproses gambar secara bertahap untuk mengurangi penggunaan memori

---

# 20. Scalability Strategy

Arsitektur disiapkan untuk:

- Multiple Photo Presets
- Batch Processing
- Face Detection
- Background Replacement
- Library Extraction
- Mobile Application
- Desktop Application

Tanpa perlu mengubah struktur dasar proyek.

---

# 21. Architectural Constraints

Tidak diperbolehkan:

- Backend crop
- Backend resize
- Backend compress
- Backend AI
- Database
- Global mutable state
- Business logic di dalam komponen React
- Image processing di Presentation Layer

---

# 22. Definition of Architecture Success

Arsitektur dianggap berhasil apabila:

- UI dapat diganti tanpa mengubah Image Engine.
- Image Engine dapat digunakan di proyek lain tanpa modifikasi besar.
- Penambahan fitur baru tidak memerlukan perubahan signifikan pada modul yang sudah stabil.
- Setiap modul memiliki tanggung jawab yang jelas dan dapat diuji secara terpisah.
- Seluruh pipeline tetap memenuhi prinsip **100% client-side processing**.
