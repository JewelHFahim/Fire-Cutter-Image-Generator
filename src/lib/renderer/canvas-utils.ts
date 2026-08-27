import { LayoutCell } from '@/types/generator';

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  fillColor: string = '#ffffff'
): void {
  ctx.fillStyle = fillColor;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Draws cell divider lines based on calculated layout cell boundaries.
 */
export function drawCellDividers(
  ctx: CanvasRenderingContext2D,
  cells: LayoutCell[],
  dividerColor: string = '#ffffff',
  dividerWidth: number = 6,
  scaleFactor: number = 1
): void {
  if (cells.length <= 1) return;

  const actualWidth = Math.max(1, Math.round(dividerWidth * scaleFactor));
  ctx.fillStyle = dividerColor;

  // Find unique vertical divider X boundaries between adjacent cells
  const xBoundaries = new Set<number>();
  const yBoundaries = new Set<number>();

  for (let i = 0; i < cells.length; i++) {
    const c1 = cells[i];
    for (let j = i + 1; j < cells.length; j++) {
      const c2 = cells[j];

      // Check vertical boundary (same X junction)
      if (Math.abs(c1.x + c1.width - c2.x) < 2) {
        xBoundaries.add(Math.round(c1.x + c1.width));
      } else if (Math.abs(c2.x + c2.width - c1.x) < 2) {
        xBoundaries.add(Math.round(c2.x + c2.width));
      }

      // Check horizontal boundary (same Y junction)
      if (Math.abs(c1.y + c1.height - c2.y) < 2) {
        yBoundaries.add(Math.round(c1.y + c1.height));
      } else if (Math.abs(c2.y + c2.height - c1.y) < 2) {
        yBoundaries.add(Math.round(c2.y + c2.height));
      }
    }
  }

  // Calculate top/bottom Y bounds of cell area
  let minY = Infinity;
  let maxY = -Infinity;
  let minX = Infinity;
  let maxX = -Infinity;

  cells.forEach((c) => {
    minY = Math.min(minY, c.y);
    maxY = Math.max(maxY, c.y + c.height);
    minX = Math.min(minX, c.x);
    maxX = Math.max(maxX, c.x + c.width);
  });

  // Draw Vertical Dividers
  xBoundaries.forEach((xPos) => {
    const drawX = Math.round(xPos - actualWidth / 2);
    ctx.fillRect(drawX, Math.round(minY), actualWidth, Math.round(maxY - minY));
  });

  // Draw Horizontal Dividers
  yBoundaries.forEach((yPos) => {
    const drawY = Math.round(yPos - actualWidth / 2);
    ctx.fillRect(Math.round(minX), drawY, Math.round(maxX - minX), actualWidth);
  });
}
