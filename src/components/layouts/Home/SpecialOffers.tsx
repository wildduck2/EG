import { useEffect, useState } from "react";
import { ProductCard } from "../AddContent";
import { SpecialOffersHead } from "../SpecialOffersHead";
import { data } from "@/constants";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export const SpecialOffers = () => {
  const [dataType, setDataType] = useState("special");

  const handleData = (data: unknown) => {
    {
      /* NOTE: You have to fix this */
    }

    setDataType(data as unknown as string);
  };

  const [dataFiltered, setDataFiltered] = useState<typeof data>([]);

  useEffect(() => {
    if (dataType === "special") {
      setDataFiltered([...data].filter((e) => e.offers));
    } else if (dataType === "lowPrice") {
      setDataFiltered(
        [...data].sort((a, b) => parseInt(a.price) - parseInt(b.price)),
      );
    } else if (dataType === "mostPrice") {
      setDataFiltered(
        [...data].sort((a, b) => parseInt(b.price) - parseInt(a.price)),
      );
    }
  }, [dataType]);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={`py-12 px-8 mx-28`}>
      <SpecialOffersHead dataType={handleData} data="special" />
      <Carousel
        setApi={setApi}
        opts={{
          direction: "rtl",
          loop: true,
        }}
      >
        <CarouselContent>
          {dataFiltered?.map((item, idx) => (
            <CarouselItem className="basis-1/5" key={idx}>
              <ProductCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-8" />
        <CarouselNext className="right-8" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground gap-1 flex items-center w-fit justify-center mx-auto">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "w-3 h-3 rounded-full border border-red-400 border-solid inline-flex",
              current === i + 1 && "bg-red-400",
            )}
          />
        ))}
      </div>
    </div>
  );
};
