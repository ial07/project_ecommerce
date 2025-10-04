export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError{
   message: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}