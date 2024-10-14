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

  return (
    <div className="h-screen w-full lg:w-1/2 p-12 flex relative">
      <Link
        to="/auth/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-8 right-8 text-md",
        )}
      >
        التسجيل
      </Link>
      <div className="flex flex-col items-center gap-3 justify-center mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-semibold">مرحبًا بعودتك</h1>
          <p className="text-[.9rem] text-accent-foreground">
            أدخل بياناتك أدناه لتسجيل الدخول إلى حسابك
          </p>
        </div>

        <div className="w-[350px]">
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
                نسيت كلمة المرور
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
                تسجيل الدخول
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
                انشاء حساب
              </Button>
            </div>
          </form>
        </div>

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
