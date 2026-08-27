import { z } from 'zod';

export const productMeasurementsSchema = z.object({
  labelSize: z.string().trim().min(1, 'Label size is required'),
  waist: z.string().trim(),
  frontRise: z.string().trim(),
  backRise: z.string().trim(),
  hip: z.string().trim(),
  thigh: z.string().trim(),
  legOpening: z.string().trim(),
  long: z.string().trim(),
});

export const customDimensionSchema = z.object({
  width: z
    .number()
    .min(400, 'Width must be at least 400px')
    .max(4096, 'Width cannot exceed 4096px'),
  height: z
    .number()
    .min(400, 'Height must be at least 400px')
    .max(4096, 'Height cannot exceed 4096px'),
});

export type ProductMeasurementsFormData = z.infer<typeof productMeasurementsSchema>;
export type CustomDimensionFormData = z.infer<typeof customDimensionSchema>;
