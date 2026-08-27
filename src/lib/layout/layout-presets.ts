import { LayoutMode } from '@/types/generator';

export interface LayoutPreset {
  id: LayoutMode;
  name: string;
  description: string;
}

export const LAYOUT_PRESETS: LayoutPreset[] = [
  {
    id: 'auto',
    name: 'Auto / Recommended',
    description: 'Optimal standard layout based on number of uploaded images',
  },
  {
    id: 'equal',
    name: 'Equal Grid',
    description: 'Strict 50/50 and 2x2 symmetrical grids',
  },
  {
    id: 'aspect',
    name: 'Aspect Proportional',
    description: 'Dynamically balances cell widths using image dimensions',
  },
];
