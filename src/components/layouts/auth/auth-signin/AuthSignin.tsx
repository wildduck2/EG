import { Icons } from "@/constants";
import {
  Button,
  buttonVariants,
  Checkbox,
  Input,
  Separator,
} from "@/components/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";
import { LucideIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  PasswordInput,
  PhoneInput,
} from "@/components/ui/duckui/custom-inputs";
import { useTranslation } from "react-i18next";

type Inputs = {
  phone: string;
  password: string;
};

export const AuthSignin = () => {
  const route = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const { t, i18n } = useTranslation();
  const signin = t("signin");

  return (
    <div className="h-screen w-full lg:w-1/2 md:p-12 flex relative">
      <div className="absolute top-8 right-8 flex gap-2 items-center">
        <Link
          to="/auth/signup"
          className={cn(buttonVariants({ variant: "ghost" }), "text-md")}
        >
          {signin.signin}
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
          <form onSubmit={() => {}}>
            <div>
              <div className="flex flex-col">
                <PhoneInput />

                <PasswordInput />
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
                loading={false}
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
                loading={false}
              >
                {signin.createaccount}
              </Button>
            </div>
          </form>
        </div>

        <div className="flex gap-2 items-center ml-6 lmr-6 max-w-[200px] sm:max-w-full">
          <Checkbox />
          <p className="text-[.9rem] text-accent-foreground w-[350px] text-start">
            {signin.agree}
            <Link className="underline underline-offset-2 px-1 text-red-600">
              {signin.link}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
