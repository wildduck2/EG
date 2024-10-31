import axios from "axios";
import {
  GetCatgegorySearchResponse,
  ReqResponseWithPageType,
} from "../category-search/category-search.types";
import { toast } from "sonner";
import { GetCategoryPageAdsType } from "./category-page-wrapper.types";
import { FilterSchema } from "../category-page-filter";

export async function get_gategory_page_ads({
  id,
  page = 1,
  filter_schema,
}: GetCategoryPageAdsType & { page?: number; filter_schema?: FilterSchema }) {
  try {
    const { data } = await axios.post<
      Awaited<Promise<ReqResponseWithPageType<GetCatgegorySearchResponse[]>>>
    >(
      `${process.env.BACKEND__BASE_URL}/client/ads/getAdsByParameters`,
      {
        categoryId: id,
        subCategoryId: filter_schema?.subcategories?.id,
        brandCountryId: filter_schema?.brand_countries?.id,
        thirdBranchId: filter_schema?.third_branches?.id,
        gov_id: filter_schema?.governorates?.id,
        region_id: filter_schema?.regions?.id,
        min_price: filter_schema?.min_price,
        max_price: filter_schema?.max_price,
        negotiable:
          (filter_schema?.negotiate as unknown as number) === 1 ? 1 : 0,
        page,
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
