import {
  companyNameSchema,
  emailSchema,
  phoneSchema,
  usernameSchema,
} from "@/components/layouts/auth";
import { z } from "zod";

export const userInfoFormSchema = z.object({
  phone: phoneSchema,
  email: emailSchema.optional().nullable(),
  username: usernameSchema,
  companyname: companyNameSchema.optional().nullable(),
});

export type UserInfoFormSchemaType = z.infer<typeof userInfoFormSchema>;
