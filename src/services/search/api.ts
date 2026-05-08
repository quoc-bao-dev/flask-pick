import { axiosInstance } from '@/core/axios';
import type {
  SearchSuggestionsParams,
  SearchSuggestionsResponse,
} from './types';

export const searchApi = {
  getSuggestions: async (params: SearchSuggestionsParams) => {
    const { data } = await axiosInstance.get<SearchSuggestionsResponse>(
      '/api/v1/search/suggestions',
      { params },
    );
    return data;
  },
};
