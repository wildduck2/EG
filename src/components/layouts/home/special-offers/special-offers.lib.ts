import axios from "axios";
import { GetSpecialOffers, GetSpecialOffersRes } from "./special-offers.types";
import { ProductType } from "../ad-item-card";
export async function get_special_offers(): Promise<
  GetSpecialOffers<ProductType>
> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<GetSpecialOffersRes<ProductType>>
    >(process.env.BACKEND__BASE_URL + "/client/featured-ads/page/1", {
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
