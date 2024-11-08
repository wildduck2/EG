import axios from "axios";
import { ProductType } from "../../home";
import {
  GetCategoryPageAdsRes,
  GetCategoryPageAdsType,
} from "../../category-page";
import { User } from "../../account/user-profile";

export async function get_trader_ads({
  id,
}: GetCategoryPageAdsType): Promise<ProductType[] | null> {
  const user: User = JSON.parse(localStorage.getItem("user-info") as string);
  try {
    const { data: res_data } = await axios.get<
      Awaited<GetCategoryPageAdsRes<ProductType[]>>
    >(
      process.env.BACKEND__BASE_URL +
        `/client/ads-by-user-id/${id}/page/-1?phone_number=${user.phone_number}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res_data.success && res_data.data) {
      return res_data.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
