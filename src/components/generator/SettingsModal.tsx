'use client';

import React, { useEffect } from 'react';
import { X, Settings2 } from 'lucide-react';
import { ImageFit, LayoutMode, OutputPreset } from '@/types/generator';
import { LayoutControls } from './LayoutControls';
import { OutputControls } from './OutputControls';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;

  // Layout props
  layoutMode: LayoutMode;
  onLayoutModeChange: (mode: LayoutMode) => void;
  imageFit: ImageFit;
  onImageFitChange: (fit: ImageFit) => void;
  dividerWidth: number;
  onDividerWidthChange: (w: number) => void;
  dividerColor: string;
  onDividerColorChange: (c: string) => void;

  // Output props
  preset: OutputPreset;
  onPresetChange: (p: OutputPreset) => void;
  customWidth: number;
  onCustomWidthChange: (v: number) => void;
  customHeight: number;
  onCustomHeightChange: (v: number) => void;
  currentWidth: number;
  currentHeight: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  layoutMode,
  onLayoutModeChange,
  imageFit,
  onImageFitChange,
  dividerWidth,
  onDividerWidthChange,
  dividerColor,
  onDividerColorChange,
  preset,
  onPresetChange,
  customWidth,
  onCustomWidthChange,
  customHeight,
  onCustomHeightChange,
  currentWidth,
  currentHeight,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        className="relative ml-auto h-full w-full max-w-sm bg-zinc-50 dark:bg-zinc-950 shadow-2xl flex flex-col overflow-hidden border-l border-zinc-200 dark:border-zinc-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <LayoutControls
            layoutMode={layoutMode}
            onLayoutModeChange={onLayoutModeChange}
            imageFit={imageFit}
            onImageFitChange={onImageFitChange}
            dividerWidth={dividerWidth}
            onDividerWidthChange={onDividerWidthChange}
            dividerColor={dividerColor}
            onDividerColorChange={onDividerColorChange}
          />
          <OutputControls
            preset={preset}
            onPresetChange={onPresetChange}
            customWidth={customWidth}
            onCustomWidthChange={onCustomWidthChange}
            customHeight={customHeight}
            onCustomHeightChange={onCustomHeightChange}
            currentWidth={currentWidth}
            currentHeight={currentHeight}
          />
        </div>
      </aside>
    </div>
  );
};
