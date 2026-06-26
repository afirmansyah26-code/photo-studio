import { ViewState, CropRect } from "../types";
import { applyWithConstraints } from "./constraints";

export function applyRotation(
  degrees: number,
  currentState: ViewState,
  crop: CropRect,
  imageWidth: number,
  imageHeight: number
): ViewState {
  const newState: ViewState = {
    ...currentState,
    rotation: degrees
  };
  
  return applyWithConstraints(newState, currentState, crop, imageWidth, imageHeight);
}
