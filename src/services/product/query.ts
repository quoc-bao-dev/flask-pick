import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { productApi } from './api';
import { productKeys } from './keys';
import type { ProductFilters } from './types';

/** Hook for product list (single page, loading state) */
export const useProductListQuery = (filters?: ProductFilters) =>
  useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productApi.getProducts(filters),
    staleTime: 5_000,
  });

/** Hook for cursor-based infinite product list */
export const useProductInfiniteQuery = (filters?: Omit<ProductFilters, 'cursor'>) =>
  useInfiniteQuery({
    queryKey: productKeys.list(filters),
    queryFn: ({ pageParam }) =>
      productApi.getProducts({ ...filters, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 5_000,
  });
