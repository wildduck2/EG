import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  companyNameErrorsArray,
  emailErrorsArray,
  phoneErrorsArray,
  userNameErrorsArray,
} from "@/components/layouts/auth";
import { Button, PhoneInput, zodResolver } from "@/components/ui";
import { userInfoFormSchema, UserInfoFormSchemaType } from "./user-form.dto";
import { update_user_data } from "./user-form.lib";
import { UserInfoFormProps } from "./user-form.types";

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ data }) => {
  // Translate Api
  const { t } = useTranslation();
  const account = t("account");

  // First Form
  const { register, formState, watch, handleSubmit } =
    useForm<UserInfoFormSchemaType>({
      resolver: zodResolver(userInfoFormSchema),
      defaultValues: {
        username: data.name,
        companyname: data.name_company,
        phone: data.phone_number,
        email: data.email,
      },
      shouldUseNativeValidation: false,
      criteriaMode: "all",
      mode: "onChange",
    });

  return (
    <form
      onSubmit={handleSubmit((data) => update_user_data({ data: data }))}
      className="space-y-8 p-4 border-border border border-solid rounded-md w-full"
    >
      <div className="flex items-start gap-4">
        <PhoneInput
          name="username"
          register={register("username")}
          error={{
            states: formState.errors.username?.types,
            errors: userNameErrorsArray,
            inputError: formState.errors.username?.message,
            type: "slide",
          }}
          input={{
            id: "username",
            placeholder: account.username,
            type: "text",
            autoCapitalize: "none",
            autoCorrect: "off",
            value: watch("username"),
          }}
        />

        <PhoneInput
          name="companyname"
          register={register("companyname")}
          error={{
            states: formState.errors.companyname?.types,
            errors: companyNameErrorsArray,
            inputError: formState.errors.companyname?.message,
            type: "slide",
          }}
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
        <PhoneInput
          name="email"
          register={register("email")}
          error={{
            states: formState.errors.email?.types,
            errors: emailErrorsArray,
            inputError: formState.errors.email?.message,
            type: "slide",
          }}
          input={{
            id: "email",
            placeholder: "duckui@duck.com",
            autoCapitalize: "none",
            autoCorrect: "off",
            value: watch("email"),
          }}
        />

        <PhoneInput
          name="phone"
          register={register("phone")}
          error={{
            states: formState.errors.phone?.types,
            errors: phoneErrorsArray,
            inputError: formState.errors.phone?.message,
            type: "slide",
          }}
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
        disabled={!formState.isValid || !formState.isDirty}
        loading={formState.isSubmitting}
      >
        {account.save}
      </Button>
    </form>
  );
};
