'use client';

import React from 'react';
import { ImageFit, LayoutMode } from '@/types/generator';
import { LayoutGrid } from 'lucide-react';
import { LAYOUT_PRESETS } from '@/lib/layout/layout-presets';

interface LayoutControlsProps {
  layoutMode: LayoutMode;
  onLayoutModeChange: (mode: LayoutMode) => void;
  imageFit: ImageFit;
  onImageFitChange: (fit: ImageFit) => void;
  dividerWidth: number;
  onDividerWidthChange: (width: number) => void;
  dividerColor: string;
  onDividerColorChange: (color: string) => void;
}

export const LayoutControls: React.FC<LayoutControlsProps> = ({
  layoutMode,
  onLayoutModeChange,
  imageFit,
  onImageFitChange,
  dividerWidth,
  onDividerWidthChange,
  dividerColor,
  onDividerColorChange,
}) => {
  return (
    <div className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center gap-2">
        <LayoutGrid className="w-4 h-4 text-emerald-500" />
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Layout & Formatting Options
        </h3>
      </div>

      {/* Image Fitting Mode */}
      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
          <span>Image Fitting</span>
          <span className="text-[11px] text-zinc-500 font-normal">
            {imageFit === 'contain' ? 'Preserve entire product' : 'Fill cell (crop edge)'}
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onImageFitChange('contain')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
              imageFit === 'contain'
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            Contain (Default)
          </button>
          <button
            type="button"
            onClick={() => onImageFitChange('cover')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
              imageFit === 'cover'
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            Cover (Crop)
          </button>
        </div>
      </div>

      {/* Layout Mode */}
      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Grid Layout Engine
        </label>
        <div className="space-y-1.5">
          {LAYOUT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onLayoutModeChange(preset.id)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                layoutMode === preset.id
                  ? 'border-emerald-500 bg-emerald-500/10 text-zinc-900 dark:text-zinc-100'
                  : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <div>
                <p className="text-xs font-semibold">{preset.name}</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {preset.description}
                </p>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  layoutMode === preset.id
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-zinc-400'
                }`}
              >
                {layoutMode === preset.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Divider customization */}
      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Divider Width ({dividerWidth}px)
          </label>
          <input
            type="range"
            min={0}
            max={20}
            value={dividerWidth}
            onChange={(e) => onDividerWidthChange(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Divider Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={dividerColor}
              onChange={(e) => onDividerColorChange(e.target.value)}
              className="w-7 h-7 rounded-md border border-zinc-300 dark:border-zinc-700 cursor-pointer bg-transparent"
            />
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase">
              {dividerColor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
