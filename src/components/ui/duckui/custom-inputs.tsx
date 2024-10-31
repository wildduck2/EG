import React from "react";
import { Input } from "./input";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultipleFieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { Label } from ".";
import { useTranslation } from "react-i18next";

interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  error?: {
    states?: MultipleFieldErrors | undefined;
    errors?: string[] | undefined;
    inputError?: string | undefined;
    type?: "slide" | "raw" | undefined;
  };
  input?: React.ComponentPropsWithoutRef<typeof Input>;
  input_label?: React.ComponentPropsWithoutRef<typeof Label>;
}

export const FormInput = React.forwardRef<HTMLDivElement, FormInputProps>(
  (
    { register, error, input, input_label, children, className, ...props },
    ref,
  ) => {
    const { states, errors, inputError, type = "raw" } = error ?? {};
    const { className: inputClassName, ...inputProps } = input ?? {};
    const {
      className: labelClassName,
      children: labelChildren,
      ...labelProps
    } = input_label ?? {};
    const { t } = useTranslation();

    return (
      <div className={cn("relative", className)} {...props} ref={ref}>
        <div className="relative">
          <Label
            className={cn(
              "hidden",
              (states || inputError) && "text-red-600",
              labelClassName,
            )}
            {...labelProps}
          >
            {labelChildren}
          </Label>
          <div className="relative">
            {children ? (
              children
            ) : (
              <Input
                className={cn(
                  (states || inputError) &&
                    "border-red-400 bg-red-100 ring-red-400",
                  inputClassName,
                )}
                {...inputProps}
                {...register}
              />
            )}
            {
              // inputError && (
              //                             <Badge
              //                                 variant="ghost"
              //                                 size="icon"
              //                                 label={{
              //                                     children: inputError,
              //                                     className:
              //                                         "border-red-400 bg-red-100 w-full ring-red-400 text-red-400",
              //                                     showLabel: true,
              //                                 }}
              //                                 className="absolute right-3 top-1/2 -translate-y-1/2 "
              //                             >
              //                                 <CircleAlert className="text-red-600 size-4" />
              //                             </Badge>
              //                         )
            }
          </div>
        </div>

        {type === "raw" && (
          <p
            className={cn(
              "text-red-600 text-sm transition-all duration-300 ease-in-out py-1",
              inputError ? "h-5 opacity-100 mb-1" : "h-0 opacity-0 mb-0 py-0",
            )}
          >
            {t(inputError ?? "")}
          </p>
        )}

        {type === "slide" && errors && (
          <div
            className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden",
              states || inputError
                ? "max-h-[960px] opacity-100 my-1"
                : "max-h-0 opacity-0 my-0",
            )}
          >
            <ul className="flex flex-col items-start gap-1">
              {errors.map((rule) => (
                <li key={rule} className="flex items-center gap-2">
                  <Circle
                    className={cn(
                      "size-4",
                      states &&
                        Object.values(states).some((err) => err === rule)
                        ? "fill-red-400 stroke-red-400"
                        : "fill-green-400 stroke-green-400",
                    )}
                  />
                  <span className="text-sm">{t(rule)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);
