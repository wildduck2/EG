import { Button, buttonVariants, Checkbox, zodResolver } from "@/components/ui";
import { Link, useNavigate, UseNavigateResult } from "@tanstack/react-router";
import { LucideIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/duckui/custom-inputs";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import axios from "axios";

export enum ConfirmPasswordRules {
  Match = "Passwords do not match",
}

export enum UserNameRules {
  MinLength = "Must be at least 3 characters long",
  MaxLength = "Must be at most 254 characters long",
}

export enum CompanyNameRules {
  MinLength = "Must be at least 3 characters long",
  MaxLength = "Must be at most 254 characters long",
}

export enum EmailRules {
  ValidEmail = "Must be a valid email address",
  MaxLength = "Must be at most 254 characters long",
}

export enum PhoneInputError {
  TooShort = "Phone number must be at least 10 digits",
  InvalidCharacters = "Phone number must contain only digits",
  TooLong = "Phone number must be at most 15 digits",
}

export enum PasswordRules {
  Uppercase = "Must contain an uppercase letter",
  Lowercase = "Must contain a lowercase letter",
  MaxLength = "Must be at most 32 characters long",
  Number = "Must contain a number",
  SpecialCharacter = "Must contain a special character (e.g. !@#$%)",
  MinLength = "Must be at least 8 characters long",
}

export function enumToArray<T>(enumObj: T): T[keyof T][] {
  return Object.values(enumObj) as T[keyof T][];
}

export const phoneErrorsArray = enumToArray(PhoneInputError);
export const passwordErrorsArray = enumToArray(PasswordRules);
export const emailErrorsArray = enumToArray(EmailRules);
export const userNameErrorsArray = enumToArray(UserNameRules);
export const companyNameErrorsArray = enumToArray(CompanyNameRules);
export const confirmPasswordErrorsArray = enumToArray(ConfirmPasswordRules);

interface SinginI18n {
  register: string;
  title: string;
  subtitle: string;
  email: string;
  password: string;
  forgotpassword: string;
  signin: string;
  createaccount: string;
  agree: string;
  link: string;
}

export const usernameSchema = z
  .string()
  .min(3, UserNameRules.MinLength)
  .max(254, UserNameRules.MaxLength);

export const companyNameSchema = z
  .string()
  .min(3, CompanyNameRules.MinLength)
  .max(254, CompanyNameRules.MaxLength);

export const emailSchema = z
  .string()
  .email({ message: EmailRules.ValidEmail })
  .max(254, EmailRules.MaxLength);

export const phoneSchema = z
  .string()
  .min(10, PhoneInputError.TooShort)
  .max(15, PhoneInputError.TooLong)
  .regex(/^\+?\d+$/, PhoneInputError.InvalidCharacters);

export const passwordSchema = z
  .string()
  .min(8, PasswordRules.MinLength)
  .max(32, { message: PasswordRules.MaxLength })
  .regex(/[A-Z]/, PasswordRules.Uppercase)
  .regex(/[a-z]/, PasswordRules.Lowercase)
  .regex(/\d/, PasswordRules.Number)
  .regex(/[@$!%*?&]/, PasswordRules.SpecialCharacter);

const formSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
});

type FormValues = z.infer<typeof formSchema>;

export const AuthSignin = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
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
        process.env.BACKEND__BASE_URL + "/user/login",
        {
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
        route({ to: "/home" });
      }

      console.log(res_data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const { t, i18n } = useTranslation();
  const signin = t("signin") as unknown as SinginI18n;

  return (
    <div className="h-screen w-full lg:w-1/2 md:p-12 flex relative">
      <DevTool control={methods.control} />
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
          <form onSubmit={handleSubmit((data) => onSubmit(data, route))}>
            <div>
              <div className="flex flex-col gap-2">
                <PhoneInput
                  name="phone"
                  register={register("phone")}
                  error={{
                    states: formState.errors.phone?.types,
                    errors: phoneErrorsArray,
                    inputError: formState.errors.phone?.message,
                    type: "raw",
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
