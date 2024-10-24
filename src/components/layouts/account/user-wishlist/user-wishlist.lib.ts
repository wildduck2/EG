import axios from "axios";
import { toast } from "sonner";
import { User } from "../user-profile";
import { QueryKeyMutateType } from "./user-wishlist.hook";

export async function get_user_wishlist(user: User | null) {
  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/client/wishlist",
      {
        phone_number: user?.phone_number,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data) {
      toast.error("Failed to get wishlist");
    }

    toast.success("Account created successfully");
  } catch (error) {
    toast.error("Failed to get wishlist");
    return null;
  }
}

export async function post_mutate_wishlist({
  user,
  id,
  wish_list_state,
}: QueryKeyMutateType) {
  try {
    if (wish_list_state === "remove") {
      const { data: res_data } = await axios.delete(
        `${process.env.BACKEND__BASE_URL}/client/wishlist/${id}?phone_number=${user?.phone_number}`,
      );

      if (!res_data) {
        toast.error(
          `Failed to ${wish_list_state === "remove" ? "remove" : "add"} athe ad to wishlist`,
        );
      }
    } else {
      const { data: res_data } = await axios.post(
        process.env.BACKEND__BASE_URL + "/client/wishlist",
        {
          ad_id: id,
          phone_number: user?.phone_number,
        },
        {
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
    }

    toast.success(
      `Successfully ${wish_list_state === "remove" ? "removed" : "added"} the ad to wishlist`,
    );
  } catch (error) {
    toast.error(
      `Failed to ${wish_list_state === "remove" ? "remove" : "add"} athe ad to wishlist`,
    );
    return null;
  }
}
