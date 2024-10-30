import axios from "axios";
import {
  GetCategoryPageAdsRes,
  GetCategoryPageAdsType,
} from "./category-page-wrapper.types";
import { ProductType } from "../../home";
import {
  GetCatgegorySearchResponse,
  ReqResponseWithPageType,
} from "../category-search/category-search.types";
import { toast } from "sonner";

export async function get_gategory_page_ads({ id }: GetCategoryPageAdsType) {
  try {
    const { data } = await axios.post<
      Awaited<Promise<ReqResponseWithPageType<GetCatgegorySearchResponse[]>>>
    >(
      process.env.BACKEND__BASE_URL + "/client/ads/getAdsByParameters",
      {
        categoryId: id,
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
    if (!data.success) {
      toast.error("Failed to get category ad");
      return null;
    }

    return data;
  } catch (error) {
    toast.error("Failed to get category ad");
    return null;
  }
}
