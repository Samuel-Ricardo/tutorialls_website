'use client';

import { useSearchTutorialStore } from '@/store/search/search.store';
import { TutorialListFilteredByTitle } from './filter/title.component';
import { TutorialListFilteredByKeyword } from './filter/keyword.component';
import { TutorialListFilteredByAuthor } from './filter/author.component';

export const DynamicTutorialList = ({
  children: placeholder,
}: {
  children: React.ReactNode;
}) => {
  const { filterBy, query } = useSearchTutorialStore();
  if (query.length < 2 || filterBy.length <= 0) return <>{placeholder}</>;

  switch (filterBy) {
    case 'title':
      return <TutorialListFilteredByTitle query={query} />;
    case 'author':
      return <TutorialListFilteredByAuthor query={query} />;
    case 'keyword':
      return <TutorialListFilteredByKeyword query={query} />;
    default:
      return <>{placeholder}</>;
  }
};
