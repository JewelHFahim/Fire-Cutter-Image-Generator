export interface ProductMeasurements {
  labelSize: string;
  waist: string;
  frontRise: string;
  backRise: string;
  hip: string;
  thigh: string;
  legOpening: string;
  long: string;
}

export interface MeasurementField {
  id: string;
  label: string;
  value: string;
}

export interface UploadedImage {
  id: string;
  file?: File;
  url: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: number;
  isSample?: boolean;
}

export type LayoutMode = 'auto' | 'equal' | 'aspect';

export type ImageFit = 'contain' | 'cover';

export type OutputPreset = '1440x1440' | '1080x1080' | '2048x2048' | 'custom';

export interface OutputDimensions {
  width: number;
  height: number;
}

export interface LayoutCell {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TypographySettings {
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  color: string;
  lineHeight: number;
}

export interface RenderOptions {
  width: number;
  height: number;
  images: (HTMLImageElement | ImageBitmap)[];
  measurements: MeasurementField[];
  layoutMode: LayoutMode;
  imageFit: ImageFit;
  dividerColor?: string;
  dividerWidth?: number;
  panelBackgroundColor?: string;
  panelTextColor?: string;
}
