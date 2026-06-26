import { CanvasSurface, ImageInfo } from "../types";

/**
 * Creates a minimal CanvasSurface abstraction.
 * Prefers OffscreenCanvas for performance if available, falls back to HTMLCanvasElement.
 */
export function createCanvasSurface(width: number, height: number): CanvasSurface {
  let canvas: HTMLCanvasElement | OffscreenCanvas;
  let context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;

  if (typeof OffscreenCanvas !== "undefined") {
    canvas = new OffscreenCanvas(width, height);
    context = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D | null;
  } else {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d") as CanvasRenderingContext2D | null;
  }

  if (!context) {
    throw new Error("Failed to initialize 2D rendering context.");
  }

  const dispose = () => {
    // Reset dimensions to 0 to encourage aggressive GPU memory cleanup
    canvas.width = 0;
    canvas.height = 0;
  };

  return {
    canvas,
    context,
    width,
    height,
    dispose,
  };
}

/**
 * Draws the original image onto the provided CanvasSurface without any modifications.
 * Uses the pre-decoded ImageBitmap if available, otherwise safely falls back to HTMLImageElement.
 */
export async function drawImage(surface: CanvasSurface, imageInfo: ImageInfo): Promise<void> {
  const { width, height } = imageInfo.metadata;

  if (imageInfo.bitmap) {
    // Fast path: draw directly from the pre-decoded bitmap
    surface.context.drawImage(imageInfo.bitmap, 0, 0, width, height);
    return;
  }

  // Fallback path: load into an HTMLImageElement then draw
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageInfo.file);

    img.onload = () => {
      surface.context.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve();
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image onto canvas surface."));
    };

    img.src = url;
  });
}


