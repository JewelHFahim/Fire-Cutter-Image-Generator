/**
 * Draws an image inside a bounding cell preserving aspect ratio without cropping (contain).
 * Center-aligns the image within the target cell.
 */
export function drawImageContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | ImageBitmap,
  cellX: number,
  cellY: number,
  cellWidth: number,
  cellHeight: number,
  backgroundColor: string = '#ffffff'
): void {
  const imgW = img.width;
  const imgH = img.height;

  if (imgW === 0 || imgH === 0) return;

  // Fill cell background first
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(Math.round(cellX), Math.round(cellY), Math.round(cellWidth), Math.round(cellHeight));

  const imgAspect = imgW / imgH;
  const cellAspect = cellWidth / cellHeight;

  let drawW: number;
  let drawH: number;

  if (imgAspect > cellAspect) {
    // Image is wider than cell ratio
    drawW = cellWidth;
    drawH = cellWidth / imgAspect;
  } else {
    // Image is taller than cell ratio
    drawH = cellHeight;
    drawW = cellHeight * imgAspect;
  }

  // Center inside cell
  const drawX = cellX + (cellWidth - drawW) / 2;
  const drawY = cellY + (cellHeight - drawH) / 2;

  ctx.drawImage(
    img,
    Math.round(drawX),
    Math.round(drawY),
    Math.round(drawW),
    Math.round(drawH)
  );
}

/**
 * Draws an image filling the cell area completely (cover), cropping excess edges centered.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | ImageBitmap,
  cellX: number,
  cellY: number,
  cellWidth: number,
  cellHeight: number
): void {
  const imgW = img.width;
  const imgH = img.height;

  if (imgW === 0 || imgH === 0) return;

  const imgAspect = imgW / imgH;
  const cellAspect = cellWidth / cellHeight;

  let srcX = 0;
  let srcY = 0;
  let srcW = imgW;
  let srcH = imgH;

  if (imgAspect > cellAspect) {
    // Image is wider than cell -> crop sides
    srcW = imgH * cellAspect;
    srcX = (imgW - srcW) / 2;
  } else {
    // Image is taller than cell -> crop top & bottom
    srcH = imgW / cellAspect;
    srcY = (imgH - srcH) / 2;
  }

  ctx.drawImage(
    img,
    Math.round(srcX),
    Math.round(srcY),
    Math.round(srcW),
    Math.round(srcH),
    Math.round(cellX),
    Math.round(cellY),
    Math.round(cellWidth),
    Math.round(cellHeight)
  );
}
