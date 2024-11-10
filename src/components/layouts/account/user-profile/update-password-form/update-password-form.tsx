import { Button, FormInput, zodResolver } from "@/components/ui";
import { useForm } from "react-hook-form";
import {
  updatePasswordFormSchema,
  UpdatePasswordFormSchemaType,
} from "./update-password-form.dto";
import { useTranslation } from "react-i18next";
import { update_password } from "./update-password-form.lib";
import {
  confirmPasswordErrorsArray,
  passwordErrorsArray,
} from "@/components/layouts/auth";

export const UpdatePasswordForm = () => {
  const { t, i18n } = useTranslation();
  const account = t("account");

  const methods = useForm<UpdatePasswordFormSchemaType>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
      oldpassword: "",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "all",
  });

  const { register, formState, handleSubmit } = methods;
  console.log(formState.errors.confirmpassword);

  return (
    <form
      onSubmit={handleSubmit((data) => update_password({ data: data }))}
      className="space-y-8 p-4 border-border border border-solid rounded-md md:w-[70%] "
    >
      <FormInput
        name="oldpassword"
        register={register("oldpassword")}
        error={{
          states: formState.errors.oldpassword?.types,
          errors: passwordErrorsArray,
          inputError: formState.errors.oldpassword?.message,
          type: "slide",
        }}
        input={{
          id: "oldpassword",
          placeholder: account.oldpassword,
          type: "password",
          autoCapitalize: "none",
          autoCorrect: "off",
          required: true,
        }}
      />
      <FormInput
        name="newpassword"
        register={register("newpassword")}
        error={{
          states: formState.errors.newpassword?.types,
          errors: [
            ...passwordErrorsArray,
            "New password cannot be the same as old password",
          ],
          inputError: formState.errors.newpassword?.message,
          type: "slide",
        }}
        input={{
          id: "newpassword",
          placeholder: account.newpassword,
          type: "password",
          autoCapitalize: "none",
          autoCorrect: "off",
          required: true,
        }}
      />
      <FormInput
        name="newpassword"
        register={register("confirmpassword")}
        error={{
          states: formState.errors.confirmpassword?.types,
          errors: confirmPasswordErrorsArray,
          inputError: formState.errors.confirmpassword?.message,
          type: "slide",
        }}
        input={{
          id: "password",
          placeholder: account.confirmnewpassword,
          type: "password",
          autoCapitalize: "none",
          autoCorrect: "off",
          required: true,
        }}
      />

      <Button
        type="submit"
        className="w-1/2 bg-[#ee1d24] text-primary-foreground hover:bg-[#ee1d24]/80"
        disabled={!formState.isValid || !formState.isDirty}
        loading={formState.isSubmitting}
      >
        {account.save}
      </Button>
    </form>
  );
};
