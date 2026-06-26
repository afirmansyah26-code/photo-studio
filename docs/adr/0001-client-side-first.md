# ADR-0001

# Client-side First Architecture

Status

Accepted

Date

2026-06-26

---

# Context

The application is intended to run on:

- Shared Hosting
- NAS (ZimaOS)
- Static Hosting

The project must remain lightweight and preserve user privacy.

Traditional server-side image processing would increase infrastructure complexity and expose user images to the server.

---

# Decision

All image manipulation will be performed **inside the browser**.

This includes:

- Upload
- Crop
- Rotate
- Resize
- Compress
- Export

No backend processing is allowed.

---

# Consequences

## Positive

- Better privacy.
- Lower hosting cost.
- No server load.
- Easy deployment.
- Offline capability.
- Compatible with static hosting.

## Negative

- Browser memory must be managed carefully.
- Heavy processing must use Web Workers.
- Browser compatibility must be considered.

---

# Alternatives Considered

Server-side processing

Rejected.

Reason:

Contradicts the project's core principles.

---

# Decision Summary

Photo Studio is a **Client-side First** application.

This decision is considered permanent unless the project vision changes fundamentally.
