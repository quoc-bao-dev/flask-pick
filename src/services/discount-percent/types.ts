export interface DiscountPercent {
  code: string;
  label: string;
  description: string;
  count: number;
}

export interface DiscountPercentResponse {
  success: boolean;
  message: string;
  data: DiscountPercent[];
}
