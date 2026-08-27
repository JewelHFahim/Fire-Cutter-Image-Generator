import { LayoutCell, LayoutMode } from '@/types/generator';

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CalculateLayoutOptions {
  imageCount: number;
  area: Area;
  layoutMode?: LayoutMode;
  aspectRatios?: number[];
}

export function calculateLayout(options: CalculateLayoutOptions): LayoutCell[] {
  const { imageCount, area, layoutMode = 'auto', aspectRatios = [] } = options;

  if (imageCount <= 0) return [];

  // Round dimensions to clean integers to prevent subpixel seams
  const x = Math.round(area.x);
  const y = Math.round(area.y);
  const w = Math.round(area.width);
  const h = Math.round(area.height);

  if (imageCount === 1) {
    return [{ x, y, width: w, height: h }];
  }

  // TWO IMAGES
  if (imageCount === 2) {
    if (layoutMode === 'aspect' && aspectRatios.length >= 2) {
      const ar1 = aspectRatios[0] || 1;
      const ar2 = aspectRatios[1] || 1;
      const totalRatio = ar1 + ar2;
      // Clamp split ratio between 0.35 and 0.65 to prevent extreme distortion
      let ratio1 = ar1 / totalRatio;
      ratio1 = Math.max(0.35, Math.min(0.65, ratio1));
      
      const w1 = Math.round(w * ratio1);
      const w2 = w - w1;
      return [
        { x, y, width: w1, height: h },
        { x: x + w1, y, width: w2, height: h },
      ];
    }

    // Default 50% / 50% split
    const halfW = Math.round(w / 2);
    return [
      { x, y, width: halfW, height: h },
      { x: x + halfW, y, width: w - halfW, height: h },
    ];
  }

  // THREE IMAGES
  if (imageCount === 3) {
    const halfH = Math.round(h / 2);
    const topRowH = halfH;
    const bottomRowH = h - halfH;

    const halfW = Math.round(w / 2);

    return [
      // Top Left
      { x, y, width: halfW, height: topRowH },
      // Top Right
      { x: x + halfW, y, width: w - halfW, height: topRowH },
      // Bottom Full Width
      { x, y: y + topRowH, width: w, height: bottomRowH },
    ];
  }

  // FOUR IMAGES (2 x 2 Grid)
  const halfW = Math.round(w / 2);
  const halfH = Math.round(h / 2);

  return [
    // Top Left
    { x, y, width: halfW, height: halfH },
    // Top Right
    { x: x + halfW, y, width: w - halfW, height: halfH },
    // Bottom Left
    { x, y: y + halfH, width: halfW, height: h - halfH },
    // Bottom Right
    { x: x + halfW, y: y + halfH, width: w - halfW, height: h - halfH },
  ];
}
