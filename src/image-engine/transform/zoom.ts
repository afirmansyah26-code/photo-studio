import { ViewState, CropRect } from "../types";
import { applyWithConstraints } from "./constraints";

/**
 * Applies zoom to the image, keeping a specific screen point fixed.
 * If no point is provided, zooms relative to the center of the viewport (crop center).
 */
export function applyZoom(
  newZoom: number,
  focalX: number,
  focalY: number,
  currentState: ViewState,
  crop: CropRect,
  imageWidth: number,
  imageHeight: number
): ViewState {
  const zOld = currentState.zoom;
  const zNew = Math.max(0.25, Math.min(newZoom, 5.0)); // Clamp between 25% and 500%
  
  if (zOld === zNew) return currentState;

  // C_old is the center of the transformation in screen space
  const cxOld = imageWidth / 2 + currentState.offsetX;
  const cyOld = imageHeight / 2 + currentState.offsetY;

  // v is the vector from C_old to the focal point, normalized by old zoom
  const vx = (focalX - cxOld) / zOld;
  const vy = (focalY - cyOld) / zOld;

  // C_new is the new center of the transformation in screen space
  const cxNew = focalX - vx * zNew;
  const cyNew = focalY - vy * zNew;

  const newState: ViewState = {
    ...currentState,
    zoom: zNew,
    offsetX: cxNew - imageWidth / 2,
    offsetY: cyNew - imageHeight / 2
  };
  
  return applyWithConstraints(newState, currentState, crop, imageWidth, imageHeight);
}
