import { useQuery } from '@tanstack/react-query';
import { flashSaleApi } from './api';
import { flashSaleKeys } from './keys';
import { FlashSaleSessionsParams } from './types';

export const useFlashSaleSessionsQuery = (params?: FlashSaleSessionsParams) =>
  useQuery({
    queryKey: flashSaleKeys.sessions(params),
    queryFn: () => flashSaleApi.getSessions(params),
    staleTime: 60_000, // Sessions don't change very often
  });
