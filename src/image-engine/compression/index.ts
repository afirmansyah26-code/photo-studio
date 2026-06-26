import { CanvasSurface, CompressionOptions, CompressionResult, DEFAULT_COMPRESSION_OPTIONS } from "../types";
import { encodeJPEG } from "../encoders/jpeg";

/**
 * Compresses a canvas surface into a JPEG Blob, attempting to hit a target file size 
 * while maintaining the highest possible quality using a binary search.
 * 
 * @param surface The canvas surface to compress.
 * @param options Target bytes and quality boundaries.
 * @param onProgress Optional callback for reporting compression progress (future-proofing).
 * @returns A CompressionResult containing the Blob and statistics.
 */
export async function compressJPEG(
  surface: CanvasSurface,
  options?: Partial<CompressionOptions>,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  const opts = { ...DEFAULT_COMPRESSION_OPTIONS, ...options };
  let minQ = opts.minimumQuality;
  let maxQ = opts.maximumQuality;
  
  // 1. Establish Baseline (Original Size at Max Quality)
  const initialBlob = await encodeJPEG(surface, { quality: maxQ });
  const originalSize = initialBlob.size;
  
  // If even max quality fits, return immediately
  if (originalSize <= opts.targetBytes) {
    return {
      blob: initialBlob,
      statistics: {
        originalSize,
        compressedSize: originalSize,
        compressionRatio: 1.0,
        iterations: 1,
        quality: maxQ
      }
    };
  }
  
  // 2. Binary Search Optimization
  let bestBlob = initialBlob;
  let bestQuality = maxQ;
  let iterations = 1;
  
  for (let i = 0; i < opts.maximumIterations; i++) {
    iterations++;
    const midQ = minQ + (maxQ - minQ) / 2;
    const blob = await encodeJPEG(surface, { quality: midQ });
    
    // Future-proofing: report progress
    if (onProgress) {
      onProgress(iterations / (opts.maximumIterations + 1));
    }
    
    if (blob.size <= opts.targetBytes) {
      // Valid candidate (under budget), try to push quality higher
      bestBlob = blob;
      bestQuality = midQ;
      minQ = midQ;
    } else {
      // Still too big, push quality lower
      maxQ = midQ;
    }
    
    // Stop early if search bounds converge tightly
    if (maxQ - minQ < 0.01) {
      break;
    }
  }
  
  // Fallback: If after all iterations we never found a Blob <= targetBytes,
  // bestBlob will still be the last valid one (or initialBlob if all failed).
  // Note: if the image is too complex, even minimumQuality might exceed targetBytes.
  // In production, we might want to scale the canvas down, but for V1 we just return best effort.
  
  return {
    blob: bestBlob,
    statistics: {
      originalSize,
      compressedSize: bestBlob.size,
      compressionRatio: bestBlob.size / originalSize,
      iterations,
      quality: bestQuality
    }
  };
}
