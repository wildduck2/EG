import { ProductType } from "../../home";
import { ReqResponseType } from "../../home/category-swiper/category-swiper.types";

export type GetProductItem<T> = Awaited<T>;

export type GetProductItemReq<T> = Promise<ReqResponseType<T>>;

export type ProductPageWrapperProps = {
  id?: number;
  state?: ProductType;
  category: string;
};
