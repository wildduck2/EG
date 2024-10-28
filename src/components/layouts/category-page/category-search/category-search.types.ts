import { ProductType, ReqResponseType } from "../../home";

export interface GetCatgegorySearchResponse {
  success: boolean;
  data: ProductType[];
}

export type ReqResponseWithPageType<T> = {
  pagination: paginationType;
} & ReqResponseType<T>;

export type paginationType = {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  from: number;
  to: number;
};
