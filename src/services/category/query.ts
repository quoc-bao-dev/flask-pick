import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { categoryApi } from './api';
import { categoryKeys } from './keys';
import type { CategoryFilters } from './types';

export const useCategoryListQuery = (filters?: CategoryFilters) =>
  useQuery({
    queryKey: categoryKeys.list(filters),
    queryFn: () => categoryApi.getCategories(filters),
    staleTime: 5_000,
  });

export const useCategoryInfiniteQuery = (filters?: Omit<CategoryFilters, 'cursor'>) =>
  useInfiniteQuery({
    queryKey: categoryKeys.list(filters),
    queryFn: ({ pageParam }) =>
      categoryApi.getCategories({ ...filters, cursor: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    staleTime: 5_000,
  });
