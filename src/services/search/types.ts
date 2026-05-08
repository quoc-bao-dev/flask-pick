
export interface SearchSuggestionsParams {
  q: string;
  limit?: number;
  sessionUuid: string;
}

export interface SearchSuggestionsData {
  query: string;
  keywords: string[];
  stores: any[];
  brands: any[];
  categories: {
    categoryId: string;
    name: string;
    displayName: string;
  }[];
  products: {
    itemId: string;
    name: string;
    image: string;
  }[];
}

export interface SearchSuggestionsResponse {
  success: boolean;
  message: string;
  data: SearchSuggestionsData;
}

