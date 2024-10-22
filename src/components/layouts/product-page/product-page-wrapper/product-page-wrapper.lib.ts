import axios from "axios";
import { ProductType } from "../../home";
import {
  GetProductItem,
  GetProductItemReq,
} from "./product-page-wrapper.types";

export async function get_product_item({
  category_id,
}: {
  category_id?: number;
}): Promise<GetProductItem<ProductType> | null> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<GetProductItemReq<ProductType>>
    >(process.env.BACKEND__BASE_URL + "/client/show-ads/" + category_id, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res_data.success && !res_data.data) {
      return null;
    }

    return res_data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
