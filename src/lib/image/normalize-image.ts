import { UploadedImage } from '@/types/generator';
import { getFileDimensions } from './load-image';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file format (${file.type || 'unknown'}). Please upload JPEG, PNG, or WEBP.`,
    };
  }

  // Max 25MB limit per file for browser performance
  if (file.size > 25 * 1024 * 1024) {
    return {
      valid: false,
      error: `File size too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is 25MB.`,
    };
  }

  return { valid: true };
}

export async function processUploadedFile(file: File): Promise<UploadedImage> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const { width, height, url } = await getFileDimensions(file);

  return {
    id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    file,
    url,
    name: file.name,
    width,
    height,
    aspectRatio: width / height,
  };
}
