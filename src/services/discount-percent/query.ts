import { useQuery } from '@tanstack/react-query';
import { discountPercentApi } from './api';
import { discountPercentKeys } from './keys';

export const useDiscountPercentsQuery = () =>
  useQuery({
    queryKey: discountPercentKeys.lists(),
    queryFn: () => discountPercentApi.getPercents(),
    staleTime: 5 * 60_000, // 5 minutes
  });
