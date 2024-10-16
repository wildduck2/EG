import {
  Button,
  buttonVariants,
  Checkbox,
  Input,
  Label,
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { LucideIcon, Mail, Phone } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export const AuthForgetPassword = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [currentForgetMode, setCurrentForgetMode] = React.useState<
    "email" | "phone"
  >("email");

  const { t, i18n } = useTranslation();
  const forgetpassword = t("forgetpassword");

  return (
    <div className="h-screen w-full lg:w-1/2 md:p-12 flex relative">
      <div className="absolute top-8 right-8 flex gap-2 items-center">
        <Link
          to="/auth/signin"
          className={cn(buttonVariants({ variant: "ghost" }), "text-md")}
        >
          {forgetpassword.signin}
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
          <h1 className="text-3xl font-semibold">{forgetpassword.title}</h1>
          <p className="text-[.9rem] text-accent-foreground max-w-[350px] text-center">
            {forgetpassword.subtitle}
          </p>
        </div>

        <div className="md:w-[350px]">
          <form onSubmit={() => {}}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="sr-only">
                  {forgetpassword.phonenumber}
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
                {forgetpassword.forgetpassword}
              </Button>
            </div>
          </form>
        </div>

        <div className="flex gap-2 items-center ml-6 lmr-6 max-w-[200px] sm:max-w-full">
          <Checkbox />
          <p className="text-[.9rem] text-accent-foreground w-[350px] text-start">
            {forgetpassword.agree}
            <Link className="underline underline-offset-2 px-1 text-red-600">
              {forgetpassword.link}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
