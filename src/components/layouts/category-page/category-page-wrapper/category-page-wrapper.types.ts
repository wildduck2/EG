import { ReqResponseType } from "../../home";

export interface GetCategoryPageAdsType {}

export type GetCategoryPageAds<T> = Awaited<GetCategoryPageAdsRes<T>>;

export type GetCategoryPageAdsRes<T> = ReqResponseType<T>;
