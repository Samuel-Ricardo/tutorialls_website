'use client';

import { useEffect } from 'react';
import { ListTutorialContainer } from '../container.component';
import { useTutorialFilterByKeyword } from '@/hook/tutorial/filter/by/keyword.hook';

export const TutorialListFilteredByKeyword = ({
  query: keyword,
}: {
  query: string;
}) => {
  const { data: list, filterByKeyword } = useTutorialFilterByKeyword();

  useEffect(
    () => filterByKeyword({ keyword, limit: 10, page: 1 }),
    [filterByKeyword, keyword],
  );

  return <ListTutorialContainer data={list?.items || []} />;
};
