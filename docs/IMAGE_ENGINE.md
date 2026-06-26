# IMAGE_ENGINE.md

# Image Engine Specification

Version: 1.0

Status: Draft

---

# 1. Purpose

Image Engine merupakan inti (Core) dari Photo Studio.

Engine bertanggung jawab terhadap seluruh proses manipulasi gambar tanpa bergantung pada:

- React
- Next.js
- Tailwind CSS
- UI Framework

Engine hanya mengenal:

- Image
- Canvas
- Bitmap
- Blob
- Geometry
- Browser API

Target akhirnya adalah menjadi library independen yang dapat digunakan oleh berbagai aplikasi.

---

# 2. Design Goals

Image Engine harus memiliki karakteristik berikut:

- Stateless
- Modular
- Reusable
- Framework Agnostic
- Type Safe
- Testable
- High Performance
- Memory Efficient

---

# 3. Core Principles

## Pure Processing

Setiap proses hanya menerima input dan menghasilkan output.

Tidak boleh memiliki efek samping yang tidak diperlukan.

---

## Immutable Data

Input tidak boleh diubah.

Setiap transformasi menghasilkan objek baru.

---

## Pipeline Based

Semua manipulasi gambar dilakukan melalui pipeline.

```text
Image

↓

Stage

↓

Stage

↓

Stage

↓

Output
```

Setiap Stage hanya mengetahui input dan output.

---

## Single Responsibility

Satu Stage hanya melakukan satu pekerjaan.

Contoh:

Crop Stage

↓

Crop saja.

---

# 4. Engine Architecture

```text
Input Image

↓

Validation

↓

Decode

↓

Normalize

↓

Pipeline

↓

Export

↓

Blob
```

Pipeline tidak mengetahui UI.

Pipeline tidak mengetahui Browser Layout.

Pipeline hanya mengetahui Image Data.

---

# 5. Engine Folder Structure

```text
image-engine/

index.ts

pipeline/

stages/

canvas/

geometry/

validation/

export/

compression/

resize/

rotation/

crop/

types/

constants/

errors/

utils/
```

---

# 6. Pipeline Concept

Pipeline terdiri dari beberapa Stage.

Contoh:

```text
Load

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
```

Pipeline dapat berubah sesuai kebutuhan.

---

# 7. Stage Architecture

Setiap Stage memiliki kontrak yang sama.

```text
Input

↓

Process

↓

Output
```

Tidak boleh membaca state global.

Tidak boleh bergantung pada Stage lain.

---

# 8. Processing Stages

## Validation Stage

Tugas:

- Validasi format
- Validasi ukuran file
- Validasi dimensi
- Validasi MIME Type

---

## Decode Stage

Mengubah File menjadi objek yang siap diproses.

Output:

ImageBitmap atau HTMLImageElement.

---

## Normalize Stage

Melakukan:

- membaca orientasi gambar jika tersedia
- normalisasi dimensi
- normalisasi koordinat

Tahap ini memastikan seluruh proses berikutnya bekerja pada sistem koordinat yang konsisten.

---

## Crop Stage

Input:

Image

Crop Area

Output:

Canvas

Tidak mengetahui Resize.

---

## Rotate Stage

Input:

Canvas

Rotation

Output:

Canvas

---

## Resize Stage

Input:

Canvas

Output:

600 × 800 px.

---

## Compression Stage

Input:

Canvas

Output:

JPEG Blob

Target:

< 200 KB untuk sebagian besar foto yang memenuhi syarat.

---

## Export Stage

Menghasilkan:

Blob

↓

Download

↓

Preview

---

# 9. Geometry Module

Geometry bertanggung jawab terhadap seluruh perhitungan.

Contoh:

- Coordinate
- Aspect Ratio
- Scaling
- Rotation Matrix
- Bounding Box

UI tidak boleh menghitung geometri sendiri.

---

# 10. Canvas Module

Canvas Module bertugas:

- membuat canvas
- draw image
- transform
- clear
- clone
- cleanup

Tidak mengetahui Crop Logic.

---

# 11. Compression Module

Target:

- kualitas tetap baik
- ukuran file efisien
- proses cepat

Strategi:

- resize terlebih dahulu
- baru compress

---

# 12. Export Module

Export mendukung:

V1

- JPEG

Roadmap

- PNG
- WEBP

---

# 13. Error Handling

Gunakan Typed Error.

Contoh:

ImageTooLargeError

InvalidFormatError

CropOutOfBoundsError

CompressionFailedError

WorkerTimeoutError

---

# 14. Worker Integration

Resize dan Compression dapat dipindahkan ke Worker.

```text
Main Thread

↓

Worker

↓

Result
```

UI tidak mengetahui Worker.

---

# 15. Memory Management

Setiap Stage wajib:

- membebaskan Canvas sementara
- membebaskan Bitmap
- menghapus Object URL
- menghindari salinan data yang tidak diperlukan

Target:

memori tetap stabil walaupun memproses gambar beresolusi tinggi.

---

# 16. Engine Types

Contoh tipe utama.

ImageInput

CropArea

Rotation

CanvasData

PipelineContext

EngineResult

ImageMetadata

---

# 17. Extension System

Stage baru dapat ditambahkan.

Contoh:

Face Detection

↓

Pipeline

↓

Crop

atau

Background Removal

↓

Pipeline

↓

Export

Tidak mengubah Stage lama.

---

# 18. Future AI Integration

AI bukan bagian Engine.

AI hanya menghasilkan data.

Contoh:

```text
Face Detection

↓

Suggested Crop

↓

Crop Stage
```

Engine tetap independen.

---

# 19. Testing Strategy

Setiap Stage diuji secara terpisah.

Contoh:

Crop Test

Resize Test

Compress Test

Rotate Test

Geometry Test

Pipeline Test

---

# 20. Performance Targets

Crop:

Respons instan pada perangkat modern.

Resize:

Tetap responsif untuk foto resolusi tinggi.

Compression:

Waktu pemrosesan tetap konsisten sesuai kemampuan perangkat.

Tidak boleh memblokir UI untuk proses yang dapat dipindahkan ke Worker.

---

# 21. Public API Vision

Target package.

```ts
loadImage();

crop();

rotate();

resize();

compress();

exportJPEG();

runPipeline();
```

Seluruh API bersifat asynchronous bila operasi berpotensi memerlukan waktu.

---

# 22. Future Package Structure

```text
@photo-studio/image-engine

├── crop
├── resize
├── compress
├── rotate
├── export
├── geometry
├── canvas
├── pipeline
├── worker
└── types
```

Photo Studio hanya menjadi salah satu consumer.

---

# 23. Engine Rules

Engine tidak boleh:

- mengimpor React
- mengimpor Next.js
- mengimpor Tailwind
- mengakses DOM di luar kebutuhan Canvas
- menggunakan localStorage
- melakukan request jaringan
- mengetahui UI

Engine hanya bertugas memproses gambar.

---

# 24. Definition of Done

Image Engine dianggap selesai apabila:

- Seluruh stage dapat digunakan secara independen.
- Pipeline dapat dikonfigurasi tanpa mengubah implementasi stage.
- Seluruh modul dapat diuji secara terpisah.
- Tidak ada ketergantungan pada framework UI.
- Seluruh proses memenuhi prinsip 100% client-side processing.
