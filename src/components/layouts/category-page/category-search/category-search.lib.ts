import axios from "axios";
import {
  GetCatgegorySearchResponse,
  ReqResponseWithPageType,
} from "./category-search.types";
import { User } from "../../home";
import { toast } from "sonner";
import { FilterSchema } from "../category-page-filter";

export async function get_category_search(
  search_term: string,
  params: FilterSchema,
  page: number,
): Promise<ReqResponseWithPageType<GetCatgegorySearchResponse[]>> {
  const user: User = JSON.parse(localStorage.getItem("user-info") as string);

  try {
    console.log(params);
    const { data } = await axios.get<
      Awaited<Promise<ReqResponseWithPageType<GetCatgegorySearchResponse[]>>>
    >(
      buildCombinedSearchUrl({
        search_term,
        governates: params.governates,
        regions: params.region,
        gov_id: params.governorates?.id,
        min_price: params.min_price,
        max_price: params.max_price,
        price_order: params.order as string,
        type: params.type as string,
        region_id: params.regions?.id,
        category_id: params.categories?.id,
        subcategory_id: params.subcategories?.id,
        brand_country_id: params.brand_countries?.id,
        negotiable: params.negotiate as boolean,
        page,
      }),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!data.success) {
      toast.error("فشل البحث");
      return null;
    }

    return data;
  } catch (error) {
    toast.error("فشل البحث");
    return null;
  }
}

export function buildCombinedSearchUrl({
  search_term,
  gov_id,
  region_id,
  price_order,
  min_price,
  max_price,
  category_id,
  subcategory_id,
  brand_country_id,
  type,
  negotiable,
  region,
  governates,
  page,
}: CombinedSearchParams): string {
  const baseUrl = process.env.BACKEND__BASE_URL + "/client/ads/combined-search";
  const params = new URLSearchParams();

  if (search_term) params.append("search_term", search_term);
  if (gov_id) params.append("gov_id", gov_id.toString());
  if (region_id) params.append("region_id", region_id.toString());
  if (price_order) params.append("price_order", price_order);
  if (min_price) params.append("min_price", min_price.toString());
  if (max_price) params.append("max_price", max_price.toString());
  if (category_id) params.append("category_id", category_id.toString());
  if (subcategory_id)
    params.append("subcategory_id", subcategory_id.toString());
  if (brand_country_id !== undefined)
    params.append("brand_country_id", brand_country_id.toString());
  if (type) params.append("type", type);
  if (negotiable !== null && negotiable !== undefined)
    params.append("negotiable", negotiable.toString());
  if (page) params.append("page", page.toString());
  if (governates) params.append("gov_id", governates.toString());
  if (region) params.append("region_id", region.toString());

  return `${baseUrl}?${params.toString()}`;
}

export type CombinedSearchParams = {
  search_term?: string;
  governates?: number;
  region?: number;
  gov_id?: number;
  region_id?: number;
  price_order?: string;
  min_price?: number;
  max_price?: number;
  category_id?: number;
  subcategory_id?: number;
  brand_country_id?: number;
  type?: string;
  negotiable?: boolean;
  page?: number;
};
