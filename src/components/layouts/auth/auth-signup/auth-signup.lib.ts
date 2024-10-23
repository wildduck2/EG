import { UseNavigateResult } from "@tanstack/react-router";
import { enumToArray } from "../auth-signin";
import {
  CompanyNameRules,
  ConfirmPasswordRules,
  EmailRules,
  UserNameRules,
} from "./auth-signup.constants";
import { CustomerValues, TraderValues } from "./auth-signup.dto";
import axios from "axios";
import { toast } from "sonner";

export const emailErrorsArray = enumToArray(EmailRules);
export const userNameErrorsArray = enumToArray(UserNameRules);
export const companyNameErrorsArray = enumToArray(CompanyNameRules);
export const confirmPasswordErrorsArray = enumToArray(ConfirmPasswordRules);

export const onSubmitSignup = async <T extends TraderValues>(
  data: T,
  route: UseNavigateResult<string>,
) => {
  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/register",
      {
        name: data.username,
        email: data.email,
        name_company: data.companyname,
        password_confirmation: data.password_confirmation,
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
      return toast.error("Something went wrong");
    }

    route({ to: "/auth/verification" });
    return toast.success("Account created successfully");
  } catch (error) {
    return toast.error("Something went wrong");
    return null;
  }
};
