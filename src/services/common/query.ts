import { useQuery } from '@tanstack/react-query';
import { commonApi } from './api';
import { commonKeys } from './keys';

export const useSocialContentQuery = () =>
  useQuery({
    queryKey: commonKeys.social(),
    queryFn: commonApi.getSocialContent,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
