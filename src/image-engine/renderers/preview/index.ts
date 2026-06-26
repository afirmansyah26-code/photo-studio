import { CanvasSurface, ImageInfo, CropRect, ViewState } from "../../types";
import { drawCropToContext } from "../core";

/**
 * Renders the specified crop region of the image onto the target CanvasSurface.
 * Designed for speed during the 60fps drag loop.
 * It adjusts the surface dimensions to match the crop for a 1:1 pixel mapping.
 */
export async function renderPreview(
  surface: CanvasSurface,
  imageInfo: ImageInfo,
  crop: CropRect,
  viewState: ViewState
): Promise<void> {
  const { width, height } = crop;

  // Adjust canvas dimension to match the crop for fast 1:1 pixel rendering
  surface.canvas.width = width;
  surface.canvas.height = height;

  // Clear previous rendering
  surface.context.clearRect(0, 0, width, height);

  // By default, preserve basic smoothing for preview
  surface.context.imageSmoothingEnabled = true;

  return drawCropToContext(surface.context, imageInfo, crop, viewState, width, height);
}
