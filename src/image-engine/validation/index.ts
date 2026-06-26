import { ValidationResult, ValidationOptions } from "../types";

const DEFAULT_OPTIONS: ValidationOptions = {
  maxSizeBytes: 15 * 1024 * 1024, // 15 MB
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
};

export function validateImage(
  file: File, 
  options: ValidationOptions = DEFAULT_OPTIONS
): ValidationResult {
  if (!file) {
    return { isValid: false, error: "No file provided." };
  }

  if (!options.allowedMimeTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: `Unsupported file type: ${file.type}. Allowed types: ${options.allowedMimeTypes.join(", ")}.` 
    };
  }

  if (file.size > options.maxSizeBytes) {
    const maxMb = (options.maxSizeBytes / (1024 * 1024)).toFixed(0);
    return { 
      isValid: false, 
      error: `File is too large. Maximum size is ${maxMb} MB.` 
    };
  }

  return { isValid: true };
}
