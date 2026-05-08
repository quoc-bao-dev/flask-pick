import { useQuery } from '@tanstack/react-query';
import { searchApi } from './api';
import { searchKeys } from './keys';
import type { SearchSuggestionsParams } from './types';

export const useSearchSuggestionsQuery = (
  params: SearchSuggestionsParams,
  options?: { enabled?: boolean },
) =>
  useQuery({
    queryKey: searchKeys.suggestion(params),
    queryFn: () => searchApi.getSuggestions(params),
    enabled:
      (options?.enabled ?? true) &&
      params.q.trim().length > 0 &&
      params.sessionUuid.length > 0,
    staleTime: 30_000,
  });
