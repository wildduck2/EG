import { User } from "@/types";
import { redirect, UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";

export const onSubmitResetPassword = async (
  data: { password: string; password_confirmation: string },
  phone_number: string,
  route: UseNavigateResult<string>,
) => {
  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/password/reset",
      {
        phone_number,
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
      toast.error("Something went wrong");
      return null;
    }

    route({ to: "/auth/signin" });
    toast.success("Account password reset successfully");
    return res_data;
  } catch (error) {
    toast.error("Something went wrong");
    return null;
  }
};
