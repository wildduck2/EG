import { Button, buttonVariants, zodResolver } from "@/components/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import { LucideIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/duckui/custom-inputs";
import { useTranslation } from "react-i18next";
import { signinFormSchema, SigninFormType, user } from "./auth-signin.dto";
import {
  onSubmitSignin,
  passwordErrorsArray,
  phoneErrorsArray,
} from "./auth-signin.lib";
import { SinginI18n } from "./auth-signin.types";
import { useAtom } from "jotai";

export const AuthSignin = () => {
  const methods = useForm<SigninFormType>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      phone: "+201285971377",
      password: "12341234",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "onChange",
  });

  const { register, formState, handleSubmit } = methods;
  const [_, setUserData] = useAtom(user);

  const route = useNavigate();

  const { t, i18n } = useTranslation();
  const signin = t("signin") as unknown as SinginI18n;

  return (
    <div className="h-screen w-full lg:w-1/2 md:p-12 flex relative">
      <div className="absolute top-8 right-8 flex gap-2 items-center">
        <Link
          to="/auth/signup"
          className={cn(buttonVariants({ variant: "ghost" }), "text-md")}
        >
          {signin.createaccount}
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
          <h1 className="text-3xl font-semibold">{signin.title}</h1>
          <p className="text-[.9rem] text-accent-foreground">
            {signin.subtitle}
          </p>
        </div>

        <div className="sm:w-[350px] w-[90%]">
          <form
            onSubmit={handleSubmit(async (data) => {
              const res = await onSubmitSignin(data, route);

              if (res) {
                setUserData(res.data.user);
              }
            })}
          >
            <div>
              <div className="flex flex-col gap-2">
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
                    autoComplete: "tel",
                    autoCorrect: "off",
                    required: true,
                  }}
                />
              </div>

              <Button
                className="p-0 hover:text-red-600"
                variant={"link"}
                type="button"
                onClick={() => route({ to: "/auth/forget-password" })}
              >
                {signin.forgotpassword}
              </Button>

              <Button
                variant="default"
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 mb-2"
                icon={{
                  className: "w-5 h-5",
                  icon: Mail as LucideIcon,
                }}
                disabled={!formState.isValid || formState.isSubmitting}
                loading={formState.isSubmitting}
              >
                {signin.signin}
              </Button>

              <Button
                variant="outline"
                type="submit"
                className="w-full "
                onClick={() => route({ to: "/auth/signup" })}
                icon={{
                  className: "w-5 h-5",
                  icon: Mail as LucideIcon,
                }}
                disabled={formState.isSubmitting}
              >
                {signin.createaccount}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
