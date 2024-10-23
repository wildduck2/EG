import { z } from "zod";
import { phoneSchema } from "../auth-signin";

export const forgetPasswordSchema = z.object({
  phone: phoneSchema,
});

export type ForgetPasswordFormType = z.infer<typeof forgetPasswordSchema>;
