import { UseNavigateResult } from "@tanstack/react-router";
import { ForgetPasswordFormType } from "./auth-forget-password.dto";
import axios from "axios";
import { toast } from "sonner";

export const onSubmitForgetPassword = async (
  data: ForgetPasswordFormType,
  route: UseNavigateResult<string>,
) => {
  try {
    const { data: res_data } = await axios.post(
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
      return toast.error("Failed to send OTP");
    }

    route({ to: "/auth/verification" });
    return toast.success("OTP sent successfully");
  } catch (error) {
    console.log(error);
    return toast.error("Failed to send OTP");
  }
};
