export interface Pagination<T> {
  page: number;
  perPage: number;
  total: number;
  data: T[];
}