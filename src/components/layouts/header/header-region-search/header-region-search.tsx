import { filterData } from "@/context";
import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import { filter, FilterSchema, FilterSlector } from "../../category-page";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { MapPin } from "lucide-react";
import { SearchInput } from "../header-search";
import { cn } from "@/lib/utils";

export const HeaderRegion = ({ className }: { className?: string }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={cn("flex item-center gap-4 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-[90px] rounded-lg font-bold"
            icon={{ icon: MapPin }}
          >
            {t("egypt")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-4">
          <HeaderRegionSearch />
        </PopoverContent>
      </Popover>
      <SearchInput
        placeHolder={
          i18n.dir() === "rtl"
            ? "ابحث عن البضاعه التي تريدها..."
            : "search for products..."
        }
      />

      <Button
        title={t("search2")}
        className="bg-[#e60000] hover:bg-transparent border hover:border-solid hover:border-[#e60000] hover:text-[#e60000] font-bold  w-[100px] md:w-[300px] relative [&_svg]:stroke-white [&_input]:placeholder:text-white [&_input]:bg-[#ee1d24] [&>div]:w-[250px] [&>div]:truncate px-2 truncate"
        onClick={() => {
          navigate({ to: "/account/trader-profiles" });
        }}
      />
    </div>
  );
};

HeaderRegion.displayName = "HeaderRegion";

export const HeaderRegionSearch = () => {
  const { t, i18n } = useTranslation();
  const route = useNavigate();

  const [filter_data] = useAtom(filterData);

  const [_, setFilterSchema] = useAtom<FilterSchema>(filter);
  const [filter_data1, setFilterData] = React.useState<{
    governates: number | null;
    region: number | null;
  }>({
    region: null,
    governates: null,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setFilterSchema((old) => ({ ...old, ...filter_data1 }));
        route({
          to: "/categories/search",
        });
      }}
    >
      <div
        className="flex items-center gap-2 w-full [&_div]:w-[300px]"
        dir={i18n.dir()}
      >
        <FilterSlector
          filter_data={filter_data.governorates}
          value={{ id: filter_data1.governates } as any}
          name={t("governorates")}
          setValue={(item: FilterSchema["governorates"]) => {
            setFilterData((old) => ({
              ...old,
              governates: item?.id as number,
            }));
          }}
        />
        {
          //NOTE: filter_data1.region
          // <FilterSlector
          //   filter_data={filter_data.regions}
          //   value={{ id: filter_data1.region } as any}
          //   name={t("regions")}
          //   id={"governorate_id"}
          //   disabled={filter_data1.governates ? false : true}
          //   selected={filter_data1.governates}
          //   setValue={(item: FilterSchema["regions"]) => {
          //     setFilterData((old) => ({
          //       ...old,
          //       region: item?.id as number,
          //     }));
          //   }}
          // />
        }
      </div>

      <Button type="submit" className="w-full mt-4">
        {t("search")}
      </Button>
    </form>
  );
};

HeaderRegionSearch.displayName = "HeaderRegionSearch";
