import { Icons } from "@/constants";
import { Button, buttonVariants, Input, Separator } from "@/components/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";
import { LucideIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const AuthSignup = () => {
  const route = useNavigate();
  return (
    <div className="h-screen w-1/2 p-12 pr-[8rem] flex relative">
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

        <div className="w-[350px]">
          <form onSubmit={() => {}}>
            <div>
              <div className="flex flex-col gap-2">
                <Input
                  id="username"
                  type="username"
                  placeholder="username"
                  className="input"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="input"
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                />
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
