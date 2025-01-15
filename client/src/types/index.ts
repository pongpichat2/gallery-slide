export interface ImageData {
    id: number;
    url: string;
    keywords: string[];
    title: string;
  }

export interface PaginationResult<T> {
    data: T[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
      hasMore: boolean;
    };
}
  