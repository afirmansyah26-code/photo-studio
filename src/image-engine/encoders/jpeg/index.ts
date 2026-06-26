import { CanvasSurface, JPEGOptions, DEFAULT_JPEG_OPTIONS } from "../../types";

/**
 * Converts a CanvasSurface into a JPEG Blob.
 * Handles both OffscreenCanvas and HTMLCanvasElement gracefully.
 * 
 * @param surface The canvas surface containing the rendered export image.
 * @param options Encoding configuration (mimeType, quality).
 * @returns A Promise resolving to the binary Blob representing the JPEG.
 */
export function encodeJPEG(
  surface: CanvasSurface,
  options?: Partial<JPEGOptions>
): Promise<Blob> {
  const mergedOptions = { ...DEFAULT_JPEG_OPTIONS, ...options };
  
  return new Promise((resolve, reject) => {
    try {
      if (typeof OffscreenCanvas !== "undefined" && surface.canvas instanceof OffscreenCanvas) {
        // OffscreenCanvas natively returns a Promise for convertToBlob
        surface.canvas.convertToBlob({
          type: mergedOptions.mimeType,
          quality: mergedOptions.quality
        }).then(resolve).catch(reject);
      } else if (surface.canvas instanceof HTMLCanvasElement) {
        // HTMLCanvasElement uses callback-based toBlob
        surface.canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas toBlob returned null. Canvas may be empty or tainted."));
            }
          },
          mergedOptions.mimeType,
          mergedOptions.quality
        );
      } else {
        reject(new Error("Unsupported canvas type. Must be HTMLCanvasElement or OffscreenCanvas."));
      }
    } catch (err) {
      reject(err);
    }
  });
}
