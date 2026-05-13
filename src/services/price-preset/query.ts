import { useQuery } from '@tanstack/react-query';
import { pricePresetApi } from './api';
import { pricePresetKeys } from './keys';

export const usePricePresetQuery = () =>
  useQuery({
    queryKey: pricePresetKeys.list(),
    queryFn: () => pricePresetApi.getPresets(),
    staleTime: 60_000, // Price presets rarely change
  });
