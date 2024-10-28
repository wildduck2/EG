import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Button,
  Input,
  FormInput,
  Label,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Textarea,
  Upload,
  UploadContent,
  UploadInput,
  UploadProvider,
  UploadTrigger,
  zodResolver,
  useUploadContext,
} from "@/components/ui";
import { AlertDialogCustom } from "@/components/ui/duckui/alert";
import { cn } from "@/lib/utils";
import { Plus, UploadIcon } from "lucide-react";
import React from "react";
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { z } from "zod";

// Define the Zod schema for location validation
const locationSchema = z.object({
  lat: z.string().nonempty("Latitude is required"),
  lng: z.string().nonempty("Longitude is required"),
});

const fileSchema = z.object({
  id: z.string().uuid(),
  file: z.object({}).optional(),
  name: z.string(),
  url: z.string().url().nullable(),
  type: z.string(),
  size: z.string().transform((val) => parseInt(val, 10)),
});

// Define the Zod schema for adding an advertisement
export const addAdSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  note: z.string().min(1, "Note is required"),
  negotiate: z.enum(["yes", "no"], { message: "Negotiatable is required" }),
  status: z.enum(["new", "used"], { message: "Status is required" }),
  location: locationSchema,
  select: z.string().nonempty("Governorate is required"),
  attachment: z.array(fileSchema).min(1, "Attachment is required"),
});

// Define the TypeScript type based on the schema
export type AddAdFormType = z.infer<typeof addAdSchema>;
export type LocationType = z.infer<typeof locationSchema>;

export const UserAddAd = () => {
  const { register, watch, formState, handleSubmit, setValue } =
    useForm<AddAdFormType>({
      resolver: zodResolver(addAdSchema),
      defaultValues: {
        name: "",
        description: "",
        price: "",
        note: "",
        location: { lat: "", lng: "" },
        attachment: [],
      },
      criteriaMode: "all",
      mode: "all",
    });

  console.log(watch("attachment"), "asdfasfasfd", formState.errors);

  return (
    <>
      <AlertDialogCustom<boolean>
        type="sheet"
        drawerData={true}
        header={{
          head: "Add Ad",
          description: "Fill out this form and submit to add an ad.",
        }}
        footer={{
          className:
            "flex w-full place-content-start justify-end items-start gap-2 [&__button]:w-32",
          cancel: <Button variant="outline">Cancel</Button>,
          submit: (
            <Button
              variant="default"
              type="submit"
              onClick={handleSubmit((data) => {
                console.log(data);
              })}
              disabled={!formState.isValid || formState.isSubmitting}
              loading={formState.isSubmitting}
            >
              Submit
            </Button>
          ),
        }}
        state={true}
        trigger={{
          children: (
            <Button
              variant="outline"
              size="default"
              className=""
              icon={{
                icon: Plus,
              }}
            >
              Add Ad
            </Button>
          ),
        }}
        content={{
          // dir: "rtl",
          className:
            "flex flex-col gap-4 sm:max-w-[650px] [&>div]:flex [&>div]:flex-col [&>div]:justify-between [&>div]:h-full",
          children: (
            <ScrollArea className="flex flex-col items-start w-full h-full space-y-4">
              <form className="w-full flex flex-col space-y-2 p-2">
                <div className="flex gap-4">
                  <UploadProvider>
                    <div className="flex flex-col w-full">
                      <UploadAdPictures
                        setValue={setValue}
                        register={register}
                        errors={formState.errors}
                      />
                    </div>
                  </UploadProvider>
                  <FormInput
                    className="w-full"
                    register={register("name")}
                    error={{
                      inputError: formState.errors.name?.message,
                    }}
                    input={{
                      placeholder: "Enter Ad name.",
                    }}
                    input_label={{
                      children: "Name",
                      className: "text-sm flex",
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  <FormInput
                    className="w-full"
                    register={register("price")}
                    error={{
                      inputError: formState.errors.price?.message,
                    }}
                    input={{
                      placeholder: "Enter Ad price.",
                    }}
                    input_label={{
                      children: "Price",
                      className: "text-sm flex",
                    }}
                  />
                  <FormInput
                    className="w-full"
                    register={register("price")}
                    error={{
                      inputError: formState.errors.price?.message,
                    }}
                    input={{
                      placeholder: "Enter Ad price.",
                    }}
                    input_label={{
                      children: "Price",
                      className: "text-sm flex",
                    }}
                  />
                </div>

                <div className="flex gap-4">
                  <FormInput
                    className="w-full"
                    register={register("status")}
                    error={{
                      inputError: formState.errors.negotiate?.message,
                    }}
                    input={{
                      type: "text",
                      placeholder: "Enter Ad price.",
                    }}
                    input_label={{
                      children: "Negotiatable",
                      className: "text-sm flex",
                    }}
                  >
                    <RadioGroup
                      // defaultValue="new"
                      {...register("negotiate")}
                      className="flex gap-8 h-[40px]"
                    >
                      <div
                        className={cn(
                          "flex items-center space-x-2",
                          formState.errors.status?.types &&
                            "text-red-400 ring-red-400 [&_button]:border-red-400 [&_button]:bg-red-100",
                        )}
                      >
                        <RadioGroupItem value="yes" id="r1" />
                        <Label htmlFor="r1">Yes</Label>
                      </div>
                      <div
                        className={cn(
                          "flex items-center space-x-2",
                          formState.errors.status?.types &&
                            "text-red-400 ring-red-400 [&_button]:border-red-400 [&_button]:bg-red-100",
                        )}
                      >
                        <RadioGroupItem value="no" id="r2" />
                        <Label htmlFor="r2">No</Label>
                      </div>
                    </RadioGroup>
                  </FormInput>

                  <FormInput
                    className="w-full"
                    register={register("status")}
                    error={{
                      inputError: formState.errors.status?.message,
                    }}
                    input={{
                      type: "text",
                      placeholder: "Enter Ad price.",
                    }}
                    input_label={{
                      children: "Status",
                      className: "text-sm flex",
                    }}
                  >
                    <RadioGroup
                      // defaultValue="new"
                      {...register("status")}
                      className="flex gap-8 h-[40px]"
                    >
                      <div
                        className={cn(
                          "flex items-center space-x-2",
                          formState.errors.status?.types &&
                            "text-red-400 ring-red-400 [&_button]:border-red-400 [&_button]:bg-red-100",
                        )}
                      >
                        <RadioGroupItem value="new" id="r1" />
                        <Label htmlFor="r1">New</Label>
                      </div>
                      <div
                        className={cn(
                          "flex items-center space-x-2",
                          formState.errors.status?.types &&
                            "text-red-400 ring-red-400 [&_button]:border-red-400 [&_button]:bg-red-100",
                        )}
                      >
                        <RadioGroupItem value="used" id="r2" />
                        <Label htmlFor="r2">Used</Label>
                      </div>
                    </RadioGroup>
                  </FormInput>
                </div>
                <div className="flex gap-4">
                  <FormInput
                    className="w-full"
                    error={{
                      inputError: formState.errors.description?.message,
                    }}
                    input_label={{
                      children: "Description",
                      className: "text-sm flex",
                    }}
                  >
                    <Textarea
                      className={cn(
                        formState.errors.description?.types &&
                          "border-red-400 bg-red-100 ring-red-400",
                      )}
                      placeholder="Write a description for the ad."
                      rows={3}
                      {...register("description")}
                    />
                  </FormInput>
                </div>

                <div className="flex gap-4">
                  <FormInput
                    className="w-full"
                    error={{
                      inputError: formState.errors.note?.message,
                    }}
                    input_label={{
                      children: "Note",
                      className: "text-sm flex",
                    }}
                  >
                    <Textarea
                      className={cn(
                        formState.errors.note?.types &&
                          "border-red-400 bg-red-100 ring-red-400",
                      )}
                      placeholder="Write a note for the ad."
                      rows={3}
                      {...register("note")}
                    />
                  </FormInput>
                </div>

                <div className="flex gap-4">
                  <FormInput
                    className="w-full"
                    error={{
                      inputError:
                        formState.errors.location?.lng?.message ||
                        formState.errors.location?.lat?.message,
                      type: "raw",
                    }}
                    input_label={{
                      children: "Location",
                      className: "text-sm flex",
                    }}
                  >
                    <GetLocation
                      register={register}
                      errors={formState.errors}
                      value={watch("location")}
                      setValue={setValue}
                    />
                  </FormInput>

                  <SelectAdInput
                    register={register}
                    errors={formState.errors}
                    setValue={setValue}
                  />
                </div>
              </form>
            </ScrollArea>
          ),
        }}
      />
    </>
  );
};

export type SelectAdInputProps = {
  register: UseFormRegister<AddAdFormType>;
  errors: FieldErrors<AddAdFormType>;
  setValue: UseFormSetValue<AddAdFormType>;
};

export const SelectAdInput = ({
  errors,
  setValue,
  register,
}: SelectAdInputProps) => {
  return (
    <FormInput
      className="w-full"
      error={{
        inputError: errors.select?.message,
      }}
      input_label={{
        children: "Governate",
        className: "text-sm flex",
      }}
    >
      <Select
        onValueChange={(value) => setValue("select", value)}
        {...register("select")}
      >
        <SelectTrigger
          className={cn(
            "w-full",
            errors.select?.message && "border-red-400 bg-red-100 ring-red-400",
          )}
        >
          <SelectValue placeholder="Select a governorate" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Governorates</SelectLabel>
            <SelectItem value="kafr">Kafr</SelectItem>
            <SelectItem value="cairo">Cairo</SelectItem>
            <SelectItem value="giza">Giza</SelectItem>
            <SelectItem value="alex">Alex</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormInput>
  );
};

export type UploadAdInput = {
  register: UseFormRegister<AddAdFormType>;
  setValue: UseFormSetValue<AddAdFormType>;
  errors: FieldErrors<AddAdFormType>;
};

export const UploadAdPictures = ({
  register,
  setValue,
  errors,
}: UploadAdInput) => {
  const { attachments } = useUploadContext();

  React.useEffect(() => {
    setValue(
      "attachment",
      attachments as unknown as z.infer<typeof fileSchema>[],
    );
  }, [attachments]);

  return (
    <>
      <FormInput
        className="w-full"
        register={register("attachment")}
        error={{
          inputError: errors.attachment?.message,
        }}
        input_label={{
          children: "attachment",
          className: "text-sm flex",
        }}
      >
        <Upload
          _content={{
            footer: {
              className: "w-full [&_button]:w-[100px]",
            },
          }}
          trigger={
            <UploadTrigger className="w-full">
              <Button
                variant="outline"
                type="button"
                className={cn(
                  "bg-secondary/20 w-full",
                  errors.attachment?.message &&
                    "border-red-400 bg-red-100 ring-red-400",
                )}
                icon={{ icon: UploadIcon, className: "h-4 w-4" }}
              >
                Upload Ad Pictures
              </Button>
            </UploadTrigger>
          }
          content={
            <div className="flex flex-col h-full gap-4">
              <UploadInput
                input={{
                  accept: "image/*",
                  // ...register("attachment"),
                }}
              />
              <UploadContent />
            </div>
          }
        />
      </FormInput>
    </>
  );
};

interface GetLocationProps {
  register: UseFormRegister<AddAdFormType>;
  errors: FieldErrors<AddAdFormType>;
  setValue: UseFormSetValue<AddAdFormType>;
  value: Partial<AddAdFormType["location"]>;
}

export const GetLocation: React.FC<GetLocationProps> = ({
  register,
  errors,
  value,
  setValue,
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue("location.lat", latitude.toString(), {
            shouldValidate: true,
          });
          setValue("location.lng", longitude.toString(), {
            shouldValidate: true,
          });
          setError(null);
        },
        (err) => {
          setError(getGeolocationErrorMessage(err));
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      {value.lat && value.lng ? (
        <div className="flex items-center gap-2">
          <Input
            {...register("location.lat")}
            placeholder="Latitude"
            disabled
            className={errors.location?.lat ? "border-red-400 bg-red-100" : ""}
          />
          <Input
            {...register("location.lng")}
            placeholder="Longitude"
            disabled
            className={errors.location?.lng ? "border-red-400 bg-red-100" : ""}
          />
        </div>
      ) : (
        <Button
          type="button"
          // variant="outline"
          onClick={getLocation}
          className={`w-full max-w-full border-2 ${error ? "border-red-400" : ""}`}
        >
          Get Location
        </Button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

function getGeolocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "User denied the request for Geolocation.";
    case error.POSITION_UNAVAILABLE:
      return "Location information is unavailable.";
    case error.TIMEOUT:
      return "The request to get user location timed out.";
    default:
      return "An unknown error occurred.";
  }
}
