import { MeasurementField, ProductMeasurements } from '@/types/generator';

export const DEFAULT_PANTS_MEASUREMENTS: ProductMeasurements = {
  labelSize: '36X30',
  waist: '38',
  frontRise: '13.5',
  backRise: '15.5',
  hip: '47',
  thigh: '28',
  legOpening: '18',
  long: '42',
};

export const DEFAULT_MEASUREMENT_FIELDS: MeasurementField[] = [
  { id: 'labelSize', label: 'Label Size', value: '36X30' },
  { id: 'waist', label: 'Waist', value: '38' },
  { id: 'frontRise', label: 'Front Rise', value: '13.5' },
  { id: 'backRise', label: 'Back Rise', value: '15.5' },
  { id: 'hip', label: 'Hip', value: '47' },
  { id: 'thigh', label: 'Thigh', value: '28' },
  { id: 'legOpening', label: 'Leg Opening', value: '18' },
  { id: 'long', label: 'Long', value: '42' },
];

export const DEFAULT_OUTPUT_DIMENSIONS = {
  width: 1440,
  height: 1440,
};

export const PRESET_RESOLUTIONS = [
  { id: '1440x1440', label: '1440 × 1440 (Default)', width: 1440, height: 1440 },
  { id: '1080x1080', label: '1080 × 1080 (Square HD)', width: 1080, height: 1080 },
  { id: '2048x2048', label: '2048 × 2048 (4K Ultra)', width: 2048, height: 2048 },
  { id: 'custom', label: 'Custom Dimensions', width: 1440, height: 1440 },
] as const;

export const DEFAULT_DIVIDER_COLOR = '#ffffff';
export const DEFAULT_DIVIDER_WIDTH = 6;
export const DEFAULT_PANEL_BG = '#171717';
export const DEFAULT_PANEL_TEXT = '#ffffff';

export const SAMPLE_IMAGES = [
  {
    id: 'sample-1',
    url: '/samples/jeans-front.png',
    name: 'Sample Front View.png',
    width: 1024,
    height: 1024,
    aspectRatio: 1.0,
    isSample: true,
  },
  {
    id: 'sample-2',
    url: '/samples/jeans-back.png',
    name: 'Sample Back View.png',
    width: 1024,
    height: 1024,
    aspectRatio: 1.0,
    isSample: true,
  },
  {
    id: 'sample-3',
    url: '/samples/jeans-detail.png',
    name: 'Sample Tag Detail.png',
    width: 1024,
    height: 1024,
    aspectRatio: 1.0,
    isSample: true,
  },
  {
    id: 'sample-4',
    url: '/samples/jeans-leg.png',
    name: 'Sample Hem Detail.png',
    width: 1024,
    height: 1024,
    aspectRatio: 1.0,
    isSample: true,
  },
];
