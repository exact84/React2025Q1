import { store } from '../store/store';
import { z } from 'zod';

const countries = store.getState().countries.countries;

export const userSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    age: z.number().min(18, 'Age must be at least 18 years'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female']),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms',
    }),
    country: z.string().refine((val) => countries.some((c) => c.name === val), {
      message: 'Please select a valid country from the list',
    }),
    image: z
      .instanceof(FileList)
      .refine((files) => files && files.length === 1, {
        message: 'Please upload one file',
      })
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ['image/png', 'image/jpeg'].includes(files[0]?.type),
        'Only PNG or JPEG files are allowed'
      )
      .refine(
        (files) => files[0]?.size <= 5 * 1024 * 1024,
        'File size must be less than 5MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserFormData = z.infer<typeof userSchema>;
