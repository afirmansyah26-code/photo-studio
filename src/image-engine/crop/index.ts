import { CropRect } from "../types";
import { FaceGuidePreset, STANDARD_PASSPORT_PRESET } from "./presets";

/**
 * Creates a default crop rectangle centered inside the image boundaries.
 * For Photo Studio, the default target ratio is 3:4. This function calculates
 * the maximum possible 3:4 rectangle that fits inside the given image dimensions.
 */
export function createDefaultCrop(imageWidth: number, imageHeight: number): CropRect {
  const targetRatio = 3 / 4;
  const imageRatio = imageWidth / imageHeight;

  let cropWidth = imageWidth;
  let cropHeight = imageHeight;

  if (imageRatio > targetRatio) {
    // Image is wider than 3:4. Height is the limiting factor.
    cropWidth = imageHeight * targetRatio;
  } else {
    // Image is taller than 3:4 (or exactly 3:4). Width is the limiting factor.
    cropHeight = imageWidth / targetRatio;
  }

  return {
    x: (imageWidth - cropWidth) / 2,
    y: (imageHeight - cropHeight) / 2,
    width: cropWidth,
    height: cropHeight,
  };
}

/**
 * Creates an immutable clone of a crop rectangle.
 */
export function cloneCrop(crop: CropRect): CropRect {
  return {
    x: crop.x,
    y: crop.y,
    width: crop.width,
    height: crop.height,
  };
}

/**
 * Normalizes a crop rectangle to ensure it remains strictly within the image boundaries.
 * It prevents negative coordinates and ensures the crop box doesn't overflow the image limits.
 */
export function normalizeCrop(crop: CropRect, imageWidth: number, imageHeight: number): CropRect {
  // 1. Ensure dimensions are positive
  let width = Math.max(0, crop.width);
  let height = Math.max(0, crop.height);

  // 2. Ensure dimensions don't exceed image limits
  width = Math.min(width, imageWidth);
  height = Math.min(height, imageHeight);

  // 3. Constrain coordinates
  // Left boundary
  let x = Math.max(0, crop.x);
  // Right boundary (x + width cannot exceed imageWidth)
  if (x + width > imageWidth) {
    x = imageWidth - width;
  }

  // Top boundary
  let y = Math.max(0, crop.y);
  // Bottom boundary (y + height cannot exceed imageHeight)
  if (y + height > imageHeight) {
    y = imageHeight - height;
  }

  return { x, y, width, height };
}

/**
 * Moves the crop rectangle by a specific delta, returning a new normalized crop rectangle.
 * 
 * @param crop The starting crop rectangle
 * @param deltaX The horizontal movement in image pixels
 * @param deltaY The vertical movement in image pixels
 * @param imageWidth The width of the original image
 * @param imageHeight The height of the original image
 * @returns A new, mathematically normalized crop rectangle
 */
export function moveCrop(
  crop: import("../types").CropRect, 
  deltaX: number, 
  deltaY: number, 
  imageWidth: number, 
  imageHeight: number
): import("../types").CropRect {
  const moved = {
    ...crop,
    x: crop.x + deltaX,
    y: crop.y + deltaY,
  };
  return normalizeCrop(moved, imageWidth, imageHeight);
}

/**
 * Unified resize helper for all 8 crop handles.
 * Mathematically guarantees the aspect ratio is preserved and boundaries are respected.
 * 
 * @param crop The starting crop rectangle
 * @param handle The resize handle being dragged
 * @param delta The pointer movement vector in image pixels
 * @param constraints Configuration including image dimensions, ratio, and min size
 * @returns A new, geometrically valid crop rectangle
 */
export function resizeCrop(
  crop: import("../types").CropRect,
  handle: import("../types").CropHandle,
  delta: import("../types").Vector,
  constraints: import("../types").CropConstraints
): import("../types").CropRect {
  if (handle === 'center') return crop; // Center is handled by moveCrop

  const { imageWidth, imageHeight, aspectRatio, minimumCropSize } = constraints;

  // 1. Determine absolute bounds based on the fixed anchors of the handle
  let maxWidth = imageWidth;
  let maxHeight = imageHeight;

  const right = crop.x + crop.width;
  const bottom = crop.y + crop.height;
  const centerX = crop.x + crop.width / 2;
  const centerY = crop.y + crop.height / 2;

  switch (handle) {
    case 'nw':
      maxWidth = right; maxHeight = bottom; break;
    case 'n':
      maxWidth = Math.min(centerX, imageWidth - centerX) * 2; maxHeight = bottom; break;
    case 'ne':
      maxWidth = imageWidth - crop.x; maxHeight = bottom; break;
    case 'w':
      maxWidth = right; maxHeight = Math.min(centerY, imageHeight - centerY) * 2; break;
    case 'e':
      maxWidth = imageWidth - crop.x; maxHeight = Math.min(centerY, imageHeight - centerY) * 2; break;
    case 'sw':
      maxWidth = right; maxHeight = imageHeight - crop.y; break;
    case 's':
      maxWidth = Math.min(centerX, imageWidth - centerX) * 2; maxHeight = imageHeight - crop.y; break;
    case 'se':
      maxWidth = imageWidth - crop.x; maxHeight = imageHeight - crop.y; break;
  }

  // The absolute maximum width we can grow to while strictly respecting aspect ratio
  // and not hitting ANY of the relevant image boundaries.
  const absoluteMaxWidth = Math.min(maxWidth, maxHeight * aspectRatio);

  // 2. Determine proposed width from the pointer delta
  let proposedWidth = crop.width;
  switch (handle) {
    case 'e': case 'ne': case 'se':
      proposedWidth = crop.width + delta.x; break;
    case 'w': case 'nw': case 'sw':
      proposedWidth = crop.width - delta.x; break;
    case 'n':
      proposedWidth = (crop.height - delta.y) * aspectRatio; break;
    case 's':
      proposedWidth = (crop.height + delta.y) * aspectRatio; break;
  }

  // 3. Clamp the width strictly between min size and absolute max size
  const newWidth = Math.min(Math.max(proposedWidth, minimumCropSize), absoluteMaxWidth);
  const newHeight = newWidth / aspectRatio;

  // 4. Recalculate origins based on the fixed anchors
  let newX = crop.x;
  let newY = crop.y;

  // X Origin
  switch (handle) {
    case 'nw': case 'w': case 'sw':
      newX = right - newWidth; break;
    case 'n': case 's':
      newX = centerX - newWidth / 2; break;
    case 'ne': case 'e': case 'se':
      newX = crop.x; break;
  }

  // Y Origin
  switch (handle) {
    case 'nw': case 'n': case 'ne':
      newY = bottom - newHeight; break;
    case 'w': case 'e':
      newY = centerY - newHeight / 2; break;
    case 'sw': case 's': case 'se':
      newY = crop.y; break;
  }

  return normalizeCrop({ x: newX, y: newY, width: newWidth, height: newHeight }, imageWidth, imageHeight);
}


/**
 * Calculates absolute face guide coordinates relative to the original image dimensions.
 * Utilizes a preset (defaults to STANDARD_PASSPORT_PRESET) to determine proportions.
 */
export function calculateFaceGuides(
  crop: import("../types").CropRect, 
  preset: FaceGuidePreset = STANDARD_PASSPORT_PRESET
): import("../types").FaceGuides {
  
  const headSafeMargin = (1 - preset.headWidthPercent) / 2;

  return {
    topMarginY: crop.y + crop.height * preset.topMarginPercent,
    eyeLineY: crop.y + crop.height * preset.eyeLinePercent,
    chinLimitY: crop.y + crop.height * preset.chinLimitPercent,
    headSafeLeftX: crop.x + crop.width * headSafeMargin,
    headSafeRightX: crop.x + crop.width * (1 - headSafeMargin),
  };
}
