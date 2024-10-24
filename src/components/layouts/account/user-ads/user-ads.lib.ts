import axios from "axios";
import { toast } from "sonner";
import { User } from "../user-profile";

export async function get_user_ads(user: User | null) {
  try {
    const { data: res_data } = await axios.get(
      process.env.BACKEND__BASE_URL + "/client/ads/page/1",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data) {
      toast.error("Something went wrong");
    }

    return res_data;
  } catch (error) {
    toast.error("Something went wrong");
    return null;
  }
}
