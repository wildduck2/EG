import React from "react";
import { Button, CarouselItem, CustomCarousel } from "@/components/ui";
import { specialoffersProps } from "./special-offers.types";
import { data, headerData } from "@/constants";
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
  const { t, i18n } = useTranslation();
  const products = t("products") as unknown as typeof data;

  const [dataFiltered, setDataFiltered] = React.useState<typeof data>(products);

  // Query Special Offers
  const { data, status } = useQuery({
    queryKey: ["specialOffers"],
    queryFn: get_special_offers,
  });

  if (status === "pending") {
    return (
      <div>
        <ButtonListSkeleton />
        <SpecialOffersSkeleton />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <SpecialOffersHead data={t("filters")} />
        <CustomCarousel className="min-h-[447px]">
          {data.map((item, idx) => (
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
};

export const SpecialOffersHead: React.FC<specialoffersProps> = ({ data }) => {
  const [filter, setFilter] = React.useState("special");

  const handleData = (data: unknown) => {
    // dataType(data);
    setFilter(data as unknown as string);
  };

  return (
    <ul className="flex justify-start items-center gap-3 flex-wrap">
      {data.map((item, i) => (
        <li key={i}>
          <Button
            variant="outline"
            className={cn(
              "text-red-500 font-semibold border cursor-pointer px-5 py-1 rounded-md border-red-500 hover:bg-red-500 hover:text-white",
              filter === item.category && "bg-red-500 text-accent",
            )}
            onClick={() => handleData(item)}
          >
            {item.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
