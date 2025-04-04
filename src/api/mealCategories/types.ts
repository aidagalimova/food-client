export interface Category {
  id: number;
  title: string;
  documentId: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  data: Category[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
