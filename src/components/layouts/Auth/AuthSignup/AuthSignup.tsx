import { Icons } from "@/constants";
import {
  Button,
  buttonVariants,
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

export const AuthSignup = () => {
  const route = useNavigate();
  return (
    <div className="h-screen w-1/2 p-12 flex relative">
      <Link
        to="/auth/signin"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-8 right-8",
        )}
      >
        Sign In
      </Link>
      <div className="flex flex-col items-center gap-3 justify-center mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-semibold">Create an account</h1>
          <p className="text-[.9rem] text-accent-foreground">
            Enter your data below to register your account
          </p>
        </div>
        <Tabs
          defaultValue="customer"
          className="w-[350px] flex flex-col place-content-center"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="trader">Trader</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <AuthSignupForm type="customer" />
          </TabsContent>
          <TabsContent value="trader">
            <AuthSignupForm type="trader" />
          </TabsContent>
        </Tabs>
        <p className="text-[.9rem] text-accent-foreground w-[350px] text-center">
          By clicking continue, you agree to our
          <Link className="underline underline-offset-2 px-1 text-red-400">
            Terms of Service
          </Link>
          and
          <Link className="underline underline-offset-2 px-1 text-red-400">
            Privacy Policy
          </Link>
          .
        </p>
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
                placeholder="username"
                className="mb-2"
              />

              {type === "trader" && (
                <Input
                  id="companyname"
                  type="text"
                  placeholder="companyname"
                  className="mb-2"
                />
              )}
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="mb-2"
              />
              <Input
                id="phone"
                type="number"
                placeholder="+1 123 456 7890"
                className="mb-2"
              />
              <PasswordInput />
              <PasswordConfirmInput />
            </div>
            <Button
              variant="default"
              type="submit"
              className="w-full bg-red-400 hover:bg-red-500 mt-2"
              icon={{
                className: "w-5 h-5",
                icon: Mail as LucideIcon,
              }}
              loading={false}
            >
              Sign Up with Email
            </Button>
          </div>
        </form>
        <div className="flex flex-col gap-3 py-6 relative">
          <div>
            <Separator className="w-[350px] h-[1px]" />
          </div>
          <div className="bg-background absolute flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2">
            <span className="text-accent-foreground">Or continue with</span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          icon={{
            className: "w-5 h-5",
            icon: FcGoogle as LucideIcon,
          }}
          loading={false}
          // disabled={isLoading}
          // onClick={AuthGoogle}
        >
          Google
        </Button>
      </div>
    );
  },
);

export const PasswordInput = () => {
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
      <div className="relative felx items-start gap-1 ">
        <Label htmlFor="password" className="sr-only">
          Password
        </Label>
        <div className="relative mb-2">
          <Input
            id="password"
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
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {!passwordValid && <CircleAlert className="text-red-400 size-4" />}
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
          "text-red-400 text-sm",
          !passwordValid ? "h-full opacity-100 mb-2" : "h-0 opacity-0 mb-0",
        )}
      >
        Password is not valid
      </p>
      <div
        className={cn(
          "my-2 transition-all duration-600 ease-linear overflow-hidden",
          passwordValid && passwordShowMenu && !login
            ? "h-[124px] mb-2"
            : "h-0 mb-0",
        )}
      >
        <ul className="flex flex-col item-start gap-1">
          {passwordrules.map((rule) => (
            <li key={rule.id} className="flex items-center gap-2">
              <Circle
                className={cn(
                  "size-4 text-secondary-foreground",
                  passwordValid && "red",
                  // passwordHasUppercase && rule.id === 1 && 'green',
                  // passwordHasLowercase && rule.id === 2 && 'green',
                  // passwordHasNumber && rule.id === 3 && 'green',
                  // passwordHasSpecialCharacter && rule.id === 4 && 'green',
                  // passwordInRange && rule.id === 5 && 'green',
                )}
              />
              <span className="text-sm">{rule.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const PasswordConfirmInput = () => {
  const [password, setPassword] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [passwordShowMenu, setPasswordShowMenu] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onPasswordShow = ({ setFunc, passwordRef, passwordShow }) => {};

  return (
    <>
      <div>
        <div className="relative felx items-start gap-1">
          <Label htmlFor="password-confirm" className="sr-only">
            Password Confirm
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
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {!passwordValid && (
                <CircleAlert className="text-red-400 size-4" />
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
            "text-red-400 text-sm",
            !passwordValid ? "h-full opacity-100 mb-2" : "h-0 opacity-0 mb-0",
          )}
        >
          Password is not valid
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

export const emailSchema = z.string().email();
export const passwordInRange = z.string().min(8).max(32);
export const passwordhasuppercase = z.string().regex(/(?=.*[A-Z])/);
export const passwordhaslowercase = z.string().regex(/(?=.*[a-z])/);
export const passwordhasnumber = z.string().regex(/(?=.*\d)/);
export const passwordhasspecialcharacter = z.string().regex(/(?=.*[@$!%*?&])/);
export const dateSchema = z.date().refine((date) => !isNaN(date.getTime()), {
  message: "Invalid date",
});

export const passwordrules = [
  {
    id: 1,
    name: "Uppercase letter",
  },
  {
    id: 2,
    name: "Lowercase letter",
  },
  {
    id: 3,
    name: "Number",
  },
  {
    id: 4,
    name: "Special character (e.g. !?<>@#$%)",
  },
  {
    id: 5,
    name: "Minimum 8 characters",
  },
];
