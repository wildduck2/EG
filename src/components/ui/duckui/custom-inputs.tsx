import React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Circle, CircleAlert, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";

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
            ? "h-[124px] mb-2"
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

// Password rules for UI display
export const passwordRules = [
  { id: 1, name: "Must contain an uppercase letter" },
  { id: 2, name: "Must contain a lowercase letter" },
  { id: 3, name: "Must contain a number" },
  { id: 4, name: "Must contain a special character (e.g. !@#$%)" },
  { id: 5, name: "Must be at least 8 characters long" },
];

//NOTE: Email Input
const emailSchema = z
  .string()
  .email({ message: "Must be a valid email address" })
  .max(254, { message: "Must be at most 254 characters long" });

export interface EmailInputProps {}

export const EmailInput: React.FC<EmailInputProps> = () => {
  const [email, setEmail] = React.useState("");
  const [emailErrors, setEmailErrors] = React.useState<string[]>([]);
  const [emailShowMenu, setEmailShowMenu] = React.useState(false);

  const emailRef = React.useRef<HTMLInputElement>(null);

  // Function to validate email and return errors
  const validateEmail = (email: string) => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      // Extract error messages from zod
      return result.error.errors.map((err) => err.message);
    }
    return [];
  };

  return (
    <>
      <div className="relative grid items-start gap-1 w-full">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <div className="relative mb-2">
          <Input
            id="email"
            className={cn(
              emailErrors.length > 0 &&
                "border-red-400 bg-red-100 w-full ring-red-400",
            )}
            placeholder="example@domain.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
            value={email}
            onChange={({ currentTarget }) => {
              setEmail(currentTarget.value);
              setEmailErrors(validateEmail(currentTarget.value));
            }}
            ref={emailRef}
            onFocus={() => setEmailShowMenu(true)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {emailErrors.length > 0 && (
              <CircleAlert className="text-red-600 size-4" />
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      <p
        className={cn(
          "text-red-600 text-sm",
          emailErrors.length > 0
            ? "h-full opacity-100 mb-2"
            : "h-0 opacity-0 mb-0",
        )}
      >
        Invalid email address
      </p>

      {/* Email validation rule display */}
      <div
        className={cn(
          "my-2 transition-all duration-600 ease-linear overflow-hidden",
          emailErrors.length > 0 && emailShowMenu
            ? "h-[40px] mb-2"
            : "h-0 mb-0",
        )}
      >
        <ul className="flex flex-col item-start gap-1">
          {emailRules.map((rule) => (
            <li key={rule.id} className="flex items-center gap-2">
              <Circle
                className={cn(
                  "size-4 text-secondary-foreground",
                  emailErrors.includes(rule.name)
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

// Email rules for UI display
export const emailRules = [
  { id: 1, name: "Must be a valid email address" },
  { id: 2, name: "Must be at most 254 characters long" },
];

// NOTE: Phone Input
const phoneSchema = z
  .string()
  .min(10, { message: "Must be at least 10 digits long" })
  .max(15, { message: "Must be at most 15 digits long" })
  .regex(/^\d+$/, { message: "Must contain only numbers" });

export interface PhoneInputProps {}

export const PhoneInput: React.FC<PhoneInputProps> = () => {
  const [phone, setPhone] = React.useState("");
  const [phoneErrors, setPhoneErrors] = React.useState<string[]>([]);
  const [phoneShowMenu, setPhoneShowMenu] = React.useState(false);

  const phoneRef = React.useRef<HTMLInputElement>(null);

  // Function to validate phone number and return errors
  const validatePhone = (phone: string) => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      // Extract error messages from zod
      return result.error.errors.map((err) => err.message);
    }
    return [];
  };

  return (
    <>
      <div className="relative grid items-start gap-1 w-full">
        <Label htmlFor="phone" className="sr-only">
          Phone Number
        </Label>
        <div className="relative mb-2">
          <Input
            id="phone"
            className={cn(
              phoneErrors.length > 0 &&
                "border-red-400 bg-red-100 w-full ring-red-400",
            )}
            placeholder="01 xxx-xxx-xxxx"
            type="tel"
            autoCapitalize="none"
            autoComplete="tel"
            autoCorrect="off"
            required
            value={phone}
            onChange={({ currentTarget }) => {
              setPhone(currentTarget.value);
              setPhoneErrors(validatePhone(currentTarget.value));
            }}
            ref={phoneRef}
            onFocus={() => setPhoneShowMenu(true)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {phoneErrors.length > 0 && (
              <CircleAlert className="text-red-600 size-4" />
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      <p
        className={cn(
          "text-red-600 text-sm",
          phoneErrors.length > 0
            ? "h-full opacity-100 mb-2"
            : "h-0 opacity-0 mb-0",
        )}
      >
        Invalid phone number
      </p>

      {/* Phone validation rule display */}
      <div
        className={cn(
          "my-2 transition-all duration-600 ease-linear overflow-hidden",
          phoneErrors.length > 0 && phoneShowMenu
            ? "h-[70px] mb-2"
            : "h-0 mb-0",
        )}
      >
        <ul className="flex flex-col item-start gap-1">
          {phoneRules.map((rule) => (
            <li key={rule.id} className="flex items-center gap-2">
              <Circle
                className={cn(
                  "size-4 text-secondary-foreground",
                  phoneErrors.includes(rule.name)
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

// Phone number rules for UI display
export const phoneRules = [
  { id: 1, name: "Must be at least 10 digits long" },
  { id: 3, name: "Must contain only numbers" },
];
