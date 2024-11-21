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
      phone: "",
      password: "",
      password_confirmation: "",
      email: "",
      first_name: "",
      last_name: "",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "onChange",
  });

  const traderMethods = useForm<TraderValues>({
    resolver: zodResolver(traderFormSchemaa),
    defaultValues: {
      phone: "",
      password: "",
      password_confirmation: "",
      email: "",
      first_name: "",
      last_name: "",
      companyname: "",
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
  const { register, formState, handleSubmit, setValue } =
    methods as unknown as UseFormReturn<TraderValues>;
  const route = useNavigate();

  const { t, i18n } = useTranslation();

  const signup = t("signup") as unknown as SignupI18n;

  return (
    <div className="md:w-[350px]">
      <form
        onSubmit={handleSubmit((data) =>
          onSubmitSignup<TraderValues>(data, route, type),
        )}
      >
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2" dir={i18n.dir()}>
              <FormInput
                name="username"
                register={register("first_name")}
                error={{
                  states: formState.errors.username?.types,
                  errors: userNameErrorsArray,
                  inputError: formState.errors.username?.message,
                  type: "slide",
                }}
                input={{
                  id: "username",
                  placeholder: signup.firstName,
                  type: "text",
                  autoCapitalize: "none",
                  autoCorrect: "off",
                  required: true,
                }}
              />

              <FormInput
                name="username"
                register={register("last_name")}
                error={{
                  states: formState.errors.username?.types,
                  errors: userNameErrorsArray,
                  inputError: formState.errors.username?.message,
                  type: "slide",
                }}
                input={{
                  id: "username",
                  placeholder: signup.lastName,
                  type: "text",
                  autoCapitalize: "none",
                  autoCorrect: "off",
                  required: true,
                }}
              />
            </div>

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
                placeholder: `${t("email")}`,
                type: "email",
                autoCapitalize: "none",
                autoCorrect: "off",
                required: false,
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
                placeholder: `${t("phone")}`,
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
                placeholder: `${t("password")}`,
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
                placeholder: `${t("passwordConfirm")}`,
                type: "password",
                autoCapitalize: "none",
                autoCorrect: "off",
                required: true,
              }}
            />
          </div>

          <div
            className="flex gap-2 items-center  max-w-[200px] sm:max-w-full my-2"
            dir={i18n.dir()}
          >
            <Checkbox
              onCheckedChange={(value) => {
                setValue("agreed", value as boolean);
              }}
            />
            <p className="text-[.9rem] text-accent-foreground w-[350px] text-start">
              {signup.agree}
              <Link className="underline underline-offset-2 px-1 text-red-600">
                {signup.link}
              </Link>
              .
            </p>
          </div>

          <Button
            variant="default"
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 my-2"
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
