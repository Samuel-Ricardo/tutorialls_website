import { useSearchTutorialStore } from '@/store/search/search.store';
import { useTutorialFilterByTitle } from './by/title.hook';
import { useTutorialFilterByAuthor } from './by/author.hook';
import { useTutorialFilterByKeyword } from './by/keyword.hook';
import { useEffect, useMemo } from 'react';

export const useTutorialFilter = () => {
  const { query, filterBy } = useSearchTutorialStore();
  const { data: byAuthor, filterByAuthorAsync } = useTutorialFilterByAuthor();
  const { data: byKeyword, filterByKeywordAsync } =
    useTutorialFilterByKeyword();
  const { data: byTitle, filterByTitleAsync } = useTutorialFilterByTitle();

  const list = useMemo(() => {
    switch (filterBy) {
      case 'title':
        return byTitle;
      case 'author':
        return byAuthor;
      case 'keyword':
        return byKeyword;
      default:
        return byTitle;
    }
  }, [filterBy, byAuthor, byKeyword, byTitle]);

  useEffect(() => {
    const pagination = { limit: 20, page: 1 };
    switch (filterBy) {
      case 'title':
        filterByTitleAsync({ title: query, ...pagination });
      //        return byTitle;
      case 'author':
        filterByAuthorAsync({ author: query, ...pagination });
      //        return byAuthor;
      case 'keyword':
        filterByKeywordAsync({ keyword: query, ...pagination });
      //        return byKeyword;
      default:
        filterByTitleAsync({ title: query, ...pagination });
      //        return byTitle;
    }
  }, [
    query,
    filterBy,
    filterByAuthorAsync,
    filterByKeywordAsync,
    filterByTitleAsync,
  ]);

  return { list, query };
};
