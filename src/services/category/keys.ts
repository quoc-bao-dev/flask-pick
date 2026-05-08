import type { CategoryFilters } from './types';

export const categoryKeys = {
  all: ['categories'] as const,
  list: (filters?: CategoryFilters) => [...categoryKeys.all, 'list', filters] as const,
};
