/**
 * Loads an image from a URL or Object URL into an HTMLImageElement or ImageBitmap.
 * Handles EXIF orientation using createImageBitmap when available.
 */
export async function loadImageFromSource(
  sourceUrl: string
): Promise<HTMLImageElement | ImageBitmap> {
  // Try createImageBitmap first for performance and automatic EXIF orientation normalization
  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    try {
      const response = await fetch(sourceUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
      // Try using createImageBitmap with EXIF orientation support if options supported
      try {
        return await createImageBitmap(blob, { imageOrientation: 'from-image' } as ImageBitmapOptions);
      } catch {
        return await createImageBitmap(blob);
      }
    } catch (e) {
      // Fallback to standard Image loading below if fetch/createImageBitmap fails
      console.warn('createImageBitmap fallback to HTMLImageElement:', e);
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from source: ${sourceUrl}`));
    img.src = sourceUrl;
  });
}

/**
 * Utility to extract dimensions of an uploaded File safely
 */
export function getFileDimensions(
  file: File
): Promise<{ width: number; height: number; url: string }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        url: objectUrl,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to read file: ${file.name}`));
    };
    img.src = objectUrl;
  });
}
