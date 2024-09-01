'use client';

import { useEffect } from 'react';
import { ListTutorialContainer } from '../container.component';
import { useTutorialFilterByAuthor } from '@/hook/tutorial/filter/by/author.hook';

export const TutorialListFilteredByAuthor = ({
  query: author,
}: {
  query: string;
}) => {
  const { data: list, filterByAuthor } = useTutorialFilterByAuthor();

  useEffect(
    () => filterByAuthor({ author, limit: 10, page: 1 }),
    [filterByAuthor, author],
  );

  return <ListTutorialContainer data={list?.items || []} />;
};
