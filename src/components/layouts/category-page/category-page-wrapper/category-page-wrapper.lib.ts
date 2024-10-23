import axios from "axios";
import {
  GetCategoryPageAdsRes,
  GetCategoryPageAdsType,
} from "./category-page-wrapper.types";
import { ProductType } from "../../home";

export async function get_gategory_page_ads({}: GetCategoryPageAdsType): Promise<
  ProductType[] | null
> {
  try {
    const { data: res_data } = await axios.post<
      Awaited<GetCategoryPageAdsRes<ProductType[]>>
    >(
      process.env.BACKEND__BASE_URL + "/client/ads/getAdsByParameters",
      {
        categoryId: 38,
        // "subCategoryId": 3,
        // "brandCountryId": 3,
        // "thirdBranchId": 3,
        page: 1,
      },
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
