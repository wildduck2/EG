import { UseFormReturn } from "react-hook-form";
import { CustomerValues, TraderValues } from "./auth-signup.dto";

export interface AuthSignupProps<T extends TraderValues | CustomerValues>
  extends React.HTMLAttributes<HTMLDivElement> {
  type: "trader" | "client";
  methods: UseFormReturn<T>;
}

export type SignupI18n = {
  register: string;
  trader: string;
  customer: string;
  username: string;
  companyname: string;
  opt: string;
  subtitle: string;
  email: string;
  password: string;
  forgotpassword: string;
  signin: string;
  createaccount: string;
  agree: string;
  link: string;
};
