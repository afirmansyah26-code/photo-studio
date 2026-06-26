# Photo Studio

> **100% Client-side Passport Photo Generator**
>
> Modern web application for creating standardized school passport photos directly in the browser.
>
> No backend. No database. No server-side image processing.

---

# Project Status

Current Version

**0.1.0 (Planning)**

Current Phase

**Documentation & Architecture**

Development Status

🟡 Documentation Complete

⏳ Implementation Not Started

---

# Vision

Photo Studio is designed to become more than a passport photo application.

The long-term vision is to build a reusable **Image Engine** that can power multiple applications across the education ecosystem.

Target applications include:

- Photo Studio
- PhotoApp
- SISFO
- School CMS
- Future Applications

---

# Core Principles

- ✅ 100% Client-side Processing
- ✅ Privacy First
- ✅ Static Hosting Friendly
- ✅ Framework Agnostic Image Engine
- ✅ Modular Architecture
- ✅ PWA Ready
- ✅ Production Ready

---

# Features

## Version 1

- Upload Image
- Drag & Drop
- Crop (3×4)
- Zoom
- Rotate
- Live Preview
- Auto Resize (600 × 800 px)
- Auto Compression
- Download JPEG
- Responsive UI
- Dark Mode
- PWA Support

---

# Technology Stack

Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

Browser APIs

- Canvas API
- File API
- Blob API
- Web Worker
- OffscreenCanvas (when available)

Deployment

- Static Export
- Shared Hosting
- NAS (ZimaOS)
- Docker
- Apache
- Nginx

---

# Project Architecture

```text
Browser
      │
      ▼
Next.js UI
      │
      ▼
Application Layer
      │
      ▼
Image Engine
      │
      ▼
Canvas API
```

The Image Engine is completely independent from React and is designed to become a reusable package.

---

# Documentation

Read documents in the following order.

## AI Agent

1. AGENTS.md
2. docs/PROJECT_STATUS.md
3. docs/IMPLEMENTATION_PHASE.md
4. Current Phase Prompt

---

## Developer

1. PROJECT_STATUS.md
2. PRD.md
3. TECHNICAL_SPEC.md
4. ARCHITECTURE.md
5. IMAGE_ENGINE.md
6. COMPONENT_GUIDE.md
7. UI_UX_GUIDE.md
8. PERFORMANCE.md
9. SECURITY.md
10. DEPLOYMENT.md
11. IMPLEMENTATION_PHASE.md

---

# Project Structure

```text
photo-studio/

AGENTS.md
README.md

docs/
    PROJECT_STATUS.md
    PRD.md
    TECHNICAL_SPEC.md
    ARCHITECTURE.md
    IMAGE_ENGINE.md
    COMPONENT_GUIDE.md
    UI_UX_GUIDE.md
    PERFORMANCE.md
    SECURITY.md
    DEPLOYMENT.md
    IMPLEMENTATION_PHASE.md
    CHANGELOG.md
    ROADMAP.md

src/
public/
```

---

# Development Workflow

```text
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
```

Documentation is always updated before implementation.

---

# Current Roadmap

## Version 1

Core Photo Studio

- Upload
- Crop
- Resize
- Compress
- Download

---

## Version 2

Productivity

- Safe Face Guide
- Batch Processing
- Queue Manager

---

## Version 3

AI

- Face Detection
- Auto Crop
- Face Validation

---

## Version 4

Studio

- Background Replacement
- Studio Presets
- Background Colors

---

## Version 5

Platform

- Image Engine Package
- Plugin System
- Ecosystem Integration

---

# Design Goals

The project is designed to be:

- Lightweight
- Fast
- Modular
- Reusable
- Accessible
- Easy to Deploy
- Easy to Maintain

---

# Deployment Targets

Photo Studio supports:

- Shared Hosting
- NAS (ZimaOS)
- Static Hosting
- Docker
- Apache
- Nginx

No backend services are required.

---

# Privacy

All image processing is performed locally inside the browser.

Photo Studio:

- Never uploads images.
- Never stores user photos.
- Never sends photos to third-party services.

Privacy is a core project principle.

---

# Contributing

Please read:

- CONTRIBUTING.md
- AGENTS.md

before contributing.

All contributions must follow the project architecture and implementation phases.

---

# License

MIT License

---

# Acknowledgements

Photo Studio is developed with a long-term vision of providing a reusable client-side Image Engine for education-focused applications.

The project prioritizes:

- Privacy
- Simplicity
- Performance
- Long-term Maintainability
