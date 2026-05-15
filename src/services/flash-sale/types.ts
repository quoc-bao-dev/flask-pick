export interface FlashSaleSession {
  promotionId: string;
  name: string;
  flashCatId: string | null;
  flashSaleStart: string;
  flashSaleEnd: string;
  isCurrentlyActive: boolean;
  statusText: string;
  productCount: number;
}

export interface FlashSaleSessionsParams {
  limit?: number;
  offset?: number;
}

export interface FlashSaleSessionsResponse {
  success: boolean;
  message: string;
  data: FlashSaleSession[];
  total: number;
  totalProductCount: number;
}
