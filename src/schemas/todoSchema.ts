import {z} from 'zod';

export const todoSchema = z.object({
  _id: z.string(),
  accountId: z.string(),
  description: z
    .string()
    .max(256, {message: 'Description must not exceed 256 characters.'}),
  completed: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TodoSchema = z.infer<typeof todoSchema>;
