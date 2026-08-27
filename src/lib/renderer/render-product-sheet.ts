import { RenderOptions } from '@/types/generator';
import { calculateLayout } from '../layout/calculate-layout';
import { clearCanvas, drawCellDividers } from './canvas-utils';
import { renderImages } from './render-images';
import { drawMeasurementPanel } from './render-measurements';

export async function renderProductSheet(
  options: RenderOptions
): Promise<HTMLCanvasElement> {
  const {
    width,
    height,
    images,
    measurements,
    layoutMode = 'auto',
    imageFit = 'contain',
    dividerColor = '#ffffff',
    dividerWidth = 6,
    panelBackgroundColor = '#171717',
    panelTextColor = '#ffffff',
  } = options;

  if (typeof window === 'undefined') {
    throw new Error('Canvas rendering must execute in client browser context');
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) {
    throw new Error('Canvas 2D context is not available');
  }

  // Enable high quality image scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Calculate image area & measurement panel area dynamically based on resolution
  const panelHeight = Math.round(height * (300 / 1440));
  const imageAreaHeight = height - panelHeight;

  const imageArea = {
    x: 0,
    y: 0,
    width,
    height: imageAreaHeight,
  };

  // 2. Clear background
  clearCanvas(ctx, width, height, '#ffffff');

  // 3. Extract aspect ratios from loaded images for aspect layout mode
  const aspectRatios = images.map((img) => img.width / (img.height || 1));

  // 4. Calculate layout cell geometries
  const cells = calculateLayout({
    imageCount: images.length,
    area: imageArea,
    layoutMode,
    aspectRatios,
  });

  // 5. Draw product images in layout cells
  renderImages(ctx, images, cells, imageFit, '#ffffff');

  // 6. Draw layout cell white dividers
  const dividerScale = width / 1440;
  drawCellDividers(ctx, cells, dividerColor, dividerWidth, dividerScale);

  // 7. Draw bottom dark measurement panel
  drawMeasurementPanel(ctx, {
    panelY: imageAreaHeight,
    panelHeight,
    canvasWidth: width,
    measurements,
    backgroundColor: panelBackgroundColor,
    textColor: panelTextColor,
  });

  return canvas;
}
