import { axiosInstance } from '@/core/axios';
import type { DiscountPercentResponse } from './types';

export const discountPercentApi = {
  getPercents: async () => {
    const { data } = await axiosInstance.get<DiscountPercentResponse>('/api/v1/discount-percents');
    return data;
  },
};
