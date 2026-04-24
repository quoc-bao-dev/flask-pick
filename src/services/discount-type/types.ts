export interface DiscountType {
  code: string;
  label: string;
  description: string;
}

export interface DiscountTypesResponse {
  data: DiscountType[];
}
