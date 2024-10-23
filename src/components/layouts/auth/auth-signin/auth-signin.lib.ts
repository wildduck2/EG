import { UseNavigateResult } from "@tanstack/react-router";
import { PasswordRules, PhoneInputError } from "./auth-signin.constants";
import { SigninFormType } from "./auth-signin.dto";
import axios from "axios";
import { toast } from "sonner";

export function enumToArray<T extends {}>(enumObj: T): T[keyof T][] {
  return Object.values(enumObj) as T[keyof T][];
}

export const phoneErrorsArray = enumToArray(PhoneInputError);
export const passwordErrorsArray = enumToArray(PasswordRules);

export const onSubmitSignin = async (
  data: SigninFormType,
  route: UseNavigateResult<string>,
) => {
  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/login",
      {
        phone_number: data.phone,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res_data.success) {
      return toast.error("Sign in failed");
    }

    route({ to: "/" });
    toast.success("Sign in successfully");
  } catch (error) {
    return toast.error("Sign in failed");
  }
};
