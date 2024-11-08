import { Button } from "@/components/ui";
import { verification_icons } from "../auth-verification";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const AuthVerificationConfirmed = () => {
  const { t } = useTranslation();
  const route = useNavigate();

  return (
    <div className="h-screen w-full md:p-12 flex relative">
      <div className="flex flex-col items-center gap-3 justify-center mx-auto border h-fit place-self-center px-32 py-12 rounded-lg">
        <div className="flex flex-col gap-2 items-center space-y-4">
          <verification_icons.email_done className="w-[340px] h-fit" />
          <div className="otpverification__header__description">
            {t("your_account_has_been_confirmed_successfully")}.
          </div>
        </div>

        <Button
          variant="default"
          type="submit"
          onClick={() => route({ to: "/auth/signin" })}
          className="w-full bg-red-600 hover:bg-red-700 mb-2"
        >
          {t("continue")}
        </Button>
      </div>
    </div>
  );
};
