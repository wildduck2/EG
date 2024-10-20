import { ReqResponseType } from "../category-swiper/category-swiper.types";

export type GetBannerSwiper<T> = Awaited<T[]>;

export type GetBannerSwiperReq<T> = Promise<ReqResponseType<T>>;
