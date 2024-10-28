import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Button,
  buttonVariants,
  Checkbox,
  Label,
  zodResolver,
  FormInput,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { LucideIcon, Phone } from "lucide-react";
import { phoneErrorsArray } from "../auth-signin/auth-signin.lib";
import {
  ForgetPasswordFormType,
  forgetPasswordSchema,
} from "./auth-forget-password.dto";
import { onSubmitForgetPassword } from "./auth-forget-password.lib";
import { ForgetPasswordI18n } from "./auth-forget-password.types";
import { useAtom } from "jotai";
import { phone_number } from "@/context";

export const AuthForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const forgetpassword = t("forgetpassword") as unknown as ForgetPasswordI18n;

  const methods = useForm<ForgetPasswordFormType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      phone: "+201285971377",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "onChange",
  });

  const { register, formState, handleSubmit } = methods;
  const route = useNavigate();

  const [_, setPhoneNumber] = useAtom(phone_number);

  return (
    <div className="h-screen w-full lg:w-1/2 md:p-12 flex relative">
      <div className="absolute top-8 right-8 flex gap-2 items-center">
        <Link
          to="/auth/signin"
          className={cn(buttonVariants({ variant: "ghost" }), "text-md")}
        >
          {forgetpassword.signin}
        </Link>

        <Button
          title={t("languages")}
          variant={"outline"}
          className="w-full md:w-[100px] "
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
          }
        />
      </div>
      <div className="flex flex-col items-center gap-3 justify-center mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-semibold">{forgetpassword.title}</h1>
          <p className="text-[.9rem] text-accent-foreground max-w-[350px] text-center">
            {forgetpassword.subtitle}
          </p>
        </div>

        <div className="w-full">
          <form
            onSubmit={handleSubmit(async (data) => {
              await onSubmitForgetPassword(data, route);
            })}
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="sr-only">
                  {forgetpassword.phonenumber}
                </Label>

                <FormInput
                  name="phone"
                  register={register("phone")}
                  error={{
                    states: formState.errors.phone?.types,
                    errors: phoneErrorsArray,
                    inputError: formState.errors.phone?.message,
                    type: "slide",
                  }}
                  input={{
                    id: "phone",
                    placeholder: "01 xxx-xxx-xxxx",
                    type: "tel",
                    autoCapitalize: "none",
                    autoComplete: "tel",
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
                  className: "w-5 h-5",
                  icon: Phone as LucideIcon,
                }}
                disabled={!formState.isValid || formState.isSubmitting}
                loading={formState.isSubmitting}
              >
                {forgetpassword.forgetpassword}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
