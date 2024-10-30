import { UseNavigateResult } from "@tanstack/react-router";
import { ForgetPasswordFormType } from "./auth-forget-password.dto";
import axios from "axios";
import { toast } from "sonner";
import { ForgetPasswordResType } from "./auth-forget-password.types";

export const onSubmitForgetPassword = async (
  data: ForgetPasswordFormType,
  route: UseNavigateResult<string>,
): Promise<ForgetPasswordResType | null> => {
  try {
    const { data: res_data } = await axios.post<ForgetPasswordResType>(
      process.env.BACKEND__BASE_URL + "/user/password-send-otp",
      {
        phone_number: data.phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data.success) {
      toast.error("Failed to send OTP");
      return null;
    }

    route({ to: "/auth/verification2" });
    localStorage.setItem("phone", JSON.stringify(data.phone));
    toast.success("OTP sent successfully");
    return res_data;
  } catch (error) {
    toast.error("Failed to send OTP");
    return null;
  }
};
