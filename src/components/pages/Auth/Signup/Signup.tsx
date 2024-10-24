import { AuthSide, AuthSignup } from "@/components/layouts";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const Signup = () => {
  return (
    <main className={cn("flex w-full min-h-screen")}>
      <AuthSide />
      <AuthSignup />
    </main>
  );
};
