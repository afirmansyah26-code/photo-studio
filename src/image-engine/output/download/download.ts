/**
 * Triggers a file download natively using a temporary object URL.
 * Designed as a pure browser utility with no UI side effects.
 * 
 * @param blob The binary blob to download
 * @param filename The requested filename
 */
export function downloadBlob(blob: Blob, filename: string): void {
  // Create object URL (allocates memory in the browser)
  const url = URL.createObjectURL(blob);
  
  // Create hidden anchor
  const anchor = document.createElement("a");
  anchor.style.display = "none";
  anchor.href = url;
  anchor.download = filename;
  
  // Inject and click
  document.body.appendChild(anchor);
  anchor.click();
  
  // Cleanup memory
  // Small delay ensures the browser processes the click before revocation
  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 100);
}
