import { z } from 'zod';

export const searchTutorialSchema = z.object({
  query: z.string().optional(),
  filterBy: z
    .enum(['title', 'keyword', 'author'], {
      message: "Type your filter: 'title', 'keyword', 'author'",
    })
    .default('title'),
});

export type ISearchTutorial = z.infer<typeof searchTutorialSchema>;
