import { Button } from "@/components/ui";
import { verification_icons } from "../auth-verification";
import { useNavigate } from "@tanstack/react-router";

export const AuthVerificationConfirmed = () => {
  const route = useNavigate();

  return (
    <div className="h-screen w-full md:p-12 flex relative">
      <div className="flex flex-col items-center gap-3 justify-center mx-auto border h-fit place-self-center px-32 py-12 rounded-lg">
        <div className="flex flex-col gap-2 items-center space-y-4">
          <verification_icons.email_done className="w-[340px] h-fit" />
          <div className="otpverification__header__description">
            Your account has been confirmed successfully.
          </div>
        </div>

        <Button
          variant="default"
          type="submit"
          onClick={() => route({ to: "/" })}
          className="w-full bg-red-600 hover:bg-red-700 mb-2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
