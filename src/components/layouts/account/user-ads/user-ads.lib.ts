// get_user_ads function
import axios from "axios";
import { toast } from "sonner";
import { ProductType } from "../../home";

export async function get_user_ads(page: number) {
  const user = JSON.parse(localStorage.getItem("user-info") as string);
  if (!user) return null;

  try {
    const { data } = await axios.get<GetCatgegorySearchResponse>(
      `${process.env.BACKEND__BASE_URL}/client/ads/page/${page}?phone_number=${user.phone_number}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!data.success) {
      toast.error("فشل الحصول على الاعلانات");
    }

    return data.data;
  } catch (error) {
    toast.error("فشل الحصول على الاعلانات");
    return null;
  }
}

export interface GetCatgegorySearchResponse {
  success: boolean;
  data: {
    ads: ProductType[];
    pagination: paginationType;
  };
}

export type paginationType = {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  from: number;
  to: number;
};
