import axios from "axios";
import {
  AdGridSectionsWrapperRes,
  GetAdsSectionsWrapper,
  GetAdsSectionsWrapperType,
  GridSectionType,
} from "./ad-grid-sections-wrapper.types";

export async function get_ads_section({}: GetAdsSectionsWrapperType): Promise<GetAdsSectionsWrapper<GridSectionType> | null> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<AdGridSectionsWrapperRes<GridSectionType>>
    >(process.env.BACKEND__BASE_URL + "/client/home-categories-ads", {
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
