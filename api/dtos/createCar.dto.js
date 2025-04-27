import { z } from 'zod';

export const CreateCarSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .number()
    .int()
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear() + 1, 'Year is too far in the future'),
  color: z.string().min(1, 'Color is required'),
  registrationNumber: z
    .string()
    .min(1, 'Registration number is required')
    .transform((val) => val.toUpperCase()),
  vin: z
    .string()
    .length(17, 'VIN must be exactly 17 characters')
    .transform((val) => val.toUpperCase()),
  mileage: z.number().min(0, 'Mileage must be positive'),
  fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
  transmission: z.enum(['Automatic', 'Manual']),
  rentalPricePerDay: z.number().min(0, 'Rental price must be positive'),
  availability: z.boolean().default(true),
  location: z.string().min(1, 'Location is required'),
  imageUrl: z.string().optional(),
  notes: z.string().optional(),
});
