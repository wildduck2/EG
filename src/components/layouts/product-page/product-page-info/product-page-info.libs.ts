import axios from "axios";
import {
  GetProductHazards,
  getProductHazardsReq,
  TipsResponse,
} from "./product-page-info.types";

export async function get_product_hazards(): Promise<GetProductHazards<TipsResponse> | null> {
  try {
    const { data: res_data } = await axios.get<
      Awaited<getProductHazardsReq<TipsResponse>>
    >(process.env.BACKEND__BASE_URL + "/client/safety", {
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
