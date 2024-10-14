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

export const AuthSignup = () => {
  const route = useNavigate();
  return (
    <div className="h-screen w-full lg:w-1/2 p-12 flex relative">
      <Link
        to="/auth/signin"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-8 right-8 text-md",
        )}
      >
        تسجيل الدخول
      </Link>
      <div className="flex flex-col items-center gap-3 justify-center mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-semibold">إنشاء حساب</h1>
          <p className="text-[.9rem] text-accent-foreground">
            أدخل بياناتك أدناه لتسجيل حسابك
          </p>
        </div>
        <Tabs
          defaultValue="customer"
          className="w-[350px] flex flex-col place-content-center"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">عميل</TabsTrigger>
            <TabsTrigger value="trader">تاجر</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <AuthSignupForm type="customer" />
          </TabsContent>
          <TabsContent value="trader">
            <AuthSignupForm type="trader" />
          </TabsContent>
        </Tabs>
        <div className="flex gap-2 items-center mr-6">
          <Checkbox />
          <p className="text-[.9rem] text-accent-foreground w-[350px] text-start">
            بالنقر على متابعة، فإنك توافق على
            <Link className="underline underline-offset-2 px-1 text-red-600">
              الشروط والاحكام
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
    return (
      <div className="w-[350px]">
        <form onSubmit={() => {}}>
          <div>
            <div className="flex flex-col">
              <Input
                id="username"
                type="text"
                placeholder="اسم المستخدم"
                className="mb-2"
              />

              {type === "trader" && (
                <Input
                  id="companyname"
                  type="text"
                  placeholder="اسم الشركة"
                  className="mb-2"
                />
              )}
              <Input
                id="email"
                type="email"
                placeholder="example@example.com (اختياري)"
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
              انشاء حساب
            </Button>
            <Button
              variant="outline"
              type="submit"
              className="w-full"
              onClick={() => route({ to: "/auth/signin" })}
              icon={{
                className: "w-5 h-5",
                icon: Mail as LucideIcon,
              }}
              loading={false}
            >
              تسجيل الدخول
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
