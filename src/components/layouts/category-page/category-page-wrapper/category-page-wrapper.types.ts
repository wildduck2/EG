import { ReqResponseType } from "../../home";

export interface GetCategoryPageAdsType {
  id: number;
}

export type GetCategoryPageAds<T> = Awaited<GetCategoryPageAdsRes<T>>;

export type GetCategoryPageAdsRes<T> = ReqResponseType<T>;
