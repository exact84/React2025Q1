import { store } from '../store/store';
import { z } from 'zod';

const countries = store.getState().countries.countries;

export const userSchema = z
  .object({
    name: z.string().refine((name) => /^[A-ZА-ЯЁ]/.test(name), {
      message: 'Name must start with a capital letter',
    }),
    age: z
      .string()
      .refine(
        (val) => {
          if (!val.trim()) return false;
          const num = Number(val);
          return !isNaN(num) && num > 0;
        },
        {
          message: 'Age must be a positive number',
        }
      )
      .transform((val) => Number(val)),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female'], {
      required_error: 'Please select your gender',
      invalid_type_error: 'Please select your gender',
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms',
    }),
    country: z.string().refine((val) => countries.some((c) => c.name === val), {
      message: 'Please select a valid country from the list',
    }),
    image: z
      .instanceof(FileList)
      .refine((files) => files.length === 1, {
        message: 'Please upload one file',
      })
      .refine(
        (files) =>
          files.length === 0 ||
          ['image/png', 'image/jpeg'].includes(files[0].type),
        'Only PNG or JPEG files are allowed'
      )
      .refine(
        (files) => files.length === 0 || files[0].size <= 5 * 1024 * 1024,
        'File size must be less than 5MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserFormData = z.infer<typeof userSchema>;
