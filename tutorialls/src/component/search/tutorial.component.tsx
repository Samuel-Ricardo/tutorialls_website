'use client';

import { useSearchTutorialStore } from '@/store/search/search.store';
import { FormField } from '../form/field/field.component';
import { Button } from '../button/button.component';
import {
  ISearchTutorial,
  searchTutorialSchema,
} from '@/validation/zod/search/tutorial.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export const SearchTutorial = () => {
  const { setQuery, setFilterBy } = useSearchTutorialStore();
  const { refresh } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchTutorial>({
    resolver: zodResolver(searchTutorialSchema),
  });

  const submit = useCallback(
    () =>
      handleSubmit(async ({ query, filterBy }) => {
        setFilterBy(filterBy);
        setQuery(query || '');

        refresh();
      }),
    [handleSubmit, setQuery, setFilterBy, refresh],
  );

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={submit()}>
      <FormField
        label={{
          id: 'lbl_search',
          defaultValue: 'Search',
        }}
        type="search"
        placeholder="Search..."
        //        onChange={e => setQuery(e.target.value)}
        hook={register('query')}
        error={errors.query?.message}
      />

      <FormField
        type="search"
        label={{
          id: 'lbl_filter_by',
          defaultValue: 'Filter by',
        }}
        defaultValue="title"
        hook={register('filterBy')}
        error={errors.filterBy?.message}
      />

      <Button id="btn_search" type="submit" label="Search" />
    </form>
  );
};
