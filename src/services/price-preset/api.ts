import { axiosInstance } from '@/core/axios';
import type { PricePresetListResponse } from './types';

export const pricePresetApi = {
  getPresets: async () => {
    const { data } = await axiosInstance.get<PricePresetListResponse>('/api/v1/price-presets');
    return data;
  },
};
