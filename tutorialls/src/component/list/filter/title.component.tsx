'use client';

import { useEffect } from 'react';
import { ListTutorialContainer } from '../container.component';
import { useTutorialFilterByTitle } from '@/hook/tutorial/filter/by/title.hook';

export const TutorialListFilteredByTitle = ({ query }: { query: string }) => {
  const { data: list, filterByTitle } = useTutorialFilterByTitle();

  useEffect(
    () => filterByTitle({ title: query, limit: 10, page: 1 }),
    [filterByTitle, query],
  );

  return <ListTutorialContainer data={list?.items || []} />;
};
