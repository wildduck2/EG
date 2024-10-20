import {
  Button,
  buttonVariants,
  Checkbox,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  zodResolver,
} from "@/components/ui";
import { Link, useNavigate, UseNavigateResult } from "@tanstack/react-router";
import { LucideIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { z } from "zod";
import { PhoneInput } from "@/components/ui/duckui/custom-inputs";
import { useTranslation } from "react-i18next";
import {
  companyNameErrorsArray,
  companyNameSchema,
  emailErrorsArray,
  emailSchema,
  passwordErrorsArray,
  passwordSchema,
  phoneErrorsArray,
  phoneSchema,
  userNameErrorsArray,
  usernameSchema,
} from "../auth-signin";
import { useForm } from "react-hook-form";
import axios from "axios";

export const AuthSignup = () => {
  const route = useNavigate();

  const { t, i18n } = useTranslation();
  const signup = t("signup");

  return (
    <div className="h-screen w-full lg:w-1/2 md:p-12 flex relative">
      <div className="absolute top-8 right-8 flex gap-2 items-center">
        <Link
          to="/auth/signin"
          className={cn(buttonVariants({ variant: "ghost" }), "text-md")}
        >
          {signup.signin}
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
          <h1 className="text-3xl font-semibold">{signup.createaccount}</h1>
          <p className="text-[.9rem] text-accent-foreground">
            {signup.subtitle}
          </p>
        </div>
        <Tabs
          defaultValue="customer"
          className="md:w-[350px] w-[90%] flex flex-col place-content-center"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">{signup.customer}</TabsTrigger>
            <TabsTrigger value="trader">{signup.trader}</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <AuthSignupForm type="customer" schema={customerFormSchema} />
          </TabsContent>
          <TabsContent value="trader">
            <AuthSignupForm type="trader" schema={traderFormSchemaa} />
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 items-center ml-6 lmr-6 max-w-[200px] sm:max-w-full">
          <Checkbox />
          <p className="text-[.9rem] text-accent-foreground w-[350px] text-start">
            {signup.agree}
            <Link className="underline underline-offset-2 px-1 text-red-600">
              {signup.link}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

const middleSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
  password_confirmation: z.string(),
  email: emailSchema.optional().nullable(),
  username: usernameSchema,
});

const customerFormSchema = middleSchema.refine(
  (data) => data.password === data.password_confirmation,
  {
    path: ["password_confirmation"],
    message: "Passwords must match",
  },
);

type TraderValues = z.infer<typeof traderFormSchemaa>;

const traderFormSchemaa = middleSchema
  .extend({
    companyname: companyNameSchema,
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords must match",
  });

export interface AuthSignupProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "trader" | "customer";
  schema: z.ZodType<TraderValues>;
}
export const AuthSignupForm = React.forwardRef<HTMLDivElement, AuthSignupProps>(
  ({ type, schema }, ref) => {
    const methods = useForm<TraderValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        phone: "",
        password: "",
        password_confirmation: "",
        email: "",
        username: "",
        companyname: null,
      },
      shouldUseNativeValidation: false,
      criteriaMode: "all",
      mode: "onChange",
    });

    const { register, formState, watch, handleSubmit } = methods;
    const route = useNavigate();

    const onSubmit = async (
      data: TraderValues,
      route: UseNavigateResult<string>,
    ) => {
      // Simulate API call
      try {
        const { data: res_data } = await axios.post(
          process.env.BACKEND__BASE_URL + "/user/register",
          {
            name: data.username,
            email: data.email,
            company_name: data.companyname,
            password_confirmation: data.password_confirmation,
            phone_number: data.phone,
            password: data.password,
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
    console.log(formState.errors);

    const { t } = useTranslation();

    const signup = t("signup");

    return (
      <div className="md:w-[350px]">
        <form onSubmit={handleSubmit((data) => onSubmit(data, route))}>
          <div>
            <div className="flex flex-col gap-2">
              <PhoneInput
                name="username"
                register={register("username")}
                error={{
                  states: formState.errors.username?.types,
                  errors: userNameErrorsArray,
                  inputError: formState.errors.username?.message,
                  type: "slide",
                }}
                input={{
                  id: "username",
                  placeholder: signup.username,
                  type: "text",
                  autoCapitalize: "none",
                  autoCorrect: "off",
                  required: true,
                }}
                value={watch("username")}
              />

              {type === "trader" && (
                <PhoneInput
                  name="companyname"
                  register={register("companyname")}
                  error={{
                    states: formState.errors.companyname?.types,
                    errors: companyNameErrorsArray,
                    inputError: formState.errors.companyname?.message,
                    type: "slide",
                  }}
                  input={{
                    id: "companyname",
                    placeholder: signup.companyname,
                    type: "text",
                    autoCapitalize: "none",
                    autoCorrect: "off",
                    required: true,
                  }}
                  value={watch("companyname")}
                />
              )}
              <PhoneInput
                name="email"
                register={register("email")}
                error={{
                  states: formState.errors.email?.types,
                  errors: emailErrorsArray,
                  inputError: formState.errors.email?.message,
                  type: "slide",
                }}
                input={{
                  id: "email",
                  placeholder: "duckui@duck.com",
                  type: "email",
                  autoCapitalize: "none",
                  autoCorrect: "off",
                  required: true,
                }}
                value={watch("email")}
              />

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

              <PhoneInput
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
                value={watch("password")}
              />
              <PhoneInput
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
                value={watch("password_confirmation")}
              />
            </div>
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
              {signup.createaccount}
            </Button>
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => route({ to: "/auth/signin" })}
              icon={{
                className: "w-5 h-5",
                icon: Mail as LucideIcon,
              }}
              disabled={formState.isSubmitting}
              loading={false}
            >
              {signup.signin}
            </Button>
          </div>
        </form>
      </div>
    );
  },
);
