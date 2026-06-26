import { CropRect, ImageInfo, ViewState } from "../types";

/**
 * Shared core drawing helper used by both Preview and Export renderers.
 * It maps the specified crop region of the source image onto the target context.
 */
export async function drawCropToContext(
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  imageInfo: ImageInfo,
  crop: CropRect,
  viewState: ViewState,
  destWidth: number,
  destHeight: number
): Promise<void> {
  const { x, y, width, height } = crop;
  const imageWidth = imageInfo.metadata.width;
  const imageHeight = imageInfo.metadata.height;

  // We are mapping the "crop" viewport (in un-transformed image space) 
  // to the entire destination canvas (destWidth x destHeight).
  const scaleX = destWidth / width;
  const scaleY = destHeight / height;

  context.save();
  
  // 1. Map the destination so that the crop top-left (x, y) becomes origin (0, 0)
  context.scale(scaleX, scaleY);
  context.translate(-x, -y);

  // 2. Apply the ViewState transformations identical to CSS in the Workspace
  const cx = imageWidth / 2;
  const cy = imageHeight / 2;
  
  context.translate(viewState.offsetX, viewState.offsetY);
  context.translate(cx, cy);
  context.scale(viewState.zoom, viewState.zoom);
  context.rotate((viewState.rotation * Math.PI) / 180);
  context.translate(-cx, -cy);

  // 3. Helper to actually perform the drawing and restore context
  const drawAndRestore = (drawable: CanvasImageSource) => {
    context.drawImage(drawable, 0, 0, imageWidth, imageHeight);
    context.restore();
  };

  if (imageInfo.bitmap) {
    // Fast path: draw from ImageBitmap directly
    drawAndRestore(imageInfo.bitmap);
    return;
  }

  // Fallback path: Object URL to Image element
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageInfo.file);

    img.onload = () => {
      drawAndRestore(img);
      URL.revokeObjectURL(url);
      resolve();
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to render crop onto context."));
    };

    img.src = url;
  });
}
