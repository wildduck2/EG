import { FilterSchema, FilterSlector } from "@/components/layouts";
import {
  Button,
  Input,
  FormInput,
  Label,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Textarea,
  zodResolver,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CommentClose,
} from "@/components/ui";
import { AlertDialogCustom } from "@/components/ui/duckui/";
import { filterData } from "@/context";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import {
  FileImage,
  LucideIcon,
  Paperclip,
  Pen,
  Plus,
  UploadIcon,
} from "lucide-react";
import React from "react";
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

// Define the Zod schema for location validation
const locationSchema = z.object({
  lat: z.string().nonempty("Latitude is required"),
  lng: z.string().nonempty("Longitude is required"),
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
  address: z.string().nonempty("Address is required"),
  attachment: z.any(),
  category: z.string().nonempty("Category is required"),
  subcategory: z.string().nonempty("Subcategory is required"),
  brand_country: z.string().nonempty("Brand country is required"),
  third_branch: z.string().nonempty("Third branch is required"),
  region: z.string().optional().nullish(),
  governorate: z.string().optional().nullish(),
});

// Define the TypeScript type based on the schema
export type AddAdFormType = z.infer<typeof addAdSchema>;
export type LocationType = z.infer<typeof locationSchema>;

const default_values: AddAdFormType = {
  name: "",
  description: "",
  price: "",
  note: "",
  negotiate: "yes",
  status: "new",
  location: {
    lat: "",
    lng: "",
  },
  address: "",
  attachment: [],
  category: "",
  subcategory: "",
  brand_country: "",
  third_branch: "",
  region: "",
  governorate: "",
};

export const UserAddAd = ({
  onSubmit,
  defaultValues = default_values,
  default_input,
}: {
  onSubmit?: (attachments: File[], data: AddAdFormType) => void;
  defaultValues?: AddAdFormType;
  default_input?: {
    title: string;
    sheet_title: string;
    sheet_desc: string;
  };
}) => {
  const { register, watch, formState, handleSubmit, setValue, control } =
    useForm<AddAdFormType>({
      defaultValues: defaultValues,
      mode: "all",
    });

  const [filter_data] = useAtom(filterData);
  // console.log(defaultValues.attachment);
  //   console.log(formState.errors);

  const [attachments, setAttachments] = React.useState<File[]>(
    defaultValues.attachment,
  );
  // console.log(attachments, "attachments");

  const { t, i18n } = useTranslation();

  return (
    <>
      <AlertDialogCustom<boolean>
        type="sheet"
        state={formState.isDirty}
        drawerData={true}
        actions={{
          cancel: () => {
            control._reset();
          },
          continue: () => {
            control._reset();
          },
        }}
        header={{
          className: "place-content-end justify-end [&_*]:text-start",
          dir: i18n.dir(),
          head: default_input?.sheet_title || t("add_ad_title"),
          description: default_input?.sheet_desc || t("add_ad_desc"),
        }}
        footer={{
          className:
            "flex w-full place-content-start flex-row justify-end items-start gap-2 [&__button]:w-32 pr-4 pt-4",
          cancel: {
            children: <Button variant="outline">{t("cancel")}</Button>,
          },
          submit: {
            onClick: handleSubmit((data) => {
              onSubmit?.(attachments, data);
              setAttachments([]);
              control._reset();
            }),
            disabled: !formState.isValid || formState.isSubmitting,
            loading: formState.isSubmitting,
            children: (
              <Button
                variant="default"
                type="submit"
                // onClick={() => {
                //   control._reset();
                // }}
              >
                {default_input?.title || t("add_ad")}
              </Button>
            ),
          },
        }}
        trigger={{
          children: (
            <Button
              variant="destructive"
              size={default_input?.title ? "icon" : "default"}
              className=""
              icon={{
                icon: default_input?.title ? Pen : Plus,
              }}
            >
              {default_input?.title ? "" : t("add_ad")}
            </Button>
          ),
        }}
        content={{
          dir: i18n.dir(),
          className:
            "flex flex-col gap-4 sm:max-w-[650px] [&>div]:flex [&>div]:flex-col [&>div]:justify-between [&>div]:h-full  pb-2",
          children: (
            <ScrollArea>
              <form className="w-full flex flex-col space-y-2 p-2 mt-4 pr-4">
                <div className="flex gap-4" dir={i18n.dir()}>
                  <div className="flex flex-col w-full">
                    <UploadAdPictures
                      attachments={attachments}
                      setAttachments={setAttachments}
                      value={watch("attachment")}
                      setValue={setValue}
                      register={register}
                      errors={formState.errors}
                    />
                  </div>
                  <FormInput
                    className="w-full"
                    register={register("name")}
                    error={{
                      inputError: formState.errors.name?.message,
                    }}
                    input={{
                      placeholder: t("add_name"),
                    }}
                    input_label={{
                      children: t("name"),
                      className: "text-sm flex",
                    }}
                  />
                </div>
                <div className="flex gap-4" dir={i18n.dir()}>
                  <FormInput
                    className="w-full"
                    error={{
                      inputError: formState.errors.description?.message,
                    }}
                    input_label={{
                      children: t("description"),
                      className: "text-sm flex",
                    }}
                  >
                    <Textarea
                      className={cn(
                        formState.errors.description?.types &&
                          "border-red-400 bg-red-100 ring-red-400",
                      )}
                      placeholder={t("add_description")}
                      rows={3}
                      {...register("description")}
                    />
                  </FormInput>
                </div>
                <div className="flex gap-4" dir={i18n.dir()}>
                  <FormInput
                    className="w-full"
                    register={register("price")}
                    error={{
                      inputError: formState.errors.price?.message,
                    }}
                    input={{
                      placeholder: t("add_price"),
                      type: "number",
                    }}
                    input_label={{
                      children: t("price"),
                      className: "text-sm flex",
                    }}
                  />
                  {
                    // <FormInput
                    //   className="w-full"
                    //   register={register("address")}
                    //   error={{
                    //     inputError: formState.errors.address?.message,
                    //   }}
                    //   input={{
                    //     placeholder: t("add_address"),
                    //     type: "text",
                    //   }}
                    //   input_label={{
                    //     children: t("address"),
                    //     className: "text-sm flex",
                    //   }}
                    // />
                  }
                </div>

                <div className="flex gap-4" dir={i18n.dir()}>
                  <FormInput
                    className="w-full"
                    register={register("status")}
                    error={{
                      inputError: formState.errors.negotiate?.message,
                    }}
                    input_label={{
                      children: t("negotiable"),
                      className: "text-sm flex",
                    }}
                  >
                    <RadioGroup
                      defaultValue="yes"
                      {...register("negotiate")}
                      onValueChange={(value) => {
                        setValue("negotiate", value as "yes" | "no");
                      }}
                      className="flex gap-8 h-[40px]"
                    >
                      <div
                        className={cn(
                          "flex items-center space-x-2",
                          formState.errors.negotiate?.types &&
                            "text-red-400 ring-red-400 [&_button]:border-red-400 [&_button]:bg-red-100",
                        )}
                      >
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">{t("yes")}</Label>
                      </div>
                      <div
                        className={cn(
                          "flex items-center space-x-2",
                          formState.errors.negotiate?.types &&
                            "text-red-400 ring-red-400 [&_button]:border-red-400 [&_button]:bg-red-100",
                        )}
                      >
                        <RadioGroupItem value="no" id="r1" />
                        <Label htmlFor="r1">{t("no")}</Label>
                      </div>
                    </RadioGroup>
                  </FormInput>
                </div>

                <div
                  className="flex items-center gap-2 w-full"
                  dir={i18n.dir()}
                >
                  <FilterSlector
                    filter_data={filter_data.governorates}
                    value={{ id: +watch("governorate") } as any}
                    name={t("governorates")}
                    setValue={(item: FilterSchema["governorates"]) => {
                      setValue("governorate", item?.id.toString() ?? "");
                    }}
                  />
                  <FilterSlector
                    filter_data={filter_data.regions}
                    value={{ id: +watch("region") } as any}
                    id={"governorate_id"}
                    selected={+watch("governorate")}
                    name={t("regions")}
                    setValue={(item: FilterSchema["regions"]) => {
                      setValue("region", item?.id.toString() ?? "");
                    }}
                  />
                </div>
                <div
                  className="flex items-center gap-2 w-full"
                  dir={i18n.dir()}
                >
                  <FilterSlector
                    filter_data={filter_data.categories}
                    value={
                      {
                        id: +watch("category"),
                      } as any
                    }
                    name={t("categories")}
                    setValue={(item: FilterSchema["categories"]) => {
                      setValue("category", item?.id.toString() ?? "");
                    }}
                  />

                  <FilterSlector
                    filter_data={filter_data.subcategories}
                    value={
                      {
                        id: +watch("subcategory"),
                      } as any
                    }
                    id={"category_id"}
                    selected={+watch("category")}
                    name={t("subcategories")}
                    disabled={!watch("category") ? true : false}
                    setValue={(item: FilterSchema["subcategories"]) => {
                      setValue("subcategory", item?.id.toString() ?? "");
                    }}
                  />
                </div>
                <div
                  className="flex items-center gap-2 w-full"
                  dir={i18n.dir()}
                >
                  {+watch("subcategory") ? (
                    <FilterSlector
                      filter_data={filter_data.brand_countries}
                      name={t("brand_countries")}
                      disabled={!watch("subcategory") ? true : false}
                      value={
                        {
                          id: +watch("brand_country"),
                        } as any
                      }
                      id={"subcategory_id"}
                      selected={+watch("subcategory")}
                      setValue={(item: FilterSchema["brand_countries"]) => {
                        setValue("brand_country", item?.id.toString() ?? "");
                      }}
                    />
                  ) : null}
                  {+watch("brand_country") ? (
                    <FilterSlector
                      disabled={!watch("brand_country") ? true : false}
                      filter_data={filter_data.third_branches}
                      value={
                        {
                          id: +watch("third_branch"),
                        } as any
                      }
                      id={"brandcountry_id"}
                      selected={+watch("brand_country")}
                      name={t("third_branches")}
                      setValue={(item: FilterSchema["third_branches"]) => {
                        setValue("third_branch", item?.id.toString() ?? "");
                      }}
                    />
                  ) : null}
                </div>
                <div
                  className="flex items-center gap-2 w-full"
                  dir={i18n.dir()}
                >
                  <FormInput
                    className="w-full"
                    error={{
                      inputError:
                        formState.errors.location?.lng?.message ||
                        formState.errors.location?.lat?.message,
                      type: "raw",
                    }}
                    input_label={{
                      children: t("location"),
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
                </div>
                <div className="flex gap-4" dir={i18n.dir()}>
                  <FormInput
                    className="w-full"
                    error={{
                      inputError: formState.errors.note?.message,
                    }}
                    input_label={{
                      children: t("note"),
                      className: "text-sm flex",
                    }}
                  >
                    <Textarea
                      className={cn(
                        formState.errors.note?.types &&
                          "border-red-400 bg-red-100 ring-red-400",
                      )}
                      placeholder={t("add_note")}
                      rows={3}
                      {...register("note")}
                    />
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

export type UploadAdInput = {
  register: UseFormRegister<AddAdFormType>;
  setValue: UseFormSetValue<AddAdFormType>;
  errors: FieldErrors<AddAdFormType>;
  value: File[] | undefined;
  attachments: File[] | undefined;
  setAttachments: React.Dispatch<React.SetStateAction<File[] | undefined>>;
};

export const UploadAdPictures = ({
  value,
  register,
  setValue,
  attachments,
  setAttachments,
  errors,
}: UploadAdInput) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className={cn("absolute bottom-6 w-full")}>
        <Popover>
          <PopoverTrigger className={cn("")}>
            <Button
              size={"sm"}
              type="button"
              className={cn(
                "absolute right-0 gap-2 flex items-center h-fit py-1 transition-all duration-400 ease-out",
                [...(attachments ?? [])].length > 0
                  ? "bottom-[2.4rem] opacity-100 pointer-events-all z-50"
                  : "-bottom-1 opacity-0 pointer-events-none",
              )}
              icon={{
                icon: Paperclip as LucideIcon,
                className: "!size-[.8rem]",
              }}
              label={{
                children: [...(attachments ?? [])].length,
              }}
            >
              <span className="text-xs">{t("attachments")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="top"
            className={cn("p-2 mb-1 w-full")}
          >
            <ScrollArea>
              <div className="grid items justify-start gap-2 shrink-0 w-full grid-cols-2 max-h-[104px]">
                {attachments?.map((attachment, idx) => {
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "rounded-md bg-secondary/50 h-fit flex items-center justify-start gap-2 w-[152px] p-2 relative",
                      )}
                    >
                      <CommentClose
                        className="absolute top-1/2 -translate-y-1/2 right-2"
                        onClick={() => {
                          setAttachments(
                            attachments?.filter((item) => item !== attachment),
                          );
                          setValue(
                            "attachment",
                            value?.filter((item) => item !== attachment),
                          );
                        }}
                      />
                      <>
                        <div className="relative">
                          <FileImage className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground truncate">
                            {attachment.type.split("/").shift()}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {filesize(+attachment.size, { round: 0 })}
                          </p>
                        </div>
                      </>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
      <FormInput
        className="w-full"
        register={register("attachment")}
        error={{
          inputError: errors.attachment?.message as string,
        }}
        input_label={{
          children: t("attachments"),
          className: "text-sm flex",
        }}
      >
        <div className="relative">
          <Input
            placeholder={"Filter files..."}
            type="file"
            accept="image/*"
            multiple
            className={cn(
              "absolute w-full h-full opacity-0 cursor-pointer z-50",
            )}
            {...register("attachment")}
            onChange={(e) => {
              if (e.target.files) {
                const files = Array.from(e.target.files);
                const exceededFiles = files.filter(
                  (file) => file.size > 5 * 1024 * 1024,
                );

                if (exceededFiles.length > 0) {
                  return toast.error("حجم الملف يجب أن يكون أقل من 5MB"); // Arabic message
                }

                setAttachments((old) => [...old, ...files]);
                setValue("attachment", e.target.files);
              }
            }}
          />

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
            {t("upload_pictures")}
          </Button>
        </div>
      </FormInput>
    </div>
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
  const { t } = useTranslation();
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
          {t("get_location")}
        </Button>
      )}
      {error && <p className="text-[#ee1d24] text-sm mt-1">{error}</p>}
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
