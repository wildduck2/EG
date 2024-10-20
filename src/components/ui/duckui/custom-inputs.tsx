import React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Circle, CircleAlert, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  MultipleFieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Badge } from "./badge";

// Define the password validation schema using Zod
const passwordSchema = z
  .string()
  .min(8, { message: "Must be at least 8 characters long" })
  .max(32, { message: "Must be at most 32 characters long" })
  .regex(/[A-Z]/, { message: "Must contain an uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain a lowercase letter" })
  .regex(/\d/, { message: "Must contain a number" })
  .regex(/[@$!%*?&]/, {
    message: "Must contain a special character (e.g. !@#$%)",
  });

export interface PasswordInputProps {}

export const PasswordInput: React.FC<PasswordInputProps> = () => {
  const [password, setPassword] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [passwordErrors, setPasswordErrors] = React.useState<string[]>([]);
  const [passwordShowMenu, setPasswordShowMenu] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onPasswordShow = () => {
    setPasswordShow((prev) => !prev);
    passwordRef.current?.focus();
  };

  // Function to validate password and return errors
  const validatePassword = (password: string) => {
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      // Extract error messages from zod
      return result.error.errors.map((err) => err.message);
    }
    return [];
  };

  return (
    <>
      <div className="relative grid items-start gap-1 w-full">
        <Label htmlFor="password" className="sr-only">
          Password
        </Label>
        <div className="relative mb-2">
          <Input
            id="password"
            className={cn(
              passwordErrors.length > 0 &&
                "border-red-400 bg-red-100 w-full ring-red-400",
            )}
            placeholder="••••••••••••"
            type={passwordShow ? "text" : "password"}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            required
            value={password}
            onChange={({ currentTarget }) => {
              setPassword(currentTarget.value);
              setPasswordErrors(validatePassword(currentTarget.value));
            }}
            ref={passwordRef}
            onFocus={() => setPasswordShowMenu(true)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {passwordErrors.length > 0 && (
              <CircleAlert className="text-red-600 size-4" />
            )}
            <button type="button" onClick={onPasswordShow}>
              {passwordShow ? (
                <Eye className="size-4 text-secondary-foreground" />
              ) : (
                <EyeOff className="size-4 text-secondary-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      <p
        className={cn(
          "text-red-600 text-sm",
          passwordErrors.length > 0
            ? "h-full opacity-100 mb-2"
            : "h-0 opacity-0 mb-0",
        )}
      >
        Invalid password
      </p>

      {/* Password validation rule display */}
      <div
        className={cn(
          "my-2 transition-all duration-600 ease-linear overflow-hidden",
          passwordErrors.length > 0 && passwordShowMenu && !login
            ? "h-[134px] mb-2"
            : "h-0 mb-0",
        )}
      >
        <ul className="flex flex-col item-start gap-1">
          {passwordRules.map((rule) => (
            <li key={rule.id} className="flex items-center gap-2">
              <Circle
                className={cn(
                  "size-4 text-secondary-foreground",
                  passwordErrors.includes(rule.name)
                    ? "fill-red-400 stroke-red-400"
                    : "fill-green-400 stroke-green-400",
                )}
              />
              <span className="text-sm">{rule.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

interface PhoneInputProps {
  name: string;
  register: UseFormRegisterReturn;
  error?: {
    states: MultipleFieldErrors;
    errors: string[];
    inputError?: string;
    type?: "slide" | "raw";
  };
  input: React.ComponentPropsWithoutRef<typeof Input>;
}

export function PhoneInput({ name, register, error, input }: PhoneInputProps) {
  const { states, errors, inputError, type = "raw" } = error;
  const { className, ...inputProps } = input;

  return (
    <div className="space-y-2 w-full">
      <div className="relative">
        <Input
          className={cn(
            states && "border-red-400 bg-red-100 ring-red-400",
            className,
          )}
          {...inputProps}
          {...register}
        />

        {states && (
          <Badge
            variant="ghost"
            size="icon"
            label={{
              children: inputError,
              className:
                "border-red-400 bg-red-100 w-full ring-red-400 text-red-400",
              showLabel: true,
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 "
          >
            <CircleAlert className="text-red-600 size-4" />
          </Badge>
        )}
      </div>

      {inputError && type === "raw" && (
        <p
          className={cn(
            "text-red-600 text-sm",
            states && Object.values(states).length > 0
              ? "h-full opacity-100 mb-2"
              : "h-0 opacity-0 mb-0",
          )}
        >
          {inputError}
        </p>
      )}

      {type === "slide" && (
        <div
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            states || inputError
              ? "max-h-[960px] opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <ul className="flex flex-col items-start gap-1">
            {errors.map((rule) => (
              <li key={rule} className="flex items-center gap-2">
                <Circle
                  className={cn(
                    "size-4",
                    states && Object.values(states).some((err) => err === rule)
                      ? "fill-red-400 stroke-red-400"
                      : "fill-green-400 stroke-green-400",
                  )}
                />
                <span className="text-sm">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
