export interface PricePreset {
  code: string;
  label: string;
  description: string;
  minPrice: number;
  maxPrice: number | null;
  count: number;
}

export interface PricePresetListResponse {
  success: boolean;
  message: string;
  data: PricePreset[];
}
