import axios from "axios";
import { toast } from "sonner";
import { User } from "../user-profile";
import { QueryKeyMutateType } from "./user-wishlist.hook";

export async function get_user_wishlist() {
  const user: User | null = JSON.parse(
    localStorage.getItem("user-info") as string,
  );
  const number = `${process.env.BACKEND__BASE_URL}/client/wishlist?phone_number=${user?.phone_number}`;
  try {
    const { data: res_data } = await axios.get(number, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res_data) {
      toast.error("فشل في الحصول على قائمة المفضلات");
    }

    return res_data.data;
  } catch (error) {
    toast.error("فشل في الحصول على قائمة المفضلات");
    return null;
  }
}

export async function post_mutate_wishlist({
  id,
  wish_list_state,
  route,
}: QueryKeyMutateType) {
  const user: User | null = JSON.parse(
    localStorage.getItem("user-info") as string,
  );
  if (!user) {
    route({ to: "/auth/signin" });
    return toast.error("يجب تسجيل الدخول");
  }

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
        toast.error(`فشل اضافة الاعلان الي قائمة المفضلات`);
      }

      toast.success(`تمت العملية بنجاح`);
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
        toast.error("فشل في حذف الاعلان من قائمة المفضلات");
      }
      toast.success(`تمت العملية بنجاح`);
    }
  } catch (error) {
    toast.error("فشل في حذف الاعلان من قائمة المفضلات");
    return null;
  }
}
