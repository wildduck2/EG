import { User } from "@/types";
import { redirect, UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";

export const onSubmitResetPassword = async (
  data: { password: string; password_confirmation: string },
  route: UseNavigateResult<string>,
) => {
  const phone: number = JSON.parse(localStorage.getItem("phone") as string);
  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/password/reset",
      {
        phone_number: "+2" + phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data.success) {
      toast.error("Failed to reset password");
      return null;
    }

    route({ to: "/auth/signin" });
    toast.success("Account password reset successfully");
    return res_data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to reset password");
    return null;
  }
};
