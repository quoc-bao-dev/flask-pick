import { axiosInstance } from '@/core/axios';
import type { ProductFilters, ProductListResponse } from './types';

export const productApi = {
  getProducts: async (filters?: ProductFilters) => {
    const { data } = await axiosInstance.get<ProductListResponse>('/api/v1/products', {
      params: filters,
    });
    return data;
  },
};
