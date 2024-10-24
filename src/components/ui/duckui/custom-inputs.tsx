import React from "react";
import { Input } from "./input";
import { Circle, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultipleFieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { Badge } from "./badge";

interface FormTextInputProps {
  name: string;
  register: UseFormRegisterReturn;
  error?: {
    states: MultipleFieldErrors | undefined;
    errors: string[];
    inputError?: string;
    type?: "slide" | "raw";
  };
  input: React.ComponentPropsWithoutRef<typeof Input>;
}

export const FormTextInput = ({
  name,
  register,
  error,
  input,
}: FormTextInputProps) => {
  const { states, errors, inputError, type = "raw" } = error ?? {};
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
};
