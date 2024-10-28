import axios from "axios";
import { toast } from "sonner";
import { User } from "../user-profile";

export async function get_user_ads() {
  const user = JSON.parse(localStorage.getItem("user-info") as string);
  if (!user) return null;

  try {
    const { data: res_data } = await axios.get(
      process.env.BACKEND__BASE_URL +
        "/client/ads/page/1" +
        "?phone_number=" +
        user.phone_number,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data.success) {
      toast.error("Failed to get user ads");
    }

    return res_data.data;
  } catch (error) {
    toast.error("Failed to get user ads");
    return null;
  }
}
