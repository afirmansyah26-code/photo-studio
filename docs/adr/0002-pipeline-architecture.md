# ADR-0002

# Pipeline-based Image Engine

Status

Accepted

Date

2026-06-26

---

# Context

The project requires:

- Crop
- Resize
- Compress
- Export

Future versions will add:

- Face Detection
- Background Replacement
- Batch Processing

A monolithic image-processing function would become difficult to maintain.

---

# Decision

Image Engine will use a **Pipeline Architecture**.

Processing stages:

```text
Load
   ↓
Normalize
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

Each stage:

- has one responsibility
- is independently testable
- is framework agnostic
- does not know other stages

---

# Consequences

## Positive

- Highly reusable.
- Easy to test.
- Easy to extend.
- Supports future AI modules.
- Suitable for package extraction.

## Negative

- Slightly more architectural complexity.
- More interfaces must be maintained.

---

# Alternatives Considered

Single utility functions.

Rejected.

Reason:

Would become difficult to extend for future versions.

---

# Decision Summary

Pipeline Architecture is adopted as the foundation of the Image Engine.
