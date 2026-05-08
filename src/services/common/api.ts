import { axiosInstance } from '@/core/axios';
import { SocialContentResponse } from './types';

export const commonApi = {
  getSocialContent: async () => {
    const { data } = await axiosInstance.get<SocialContentResponse>('/api/v1/social-content');
    return data;
  },
};
