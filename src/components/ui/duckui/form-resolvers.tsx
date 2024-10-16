import { toNestErrors, validateFieldsNatively } from "@hookform/resolvers";
import { FieldError, FieldErrors, appendErrors } from "react-hook-form";
import { ZodError, z } from "zod";

import { FieldValues, ResolverOptions, ResolverResult } from "react-hook-form";

export type Resolver = <T extends z.Schema<any, any>>(
  schema: T,
  schemaOptions?: Partial<z.ParseParams>,
  factoryOptions?: {
    mode?: "async" | "sync";
    raw?: boolean;
  },
) => <TFieldValues extends FieldValues, TContext>(
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>,
) => Promise<ResolverResult<TFieldValues>>;

const isZodError = (error: any): error is ZodError =>
  Array.isArray(error?.errors);

const parseErrorSchema = (
  zodErrors: z.ZodIssue[],
  validateAllFieldCriteria: boolean,
) => {
  const errors: Record<string, FieldError> = {};
  let idx: number = 0;

  for (const error of zodErrors) {
    const { code, message, path } = error;
    const _path = path.join("."); // + `-[${idx}]`;

    if (!errors[_path]) {
      if ("unionErrors" in error) {
        const unionError = error.unionErrors[0].errors[0];

        errors[_path] = {
          message: unionError.message,
          type: unionError.code + `-[${idx}]`,
        };
      } else {
        errors[_path] = { message, type: code + `-[${idx}]` };
      }
    }

    if ("unionErrors" in error) {
      error.unionErrors.forEach((unionError) =>
        unionError.errors.forEach((e) => zodErrors.push(e)),
      );
    }

    if (validateAllFieldCriteria) {
      const types = errors[_path].types;
      const messages = types && types[error.code];

      errors[_path] = appendErrors(
        _path,
        validateAllFieldCriteria,
        errors,
        code + `-[${idx}]`,
        messages
          ? ([] as string[]).concat(messages as string[], error.message)
          : error.message,
      ) as FieldError;
    }
    idx++;

    // zodErrors.shift();
  }

  return errors;
};

export const zodResolver: Resolver =
  (schema, schemaOptions, resolverOptions = {}) =>
  async (values, _, options) => {
    try {
      const data = await schema[
        resolverOptions.mode === "sync" ? "parse" : "parseAsync"
      ](values, schemaOptions);

      options.shouldUseNativeValidation && validateFieldsNatively({}, options);

      return {
        errors: {} as FieldErrors,
        values: resolverOptions.raw ? values : data,
      };
    } catch (error: ZodError | any) {
      // console.log(Object.values(error)[0], "sdfsdf");
      if (isZodError(error)) {
        return {
          values: {},
          errors: toNestErrors(
            parseErrorSchema(
              Object.values(error)[0],
              !options.shouldUseNativeValidation &&
                options.criteriaMode === "all",
            ),
            options,
          ),
        };
      }

      throw error;
    }
  };
