import React from "react";
import { Button, CarouselItem, CustomCarousel } from "@/components/ui";
import { specialoffersProps } from "./special-offers.types";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { AdItemCard } from "../ad-item-card";
import { useQuery } from "@tanstack/react-query";
import { get_special_offers } from "./special-offers.lib";
import {
  ButtonListSkeleton,
  SpecialOffersSkeleton,
} from "./special-offers.skeleton";

export const SpecialOffers = () => {
  const { t } = useTranslation();

  const [filter, setFilter] = React.useState("special");

  // Query Special Offers
  const { data, status } = useQuery({
    queryKey: ["specialOffers"],
    queryFn: get_special_offers,
  });

  const filterData = (offers: any[], filter: string) => {
    switch (filter) {
      case "lowPrice":
        return offers.sort((a, b) => a.price - b.price);
      case "highPrice":
        return offers.sort((a, b) => b.price - a.price);
      default:
        return offers;
    }
  };

  if (status === "pending") {
    return (
      <div>
        <ButtonListSkeleton />
        <SpecialOffersSkeleton />
      </div>
    );
  }

  if (status === "success" && data) {
    const filteredData = filterData(data, filter);

    return (
      <div>
        <SpecialOffersHead
          filters={t("filters") as any}
          setFilter={setFilter}
          currentFilter={filter}
        />
        <CustomCarousel className="min-h-[447px]">
          {filteredData.map((item, idx) => (
            <CarouselItem
              key={idx}
              className="w-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <AdItemCard {...item} />
            </CarouselItem>
          ))}
        </CustomCarousel>
      </div>
    );
  }

  return null;
};

export const SpecialOffersHead: React.FC<specialoffersProps> = ({
  filters,
  currentFilter,
  setFilter,
}) => {
  return (
    <ul className="flex justify-start items-center gap-3 flex-wrap">
      {filters.map((item, i) => (
        <li key={i}>
          <Button
            variant="outline"
            className={cn(
              "text-red-500 font-semibold border cursor-pointer px-5 py-1 rounded-md border-red-500 hover:bg-red-500 hover:text-white",
              currentFilter === item.category && "bg-red-500 text-accent",
            )}
            onClick={() => setFilter(item.category)}
          >
            {item.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
