import axios from "axios";
import { toast } from "sonner";
import { User } from "../user-profile";
import { QueryKeyMutateType } from "./user-wishlist.hook";

export async function get_user_wishlist(user: User | null) {
  try {
    const { data: res_data } = await axios.get(
      process.env.BACKEND__BASE_URL +
        "/client/wishlist" +
        "?phone_number=" +
        user?.phone_number,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data) {
      toast.error("Failed to get wishlist");
    }

    return res_data.data;
  } catch (error) {
    toast.error("Failed to get wishlist");
    return null;
  }
}

export async function post_mutate_wishlist({
  id,
  wish_list_state,
}: QueryKeyMutateType) {
  const user: User | null = JSON.parse(
    localStorage.getItem("user-info") as string,
  );

  try {
    if (wish_list_state === "add") {
      const { data: res_data } = await axios.post(
        `${process.env.BACKEND__BASE_URL}/client/wishlist`,
        {
          phone_number: user?.phone_number,
          ad_id: id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res_data) {
        toast.error(`Failed to add athe ad to wishlist`);
      }

      toast.success(`Successfully added the ad to wishlist`);
    } else {
      const { data: res_data } = await axios.delete(
        `${process.env.BACKEND__BASE_URL}/client/wishlist/${id}?phone_number=${user?.phone_number}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res_data) {
        toast.error(
          `Failed to ${wish_list_state === "add" ? "add" : "remove"} athe ad to wishlist`,
        );
      }
      toast.success(`Successfully removed ad to wishlist`);
    }
  } catch (error) {
    toast.error(
      `Failed to ${wish_list_state === "remove" ? "remove" : "add"} athe ad to wishlist`,
    );
    return null;
  }
}
