import { redirect, UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";
import { ReqResponseType, User } from "../../home";
import { VerificationResType } from "./auth-verification.types";

export const onSubmitVerification = async (
  data: { otp: string },
  route: UseNavigateResult<string>,
) => {
  const user: User = JSON.parse(localStorage.getItem("user-info") as string);
  const phone: number = JSON.parse(localStorage.getItem("phone") as string);
  // if (!user || !phone) {
  //   toast.error("Something went wrong, please try again");
  //   return null;
  // }
  try {
    const { data: res_data } = await axios.post<VerificationResType>(
      process.env.BACKEND__BASE_URL + "/user/password-confirm",
      {
        phone_number: user ? user.phone_number : phone,
        otp: data.otp,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data.success) {
      toast.error("Something went wrong");
      return null;
    }

    route({ to: "/auth/change-password" });
    toast.success("Account verified successfully");
    return res_data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    return null;
  }
};
