import z from 'zod';

export const accountSchema = z.object({
  _id: z.string(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters or more')
    .max(30, 'Username must be 30 characters or less'),
  password: z
    .string()
    .min(8, 'Password minimum should be 8 character')
    .max(64, 'Password maximum should be 64 character'),
  accessToken: z.string(),
  refreshToken: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const signupSchema = accountSchema
  .pick({
    username: true,
    password: true,
  })
  .extend({
    repeatPassword: accountSchema.shape.password,
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export const loginSchema = accountSchema.pick({
  username: true,
  password: true,
});

export type AccountSchema = z.infer<typeof accountSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
