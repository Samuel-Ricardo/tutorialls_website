import { create } from 'zustand';

interface ISearchState {
  query: string;
  setQuery: (query: string) => void;
  filterBy: 'title' | 'keyword' | 'author';
  setFilterBy: (filterBy: 'title' | 'keyword' | 'author') => void;
}

const useSearchStore = create<ISearchState>(set => ({
  query: '',
  filterBy: 'title',
  setQuery: (query: string) => set({ query }),
  setFilterBy: (filterBy: 'title' | 'keyword' | 'author') => set({ filterBy }),
}));
