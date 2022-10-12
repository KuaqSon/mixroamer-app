export interface IBaseResponse {
  error: 0 | 1;
  errorDetails: Record<any, any>;
  message: string;
}

export interface IPaginatorRequest {
  page: number;
  limit: number;
  terms?: string;
}

export interface IPaginatorResponse<T> extends IBaseResponse {
  rows: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

export interface IMenu {
  slug: string;
  title: string;
  icon?: JSX.Element;
}
