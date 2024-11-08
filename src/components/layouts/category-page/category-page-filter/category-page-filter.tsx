import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/components/ui";
import {
  AlertDialogCustom,
  CommandDialog,
  SelectGroup,
} from "@/components/ui/duckui";
import { atom, useAtom } from "jotai";
import { ArrowDown01, Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Category,
  City,
  FilteredData,
  Governorate,
  Subcategory,
} from "./category-page-filter.lib";
import { cn } from "@/lib/utils";
import { queryClient } from "@/main";
import { useParams } from "@tanstack/react-router";
import { filterData } from "@/context";

export type FilterSchema = {
  governorates: Governorate | null;
  regions: City | null;
  categories: Category | null;
  subcategories: Subcategory | null;
  brand_countries: City | null;
  third_branches: City | null;
  type: "new" | "used" | null;
  order: "asc" | "desc" | null;
  min_price: number | null;
  max_price: number | null;
  negotiate: boolean | null;
};

export const filter = atom<FilterSchema>({
  governorates: null,
  regions: null,
  categories: null,
  subcategories: null,
  brand_countries: null,
  third_branches: null,
  type: null,
  order: null,
  min_price: null,
  max_price: null,
  negotiate: null,
});

export const CategoryPageFilter = ({ cb }: { cb?: () => void }) => {
  const { t, i18n } = useTranslation();
  const products = t("products");

  const [filter_data] = useAtom(filterData);
  const [filter_schema, setFilterSchema] = useAtom<FilterSchema>(filter);
  const [filter_schema_state, setFilterSchema_state] =
    React.useState<FilterSchema>(filter_schema);

  const { id } = useParams({ strict: false });

  return (
    <AlertDialogCustom
      type="sheet"
      state={true}
      drawerData={products.length > 0}
      header={{
        head: t("filter"),
        description: t("filter_your_search_results"),
      }}
      footer={{
        className:
          "flex w-full place-content-end justify-end items-end gap-2 [&__button]:w-32",
        submit: {
          children: (
            <Button
              variant="default"
              onClick={() => {
                setFilterSchema(filter_schema_state);
                queryClient.invalidateQueries({
                  queryKey: ["categories", id],
                });
                cb?.();
              }}
            >
              {t("submit")}
            </Button>
          ),
        },
        cancel: { children: <Button variant="outline">{t("cancel")}</Button> },
      }}
      trigger={{
        children: (
          <Button variant="ghost" size="default" className="">
            <ArrowDown01 className="size-5 rotate-180" />
            {t("filter")}
          </Button>
        ),
      }}
      content={{
        dir: i18n.dir(),
        side: i18n.dir() === "rtl" ? "left" : "right",

        className:
          "flex flex-col gap-4 sm:max-w-[450px] [&>div]:flex [&>div]:flex-col [&>div]:justify-between [&>div]:h-full",
        children: (
          <ScrollArea className="flex flex-col items-start p-2 w-full h-full">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FilterSlector
                  filter_data={filter_data.governorates}
                  value={filter_schema_state.governorates}
                  name={t("governates")}
                  setValue={(item: FilterSchema["governorates"]) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      governorates: item,
                    });
                  }}
                />
                <FilterSlector
                  filter_data={filter_data.regions}
                  value={filter_schema_state.regions}
                  name={t("regions")}
                  id={"governorate_id"}
                  selected={filter_schema_state?.governorates?.id}
                  setValue={(item: FilterSchema["regions"]) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      regions: item,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterSlector
                  filter_data={filter_data.categories}
                  value={filter_schema_state.categories}
                  name={t("categories")}
                  setValue={(item: FilterSchema["categories"]) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      categories: item,
                    });
                  }}
                />
                <FilterSlector
                  filter_data={filter_data.subcategories}
                  value={filter_schema_state.subcategories}
                  name={t("subcategories")}
                  id={"category_id"}
                  selected={filter_schema_state?.categories?.id}
                  setValue={(item: FilterSchema["subcategories"]) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      subcategories: item,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterSlector
                  filter_data={filter_data.brand_countries}
                  name={t("brand_countries")}
                  value={filter_schema_state.brand_countries}
                  id={"subcategory_id"}
                  selected={filter_schema_state?.subcategories?.id}
                  setValue={(item: FilterSchema["brand_countries"]) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      brand_countries: item,
                    });
                  }}
                />
                <FilterSlector
                  filter_data={filter_data.third_branches}
                  value={filter_schema_state.third_branches}
                  name={t("third_branches")}
                  id={"category_id"}
                  selected={filter_schema_state?.brand_countries?.id}
                  setValue={(item: FilterSchema["third_branches"]) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      third_branches: item,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                {
                  // <FilterSeleector2
                  //   value={filter_schema_state.type}
                  //   setValue={(item: string) => {
                  //     setFilterSchema_state({
                  //       ...filter_schema_state,
                  //       type: item as any,
                  //     });
                  //   }}
                  // />
                }
                <FilterSeleector
                  value={filter_schema_state.order}
                  setValue={(item: string) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      order: item as any,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterInput
                  name={t("min_price")}
                  value={filter_schema_state?.min_price?.toString() || "0"}
                  setValue={(item) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      min_price: item as any,
                    });
                  }}
                />
                <FilterInput
                  name={t("max_price")}
                  value={filter_schema_state?.max_price?.toString() || "0"}
                  setValue={(item) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      max_price: item as any,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterSwitch
                  value={filter_schema_state?.negotiate as any}
                  setValue={(item) => {
                    setFilterSchema_state({
                      ...filter_schema_state,
                      negotiate: item === true ? 1 : (0 as any),
                    });
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterSchema_state({
                      governorates: null,
                      regions: null,
                      categories: null,
                      subcategories: null,
                      brand_countries: null,
                      third_branches: null,
                      type: null,
                      order: null,
                      min_price: null,
                      max_price: null,
                      negotiate: null,
                    });
                  }}
                  className="w-full"
                >
                  {t("clear")}
                </Button>
              </div>
            </div>
          </ScrollArea>
        ),
      }}
    />
  );
};

export function FilterSeleector({
  value,
  setValue,
}: {
  value: string | null;
  setValue: (item: any) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <Select
        onValueChange={(value) => setValue(value)}
        defaultValue={value || ""}
      >
        <Label className="w-full">{t("order")} </Label>
        <SelectTrigger className="w-full">
          <div>
            <SelectValue placeholder={`${t("order")}`} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">{t("asc")}</SelectItem>
          <SelectItem value="desc">{t("desc")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterSeleector2({
  value,
  setValue,
}: {
  value: string | null;
  setValue: (item: any) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <Select onValueChange={(value) => setValue(value)} value={value ?? ""}>
        <Label className="w-full">{t("type")}</Label>
        <SelectTrigger className="w-full">
          <div className="flex flex-col space-y-1">
            <SelectValue placeholder={t("type") + "..."} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="used">{t("used")}</SelectItem>
          <SelectItem value="new">{t("new")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterSwitch({
  setValue,
  value,
}: {
  value: number;
  setValue: (item: any) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="airplane-mode">{t("negotiable")}</Label>
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          onCheckedChange={setValue}
          checked={value === 1 ? true : false}
        />
        <Label htmlFor="airplane-mode">{t("yes")}</Label>
      </div>
    </div>
  );
}

export const FilterInput = ({
  setValue,
  value,
  name,
}: {
  setValue: (item: number) => void;
  value: string;
  name: string;
}) => {
  return (
    <div className="w-full">
      <Label className="w-full">{name}</Label>
      <Input
        className="w-full"
        value={value ?? 0}
        onChange={(e) => {
          setValue(parseInt(e.target.value) ? parseInt(e.target.value) : 0);
        }}
      />
    </div>
  );
};
export const FilterSlector = ({
  value,
  setValue,
  disabled,
  filter_data,
  name,
  selected,
  id,
}: {
  id: string;
  selected: number;
  value: FilterSchema[keyof FilterSchema];
  disabled?: boolean;
  setValue: (item: FilterSchema[keyof FilterSchema]) => void;
  filter_data: FilteredData[keyof FilteredData];
  name: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div className=" max-w-[48.5%] w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={disabled ? "pointer-events-none" : ""}
        >
          <div className="w-full">
            <Label className="w-full">{name}</Label>
            <Button
              variant="outline"
              role="combobox"
              type="button"
              aria-expanded={open}
              disabled={disabled}
              className="w-full justify-between"
              secondIcon={{
                icon: ChevronsUpDown,
                className: "size-4",
              }}
            >
              <span className="w-full max-w-[130px] truncate">
                {(value as any)?.id
                  ? filter_data.find(
                      (framework) => framework.id === (value as any)?.id,
                    )?.name
                  : `${t("select")} ${name}...`}
              </span>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0  overflow-y-scroll">
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder={`${t("select")} ${name}...`} />
            <CommandList>
              <CommandGroup className="">
                <ScrollArea className=" overflow-y-scroll h-[200px]">
                  {filter_data
                    .filter((item) => item?.[id] === selected)
                    .map((framework: any) => (
                      <CommandItem
                        key={framework.id}
                        // value={framework.id.toString()}
                        onSelect={() => {
                          setValue(framework);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            (value as any)?.id === framework.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {framework.name}
                      </CommandItem>
                    ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export function groupDataByNumbers<T>(
  strings: T[],
  groupSizes: number[],
): T[][] {
  const result: T[][] = [];
  let index = 0;

  for (const size of groupSizes) {
    const group = strings.slice(index, index + size);
    result.push(group);
    index += size;
  }

  return result;
}
