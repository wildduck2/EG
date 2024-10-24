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
} from "@/components/ui";
import { AlertDialogCustom } from "@/components/ui/duckui/alert";
import { cn } from "@/lib/utils";
import { Plus, UploadIcon } from "lucide-react";
import React from "react";
import {
  useForm,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { z } from "zod";

// Define the Zod schema for location validation
const locationSchema = z.object({
  lat: z.number().nonnegative("Latitude is required"),
  lng: z.number().nonnegative("Longitude is required"),
});

// Define the Zod schema for adding an advertisement
export const addAdSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  note: z.string().min(1, "Note is required"),
  negotiate: z.enum(["yes", "no"], { message: "Negotiatable is required" }),
  status: z.enum(["new", "used"], { message: "Status is required" }),
  location: locationSchema.refine(
    (data) => data.lat !== undefined && data.lng !== undefined,
    {
      message: "Location is required",
    },
  ),
});

// Define the TypeScript type based on the schema
export type AddAdFormType = z.infer<typeof addAdSchema>;
export type LocationType = z.infer<typeof locationSchema>;

export const UserAddAd = () => {
  const { register, formState, handleSubmit } = useForm<AddAdFormType>({
    resolver: zodResolver(addAdSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      note: "",
      location: { lat: 0, lng: 0 },
    },
    criteriaMode: "all",
    mode: "all",
  });

  console.log(formState.errors.location);

  const hi = register("location.lat");

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
                      <Label className="text-sm flex" children="Pictures" />
                      <UploadAdPictures />
                    </div>
                  </UploadProvider>
                  <FormInput
                    className="w-full"
                    register={register("name")}
                    error={{
                      states: formState.errors.name?.types,
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
                    register={register("name")}
                    error={{
                      states: formState.errors.name?.types,
                      inputError: formState.errors.name?.message,
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
                    register={register("name")}
                    error={{
                      states: formState.errors.name?.types,
                      inputError: formState.errors.name?.message,
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
                      states: formState.errors.negotiate?.types,
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
                      states: formState.errors.status?.types,
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
                      states: formState.errors.description?.types,
                      inputError: formState.errors.description?.message,
                      type: "raw",
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
                      states: formState.errors.note?.types,
                      inputError: formState.errors.note?.message,
                      type: "raw",
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
                      states: formState.errors.location?.types,
                      inputError: formState.errors.location?.message,
                      type: "raw",
                    }}
                    input_label={{
                      children: "Location",
                      className: "text-sm flex",
                    }}
                  >
                    <GetLocation register={register("location")} />
                  </FormInput>

                  <FormInput
                    className="w-full"
                    error={{
                      states: formState.errors.note?.types,
                      inputError: formState.errors.note?.message,
                      type: "raw",
                    }}
                    input_label={{
                      children: "Note",
                      className: "text-sm flex",
                    }}
                  >
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormInput>
                </div>
              </form>
            </ScrollArea>
          ),
        }}
      />
    </>
  );
};

export const UploadAdPictures = () => {
  return (
    <>
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
              className="bg-secondary/20 w-full"
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
              }}
            />
            <UploadContent />
          </div>
        }
      />
    </>
  );
};

interface GetLocationProps {
  register: UseFormRegister<AddAdFormType>;
}

export const GetLocation: React.FC<GetLocationProps> = ({ register }) => {
  const [location, setLocation] = React.useState<LocationType | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Set the location state
          const newLocation: LocationType = { lat: latitude, lng: longitude };
          setLocation(newLocation);
          setError(null);
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case err.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case err.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            default:
              setError("An error occurred.");
          }
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Effect to update the form with the location
  React.useEffect(() => {
    if (location) {
      // Register location to the form
      register("location", { value: location });
    }
  }, [location, register]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          {...register("location.lat", { required: true })}
          value={location?.lat ?? ""}
          placeholder="Latitude"
          disabled
        />
        <Input
          {...register("location.lng", { required: true })}
          value={location?.lng ?? ""}
          placeholder="Longitude"
          disabled
        />
      </div>
      <Button
        type="button"
        onClick={getLocation}
        className={`w-full max-w-full ${error ? "bg-red-400" : ""}`}
      >
        Get Location
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
