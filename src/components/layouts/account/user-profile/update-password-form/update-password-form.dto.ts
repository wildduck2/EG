import { passwordSchema } from "@/components/layouts/auth";
import { z } from "zod";

export const updatePasswordFormSchema = z
  .object({
    oldpassword: passwordSchema,
    newpassword: passwordSchema,
    confirmpassword: z.string(),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  })
  .refine((data) => data.newpassword !== data.oldpassword, {
    message: "New password cannot be the same as old password",
    path: ["newpassword"],
  });

export type UpdatePasswordFormSchemaType = z.infer<
  typeof updatePasswordFormSchema
>;
