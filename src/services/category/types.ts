export interface CategoryFilters {
  limit?: number;
  cursor?: string | null;
  q?: string;
  parentId?: string;
}

export interface Category {
  categoryId: string;
  name: string;
  displayName: string;
}

export interface CategoryListResponse {
  success: boolean;
  message: string;
  data: Category[];
  nextCursor: string | null;
}
