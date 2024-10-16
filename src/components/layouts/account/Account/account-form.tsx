"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, zodResolver } from "@/components/ui";

import { useTranslation } from "react-i18next";
import { PhoneInput } from "@/components/ui/duckui/custom-inputs";
import {
  companyNameErrorsArray,
  emailErrorsArray,
  emailSchema,
  passwordErrorsArray,
  passwordSchema,
  phoneErrorsArray,
  phoneSchema,
  userNameErrorsArray,
  usernameSchema,
} from "../../auth";

const formSchema = z.object({
  phone: phoneSchema,
  email: emailSchema,
  username: usernameSchema,
  companyname: usernameSchema,
});

type FormValues = z.infer<typeof formSchema>;

export function AccountForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      email: "",
      username: "",
      companyname: "",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "onChange",
  });

  const { register, formState, watch, handleSubmit } = methods;

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(formState);
  };

  const { t, i18n } = useTranslation();
  const account = t("account");

  return (
    <div className="flex items-start 2xl:gap-32 gap-8 flex-col xl:flex-row">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 p-4 border-border border border-solid rounded-md w-full"
      >
        <div className="flex items- gap-12">
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
              placeholder: account.name,
              type: "text",
              autoCapitalize: "none",
              autoCorrect: "off",
              required: true,
            }}
            value={watch("username")}
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
              required: true,
            }}
            value={watch("companyname")}
          />
        </div>
        <div className="flex items-start gap-12">
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
              type: "email",
              autoCapitalize: "none",
              autoCorrect: "off",
              required: true,
            }}
            value={watch("email")}
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
              required: true,
            }}
            value={watch("phone")}
          />
        </div>
        <Button type="submit">{account.save}</Button>
      </form>
      <SecondForm />
    </div>
  );
}
const form2Schema = z.object({
  oldpassword: passwordSchema,
  newpassword: passwordSchema,
  confirmpassword: passwordSchema,
});

type Form2Values = z.infer<typeof form2Schema>;

export const SecondForm = () => {
  const methods = useForm<Form2Values>({
    resolver: zodResolver(form2Schema),
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
      oldpassword: "",
    },
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    mode: "onChange",
  });

  const { register, formState, watch, handleSubmit } = methods;

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(formState);
  };

  console.log(formState.errors);
  const { t, i18n } = useTranslation();
  const account = t("account");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-4 border-border border border-solid w-full rounded-md"
    >
      <PhoneInput
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
        value={watch("oldpassword")}
      />
      <PhoneInput
        name="newpassword"
        register={register("newpassword")}
        error={{
          states: formState.errors.newpassword?.types,
          errors: passwordErrorsArray,
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
        value={watch("newpassword")}
      />
      <PhoneInput
        name="newpassword"
        register={register("confirmpassword")}
        error={{
          states: formState.errors.confirmpassword?.types,
          errors: passwordErrorsArray,
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
        value={watch("confirmpassword")}
      />

      <Button type="submit">{account.save}</Button>
    </form>
  );
};
