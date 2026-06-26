import { CanvasSurface, ImageInfo, CropRect, ExportOptions, DEFAULT_EXPORT_OPTIONS, ViewState } from "../../types";
import { drawCropToContext } from "../core";

/**
 * Renders the final exported passport photo into the given CanvasSurface.
 * Prioritizes high quality over rendering speed.
 * 
 * @param surface The target CanvasSurface allocated by React
 * @param imageInfo The source image
 * @param crop The dimensions to crop
 * @param options Export configuration (width, height, background color, smoothing, etc.)
 */
export async function renderExport(
  surface: CanvasSurface,
  imageInfo: ImageInfo,
  crop: CropRect,
  viewState: ViewState,
  options?: Partial<ExportOptions>
): Promise<void> {
  const mergedOptions = { ...DEFAULT_EXPORT_OPTIONS, ...options };
  const { width, height, backgroundColor, imageSmoothingEnabled, imageSmoothingQuality } = mergedOptions;

  // Configure the output size
  surface.canvas.width = width;
  surface.canvas.height = height;

  // Clear or fill background
  if (backgroundColor === "transparent") {
    surface.context.clearRect(0, 0, width, height);
  } else {
    surface.context.fillStyle = backgroundColor;
    surface.context.fillRect(0, 0, width, height);
  }

  // Set high-quality interpolation
  surface.context.imageSmoothingEnabled = imageSmoothingEnabled;
  if (imageSmoothingEnabled) {
    surface.context.imageSmoothingQuality = imageSmoothingQuality;
  }

  return drawCropToContext(surface.context, imageInfo, crop, viewState, width, height);
}
