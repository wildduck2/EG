import { AuthForgetPassword, AuthSide } from "@/components/layouts";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const ForgetPassword = () => {
  return (
    <main className={cn("flex w-full min-h-screen")}>
      <AuthSide />
      <AuthForgetPassword />
    </main>
  );
};
