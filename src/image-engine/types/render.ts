export interface ExportOptions {
  width: number;
  height: number;
  backgroundColor: string;
  imageSmoothingEnabled: boolean;
  imageSmoothingQuality: ImageSmoothingQuality;
  mimeType: string;
  quality: number;
}

export const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
  width: 600,
  height: 800,
  backgroundColor: "transparent",
  imageSmoothingEnabled: true,
  imageSmoothingQuality: "high",
  mimeType: "image/jpeg",
  quality: 0.95,
};

export interface JPEGOptions {
  mimeType: string;
  quality: number;
}

export const DEFAULT_JPEG_OPTIONS: JPEGOptions = {
  mimeType: "image/jpeg",
  quality: 0.95,
};

export interface CompressionOptions {
  targetBytes: number;
  minimumQuality: number;
  maximumQuality: number;
  maximumIterations: number;
}

export const DEFAULT_COMPRESSION_OPTIONS: CompressionOptions = {
  targetBytes: 200 * 1024, // 200 KB
  minimumQuality: 0.60,
  maximumQuality: 0.95,
  maximumIterations: 8,
};

export interface CompressionStatistics {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  iterations: number;
  quality: number;
}

export interface CompressionResult {
  blob: Blob;
  statistics: CompressionStatistics;
}
