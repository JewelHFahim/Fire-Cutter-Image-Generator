'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ImageFit, LayoutMode, MeasurementField, UploadedImage } from '@/types/generator';
import { renderProductSheet } from '@/lib/renderer/render-product-sheet';
import { loadImageFromSource } from '@/lib/image/load-image';
import { AlertCircle, Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';

interface GeneratorPreviewProps {
  images: UploadedImage[];
  measurements: MeasurementField[];
  width: number;
  height: number;
  layoutMode: LayoutMode;
  imageFit: ImageFit;
  dividerWidth: number;
  dividerColor: string;
  onCanvasGenerated?: (canvas: HTMLCanvasElement | null) => void;
  onLoadSamples?: () => void;
}

export const GeneratorPreview: React.FC<GeneratorPreviewProps> = ({
  images,
  measurements,
  width,
  height,
  layoutMode,
  imageFit,
  dividerWidth,
  dividerColor,
  onCanvasGenerated,
  onLoadSamples,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  const hasEnoughImages = images.length >= 2 && images.length <= 4;

  const onCanvasGeneratedRef = useRef(onCanvasGenerated);
  useEffect(() => {
    onCanvasGeneratedRef.current = onCanvasGenerated;
  }, [onCanvasGenerated]);

  useEffect(() => {
    let isCancelled = false;

    if (!hasEnoughImages) {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      onCanvasGeneratedRef.current?.(null);
      return;
    }

    async function generate() {
      setIsRendering(true);
      setRenderError(null);

      try {
        // Load actual image instances concurrently
        const loadedImages = await Promise.all(
          images.map((item) => loadImageFromSource(item.url))
        );

        if (isCancelled) return;

        // Execute core renderer pipeline
        const canvas = await renderProductSheet({
          width,
          height,
          images: loadedImages,
          measurements,
          layoutMode,
          imageFit,
          dividerWidth,
          dividerColor,
        });

        if (isCancelled) return;

        // Apply CSS styling to scale actual full-resolution canvas responsively
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.style.maxHeight = '100%';
        canvas.style.objectFit = 'contain';
        canvas.className = 'rounded-xl shadow-2xl transition-all duration-300 border border-zinc-300 dark:border-zinc-800';

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(canvas);
        }

        onCanvasGeneratedRef.current?.(canvas);
      } catch (err: unknown) {
        console.error('Render error:', err);
        if (!isCancelled) {
          const message = err instanceof Error ? err.message : 'Failed to generate product measurement sheet preview.';
          setRenderError(message);
          onCanvasGeneratedRef.current?.(null);
        }
      } finally {
        if (!isCancelled) {
          setIsRendering(false);
        }
      }
    }

    generate();

    return () => {
      isCancelled = true;
    };
  }, [
    images,
    measurements,
    width,
    height,
    layoutMode,
    imageFit,
    dividerWidth,
    dividerColor,
    hasEnoughImages,
  ]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[400px] lg:min-h-[600px] p-4 lg:p-8 bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-inner overflow-hidden">
      {/* Rendering Loading Badge overlay */}
      {isRendering && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 backdrop-blur-md text-white text-xs font-medium rounded-full shadow-lg">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          <span>Updating Canvas...</span>
        </div>
      )}

      {/* Render error alert */}
      {renderError && (
        <div className="z-10 flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl max-w-md">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-xs font-medium">{renderError}</span>
        </div>
      )}

      {/* Empty State / Not enough images prompt */}
      {!hasEnoughImages && !renderError && (
        <div className="flex flex-col items-center text-center p-8 max-w-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Preview Canvas
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Please upload between 2 and 4 product images to see live preview.
            </p>
          </div>

          {onLoadSamples && (
            <button
              type="button"
              onClick={onLoadSamples}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all scale-100 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              Load Sample Jeans Demo
            </button>
          )}
        </div>
      )}

      {/* Canvas Mount Container */}
      <div
        ref={containerRef}
        className={`w-full max-w-[650px] aspect-square flex items-center justify-center ${
          !hasEnoughImages ? 'hidden' : 'block'
        }`}
      />
    </div>
  );
};
