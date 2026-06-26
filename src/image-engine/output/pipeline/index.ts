import { ImageInfo, CropRect, ExportOptions, CompressionOptions, CompressionResult, DEFAULT_EXPORT_OPTIONS, ViewState } from "../../types";
import { createCanvasSurface } from "../../canvas";
import { renderExport } from "../../renderers/export";
import { compressJPEG } from "../../compression";

/**
 * Orchestrates the full export pipeline:
 * Surface Allocation -> Render -> Encode -> Compress -> Cleanup.
 * 
 * Ensures memory is strictly managed and disposed of, even on failure.
 * 
 * @param imageInfo The source image
 * @param crop The dimensions to crop
 * @param exportOptions Dimensions and rendering settings
 * @param compressionOptions Binary search compression targets
 * @returns CompressionResult (blob + statistics)
 */
export async function executeExportPipeline(
  imageInfo: ImageInfo,
  crop: CropRect,
  viewState: ViewState,
  exportOptions?: Partial<ExportOptions>,
  compressionOptions?: Partial<CompressionOptions>
): Promise<CompressionResult> {
  const width = exportOptions?.width ?? DEFAULT_EXPORT_OPTIONS.width;
  const height = exportOptions?.height ?? DEFAULT_EXPORT_OPTIONS.height;
  
  // 1. Allocate temporary memory surface
  const surface = createCanvasSurface(width, height);
  
  try {
    // 2. Render perfectly cropped high-quality image
    await renderExport(surface, imageInfo, crop, viewState, exportOptions);
    
    // 3. Compress to hit target bytes via binary search
    const result = await compressJPEG(surface, compressionOptions);
    
    return result;
  } finally {
    // 4. Guarantee memory cleanup (regardless of success/failure)
    surface.dispose();
  }
}
