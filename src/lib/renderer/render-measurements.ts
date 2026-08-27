import { MeasurementField } from '@/types/generator';

export interface MeasurementPanelOptions {
  panelY: number;
  panelHeight: number;
  canvasWidth: number;
  measurements: MeasurementField[];
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
}

export function formatMeasurementLine(label: string, value: string, isFirstField: boolean): string {
  const cleanValue = value || '—';
  // Standard specification: First field formatted as "Label 36X30", remaining as "Waist: 38"
  if (isFirstField || label.toLowerCase().includes('label')) {
    return `${label} ${cleanValue}`.trim();
  }
  return `${label}: ${cleanValue}`.trim();
}

export function drawMeasurementPanel(
  ctx: CanvasRenderingContext2D,
  options: MeasurementPanelOptions
): void {
  const {
    panelY,
    panelHeight,
    canvasWidth,
    measurements,
    backgroundColor = '#171717',
    textColor = '#ffffff',
    fontFamily = 'Arial, Helvetica, sans-serif',
  } = options;

  // Draw panel background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, Math.round(panelY), Math.round(canvasWidth), Math.round(panelHeight));

  if (!measurements || measurements.length === 0) return;

  // Divide fields into Left and Right columns
  const midPoint = Math.ceil(measurements.length / 2);
  const leftFields = measurements.slice(0, midPoint);
  const rightFields = measurements.slice(midPoint);

  // Resolution scaling factor relative to baseline 1440px reference canvas
  const scale = canvasWidth / 1440;

  // Proportional font styling matching reference image specs
  const fontSize = Math.round(33 * scale);
  const lineGap = Math.round(52 * scale);

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const maxRows = Math.max(leftFields.length, rightFields.length);
  const totalTextHeight = (maxRows - 1) * lineGap;

  // Vertically center content inside panel
  const startY = panelY + (panelHeight - totalTextHeight) / 2;

  // Column X centers (25% and 75% of canvas width)
  const leftColumnX = Math.round(canvasWidth * 0.25);
  const rightColumnX = Math.round(canvasWidth * 0.75);

  // Render Left Column
  leftFields.forEach((field, index) => {
    const isFirst = index === 0; // First item overall (Label Size)
    const lineText = formatMeasurementLine(field.label, field.value, isFirst);
    const rowY = Math.round(startY + index * lineGap);

    // Font weight: Semi-bold for clean crisp text matching reference
    ctx.font = `600 ${fontSize}px ${fontFamily}`;
    ctx.fillText(lineText, leftColumnX, rowY);
  });

  // Render Right Column
  rightFields.forEach((field, index) => {
    const isFirst = false;
    const lineText = formatMeasurementLine(field.label, field.value, isFirst);
    const rowY = Math.round(startY + index * lineGap);

    ctx.font = `600 ${fontSize}px ${fontFamily}`;
    ctx.fillText(lineText, rightColumnX, rowY);
  });
}
