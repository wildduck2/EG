import { z } from "zod";
import { passwordSchema, phoneSchema } from "../auth-signin";
import {
  CompanyNameRules,
  EmailRules,
  UserNameRules,
} from "./auth-signup.constants";

export const usernameSchema = z
  .string()
  .min(3, UserNameRules.MinLength)
  .max(254, UserNameRules.MaxLength);

export const companyNameSchema = z
  .string()
  .min(3, CompanyNameRules.MinLength)
  .max(254, CompanyNameRules.MaxLength);

export const emailSchema = z
  .string()
  .email({ message: EmailRules.ValidEmail })
  .max(254, EmailRules.MaxLength);

const middleSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
  password_confirmation: z.string(),
  email: z.string().default(""),
  username: usernameSchema,
  agreed: z.boolean().optional().default(false),
});

export const customerFormSchema = middleSchema.refine(
  (data) => data.password === data.password_confirmation,
  {
    path: ["password_confirmation"],
    message: "Passwords must match",
  },
);

export type CustomerValues = z.infer<typeof customerFormSchema>;

export const traderFormSchemaa = middleSchema
  .extend({
    companyname: companyNameSchema,
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords must match",
  });

export type TraderValues = z.infer<typeof traderFormSchemaa>;
