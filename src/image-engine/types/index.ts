export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  orientation?: number;
  fileSize: number;
  mimeType: string;
  fileName: string;
}

export interface ImageInfo {
  file: File;
  metadata: ImageMetadata;
  bitmap?: ImageBitmap;
  createdAt: number;
}

export interface ImageSession {
  image: ImageInfo;
  previewUrl: string;
}

export interface ValidationOptions {
  maxSizeBytes: number;
  allowedMimeTypes: string[];
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface CanvasSurface {
  canvas: HTMLCanvasElement | OffscreenCanvas;
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  width: number;
  height: number;
  dispose: () => void;
}

export interface TransformState {
  scale: number;
  rotation: number;
  translateX: number;
  translateY: number;
}

export interface ViewState {
  zoom: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export const DEFAULT_VIEW_STATE: ViewState = {
  zoom: 1,
  rotation: 0,
  offsetX: 0,
  offsetY: 0
};

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceGuides {
  topMarginY: number;
  chinLimitY: number;
  eyeLineY: number;
  headSafeLeftX: number;
  headSafeRightX: number;
}

export interface Point {
  x: number;
  y: number;
}

export type CropHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'center';

export interface PointerState {
  current: Point;
  start: Point | null;
}

export interface InteractionState {
  isHovering: boolean;
  isActive: boolean;
  isDragging: boolean;
  isRotating: boolean;
  selectedHandle: CropHandle | null;
  pointer: PointerState;
}

export interface Vector {
  x: number;
  y: number;
}

export interface CropConstraints {
  imageWidth: number;
  imageHeight: number;
  aspectRatio: number;
  minimumCropSize: number;
}

export * from './render';

export type ItemStatus = "not_edited" | "editing" | "ready" | "downloaded";

export interface LibraryItem {
  id: string;
  file: File;
  thumbnailUrl: string; // Object URL for quick preview
  metadata?: ImageMetadata; // Cached metadata to avoid re-decoding
  status: ItemStatus;
  crop?: CropRect;
  viewState?: ViewState;
}
