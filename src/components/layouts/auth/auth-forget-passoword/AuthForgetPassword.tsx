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
    <div className="h-screen w-full lg:w-1/2 p-12 flex relative">
      <Link
        to="/auth/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-8 right-8 text-md",
        )}
      >
        سجل
      </Link>
      <div className="flex flex-col items-center gap-3 justify-center mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-semibold">نسيت كلمة المرور</h1>
          <p className="text-[.9rem] text-accent-foreground">
            أدخل بياناتك أدناه لإعادة تعيين حسابك
          </p>
        </div>

        <div className="w-[350px]">
          <form onSubmit={() => {}}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="sr-only">
                  رقم الهاتف
                </Label>
                <Input
                  id={"phone"}
                  type={"tel"}
                  placeholder="01 xxx-xxx-xxxx"
                  className="input"
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
                loading={isLoading}
              >
                نسيت كلمة المرور
              </Button>
            </div>
          </form>
        </div>

        <p className="text-[.9rem] text-accent-foreground w-[350px] text-center">
          من خلال النقر على متابعة، فإنك توافق على
          <Link className="underline underline-offset-2 px-1 text-red-600">
            شروط الخدمة
          </Link>
          و
          <Link className="underline underline-offset-2 px-1 text-red-600">
            سياسة الخصوصية
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
