import axios from "axios";
import { CategoryItemType } from "../category-swiper-card";
import { GetCategories, GetCategoriesReq } from "./category-swiper.types";

export async function get_categories(): Promise<GetCategories<CategoryItemType> | null> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<GetCategoriesReq<CategoryItemType[]>>
    >(process.env.BACKEND__BASE_URL + "/client/categories", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res_data.success && res_data.data) {
      localStorage.setItem("categories", JSON.stringify(res_data.data));
      return res_data.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
