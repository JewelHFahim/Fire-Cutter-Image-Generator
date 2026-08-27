'use client';

import React from 'react';
import { OutputPreset } from '@/types/generator';
import { PRESET_RESOLUTIONS } from '@/constants/generator';
import { Monitor } from 'lucide-react';

interface OutputControlsProps {
  preset: OutputPreset;
  onPresetChange: (preset: OutputPreset) => void;
  customWidth: number;
  onCustomWidthChange: (val: number) => void;
  customHeight: number;
  onCustomHeightChange: (val: number) => void;
  currentWidth: number;
  currentHeight: number;
}

export const OutputControls: React.FC<OutputControlsProps> = ({
  preset,
  onPresetChange,
  customWidth,
  onCustomWidthChange,
  customHeight,
  onCustomHeightChange,
  currentWidth,
  currentHeight,
}) => {
  return (
    <div className="space-y-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Canvas Resolution
          </h3>
        </div>
        <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
          {currentWidth} × {currentHeight} px
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PRESET_RESOLUTIONS.map((res) => (
          <button
            key={res.id}
            type="button"
            onClick={() => onPresetChange(res.id as OutputPreset)}
            className={`py-2 px-2.5 text-xs font-medium rounded-lg border transition-all text-left flex flex-col justify-between ${
              preset === res.id
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            <span className="font-semibold">{res.label.split(' ')[0]}</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
              {res.width} × {res.height}
            </span>
          </button>
        ))}
      </div>

      {preset === 'custom' && (
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Width (px)
            </label>
            <input
              type="number"
              min={400}
              max={4096}
              value={customWidth}
              onChange={(e) => onCustomWidthChange(Number(e.target.value))}
              className="w-full px-2.5 py-1 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Height (px)
            </label>
            <input
              type="number"
              min={400}
              max={4096}
              value={customHeight}
              onChange={(e) => onCustomHeightChange(Number(e.target.value))}
              className="w-full px-2.5 py-1 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
      )}
    </div>
  );
};
