import { ReqResponseType } from "../../home";

export type ForgetPasswordI18n = {
  signin: string;
  title: string;
  phonenumber: string;
  subtitle: string;
  forgetpassword: string;
  agree: string;
  link: string;
};

export type ForgetPasswordResType = ReqResponseType<{
  phone_number: string;
}>;
