import { ViewState, CropRect, CropHandle, Point } from "../types";
import { applyZoom } from "./zoom";

export function applyResize(
  handle: CropHandle,
  pointerCurrent: Point,
  currentState: ViewState,
  crop: CropRect,
  imageWidth: number,
  imageHeight: number
): ViewState {
  if (handle === 'center') return currentState;

  let focalX = 0;
  let focalY = 0;
  let dOld = 1;
  let dNew = 1;

  // Determine focal point (opposite anchor) and distances
  switch (handle) {
    case 'nw':
      focalX = crop.x + crop.width;
      focalY = crop.y + crop.height;
      dOld = Math.hypot(crop.width, crop.height);
      dNew = Math.hypot(focalX - pointerCurrent.x, focalY - pointerCurrent.y);
      break;
    case 'se':
      focalX = crop.x;
      focalY = crop.y;
      dOld = Math.hypot(crop.width, crop.height);
      dNew = Math.hypot(pointerCurrent.x - focalX, pointerCurrent.y - focalY);
      break;
    case 'ne':
      focalX = crop.x;
      focalY = crop.y + crop.height;
      dOld = Math.hypot(crop.width, crop.height);
      dNew = Math.hypot(pointerCurrent.x - focalX, focalY - pointerCurrent.y);
      break;
    case 'sw':
      focalX = crop.x + crop.width;
      focalY = crop.y;
      dOld = Math.hypot(crop.width, crop.height);
      dNew = Math.hypot(focalX - pointerCurrent.x, pointerCurrent.y - focalY);
      break;
    case 'n':
      focalX = crop.x + crop.width / 2;
      focalY = crop.y + crop.height;
      dOld = crop.height;
      dNew = focalY - pointerCurrent.y;
      break;
    case 's':
      focalX = crop.x + crop.width / 2;
      focalY = crop.y;
      dOld = crop.height;
      dNew = pointerCurrent.y - focalY;
      break;
    case 'w':
      focalX = crop.x + crop.width;
      focalY = crop.y + crop.height / 2;
      dOld = crop.width;
      dNew = focalX - pointerCurrent.x;
      break;
    case 'e':
      focalX = crop.x;
      focalY = crop.y + crop.height / 2;
      dOld = crop.width;
      dNew = pointerCurrent.x - focalX;
      break;
  }

  // Prevent negative or zero distances which would invert or break zoom
  if (dNew < 10) dNew = 10;

  // Image scales inversely to crop box drag.
  // If user drags NW out, dNew > dOld, so ratio < 1 (image shrinks).
  const ratio = dOld / dNew;
  const targetZoom = currentState.zoom * ratio;

  // We apply the zoom around the fixed focal point (the opposite handle)
  return applyZoom(targetZoom, focalX, focalY, currentState, crop, imageWidth, imageHeight);
}
