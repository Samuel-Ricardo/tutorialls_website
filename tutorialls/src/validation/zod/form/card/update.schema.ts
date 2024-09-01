import { z } from 'zod';

export const updateTutorialFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
});

export type IUpdateTutorialForm = z.infer<typeof updateTutorialFormSchema>;
