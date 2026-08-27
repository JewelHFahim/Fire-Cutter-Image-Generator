'use client';

import React from 'react';
import { Download, FileImage, RefreshCw, Shirt, Settings2 } from 'lucide-react';

interface GeneratorToolbarProps {
  canvas: HTMLCanvasElement | null;
  labelSize: string;
  onReset: () => void;
  canExport: boolean;
  onOpenSettings: () => void;
}

export const GeneratorToolbar: React.FC<GeneratorToolbarProps> = ({
  canvas,
  labelSize,
  onReset,
  canExport,
  onOpenSettings,
}) => {
  const sanitizeFilename = (name: string): string => {
    const clean = name.replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-+/g, '-');
    return clean || '36X30';
  };

  const handleDownload = (format: 'png' | 'jpg') => {
    if (!canvas) return;

    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const quality = format === 'jpg' ? 0.95 : undefined;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const filename = `product-${sanitizeFilename(labelSize)}.${format}`;
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      mimeType,
      quality
    );
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 lg:p-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
          <Shirt className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Fire Cutter Image Generator
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Create high-resolution studio measurement sheets locally in your browser
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        {/* Settings */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
          title="Layout & resolution settings"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
          title="Reset generator state"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        {/* JPG Export */}
        <button
          type="button"
          disabled={!canExport || !canvas}
          onClick={() => handleDownload('jpg')}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FileImage className="w-4 h-4 text-amber-500" />
          <span>Export JPG</span>
        </button>

        {/* PNG Export Primary */}
        <button
          type="button"
          disabled={!canExport || !canvas}
          onClick={() => handleDownload('png')}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all scale-100 hover:scale-[1.02] disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          <span>Download PNG</span>
        </button>
      </div>
    </header>
  );
};
