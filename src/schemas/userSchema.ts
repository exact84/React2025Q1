import { store } from '../store/store';
import { z } from 'zod';

const countries = store.getState().countries.countries;

const evaluatePasswordStrength = (password: string) => {
  const conditions = [
    /[0-9]/.test(password),
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[!@#$%^&*(),.?":{}|<>]/.test(password),
  ];
  const metConditions = conditions.filter(Boolean).length;

  if (metConditions < 3) {
    return 'weak';
  } else if (metConditions === 3) {
    return 'normal';
  }
  return 'strong';
};

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
    email: z
      .string()
      .email('Invalid email address')
      .min(1, { message: 'Email is required' }),
    password: z.string().refine(
      (value) => {
        const status = evaluatePasswordStrength(value);
        return status === 'strong';
      },
      (value) => {
        const status = evaluatePasswordStrength(value);
        if (!/[0-9]/.test(value)) {
          return {
            message: `Password is ${status}. It must contain at least one number.`,
          };
        }
        if (!/[A-Z]/.test(value)) {
          return {
            message: `Password is ${status}. It must contain at least one uppercase letter.`,
          };
        }
        if (!/[a-z]/.test(value)) {
          return {
            message: `Password is ${status}. It must contain at least one lowercase letter.`,
          };
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          return {
            message: `Password is ${status}. It must contain at least one special character.`,
          };
        }
        return { message: 'Unknown error' };
      }
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
