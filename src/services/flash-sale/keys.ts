import { FlashSaleSessionsParams } from './types';

export const flashSaleKeys = {
  all: ['flash-sale'] as const,
  sessions: (params?: FlashSaleSessionsParams) => [...flashSaleKeys.all, 'sessions', params] as const,
};
