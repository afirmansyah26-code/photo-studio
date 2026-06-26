import { Point, CropRect, CropHandle, InteractionState } from "../types";

/**
 * Creates a default, inactive interaction state.
 */
export function createDefaultInteractionState(): InteractionState {
  return {
    isHovering: false,
    isActive: false,
    isDragging: false,
    isRotating: false,
    selectedHandle: null,
    pointer: {
      current: { x: 0, y: 0 },
      start: null,
    }
  };
}

/**
 * Determines which part of the crop rectangle (if any) a given point intersects.
 * 
 * @param pointer Absolute coordinate of the pointer in image space
 * @param crop The current crop rectangle
 * @param handleThreshold Maximum distance in pixels from an edge/corner to be considered a hit
 * @returns The specific CropHandle hit, or null if the pointer is outside the crop area entirely.
 */
export function hitTest(pointer: Point, crop: CropRect, handleThreshold: number): CropHandle | null {
  const { x, y } = pointer;
  const { x: cx, y: cy, width: cw, height: ch } = crop;

  // Calculate distance from edges
  const distLeft = Math.abs(x - cx);
  const distRight = Math.abs(x - (cx + cw));
  const distTop = Math.abs(y - cy);
  const distBottom = Math.abs(y - (cy + ch));

  const isLeft = distLeft <= handleThreshold;
  const isRight = distRight <= handleThreshold;
  const isTop = distTop <= handleThreshold;
  const isBottom = distBottom <= handleThreshold;

  // Check if inside the overall crop bounds (including threshold halo)
  const isInside = 
    x >= cx - handleThreshold && 
    x <= cx + cw + handleThreshold && 
    y >= cy - handleThreshold && 
    y <= cy + ch + handleThreshold;

  if (!isInside) {
    return null; // completely outside
  }

  // 1. Check Corners first (highest priority for diagonal resizing)
  if (isTop && isLeft) return 'nw';
  if (isTop && isRight) return 'ne';
  if (isBottom && isLeft) return 'sw';
  if (isBottom && isRight) return 'se';

  // 2. Check Edges (vertical/horizontal resizing)
  // Ensure the pointer is within the actual length of the edge, not just infinitely along its axis
  const withinHorizontalEdges = x >= cx && x <= cx + cw;
  const withinVerticalEdges = y >= cy && y <= cy + ch;

  if (isTop && withinHorizontalEdges) return 'n';
  if (isBottom && withinHorizontalEdges) return 's';
  if (isLeft && withinVerticalEdges) return 'w';
  if (isRight && withinVerticalEdges) return 'e';

  // 3. Inside the crop box (panning)
  // If it's inside the bounds and didn't hit an edge/corner, it must be the center
  return 'center';
}
