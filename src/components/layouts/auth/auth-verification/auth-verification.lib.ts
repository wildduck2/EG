import { UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";

export const onSubmitVerification = async (
  data: { phone: string; otp: string },
  route: UseNavigateResult<string>,
) => {
  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/password-confirm",
      {
        phone_number: data.phone,
        otp: data.otp,
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

    route({ to: "/auth/verification-confirmed" });
    toast.success("Account created successfully");
    return res_data;
  } catch (error) {
    toast.error("Something went wrong");
    return null;
  }
};
