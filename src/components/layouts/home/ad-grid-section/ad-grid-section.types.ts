import { GridSectionType } from "../ad-grid-sections-wrapper";
import { ReqResponseType } from "../category-swiper/category-swiper.types";

export interface AdGridSectionProps extends GridSectionType {
  buttonContent?: string;
}

export interface GetAdsSectionType {}

export type GetAdsSection<T> = Awaited<T[]>;

export type GetAdsSectionRes<T> = Promise<ReqResponseType<T>>;
