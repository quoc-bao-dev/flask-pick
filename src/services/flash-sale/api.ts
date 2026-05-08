import { axiosInstance } from '@/core/axios';
import type { FlashSaleSessionsParams, FlashSaleSessionsResponse } from './types';

export const flashSaleApi = {
  getSessions: async (params?: FlashSaleSessionsParams) => {
    const { data } = await axiosInstance.get<FlashSaleSessionsResponse>(
      '/api/v1/flash-sale/sessions',
      { params },
    );
    return data;
  },
};
