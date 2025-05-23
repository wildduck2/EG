import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, FormInput, Input, zodResolver } from "@/components/ui";
import { userInfoFormSchema, UserInfoFormSchemaType } from "./user-form.dto";
import { update_user_data } from "./user-form.lib";
import { UserInfoFormProps } from "./user-form.types";
import {
  companyNameErrorsArray,
  emailErrorsArray,
  phoneErrorsArray,
  SignupI18n,
  userNameErrorsArray,
} from "@/components/layouts/auth";
import { UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import React from "react";

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ data }) => {
  // Translate Api
  const { t, i18n } = useTranslation();
  const account = t("account");
  const signup = t("signup") as unknown as SignupI18n;

  const [attachments, setAttachments] = React.useState<string>(null);
  // First Form
  const { register, formState, watch, handleSubmit } =
    useForm<UserInfoFormSchemaType>({
      defaultValues: {
        firstName:
          data.name.split(" ")[0].length > 0
            ? data.name.split(" ")[0]
            : data.name,
        lastName: data.name.split(" ")[1],
        companyname: data.name_company,
        phone: data.phone_number,
        email: data.email,
      },
      mode: "onChange",
    });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        update_user_data({ data: data, attachments }),
      )}
      className="space-y-8 p-4 border-border border border-solid rounded-md w-full relative"
    >
      <div className="flex items-start gap-4 [&>div]:w-full">
        <div className="relative">
          <Input
            placeholder={"Filter files..."}
            type="file"
            accept="image/*"
            multiple
            className={cn(
              "absolute w-full h-full opacity-0 cursor-pointer z-50",
            )}
            onChange={(e) => {
              if (e.target.files) {
                const file = Array.from(e.target.files)[0];
                const exceededFileSize = file.size > 5 * 1024 * 1024;

                if (exceededFileSize) {
                  return toast.error("حجم الملف يجب أن يكون أقل من 5MB"); // Arabic message
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  if (reader.result) {
                    const base64String = reader.result as string;
                    setAttachments(base64String);
                  }
                };
                reader.onerror = () => {
                  toast.error("حدث خطأ أثناء قراءة الملف."); // Arabic message for error
                };
              }
            }}
          />

          {attachments && (
            <img
              className="w-64 h-24 absolute -top-[6.5rem] border-4 rounded-md object-contain bg-background pointer-events-none"
              src={attachments}
              alt="attachments"
            />
          )}
          <Button
            variant={attachments ? "default" : "outline"}
            type="button"
            className={cn("w-full justify-center")}
            icon={{ icon: UploadIcon, className: "h-4 w-4" }}
          >
            {t("upload_pictures")}
          </Button>
        </div>
      </div>
      <div className="flex items-start gap-4 [&_div]:w-full">
        <div className="flex items-center gap-2" dir={i18n.dir()}>
          <FormInput
            name="username"
            register={register("firstName")}
            error={{
              states: formState.errors.username?.types,
              errors: userNameErrorsArray,
              inputError: formState.errors.username?.message,
              type: "slide",
            }}
            input={{
              id: "username",
              placeholder: signup.firstName,
              type: "text",
              autoCapitalize: "none",
              autoCorrect: "off",
              required: true,
            }}
          />

          <FormInput
            name="username"
            register={register("lastName")}
            error={{
              states: formState.errors.username?.types,
              errors: userNameErrorsArray,
              inputError: formState.errors.username?.message,
              type: "slide",
            }}
            input={{
              id: "username",
              placeholder: signup.lastName,
              type: "text",
              autoCapitalize: "none",
              autoCorrect: "off",
              required: true,
            }}
          />
        </div>

        {data.is_trader === 1 && (
          <FormInput
            name="companyname"
            register={register("companyname")}
            input={{
              id: "companyname",
              placeholder: account.company,
              type: "text",
              autoCapitalize: "none",
              autoCorrect: "off",
              value: watch("companyname"),
            }}
          />
        )}
      </div>
      <div className="flex items-start gap-4 [&_div]:w-full">
        <FormInput
          name="email"
          register={register("email")}
          input={{
            id: "email",
            placeholder: "duckui@duck.com",
            autoCapitalize: "none",
            autoCorrect: "off",
            value: watch("email"),
          }}
        />

        <FormInput
          name="phone"
          register={register("phone")}
          input={{
            id: "phone",
            placeholder: "01 xxx-xxx-xxxx",
            type: "tel",
            autoCapitalize: "none",
            autoComplete: "tel",
            autoCorrect: "off",
            value: watch("phone"),
          }}
        />
      </div>
      <Button
        type="submit"
        className="w-1/2 bg-[#ee1d24] text-primary-foreground hover:bg-[#ee1d24]/80"
        loading={formState.isSubmitting}
      >
        {account.save}
      </Button>
    </form>
  );
};
