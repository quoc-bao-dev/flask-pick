export interface ProductCategory {
  categoryId: string;
  name: string;
  displayName: string;
}

export interface Product {
  itemId: string;
  name: string;
  image: string;
  price: number;
  priceBeforeDiscount: number;
  discountPercent: number;
  rawDiscount: number;
  ratingAvg: number;
  ratingCountTotal: number;
  isShopOfficial: boolean | null;
  isShopPreferred: boolean | null;
  isShopPreferredPlus: boolean | null;
  isLowerThanHistory: boolean;
  isPriceUnchanged: boolean | null;
  soldTotal: number | null;
  stock: number;
  currency: string;
  flashSaleStart: string | null;
  flashSaleEnd: string | null;
  snapshotAt: string;
  categoryIds: string[];
  categories: ProductCategory[];
}

export interface ProductFilters {
  q?: string;
  limit?: number;
  cursor?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  maxDiscount?: number;
  minRating?: number;
  dealType?: string;
  discountTypes?: string;
  isMall?: boolean;
  isPreferred?: boolean;
  isPreferredPlus?: boolean;
  brandIds?: string;
  promotionId?: string;
  category?: string;
  categoryIds?: string;
  discountPercents?: string;
}

export interface ProductListResponse {
  data: Product[];
  nextCursor: string | null;
  hasNext: boolean;
}
