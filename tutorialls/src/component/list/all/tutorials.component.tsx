'use client';

import { ListTutorialContainer } from '../container.component';
import { useTutorials } from '@/hook/tutorial/list/all.hook';
import { useEffect } from 'react';

export const ListAllTutorial = () => {
  const { data, listAll } = useTutorials();

  useEffect(() => {
    listAll({ pagination: { limit: 10, page: 1 } });
  }, [listAll]);

  return <ListTutorialContainer data={data?.items || []} />;
};
