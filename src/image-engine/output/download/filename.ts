export interface FilenameOptions {
  prefix?: string;
  extension?: string;
  timestamp?: Date;
}

/**
 * Generates a standardized filename for exports.
 * Default format: prefix_YYYYMMDD_HHmmss.extension
 * Example: pasfoto_20260626_093015.jpg
 */
export function generateFilename(options?: FilenameOptions): string {
  const prefix = options?.prefix ?? "pasfoto";
  const ext = options?.extension ?? "jpg";
  const date = options?.timestamp ?? new Date();

  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const timestampString = `${yyyy}${MM}${dd}_${HH}${mm}${ss}`;
  
  return `${prefix}_${timestampString}.${ext}`;
}
