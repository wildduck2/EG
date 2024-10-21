import axios from "axios";
import { CategoryItemType } from "../category-swiper-card";
import { GetSpecialOffers, GetSpecialOffersRes } from "./special-offers.types";
export async function get_special_offers(): Promise<
  GetSpecialOffers<CategoryItemType>
> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<GetSpecialOffersRes<CategoryItemType>>
    >(process.env.BACKEND__BASE_URL + "/client/categories", {
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
