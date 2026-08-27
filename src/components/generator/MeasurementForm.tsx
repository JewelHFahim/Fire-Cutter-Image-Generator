'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProductMeasurementsFormData,
  productMeasurementsSchema,
} from '@/lib/validation/generator-schema';
import { DEFAULT_PANTS_MEASUREMENTS } from '@/constants/generator';
import { ProductMeasurements } from '@/types/generator';
import { Sliders, RotateCcw } from 'lucide-react';

interface MeasurementFormProps {
  initialValues?: ProductMeasurements;
  onChange: (values: ProductMeasurements) => void;
}

export const MeasurementForm: React.FC<MeasurementFormProps> = ({
  initialValues = DEFAULT_PANTS_MEASUREMENTS,
  onChange,
}) => {
  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductMeasurementsFormData>({
    resolver: zodResolver(productMeasurementsSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  // Sync RHF state when parent resets initialValues
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  // Subscribe to field changes via RHF event-based listener (no cascading renders)
  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as ProductMeasurements);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const handleReset = () => {
    reset(DEFAULT_PANTS_MEASUREMENTS);
    onChange(DEFAULT_PANTS_MEASUREMENTS);
  };

  return (
    <div className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Product Measurements
          </h3>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          title="Reset measurements to defaults"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Label Size */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Label Size
          </label>
          <input
            type="text"
            {...register('labelSize')}
            placeholder="e.g. 36X30"
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
          />
          {errors.labelSize && (
            <p className="text-[10px] text-red-500 mt-0.5">{errors.labelSize.message}</p>
          )}
        </div>

        {/* Waist */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Waist
          </label>
          <input
            type="text"
            {...register('waist')}
            placeholder="e.g. 38"
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Front Rise */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Front Rise
          </label>
          <input
            type="text"
            {...register('frontRise')}
            placeholder="e.g. 13.5"
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Back Rise */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Back Rise
          </label>
          <input
            type="text"
            {...register('backRise')}
            placeholder="e.g. 15.5"
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Hip */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Hip
          </label>
          <input
            type="text"
            {...register('hip')}
            placeholder="e.g. 47"
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Thigh */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Thigh
          </label>
          <input
            type="text"
            {...register('thigh')}
            placeholder="e.g. 28"
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Leg Opening */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Leg Opening
          </label>
          <input
            type="text"
            {...register('legOpening')}
            placeholder="e.g. 18"
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Long */}
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Long (Inseam)
          </label>
          <input
            type="text"
            {...register('long')}
            placeholder="e.g. 42"
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
      </div>
    </div>
  );
};
