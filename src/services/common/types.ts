export interface SocialContent {
  code: string;
  platform: string;
  label: string;
  href: string;
}

export interface SocialContentResponse {
  data: SocialContent[];
}

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>; // Validation errors
}
