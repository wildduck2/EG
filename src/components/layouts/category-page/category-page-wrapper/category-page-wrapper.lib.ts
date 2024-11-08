import axios from "axios";
import {
  GetCatgegorySearchResponse,
  ReqResponseWithPageType,
} from "../category-search/category-search.types";
import { toast } from "sonner";
import { GetCategoryPageAdsType } from "./category-page-wrapper.types";
import { FilterSchema } from "../category-page-filter";
import { phone_number } from "@/context";

export async function get_gategory_page_ads({
  id,
  page = 1,
  filter_schema,
  branch,
}: GetCategoryPageAdsType & {
  page?: number;
  filter_schema?: FilterSchema;
  branch: number;
}) {
  try {
    if (branch === 1) {
      const { data } = await axios.get<
        Awaited<Promise<ReqResponseWithPageType<GetCatgegorySearchResponse[]>>>
      >(`${process.env.BACKEND__BASE_URL}/client/subcategories/${id}`, {
        headers: {
          withCredentials: true,
          "Content-Type": "application/json",
        },
      });

      // if (!data.success) {
      //   console.log(data);
      //   toast.error("Failed to get category ad ...");
      //   return null;
      // }

      return { ...data, type: "category" };
    }

    if (branch > 1) {
      const { data } = await axios.post<
        Awaited<Promise<ReqResponseWithPageType<GetCatgegorySearchResponse[]>>>
      >(
        `${process.env.BACKEND__BASE_URL}/client/get-data-by-type`,
        {
          type: JSON.parse(localStorage.getItem("branch") as string) ?? branch,
          value: id,
          page: page,
          phone_number: "+201285971022", // JSON.parse(localStorage.getItem("phone") as string),
        },
        {
          headers: {
            withCredentials: true,
            "Content-Type": "application/json",
          },
        },
      );

      if (!data.success) {
        toast.error("Failed to get category ad");
        return null;
      }

      // console.log(JSON.stringify(data.data[0] as any).includes("wishlist"));

      return {
        ...data,
        type:
          data.data.length === 0
            ? "category"
            : JSON.stringify(data.data[0] as any)?.includes("wishlist")
              ? "product"
              : "category",
      };
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to get category ad");
    return null;
  }
}

// if (data.data.length === 0) {
//   const { data } = await axios.get<
//     Awaited<Promise<ReqResponseWithPageType<GetCatgegorySearchResponse[]>>>
//   >(`${process.env.BACKEND__BASE_URL}/client/subcategories/${id}`, {
//     headers: {
//       withCredentials: true,
//       "Content-Type": "application/json",
//     },
//   });
//
//   if (!data.success) {
//     const { data } = await axios.post<
//       Awaited<
//         Promise<ReqResponseWithPageType<GetCatgegorySearchResponse[]>>
//       >
//     >(
//       `${process.env.BACKEND__BASE_URL}/client/ads/getAdsByParameters`,
//       {
//         categoryId: id,
//         subCategoryId: filter_schema?.subcategories?.id,
//         brandCountryId: filter_schema?.brand_countries?.id,
//         thirdBranchId: filter_schema?.third_branches?.id,
//         gov_id: filter_schema?.governorates?.id,
//         region_id: filter_schema?.regions?.id,
//         min_price: filter_schema?.min_price,
//         max_price: filter_schema?.max_price,
//         negotiable:
//           (filter_schema?.negotiate as unknown as number) === 1 ? 1 : 0,
//         page,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//
//     if (!data.success) {
//       toast.error("Failed to get category ad");
//       return null;
//     }
//
//     return { ...data, type: "product" };
//   }
