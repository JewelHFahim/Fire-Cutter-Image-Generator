'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  ImageFit,
  LayoutMode,
  OutputPreset,
  ProductMeasurements,
  UploadedImage,
  MeasurementField,
} from '@/types/generator';
import {
  DEFAULT_DIVIDER_COLOR,
  DEFAULT_DIVIDER_WIDTH,
  DEFAULT_PANTS_MEASUREMENTS,
  PRESET_RESOLUTIONS,
  SAMPLE_IMAGES,
} from '@/constants/generator';
import { GeneratorToolbar } from '@/components/generator/GeneratorToolbar';
import { ImageUploader } from '@/components/generator/ImageUploader';
import { ImageList } from '@/components/generator/ImageList';
import { MeasurementForm } from '@/components/generator/MeasurementForm';
import { GeneratorPreview } from '@/components/generator/GeneratorPreview';
import { SettingsModal } from '@/components/generator/SettingsModal';

export default function GeneratorPage() {
  const [images, setImages] = useState<UploadedImage[]>(SAMPLE_IMAGES);
  const [measurements, setMeasurements] = useState<ProductMeasurements>(
    DEFAULT_PANTS_MEASUREMENTS
  );
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('auto');
  const [imageFit, setImageFit] = useState<ImageFit>('contain');
  const [preset, setPreset] = useState<OutputPreset>('1440x1440');
  const [customWidth, setCustomWidth] = useState(1440);
  const [customHeight, setCustomHeight] = useState(1440);
  const [dividerWidth, setDividerWidth] = useState(DEFAULT_DIVIDER_WIDTH);
  const [dividerColor, setDividerColor] = useState(DEFAULT_DIVIDER_COLOR);

  const [activeCanvas, setActiveCanvas] = useState<HTMLCanvasElement | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleMeasurementsChange = useCallback((newMeasurements: ProductMeasurements) => {
    setMeasurements(newMeasurements);
  }, []);

  // Compute active dimensions
  const activeResolution = PRESET_RESOLUTIONS.find((p) => p.id === preset);
  const currentWidth = preset === 'custom' ? customWidth : activeResolution?.width || 1440;
  const currentHeight = preset === 'custom' ? customHeight : activeResolution?.height || 1440;

  // Transform typed measurement state to generic MeasurementField[]
  const measurementFields: MeasurementField[] = useMemo(
    () => [
      { id: 'labelSize', label: 'Label Size', value: measurements.labelSize },
      { id: 'waist', label: 'Waist', value: measurements.waist },
      { id: 'frontRise', label: 'Front Rise', value: measurements.frontRise },
      { id: 'backRise', label: 'Back Rise', value: measurements.backRise },
      { id: 'hip', label: 'Hip', value: measurements.hip },
      { id: 'thigh', label: 'Thigh', value: measurements.thigh },
      { id: 'legOpening', label: 'Leg Opening', value: measurements.legOpening },
      { id: 'long', label: 'Long', value: measurements.long },
    ],
    [measurements]
  );

  const handleImagesAdd = useCallback((newImages: UploadedImage[]) => {
    setImages((prev) => [...prev, ...newImages].slice(0, 4));
  }, []);

  const handleImageRemove = useCallback((id: string) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.url && !target.isSample && target.url.startsWith('blob:')) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const handleImageReorder = useCallback((newImages: UploadedImage[]) => {
    setImages(newImages);
  }, []);

  const handleLoadSamples = useCallback(() => {
    setImages(SAMPLE_IMAGES);
  }, []);

  const handleResetAll = useCallback(() => {
    // Revoke any created blob URLs
    images.forEach((img) => {
      if (img.url && !img.isSample && img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
    });
    setImages([]);
    setMeasurements(DEFAULT_PANTS_MEASUREMENTS);
    setLayoutMode('auto');
    setImageFit('contain');
    setPreset('1440x1440');
    setDividerWidth(DEFAULT_DIVIDER_WIDTH);
    setDividerColor(DEFAULT_DIVIDER_COLOR);
  }, [images]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans">
      <GeneratorToolbar
        canvas={activeCanvas}
        labelSize={measurements.labelSize}
        onReset={handleResetAll}
        canExport={images.length >= 2 && images.length <= 4}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Controls Panel (Desktop ~40% width / 5 cols) */}
          <section className="lg:col-span-5 space-y-6">
            {/* Image Uploader & List */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 lg:p-5 shadow-xs space-y-4">
              <ImageUploader
                images={images}
                onImagesAdd={handleImagesAdd}
                onLoadSamples={handleLoadSamples}
              />
              <ImageList
                images={images}
                onRemove={handleImageRemove}
                onReorder={handleImageReorder}
              />
            </div>

            {/* Measurement Input Form */}
            <MeasurementForm
              initialValues={measurements}
              onChange={handleMeasurementsChange}
            />
          </section>

          {/* Preview Panel (Desktop ~60% width / 7 cols) */}
          <section className="lg:col-span-7 sticky top-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 lg:p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span>Live Canvas Preview</span>
                  <span className="text-[11px] text-zinc-500 font-normal">
                    ({currentWidth}×{currentHeight})
                  </span>
                </h2>
                <span className="text-[11px] text-zinc-500 font-medium">
                  WYSIWYG Export Preview
                </span>
              </div>

              <GeneratorPreview
                images={images}
                measurements={measurementFields}
                width={currentWidth}
                height={currentHeight}
                layoutMode={layoutMode}
                imageFit={imageFit}
                dividerWidth={dividerWidth}
                dividerColor={dividerColor}
                onCanvasGenerated={setActiveCanvas}
                onLoadSamples={handleLoadSamples}
              />
            </div>
          </section>
        </div>
      </main>

      <footer className="py-4 border-t border-zinc-200 dark:border-zinc-800/80 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Local-First Product Measurement Image Generator • Pure Canvas Renderer
      </footer>

      {/* Settings Slide-over */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        layoutMode={layoutMode}
        onLayoutModeChange={setLayoutMode}
        imageFit={imageFit}
        onImageFitChange={setImageFit}
        dividerWidth={dividerWidth}
        onDividerWidthChange={setDividerWidth}
        dividerColor={dividerColor}
        onDividerColorChange={setDividerColor}
        preset={preset}
        onPresetChange={setPreset}
        customWidth={customWidth}
        onCustomWidthChange={setCustomWidth}
        customHeight={customHeight}
        onCustomHeightChange={setCustomHeight}
        currentWidth={currentWidth}
        currentHeight={currentHeight}
      />
    </div>
  );
}
