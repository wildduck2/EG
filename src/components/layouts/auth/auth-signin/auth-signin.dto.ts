import { z } from "zod";
import {
  CompanyNameRules,
  EmailRules,
  PasswordRules,
  PhoneInputError,
  UserNameRules,
} from "./auth-signin.constants";

export const phoneSchema = z
  .string()
  .min(10, PhoneInputError.TooShort)
  .max(15, PhoneInputError.TooLong)
  .regex(/^\+?\d+$/, PhoneInputError.InvalidCharacters);

export const passwordSchema = z
  .string()
  .min(6, PasswordRules.MinLength)
  .max(32, { message: PasswordRules.MaxLength });
// .regex(/[A-Z]/, PasswordRules.Uppercase)
// .regex(/[a-z]/, PasswordRules.Lowercase)
// .regex(/\d/, PasswordRules.Number)
// .regex(/[@$!%*?&]/, PasswordRules.SpecialCharacter);

export const signinFormSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
});

export type SigninFormType = z.infer<typeof signinFormSchema>;
