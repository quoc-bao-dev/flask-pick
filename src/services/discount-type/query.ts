import { useQuery } from '@tanstack/react-query';
import { discountTypeApi } from './api';
import { discountTypeKeys } from './keys';

export const useDiscountTypesQuery = () =>
  useQuery({
    queryKey: discountTypeKeys.list(),
    queryFn: discountTypeApi.getDiscountTypes,
    staleTime: 60 * 1000,
  });
