import { AuthSide, AuthSignin } from "@/components/layouts";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const Signin = () => {
  return (
    <main className={cn("flex w-full min-h-screen")}>
      <AuthSide />
      <AuthSignin />
    </main>
  );
};
