import { Icons } from "@/constants";
import {
  Button,
  buttonVariants,
  Checkbox,
  Input,
  Label,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";
import {
  Circle,
  CircleAlert,
  Eye,
  EyeOff,
  LucideIcon,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { z } from "zod";
import { PasswordInput } from "@/components/ui/duckui/custom-inputs";
import { useTranslation } from "react-i18next";

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
            <AuthSignupForm type="customer" />
          </TabsContent>
          <TabsContent value="trader">
            <AuthSignupForm type="trader" />
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

export interface AuthSignupProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "trader" | "customer";
}
export const AuthSignupForm = React.forwardRef<HTMLDivElement, AuthSignupProps>(
  ({ type }, ref) => {
    const { t } = useTranslation();

    const route = useNavigate();
    const signup = t("signup");

    return (
      <div className="md:w-[350px]">
        <form onSubmit={() => {}}>
          <div>
            <div className="flex flex-col">
              <Input
                id="username"
                type="text"
                placeholder={signup.username}
                className="mb-2"
              />

              {type === "trader" && (
                <Input
                  id="companyname"
                  type="text"
                  placeholder={signup.companyname}
                  className="mb-2"
                />
              )}
              <Input
                id="email"
                type="email"
                placeholder={"example@example.com" + signup.opt}
                className="mb-2"
              />
              <Input
                id="phone"
                type="tel"
                placeholder="01 xxx-xxx-xxxx"
                className="mb-2"
              />
              <PasswordInput />
            </div>
            <Button
              variant="default"
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 mb-2"
              icon={{
                className: "w-5 h-5",
                icon: Mail as LucideIcon,
              }}
              loading={false}
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

export const PasswordConfirmInput = () => {
  const [password, setPassword] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [passwordShowMenu, setPasswordShowMenu] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onPasswordShow = ({ setFunc, passwordRef, passwordShow }) => {
    setFunc(!passwordShow);
    passwordRef.current?.focus();
  };

  return (
    <>
      <div>
        <div className="relative felx items-start gap-1">
          <Label htmlFor="password-confirm" className="sr-only">
            تأكيد كلمة المرور
          </Label>
          <div className="relative">
            <Input
              id="password-confirm"
              className={`${passwordValid && "input-notvalid"}`}
              placeholder="••••••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              required
              value={password}
              onChange={({ currentTarget }) =>
                setPassword(() => currentTarget.value)
              }
              // disabled={isLoading}
              ref={passwordRef}
              onFocus={() => setPasswordShowMenu(true)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {!passwordValid && (
                <CircleAlert className="text-red-600 size-4" />
              )}
              <button
                type="button"
                onClick={() =>
                  onPasswordShow({
                    setFunc: setPasswordShow,
                    passwordRef,
                    passwordShow,
                  })
                }
              >
                {passwordShow ? (
                  <Eye className="size-4 text-secondary-foreground" />
                ) : (
                  <EyeOff className="size-4 text-secondary-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
        <p
          className={cn(
            "text-red-600 text-sm",
            !passwordValid ? "h-full opacity-100 mb-2" : "h-0 opacity-0 mb-0",
          )}
        >
          كلمة المرور غير صالحة
        </p>
      </div>
    </>
  );
};

export const Emails = [
  "ahmed@example.com",
  "ayob@example.com",
  "abdo@example.com",
  "ali@example.com",
  "mohamed@example.com",
];
