import {
  Button,
  buttonVariants,
  Input,
  Label,
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { LucideIcon, Mail, Phone } from "lucide-react";
import React from "react";

export const AuthForgetPassword = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [currentForgetMode, setCurrentForgetMode] = React.useState<
    "email" | "phone"
  >("email");

  return (
    <div className="h-screen w-1/2 p-12 flex relative">
      <Link
        to="/auth/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-8 right-8",
        )}
      >
        Sign up
      </Link>
      <div className="flex flex-col items-center gap-3 justify-center mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-semibold">Forget Password</h1>
          <p className="text-[.9rem] text-accent-foreground">
            Enter your data below to reset your account
          </p>
        </div>

        <div className="w-[350px]">
          <form onSubmit={() => {}}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="sr-only">
                  {currentForgetMode === "email" ? "Email" : "Phone"}
                </Label>
                <Input
                  id={currentForgetMode === "email" ? "email" : "phone"}
                  type={currentForgetMode === "email" ? "email" : "number"}
                  placeholder={
                    currentForgetMode === "email"
                      ? "example@example.com"
                      : "+12 34567890"
                  }
                  className="input"
                />
              </div>
              <Button
                variant="default"
                type="submit"
                className="w-full bg-red-400 hover:bg-red-500"
                icon={{
                  className: "w-5 h-5",
                  icon: Mail as LucideIcon,
                }}
                loading={false}
              >
                Continue with{" "}
                {currentForgetMode === "email" ? "Email" : "Phone"}
              </Button>
            </div>
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
                className: "size-4",
                icon:
                  currentForgetMode === "phone" ? Mail : (Phone as LucideIcon),
              }}
              loading={false}
              onClick={() => {
                setCurrentForgetMode(
                  currentForgetMode === "email" ? "phone" : "email",
                );
              }}
            >
              {currentForgetMode === "email" ? "Phone Number" : "Email"}
            </Button>
          </form>
        </div>

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
