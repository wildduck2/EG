import {
  Button,
  buttonVariants,
  Checkbox,
  Label,
  zodResolver,
} from "@/components/ui";
import { PhoneInput } from "@/components/ui/duckui/custom-inputs";
import { cn } from "@/lib/utils";
import { Link, useNavigate, UseNavigateResult } from "@tanstack/react-router";
import { LucideIcon, Phone } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { phoneErrorsArray, phoneSchema } from "../auth-signin";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

const formSchema = z.object({
  phone: phoneSchema,
});

type FormValues = z.infer<typeof formSchema>;

export const AuthForgetPassword = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "onChange",
  });

  const { register, formState, watch, handleSubmit } = methods;
  const route = useNavigate();

  const onSubmit = async (
    data: FormValues,
    route: UseNavigateResult<string>,
  ) => {
    // Simulate API call
    try {
      const { data: res_data } = await axios.post(
        process.env.BACKEND__BASE_URL + "/user/password-send-otp",
        {
          phone_number: data.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res_data.success) {
        route({ to: "/auth/verification" });
      }

      console.log(res_data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const { t, i18n } = useTranslation();
  const forgetpassword = t("forgetpassword");

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
          <form onSubmit={handleSubmit((data) => onSubmit(data, route))}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="sr-only">
                  {forgetpassword.phonenumber}
                </Label>

                <PhoneInput
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
                  value={watch("phone")}
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

        <div className="flex gap-2 items-center ml-6 lmr-6 max-w-[200px] sm:max-w-full">
          <Checkbox />
          <p className="text-[.9rem] text-accent-foreground w-[350px] text-start">
            {forgetpassword.agree}
            <Link className="underline underline-offset-2 px-1 text-red-600">
              {forgetpassword.link}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
