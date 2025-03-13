import { z } from 'zod';

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
    country: z.string().min(1, 'Please select a country'),
    image: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserFormData = z.infer<typeof userSchema>;
