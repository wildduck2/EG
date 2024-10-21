import axios from "axios";
import { CategoryItemType } from "../../home";
import {
  GetProductItem,
  GetProductItemReq,
} from "./product-page-wrapper.types";

export async function get_product_item({
  category_id,
}: {
  category_id: number;
}): Promise<GetProductItem<CategoryItemType>> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<GetProductItemReq<CategoryItemType>>
    >(process.env.BACKEND__BASE_URL + "/client/categories/" + category_id, {
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
