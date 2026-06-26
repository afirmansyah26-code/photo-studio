import { ViewState, CropRect } from "../types";
import { applyWithConstraints } from "./constraints";

export function applyPan(
  deltaX: number,
  deltaY: number,
  currentState: ViewState,
  crop: CropRect,
  imageWidth: number,
  imageHeight: number
): ViewState {
  const newState: ViewState = {
    ...currentState,
    offsetX: currentState.offsetX + deltaX,
    offsetY: currentState.offsetY + deltaY
  };
  
  return applyWithConstraints(newState, currentState, crop, imageWidth, imageHeight);
}
