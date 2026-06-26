import { ImageMetadata } from "../types";

export interface DecodeResult {
  metadata: ImageMetadata;
  bitmap?: ImageBitmap;
}

/**
 * Extracts metadata from an image file and optionally retains the decoded ImageBitmap.
 * Prefers createImageBitmap for performance, falls back to HTMLImageElement.
 */
export async function extractMetadata(file: File): Promise<DecodeResult> {
  let width = 0;
  let height = 0;
  let bitmap: ImageBitmap | undefined;

  if (typeof createImageBitmap !== "undefined") {
    try {
      bitmap = await createImageBitmap(file);
      width = bitmap.width;
      height = bitmap.height;
    } catch (err) {
      // Fallback to Image element if bitmap decoding fails
      return extractMetadataFallback(file);
    }
  } else {
    return extractMetadataFallback(file);
  }

  return {
    metadata: {
      width,
      height,
      aspectRatio: width / height,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      // orientation is optional and omitted until EXIF parsing is implemented
    },
    bitmap,
  };
}

function extractMetadataFallback(file: File): Promise<DecodeResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        metadata: {
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
        }
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to decode image metadata."));
    };

    img.src = url;
  });
}
