import { headerData } from "@/constants";
import { ReqResponseType } from "../category-swiper/category-swiper.types";

export interface specialoffersProps {
  filters: string[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  currentFilter: string;
}

export type GetSpecialOffers<T> = Awaited<T[]>;

export type GetSpecialOffersRes<T> = Promise<ReqResponseType<T>>;
