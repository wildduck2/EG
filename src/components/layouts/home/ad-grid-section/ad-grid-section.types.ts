import { CategoryItemType } from "../category-swiper-card";
import { ReqResponseType } from "../category-swiper/category-swiper.types";

export interface AdGridSectionProps {
  title?: string;
  url: string;
  buttonContent?: string;
}

export interface GetAdsSectionType {
  url: string;
}

export type GetAdsSection<T> = Awaited<T[]>;

export type GetAdsSectionRes<T> = Promise<ReqResponseType<T>>;
