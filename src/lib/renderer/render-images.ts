import { ImageFit, LayoutCell } from '@/types/generator';
import { drawImageContain, drawImageCover } from '../image/image-fit';

export function renderImages(
  ctx: CanvasRenderingContext2D,
  images: (HTMLImageElement | ImageBitmap)[],
  cells: LayoutCell[],
  imageFit: ImageFit = 'contain',
  cellBackgroundColor: string = '#ffffff'
): void {
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const img = images[i];

    if (!img) {
      // Clear cell background if image missing
      ctx.fillStyle = cellBackgroundColor;
      ctx.fillRect(
        Math.round(cell.x),
        Math.round(cell.y),
        Math.round(cell.width),
        Math.round(cell.height)
      );
      continue;
    }

    if (imageFit === 'cover') {
      drawImageCover(ctx, img, cell.x, cell.y, cell.width, cell.height);
    } else {
      drawImageContain(
        ctx,
        img,
        cell.x,
        cell.y,
        cell.width,
        cell.height,
        cellBackgroundColor
      );
    }
  }
}
