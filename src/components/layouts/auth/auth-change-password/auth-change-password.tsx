import { Button, FormInput, zodResolver } from "@/components/ui";
import { Check, LucideIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { auth_change_password_icons } from "./auth-change-password.constants";
import { passwordErrorsArray } from "../auth-signin";
import { useForm } from "react-hook-form";
import { onSubmitResetPassword } from "./auth-change-password.lib";
import {
  ChangePasswordFormType,
  changePasswordShema,
} from "./auth-change-password.dto";

export const AuthChangePassword = () => {
  const { register, handleSubmit, formState } = useForm<ChangePasswordFormType>(
    {
      resolver: zodResolver(changePasswordShema),
      defaultValues: {
        password: "",
        password_confirmation: "",
      },
      criteriaMode: "all",
      mode: "all",
    },
  );

  const route = useNavigate();

  return (
    <div className="h-screen w-full md:p-12 flex relative">
      <div className="flex flex-col items-center gap-3 justify-center mx-auto border h-fit place-self-center px-32 py-12 rounded-lg">
        <div className="flex flex-col gap-2 items-center">
          <auth_change_password_icons.change_password className="w-[340px] h-fit" />
          <div>Change your password</div>
        </div>

        <form
          className="space-y-2"
          onSubmit={handleSubmit((data) => onSubmitResetPassword(data, route))}
        >
          <div className="space-y-2">
            <FormInput
              name="password"
              register={register("password")}
              error={{
                states: formState.errors.password?.types,
                errors: passwordErrorsArray,
                inputError: formState.errors.password?.message,
                type: "slide",
              }}
              input={{
                id: "password",
                placeholder: "••••••••••••",
                type: "password",
                autoCapitalize: "none",
                autoCorrect: "off",
                required: true,
              }}
            />
            <FormInput
              name="confirm_password"
              register={register("password_confirmation")}
              error={{
                states: formState.errors.password_confirmation?.types,
                errors: ["Passwords must match"],
                inputError: formState.errors.password_confirmation?.message,
                type: "slide",
              }}
              input={{
                id: "confirm_password",
                placeholder: "••••••••••••",
                type: "password",
                autoCapitalize: "none",
                autoCorrect: "off",
                required: true,
              }}
            />
          </div>
          <Button
            variant="default"
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700"
            icon={{
              className: "w-5 h-5 stroke-[3px]",
              icon: Check as LucideIcon,
            }}
            disabled={!formState.isValid || formState.isSubmitting}
            loading={formState.isSubmitting}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};
