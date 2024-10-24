import { User } from "../../account/user-profile";
import { ReqResponseType } from "../../home";

export interface AuthSigninProps {
  children?: React.ReactNode;
}

export type SigninReqType = { data: { user: User } };

export interface SinginI18n {
  register: string;
  title: string;
  subtitle: string;
  email: string;
  password: string;
  forgotpassword: string;
  signin: string;
  createaccount: string;
  agree: string;
  link: string;
}
