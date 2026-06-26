# UI_UX_GUIDE.md

# UI / UX Design Guide

## Photo Studio

Version: 1.0

Status: Draft

---

# 1. Design Philosophy

Photo Studio dirancang berdasarkan prinsip:

- Simple
- Functional
- Fast
- Consistent
- Accessible
- Responsive

Tujuan utama UI adalah membantu pengguna menyelesaikan proses pembuatan pas foto secepat mungkin dengan jumlah langkah seminimal mungkin.

---

# 2. Design Principles

## Minimize Cognitive Load

Pengguna tidak perlu mempelajari aplikasi.

Setiap fitur harus mudah ditemukan.

---

## One Primary Task

Pada satu waktu pengguna hanya fokus pada satu pekerjaan.

Contoh:

Upload

↓

Crop

↓

Download

Tidak ada menu yang mengganggu alur utama.

---

## Direct Manipulation

Semua perubahan dilakukan secara langsung.

Contoh:

- Drag crop
- Zoom slider
- Rotate slider
- Live Preview

Tidak memerlukan tombol "Apply" untuk melihat hasil.

---

## Immediate Feedback

Setiap aksi memberikan umpan balik secara langsung.

Contoh:

- Preview berubah real-time.
- Loading muncul saat proses berat.
- Error ditampilkan secara jelas.

---

# 3. Visual Style

Tema desain:

Modern Minimalist

Inspirasi:

- Figma
- Canva
- Adobe Express
- Apple Human Interface Guidelines

Fokus pada ruang kosong (whitespace) dan keterbacaan.

---

# 4. Color System

Gunakan semantic color.

Contoh:

Primary

Secondary

Success

Warning

Danger

Background

Surface

Border

Muted

Jangan menggunakan warna secara langsung di komponen.

Gunakan design tokens.

---

# 5. Typography

Gunakan satu keluarga font modern.

Hierarchy:

Display

Heading

Title

Body

Caption

Gunakan ukuran yang konsisten dan mudah dibaca.

---

# 6. Spacing System

Gunakan skala spacing tetap.

Contoh:

4

8

12

16

24

32

48

64

Seluruh layout mengikuti skala tersebut.

---

# 7. Border Radius

Gunakan radius yang konsisten.

Small

Medium

Large

Round

Tidak menggunakan radius acak.

---

# 8. Shadows

Gunakan maksimal tiga tingkat bayangan.

Small

Medium

Large

Shadow hanya digunakan untuk menunjukkan elevasi.

---

# 9. Icons

Gunakan satu library ikon.

Aturan:

- ukuran konsisten
- stroke konsisten
- mudah dikenali
- tidak dekoratif berlebihan

---

# 10. Layout System

Desktop menggunakan tiga area utama.

```text
┌────────────────────────────────────────────────────────────┐
│ Header                                                     │
├───────────────┬─────────────────────────────┬──────────────┤
│ Toolbar       │ Crop Workspace              │ Preview      │
│               │                             │              │
│               │                             │              │
│               │                             │              │
├───────────────┴─────────────────────────────┴──────────────┤
│ Footer / Status                                             │
└────────────────────────────────────────────────────────────┘
```

---

# 11. Responsive Layout

Desktop

Toolbar kiri

Workspace tengah

Preview kanan

Tablet

Toolbar atas

Workspace

Preview bawah

Mobile

Layout vertikal.

Semua panel dapat digulir.

---

# 12. Main User Flow

```text
Upload

↓

Crop

↓

Adjust

↓

Preview

↓

Download
```

Tidak boleh ada langkah tambahan yang tidak diperlukan.

---

# 13. Upload Area

Dropzone harus:

- besar
- mudah ditemukan
- mendukung drag & drop
- mendukung klik untuk memilih file

Tampilkan format yang didukung.

---

# 14. Crop Workspace

Workspace adalah fokus utama aplikasi.

Harus menampilkan:

- gambar
- crop area
- face guide (V2)
- grid
- background checker bila diperlukan

---

# 15. Preview Panel

Preview selalu terlihat.

Menampilkan hasil akhir 600 × 800.

Perubahan diperbarui secara langsung.

---

# 16. Toolbar

Toolbar berisi kontrol utama.

V1

- Upload
- Zoom
- Rotate
- Reset
- Download

V2

- Face Guide
- Batch
- Preset

---

# 17. Controls

Gunakan kontrol yang sesuai.

Zoom

Slider

Rotate

Slider + Input Number

Download

Primary Button

Reset

Secondary Button

---

# 18. Buttons

Jenis tombol.

Primary

Aksi utama.

Secondary

Aksi pendukung.

Ghost

Toolbar.

Danger

Aksi destruktif.

Ukuran:

Small

Default

Large

---

# 19. Dialog

Gunakan dialog untuk:

- konfirmasi reset
- informasi
- error besar

Jangan gunakan dialog untuk proses normal.

---

# 20. Toast

Gunakan toast untuk:

- download selesai
- file berhasil dimuat
- error ringan
- proses selesai

Toast tidak boleh menghalangi pekerjaan pengguna.

---

# 21. Loading States

Gunakan loading hanya saat diperlukan.

Contoh:

- resize
- compress
- export

Gunakan progress bila proses berlangsung cukup lama.

---

# 22. Error States

Error harus:

- jelas
- singkat
- memberi solusi

Contoh:

"Format file tidak didukung."

"Ukuran file terlalu besar."

---

# 23. Empty State

Saat belum ada gambar.

Tampilkan:

- ilustrasi sederhana
- tombol upload
- area drag & drop
- petunjuk singkat

---

# 24. Accessibility

Target:

- Keyboard Navigation
- Screen Reader
- Focus Indicator
- Kontras warna memadai
- Target sentuh minimal 44 × 44 px

---

# 25. Dark Mode

Aplikasi mendukung:

Light Mode

Dark Mode

Gunakan semantic color.

Jangan menggunakan warna tetap pada komponen.

---

# 26. Animations

Animasi digunakan untuk:

- dialog
- toast
- loading
- hover
- transisi panel

Durasi singkat dan tidak mengganggu produktivitas.

---

# 27. Component Design System

Komponen dasar.

Button

Card

Dialog

Input

Slider

Tooltip

Toast

Badge

Dropdown

Separator

Panel

Toolbar

Semua menggunakan pola desain yang konsisten.

---

# 28. UI Performance

Target:

- Interaksi terasa responsif.
- Tidak ada jeda yang mengganggu saat manipulasi gambar.
- Animasi tetap halus pada perangkat kelas menengah.

---

# 29. Future UI

Versi 2

Safe Face Guide

Batch Queue

History Panel

Versi 3

Face Detection Overlay

Auto Crop Suggestion

Versi 4

Background Replacement Panel

Preset Background

---

# 30. Definition of Good UX

UI dianggap berhasil apabila:

- Pengguna baru dapat menyelesaikan proses tanpa membaca dokumentasi.
- Seluruh alur utama dapat dilakukan dalam beberapa langkah sederhana.
- Hasil selalu terlihat melalui preview sebelum diunduh.
- Kontrol utama mudah dijangkau pada desktop maupun perangkat bergerak.
- Tampilan tetap konsisten di seluruh aplikasi dan mudah dikembangkan pada versi berikutnya.
