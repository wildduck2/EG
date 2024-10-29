//@ts-nocheck
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandListGroupDataType,
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
  Toggle,
} from "@/components/ui";
import { AlertDialogCustom } from "@/components/ui/duckui/alert";
import { filterData } from "@/context";
import { atom, useAtom } from "jotai";
import {
  ArrowDown01,
  Check,
  ChevronsUpDown,
  CirclePlus,
  Home,
} from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { queryClient } from "@/main";
import { useParams } from "@tanstack/react-router";
import { buildCombinedSearchUrl } from "../category-search/category-search.lib";

export type FilterSchema = {
  governorates: Governorate | null;
  regions: City | null;
  categories: Category | null;
  subcategories: Subcategory | null;
  brand_countries: City | null;
  third_branches: City | null;
  type: "new" | "used" | null;
  order: "asc" | "desc" | null;
  min_price: number;
  max_price: number;
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

export const CategoryPageFilter = () => {
  const { t, i18n } = useTranslation();
  const products = t("products");

  const [filter_data] = useAtom(filterData);
  const [filter_schema, setFilterSchema] = useAtom<FilterSchema>(filter);

  const { id } = useParams({ strict: false });

  return (
    <AlertDialogCustom<boolean>
      type="sheet"
      drawerData={products.length > 0}
      header={{
        head: "Filter",
        description: "Filter your search results",
      }}
      footer={{
        className:
          "flex w-full place-content-end justify-end items-end gap-2 [&__button]:w-32",
        submit: (
          <Button
            variant="default"
            onClick={() => {
              queryClient.invalidateQueries({
                queryKey: ["categories", id],
              });
            }}
          >
            Submit
          </Button>
        ),
        cancel: <Button variant="outline">Cancel</Button>,
      }}
      state={true}
      trigger={{
        children: (
          <Button variant="ghost" size="default" className="">
            <ArrowDown01 className="size-5 rotate-180" />
            {t("filter")}
          </Button>
        ),
      }}
      content={{
        // dir: "rtl",
        className:
          "flex flex-col gap-4 sm:max-w-[450px] [&>div]:flex [&>div]:flex-col [&>div]:justify-between [&>div]:h-full",
        children: (
          <ScrollArea className="flex flex-col items-start p-2 w-full h-full">
            <div className="space-y-2">
              <div className="flex items-center gap-2 w-full">
                <FilterSlector
                  filter_data={filter_data.governorates}
                  value={filter_schema.governorates}
                  name="Governorates"
                  setValue={(item: FilterSchema["governorates"]) => {
                    setFilterSchema({ ...filter_schema, governorates: item });
                  }}
                />
                <FilterSlector
                  filter_data={filter_data.regions}
                  value={filter_schema.regions}
                  name="Regions"
                  setValue={(item: FilterSchema["regions"]) => {
                    setFilterSchema({ ...filter_schema, regions: item });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterSlector
                  filter_data={filter_data.categories}
                  value={filter_schema.categories}
                  name="Categories"
                  setValue={(item: FilterSchema["categories"]) => {
                    setFilterSchema({ ...filter_schema, categories: item });
                  }}
                />
                <FilterSlector
                  filter_data={filter_data.subcategories}
                  value={filter_schema.subcategories}
                  name="Subcategories"
                  setValue={(item: FilterSchema["subcategories"]) => {
                    setFilterSchema({ ...filter_schema, subcategories: item });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterSlector
                  filter_data={filter_data.brand_countries}
                  name="Third category"
                  value={filter_schema.brand_countries}
                  setValue={(item: FilterSchema["brand_countries"]) => {
                    setFilterSchema({
                      ...filter_schema,
                      brand_countries: item,
                    });
                  }}
                />
                <FilterSlector
                  filter_data={filter_data.third_branches}
                  value={filter_schema.third_branches}
                  name="Forth Branches"
                  setValue={(item: FilterSchema["third_branches"]) => {
                    setFilterSchema({ ...filter_schema, third_branches: item });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterSeleector2
                  value={filter_schema.type}
                  name="Types"
                  setValue={(item: string) => {
                    setFilterSchema({ ...filter_schema, type: item });
                  }}
                />

                <FilterSeleector
                  value={filter_schema.order}
                  name="Order"
                  setValue={(item: string) => {
                    setFilterSchema({ ...filter_schema, order: item });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterInput
                  name="Min Price"
                  value={filter_schema.min_price}
                  setValue={(item) => {
                    setFilterSchema({
                      ...filter_schema,
                      min_price: item as any,
                    });
                  }}
                />
                <FilterInput
                  name="Max Price"
                  value={filter_schema.max_price}
                  setValue={(item) => {
                    setFilterSchema({
                      ...filter_schema,
                      max_price: item as any,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <FilterSwitch
                  setValue={(item) => {
                    setFilterSchema({
                      ...filter_schema,
                      negotiate: item as any,
                    });
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterSchema({
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
                  Clear
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
  filter_data,
  name,
  setValue,
}: {
  filter_data: any;
  value: string | null;
  name: string;
  setValue: (item: any) => void;
}) {
  return (
    <div className="w-full">
      <Select onValueChange={(value) => setValue(value)}>
        <Label className="w-full"> Order </Label>
        <SelectTrigger className="w-full">
          <div>
            <SelectValue placeholder="Order..." />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterSeleector2({
  filter_data,
  name,
  setValue,
}: {
  filter_data: any;
  value: string | null;
  name: string;
  setValue: (item: any) => void;
}) {
  return (
    <div className="w-full">
      <Select onValueChange={(value) => setValue(value)}>
        <Label className="w-full">Type</Label>
        <SelectTrigger className="w-full">
          <div className="flex flex-col space-y-1">
            <SelectValue placeholder="Type..." />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="used">Used</SelectItem>
          <SelectItem value="new">New</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterSwitch({ setValue }: { setValue: (item: any) => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="airplane-mode">Negotiatable</Label>
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" onCheckedChange={setValue} />
        <Label htmlFor="airplane-mode">Yes</Label>
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
}: {
  value: FilterSchema[keyof FilterSchema];
  disabled?: boolean;
  setValue: (item: FilterSchema[keyof FilterSchema]) => void;
  filter_data: FilteredData[keyof FilteredData];
  name: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={cn("w-full", disabled && "pointer-events-none opecity-50")}
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
              <span className="w-full">
                {value.id !== 0
                  ? filter_data.find((framework) => framework.id === value.id)
                      ?.name
                  : `${t("select")} ${name}...`}
              </span>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0  overflow-y-scroll">
          <Command>
            <CommandInput placeholder={`Search ${name}...`} />
            <CommandList>
              <CommandEmpty>No Governates found.</CommandEmpty>
              <CommandGroup className="">
                <ScrollArea className=" overflo-scroll h-[200px]">
                  {filter_data.map((framework) => (
                    <CommandItem
                      key={framework.id}
                      value={framework.id.toString()}
                      onSelect={() => {
                        setValue(framework);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value?.id === framework.id
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
          </Command>
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

// Array.from({ length: 5 }).map((_, i) => (
//               <Accordion
//                 type="multiple"
//                 className="w-full"
//                 defaultValue={["item-1", "item-2", "item-3"]}
//               >
//                 <AccordionItem
//                   value={`item-${i + 1}`}
//                   className="border-b-2 border-border border-dashed"
//                 >
//                   <AccordionTrigger className="hover:no-underline px-2">
//                     اقسام
//                   </AccordionTrigger>
//                   <AccordionContent className="flex flex-wrap gap-2 px-2">
//                     {categoryData.slice(0, 6).map((item, idx) => (
//                       <Toggle
//                         className="border border-border border-solid h-fit px-4 py-2 rounded-lg"
//                         key={item.id}
//                       >
//                         {item.name}
//                       </Toggle>
//                     ))}
//                     <Toggle
//                       className="border border-red-400 border-dashed h-fit px-4 py-2 rounded-lg bg-red-100/70 text-red-500"
//                       key={0}
//                     >
//                       Show All
//                     </Toggle>
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             ))
