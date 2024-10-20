import { headerData } from "@/constants";
import { ReqResponseType } from "../category-swiper/category-swiper.types";

export interface specialoffersProps {
  data: headerData[];
}

export type GetSpecialOffers<T> = Awaited<T[]>;

export type GetSpecialOffersRes<T> = Promise<ReqResponseType<T>>;
