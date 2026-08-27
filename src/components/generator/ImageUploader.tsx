'use client';

import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { processUploadedFile } from '@/lib/image/normalize-image';
import { UploadedImage } from '@/types/generator';

interface ImageUploaderProps {
  images: UploadedImage[];
  onImagesAdd: (newImages: UploadedImage[]) => void;
  onLoadSamples: () => void;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onImagesAdd,
  onLoadSamples,
  maxImages = 4,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const canAddMore = images.length < maxImages;
  const isFull = images.length >= maxImages;

  const handleFiles = async (files: FileList | File[]) => {
    setErrorMessage(null);
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    if (images.length + fileArray.length > maxImages) {
      setErrorMessage(`Maximum ${maxImages} images allowed. You currently have ${images.length}.`);
      return;
    }

    setIsLoading(true);
    const processed: UploadedImage[] = [];
    const errors: string[] = [];

    for (const file of fileArray) {
      try {
        const uploaded = await processUploadedFile(file);
        processed.push(uploaded);
      } catch (err: unknown) {
        errors.push(err instanceof Error ? err.message : `Failed to load ${file.name}`);
      }
    }

    setIsLoading(false);
    if (errors.length > 0) setErrorMessage(errors.join(' | '));
    if (processed.length > 0) onImagesAdd(processed);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (canAddMore) setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    if (!canAddMore) return;
    if (e.dataTransfer.files?.length > 0) handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-emerald-500" />
          Product Images
          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
            ({images.length}/{maxImages})
          </span>
        </label>
        {images.length < 2 && (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            Min 2 required
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) { handleFiles(e.target.files); e.target.value = ''; }
        }}
      />

      {/* Full capacity: green status card */}
      {isFull ? (
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>All {maxImages} images loaded</span>
          </div>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
            Remove one to replace
          </span>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => canAddMore && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-3 px-4 py-4 ${
            isDragging
              ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-emerald-500/60 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/80'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Upload className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {isLoading ? 'Processing…' : 'Click or drag & drop'}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              JPG, PNG, WEBP · {maxImages - images.length} slot{maxImages - images.length !== 1 ? 's' : ''} remaining
            </p>
          </div>
        </div>
      )}

      {/* Demo load button — only when empty */}
      {images.length === 0 && (
        <button
          type="button"
          onClick={onLoadSamples}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Load Demo Jeans Images (4 Photos)
        </button>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 text-xs font-medium text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
