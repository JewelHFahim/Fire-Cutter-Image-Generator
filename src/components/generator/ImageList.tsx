'use client';

import React from 'react';
import { UploadedImage } from '@/types/generator';
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface ImageListProps {
  images: UploadedImage[];
  onRemove: (id: string) => void;
  onReorder: (newImages: UploadedImage[]) => void;
}

export const ImageList: React.FC<ImageListProps> = ({
  images,
  onRemove,
  onReorder,
}) => {
  if (images.length === 0) return null;

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    onReorder(updated);
  };

  return (
    <div className="space-y-1.5">
      {images.map((img, index) => (
        <div
          key={img.id}
          className="flex items-center gap-3 px-2.5 py-2 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 rounded-xl transition-all hover:border-zinc-300 dark:hover:border-zinc-600"
        >
          {/* Position badge */}
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-bold text-[11px] text-zinc-500 dark:text-zinc-400 shrink-0">
            {index + 1}
          </span>

          {/* Thumbnail */}
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
          </div>

          {/* Name + dimensions */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">
              {img.name}
            </p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
              {img.width} × {img.height}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => moveItem(index, 'up')}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg disabled:opacity-25 disabled:hover:bg-transparent transition-colors"
              title="Move up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={index === images.length - 1}
              onClick={() => moveItem(index, 'down')}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg disabled:opacity-25 disabled:hover:bg-transparent transition-colors"
              title="Move down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onRemove(img.id)}
              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Remove image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
