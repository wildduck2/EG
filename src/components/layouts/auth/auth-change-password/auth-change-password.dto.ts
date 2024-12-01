import { z } from "zod";
import { passwordSchema } from "../auth-signin";

export const changePasswordShema = z
  .object({
    password: passwordSchema,
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "passwords_must_match",
  });

export type ChangePasswordFormType = z.infer<typeof changePasswordShema>;
