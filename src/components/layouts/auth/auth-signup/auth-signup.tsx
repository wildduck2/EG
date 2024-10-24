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
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  customerFormSchema,
  CustomerValues,
  traderFormSchemaa,
  TraderValues,
} from "./auth-signup.dto";
import { SignupI18n } from "./auth-signup.types";

export const AuthSignup = () => {
  const route = useNavigate();

  const { t, i18n } = useTranslation();
  const signup = t("signup") as unknown as SignupI18n;

  const customerMethods = useForm<CustomerValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      phone: "1234567891239",
      password: "123456",
      password_confirmation: "123456",
      email: "duck1@duck.com",
      username: "duck-ui-[1]",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "onChange",
  });

  const traderMethods = useForm<TraderValues>({
    resolver: zodResolver(traderFormSchemaa),
    defaultValues: {
      phone: "1234567891232",
      password: "123456",
      password_confirmation: "123456",
      email: "duck30@duck.com",
      username: "duck-ui-[1]",
      companyname: "duck-ui",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "onChange",
  });

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
          defaultValue="client"
          className="md:w-[350px] w-[90%] flex flex-col place-content-center"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client">{signup.customer}</TabsTrigger>
            <TabsTrigger value="trader">{signup.trader}</TabsTrigger>
          </TabsList>
          <TabsContent value="client">
            <AuthSignupForm<CustomerValues>
              type="client"
              methods={customerMethods}
            />
          </TabsContent>
          <TabsContent value="trader">
            <AuthSignupForm<TraderValues>
              type="trader"
              methods={traderMethods}
            />
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

import { LucideIcon, Mail } from "lucide-react";
import { FormInput } from "@/components/ui/duckui/custom-inputs";

import {
  passwordErrorsArray,
  phoneErrorsArray,
} from "../auth-signin/auth-signin.lib";
import {
  companyNameErrorsArray,
  emailErrorsArray,
  onSubmitSignup,
  userNameErrorsArray,
} from "./auth-signup.lib";
import { AuthSignupProps } from "./auth-signup.types";
import { UseFormReturn } from "react-hook-form";

export const AuthSignupForm = <T extends TraderValues | CustomerValues>({
  type,
  methods,
}: AuthSignupProps<T>) => {
  const { register, formState, handleSubmit } =
    methods as unknown as UseFormReturn<TraderValues>;
  const route = useNavigate();

  const { t } = useTranslation();

  const signup = t("signup") as unknown as SignupI18n;

  return (
    <div className="md:w-[350px]">
      <form
        onSubmit={handleSubmit((data) =>
          onSubmitSignup<TraderValues>(data, route),
        )}
      >
        <div>
          <div className="flex flex-col gap-2">
            <FormInput
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
            />

            {type === "trader" && (
              <FormInput
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
              />
            )}
            <FormInput
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
            />

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
};
