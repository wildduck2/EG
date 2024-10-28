import axios from "axios";
import { UpdatePasswordFormProps } from "./update-password-form.types";
import { token } from "../user-form";
import { toast } from "sonner";
import { User } from "@/components/layouts/home/ad-item-card";

export const update_password = async ({ data }: UpdatePasswordFormProps) => {
  const user: User = JSON.parse(localStorage.getItem("user-info") as string);
  if (!user) {
    toast.error("Your data has not been saved");
    return null;
  }

  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/change-password",
      {
        current_password: data.oldpassword,
        password: data.newpassword,
        password_confirmation: data.confirmpassword,
        phone_number: user.phone_number,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res_data.success) {
      toast.success("Your data has been saved");
      return res_data.data;
    }

    toast.error("Your data has not been saved");
    return null;
  } catch (error) {
    console.log(error);
    toast.error("Your data has not been saved");
    return null;
  }
};
