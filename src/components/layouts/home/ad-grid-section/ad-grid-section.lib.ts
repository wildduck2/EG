import axios from "axios";
import { CategoryItemType } from "../category-swiper-card";
import {
  GetAdsSection,
  GetAdsSectionRes,
  GetAdsSectionType,
} from "./ad-grid-section.types";

export async function get_ads_section({
  url,
}: GetAdsSectionType): Promise<GetAdsSection<CategoryItemType>> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<GetAdsSectionRes<CategoryItemType>>
    >(process.env.BACKEND__BASE_URL + url, {
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
