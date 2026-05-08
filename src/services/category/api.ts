import { axiosInstance } from '@/core/axios';
import type { CategoryFilters, CategoryListResponse } from './types';

export const categoryApi = {
  getCategories: async (filters?: CategoryFilters) => {
    const { data } = await axiosInstance.get<CategoryListResponse>('/api/v1/categories', {
      params: filters,
    });
    return data;
  },
};
