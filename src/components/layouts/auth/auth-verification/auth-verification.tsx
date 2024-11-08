import {
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui";
import { verification_icons } from "./auth-verification.constants";
import { Check, LucideIcon } from "lucide-react";
import React from "react";
import { onSubmitVerification } from "./auth-verification.lib";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const AuthVerification = ({
  verify_register,
}: {
  verify_register?: boolean;
}) => {
  const validClass = "valid";
  const [otp, setOtp] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const route = useNavigate();
  async function onSubmit(data: string) {
    const res = await onSubmitVerification(
      { otp: data },
      route,
      verify_register,
    );
    if (!res) {
      setError(true);
    }
    setLoading(false);
  }

  const { t } = useTranslation();
  return (
    <div className="h-screen w-full md:p-12 flex relative">
      <div className="flex flex-col items-center gap-3 justify-center mx-auto border h-fit place-self-center px-4 lg:px-32 py-12 rounded-lg">
        <div className="flex flex-col gap-2 items-center">
          <verification_icons.email className="w-[340px] h-fit" />
          <div className="otpverification__header__title">
            {t("check_your_email")}
          </div>
          <div className="otpverification__header__description">
            {t("enter_the_6_digit_code_sent_to_to_continue")} .
          </div>
        </div>

        <form
          className="space-y-8"
          onSubmit={async (e) => {
            e.preventDefault();
            if (otp.length < 6) {
              return setError(true);
            }

            setError(false);
            setLoading(true);
            onSubmit(otp);
          }}
        >
          <div className="otpverification__content" dir="ltr">
            <InputOTP
              maxLength={6}
              required
              onChange={(e) => {
                setOtp(e);

                setError(false);
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot
                  className={cn(
                    validClass,
                    error && "border-red-400 bg-red-100 text-red-400",
                  )}
                  index={0}
                />
                <InputOTPSlot
                  className={cn(
                    validClass,
                    error && "border-red-400 bg-red-100 text-red-400",
                  )}
                  index={1}
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  className={cn(
                    validClass,
                    error && "border-red-400 bg-red-100 text-red-400",
                  )}
                  index={2}
                />
                <InputOTPSlot
                  className={cn(
                    validClass,
                    error && "border-red-400 bg-red-100 text-red-400",
                  )}
                  index={3}
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  className={cn(
                    validClass,
                    error && "border-red-400 bg-red-100 text-red-400",
                  )}
                  index={4}
                />
                <InputOTPSlot
                  className={cn(
                    validClass,
                    error && "border-red-400 bg-red-100 text-red-400",
                  )}
                  index={5}
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            variant="default"
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 mb-2"
            icon={{
              className: "w-5 h-5 stroke-[3px]",
              icon: Check as LucideIcon,
            }}
            disabled={!(otp.length === 6) || error || loading}
            loading={loading}
          >
            {t("verify_your_email")}
          </Button>
        </form>
      </div>
    </div>
  );
};
