import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.email('Wrong email'),
    password: z.string().min(6, 'Minimum 8 symbols'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
