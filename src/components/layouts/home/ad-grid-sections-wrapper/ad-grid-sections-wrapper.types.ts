import { ProductType } from "../ad-item-card";
import { ReqResponseType } from "../category-swiper";

export type GetAdsSectionsWrapperType = {};
export type GetAdsSectionsWrapper<T> = Awaited<T[]>;

export type GridSectionType = {
  category_id: number;
  category_name: string;
  category_name_en: string;
  sort_order: number;
  ads: ProductType[];
};

export type AdGridSectionsWrapperRes<T> = ReqResponseType<T>;
