import type { SearchSuggestionsParams } from './types';

export const searchKeys = {
  all: ['search'] as const,
  suggestions: () => [...searchKeys.all, 'suggestions'] as const,
  suggestion: (params: SearchSuggestionsParams) =>
    [...searchKeys.suggestions(), params] as const,
};
