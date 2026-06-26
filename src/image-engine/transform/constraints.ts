import { ViewState, CropRect } from "../types";
import { Matrix, identity, multiply, translate, scale, rotate, invert, transformPoint } from "./matrix";

/**
 * Builds the transformation matrix that maps from local image space to viewport/screen space.
 */
export function getTransformMatrix(viewState: ViewState, imageWidth: number, imageHeight: number): Matrix {
  const cx = imageWidth / 2;
  const cy = imageHeight / 2;
  
  let m = identity();
  m = multiply(m, translate(viewState.offsetX, viewState.offsetY));
  m = multiply(m, translate(cx, cy));
  m = multiply(m, scale(viewState.zoom));
  m = multiply(m, rotate(viewState.rotation));
  m = multiply(m, translate(-cx, -cy));
  
  return m;
}

/**
 * Checks if a given ViewState is valid.
 * A ViewState is valid if the crop viewport never reveals the empty background.
 * In other words, all 4 corners of the crop rectangle must map to coordinates
 * inside the [0, imageWidth] x [0, imageHeight] bounds of the raw image.
 */
export function validateConstraints(
  viewState: ViewState, 
  crop: CropRect, 
  imageWidth: number, 
  imageHeight: number
): boolean {
  const m = getTransformMatrix(viewState, imageWidth, imageHeight);
  const mInv = invert(m);
  
  const corners = [
    { x: crop.x, y: crop.y },
    { x: crop.x + crop.width, y: crop.y },
    { x: crop.x, y: crop.y + crop.height },
    { x: crop.x + crop.width, y: crop.y + crop.height }
  ];
  
  for (const corner of corners) {
    const local = transformPoint(mInv, corner);
    // Add a tiny epsilon to handle floating point inaccuracies
    if (local.x < -0.1 || local.x > imageWidth + 0.1 || local.y < -0.1 || local.y > imageHeight + 0.1) {
      return false; // Out of bounds
    }
  }
  
  return true;
}

/**
 * Attempts to apply a view state, but falls back to the previous state if constraints fail.
 * Note: A more advanced implementation might "clamp" the pan, but falling back is safer
 * and prevents jitter during rotation/zoom.
 */
export function applyWithConstraints(
  newState: ViewState,
  oldState: ViewState,
  crop: CropRect,
  imageWidth: number,
  imageHeight: number
): ViewState {
  if (validateConstraints(newState, crop, imageWidth, imageHeight)) {
    return newState;
  }
  
  // Try relaxing: if we just panned out of bounds, maybe we can clamp it?
  // Clamping in 2D with rotation is complex, so for UX Sprint 02 we prevent the state.
  return oldState;
}
