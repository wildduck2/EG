import axios from "axios";
import { CategoryItemType } from "../category-swiper-card";
import { GetBannerSwiper, GetBannerSwiperReq } from "./banner-swiper.types";

export async function get_banner_swiper(): Promise<
  GetBannerSwiper<CategoryItemType>
> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<GetBannerSwiperReq<CategoryItemType>>
    >(process.env.BACKEND__BASE_URL + "/client/banners", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res_data.success && res_data.data) {
      return res_data.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
