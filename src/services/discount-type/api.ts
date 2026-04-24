import { axiosInstance } from '@/core/axios';
import type { DiscountType } from './types';
import type { ApiResponse } from '../common/types';

export const discountTypeApi = {
  getDiscountTypes: async () => {
    const { data } = await axiosInstance.get<ApiResponse<DiscountType[]>>('/api/v1/discount-types');
    return data.data;
  },
};
