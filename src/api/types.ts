export interface ApiError {
  status: number;
  name: string;
  message: string;
}
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
