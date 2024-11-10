import { UseNavigateResult } from "@tanstack/react-router";
import { PasswordRules, PhoneInputError } from "./auth-signin.constants";
import { SigninFormType } from "./auth-signin.dto";
import axios from "axios";
import { toast } from "sonner";
import { SigninReqType } from "./auth-signin.types";

export function enumToArray<T extends {}>(enumObj: T): T[keyof T][] {
  return Object.values(enumObj) as T[keyof T][];
}

export const phoneErrorsArray = enumToArray(PhoneInputError);
export const passwordErrorsArray = enumToArray(PasswordRules);

export const onSubmitSignin = async (
  data: SigninFormType,
  route: UseNavigateResult<string>,
): Promise<SigninReqType | null> => {
  try {
    const { data: res_data } = await axios.post<SigninReqType>(
      process.env.BACKEND__BASE_URL + "/user/login",
      {
        phone_number: "+2" + data.phone,
        password: data.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data.data) {
      toast.error("فشل تسجيل الدخول");
      return null;
    }

    route({ to: "/" });
    toast.success("تم تسجيل الدخول بنجاح");

    localStorage.setItem("user-info", JSON.stringify(res_data.data.user));
    return res_data;
  } catch (error) {
    toast.error("فشل تسجيل الدخول");
    return null;
  }
};
