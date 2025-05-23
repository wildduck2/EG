import { UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";
import { User } from "../../home";
import { VerificationResType } from "./auth-verification.types";

export const onSubmitVerification = async (
  data: { otp: string },
  route: UseNavigateResult<string>,
  verify_register: boolean | undefined = false,
) => {
  const user: User = JSON.parse(localStorage.getItem("user-info") as string);
  const phone: number = JSON.parse(localStorage.getItem("phone") as string);

  const path = verify_register
    ? "/user/password-confirm"
    : "/user/verify/phonenumber";
  try {
    const { data: res_data } = await axios.post<VerificationResType>(
      process.env.BACKEND__BASE_URL! + path,
      {
        phone_number: phone
          ? phone.toString().startsWith("+")
            ? phone
            : `+2${phone}`
          : user.phone_number,
        otp: data.otp,
        code: data.otp,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data.success) {
      toast.error("فشل التحقق");
      return null;
    }

    if (verify_register) {
      route({ to: "/auth/change-password" });
      toast.success("تم التحقق بنجاح");
      return res_data;
    }

    route({ to: "/auth/verification-confirmed" });
    toast.success("تم التحقق بنجاح");
    return res_data;
  } catch (error) {
    console.log(error);
    toast.error("فشل التحقق");
    return null;
  }
};
