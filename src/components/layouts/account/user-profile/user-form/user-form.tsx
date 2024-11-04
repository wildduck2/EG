import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, FormInput, zodResolver } from "@/components/ui";
import { userInfoFormSchema, UserInfoFormSchemaType } from "./user-form.dto";
import { update_user_data } from "./user-form.lib";
import { UserInfoFormProps } from "./user-form.types";
import {
  companyNameErrorsArray,
  emailErrorsArray,
  phoneErrorsArray,
  userNameErrorsArray,
} from "@/components/layouts/auth";

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ data }) => {
  // Translate Api
  const { t } = useTranslation();
  const account = t("account");

  // First Form
  const { register, formState, watch, handleSubmit } =
    useForm<UserInfoFormSchemaType>({
      defaultValues: {
        username: data.name,
        companyname: data.name_company,
        phone: data.phone_number,
        email: data.email,
      },
      mode: "onChange",
    });

  return (
    <form
      onSubmit={handleSubmit((data) => update_user_data({ data: data }))}
      className="space-y-8 p-4 border-border border border-solid rounded-md w-full"
    >
      <div className="flex items-start gap-4">
        <FormInput
          name="username"
          register={register("username")}
          input={{
            id: "username",
            placeholder: account.username,
            type: "text",
            autoCapitalize: "none",
            autoCorrect: "off",
            value: watch("username"),
          }}
        />

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
      </div>
      <div className="flex items-start gap-4">
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
        className="w-1/2"
        disabled={!formState.isDirty}
        loading={formState.isSubmitting}
      >
        {account.save}
      </Button>
    </form>
  );
};
